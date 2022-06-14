import { FC } from "react";
import { LookupRequest } from "../../pages/api/lookup";

export type HeaderProps = LookupRequest;

export const Header: FC<HeaderProps> = ({ children, word, language }) => {
  return (
    <header>
      <div className="flex-1 flex flex-row justify-start items-center space-x-2">
        <h4 className="m-0 p-0">{word}</h4>
        <span>{language}</span>
      </div>

      <div className="flex-2 flex flex-row justify-end h-12 space-x-2">
        <input className="w-full max-w-xs" />
        <button>Go</button>
      </div>
      {children}
    </header>
  );
};