import { FC } from "react";
import { LANGUAGES } from "../../lib/language";
import { LookupRequest } from "../../pages/api/lookup";

export type HeaderProps = LookupRequest;

export const Header: FC<HeaderProps> = ({ children, word, language }) => {

  return (
    <header>
      <form className="flex space-x-2">

        <div className="flex flex-1 flex-row justify-start items-center space-x-2">
          {/* <h4 className="m-0 p-0">{word}</h4> */}
          {/* <span>{language}</span> */}
          <select
            className="h-full max-w-[120px]"
            name="language"
            defaultValue={language}
          >
            {
              Object.entries(LANGUAGES).map(
                ([languageCode, languageName]) => {
                  return (
                    <option
                      key={languageCode}
                      value={languageCode}
                    >
                      {languageName}
                      {/* {languageName} */}
                      {/* <img width={50} height={50} alt="English" src="https://unpkg.com/language-icons/icons/en.svg" /> */}
                    </option>
                  );
                }
              )
            }
          </select>
        </div>

        <div className="flex flex-2 flex-row justify-end h-12 space-x-2">
          <input
            className="font-bold w-full max-w-xs"
            defaultValue={word}
            name="word"
          />
          <button>Go</button>
        </div>
      </form>
      {children}
    </header>
  );
};