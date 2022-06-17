import { ApiFunction, withEndpoint } from "next-endpoint";
import { parse, HTMLElement, Node, NodeType, TextNode } from "node-html-parser";

export interface PageRequest {
  href: string;
}

export interface PageResponse extends PageRequest {
  html: string;
  error?: string;
}

export const isElement = (node: Node): node is HTMLElement => {
  return node.nodeType === NodeType.ELEMENT_NODE;
};

export const page: ApiFunction<PageRequest, PageResponse> = async ({
  href
}) => {
  if (typeof href !== "string") {
    throw new Error("No href given.");
  }

  const url: string = new URL(href, "https://en.wiktionary.org").href;
  const response = await fetch(url);
  const responseHtml = await response.text();

  const doc = parse(responseHtml);

  // console.log({ body });

  let html = "";
  const finished = false;
  let currentNode = doc.getElementById("toc");

  while (currentNode && !finished) {
    html += currentNode.outerHTML;
    currentNode = currentNode.nextElementSibling;
  }

  // console.log(nodesToRender.length);

  return {
    href: url,
    html,
  };
};

export default withEndpoint(page);