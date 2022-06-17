import { useRouter } from "next/router";
import useSWR from "swr";
import { WikiView } from "../../views/WikiView";

import { PageResponse } from "../api/page";

export default function Page() {
  const { asPath } = useRouter();
  const { data } = useSWR<PageResponse>(
    `/api/page?href=${asPath}`,
    async (url: string) => (await fetch(url)).json(),
  );

  if (asPath.startsWith("/[...")) {
    return null;
  }

  if (!data) {
    return null;
  }

  const { html } = data;

  return (
    <WikiView html={html} />
  );

  // return (
  //   <code>{JSON.stringify(page)}</code>
  // );
}