import { ApiFunction, withEndpoint } from "next-endpoint";
import { isISO6391LanguageCode, ISO6391, LanguageCode } from "../../../lib/language";
import { parse, HTMLElement } from "node-html-parser";

export interface LookupRequest {
  language: LanguageCode;
  word: string;
}

export interface LookupResponse extends LookupRequest {
  html: string;
  error?: string;
}

export const lookup: ApiFunction<LookupRequest, LookupResponse> = async ({
  language,
  word
}) => {
  if (!language || !word) {
    throw new Error("Missing language or word");
  }

  if (!isISO6391LanguageCode(language)) {
    throw new Error("Invalid language");
  }

  const languageName = ISO6391.getName(language);

  const url = `https://en.wiktionary.org/wiki/${word}#${languageName}`;
  const response = await fetch(url);
  const responseHtml = await response.text();

  const doc = parse(responseHtml);
  const languageSpan = doc.getElementById(languageName);

  if (!languageSpan) {
    throw new Error("No entry found for this language");
  }

  const languageHeader = languageSpan.parentNode;

  let html = "";
  let foundHeadWord = false;
  let finished = false;
  let currentNode: HTMLElement = languageHeader;

  while (
    (currentNode = currentNode.nextElementSibling) &&
    !finished
  ) {
    switch (currentNode.tagName) {
      case "H1":
      case "H2":
        finished = true;
        continue;
      /**
       * If a link
       */
      // case "A":
      //   break;
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
  }

  // console.log(nodesToRender.length);

  return {
    language,
    word,
    html,
  };
};

export default withEndpoint(lookup);