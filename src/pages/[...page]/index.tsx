import { useRouter } from "next/router";
import useSWR from "swr";

import { ISO6391 } from "../../lib/language";
import { PageResponse } from "../api/page";
import { WikiView } from "../../views/WikiView";

const TRANSLATION_MATCH = /\/wiki\/.+#.+/;

export default function Page() {
  const { asPath, push } = useRouter();
  const { data } = useSWR<PageResponse>(
    `/api/page?href=${asPath}`,
    async (url: string) => (await fetch(url)).json(),
  );

  if (asPath.startsWith("/[...")) {
    return null;
  }

  if (TRANSLATION_MATCH.test(asPath) && !asPath.includes("Appendix:")) {
    const word = asPath.replace("/wiki/", "").replace(/#.+/, "");
    const language = asPath.replace("/wiki/", "").replace(/.+#/, "");
    const languageCode = ISO6391.getCode(language);

    push(`/?language=${languageCode}&word=${word}`);
  }

  if (!data) {
    return null;
  }

  const { html } = data;

  return (
    <WikiView html={html} />
  );
}