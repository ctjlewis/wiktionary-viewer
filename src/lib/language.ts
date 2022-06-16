import ISO6391, { LanguageCode as ISO6391LanguageCode } from "iso-639-1";

export * from "iso-639-1";
export { ISO6391 };

export const LANGUAGE_CODES = ISO6391.getAllCodes();
export const LANGUAGE_NAMES = ISO6391.getAllNames().sort();

export const isISO6391LanguageCode =
  (code: string): code is ISO6391LanguageCode => {
    return LANGUAGE_CODES.includes(code as ISO6391LanguageCode);
  };

export type ISO6391Languages = {
  [key in ISO6391LanguageCode]?: string;
};

export const LANGUAGES: ISO6391Languages = {};
for (const languageName of LANGUAGE_NAMES) {
  const code = ISO6391.getCode(languageName);
  LANGUAGES[code] = languageName;
}
