import { FC } from "react";

export interface WikiViewProps {
  html?: string;
}

export const WikiView: FC<WikiViewProps> = ({
  children,
  html
}) => {

  if (html) {
    return (
      <section
        className="w-full px-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <section
      className="w-full px-8"
    >
      {children}
    </section>
  );
};