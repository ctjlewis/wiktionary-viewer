import { FC } from "react";

export interface WiktionarySectionProps {
  html?: string;
}

export const WiktionarySection: FC<WiktionarySectionProps> = ({
  children,
  html
}) => {

  if (html) {
    return (
      <section
        className="w-full px-4"
        dangerouslySetInnerHTML={{ __html: html }}
      >
        {children}
      </section>
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