import { ApiFunction, withEndpoint } from "next-endpoint";
import { parse, HTMLElement } from "node-html-parser";

export interface LookupRequest {
  language: string;
  word: string;
}

export interface LookupResponse {
  html: string;
}

export const lookup: ApiFunction<LookupRequest, LookupResponse> = async ({
  language,
  word
}) => {

  if (!language || !word) {
    throw new Error("Missing language or word");
  }

  const url = `https://en.wiktionary.org/wiki/${word}#${language}`;
  const response = await fetch(url);
  const responseHtml = await response.text();

  const doc = parse(responseHtml);
  const languageSpan = doc.getElementById(language);

  if (!languageSpan) {
    throw new Error("No entry found for this language");
  }

  let html = "";
  const languageHeader = languageSpan.parentNode;
  // const nodesToRender = [];

  let finished = false;
  let currentNode: HTMLElement = languageHeader;
  while (currentNode = currentNode.nextElementSibling) {
    if (!finished) {
      switch (currentNode.tagName) {
        case "H1":
        case "H2":
          finished = true;
          break;
      }

      // nodesToRender.push(currentNode);
      html += currentNode.outerHTML;
    } else {
      break;
    }
  }

  // console.log(nodesToRender.length);

  return {
    html,
  };
};

export default withEndpoint(lookup);