import { ApiFunction, withEndpoint } from "next-endpoint";
import { parse, HTMLElement } from "node-html-parser";

export interface LookupRequest {
  language: string;
  word: string;
}

export interface LookupResponse extends LookupRequest {
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

  const languageHeader = languageSpan.parentNode;

  let html = "";
  let foundHeadWord = false;
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

      /**
       * Try to read the formatted headword from this node (e.g. scio -> sciō).
       */
      const headWord = currentNode.querySelector(".headword");
      if (headWord && !foundHeadWord) {
        word = headWord.textContent.trim();
        foundHeadWord = true;
      }

      html += currentNode.outerHTML;
    } else {
      break;
    }
  }

  // console.log(nodesToRender.length);

  return {
    language,
    word,
    html,
  };
};

export default withEndpoint(lookup);