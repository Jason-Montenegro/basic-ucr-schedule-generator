/// Copyright 2025 Jason Montenegro <jasonmontenegro49@gmail.com>

import languageManager from "./LanguageManager.js";

describe("Setting languages module.", () => {
  test("Allow language change to spanish.", () => {
    const languageSpecification = languageManager.LANGUAGES.SPANISH;
    expect(languageManager.setLanguageSpecification(languageSpecification)).toBe(true);
  });
  
  test("Allow language change to english.", () => {
    const languageSpecification = languageManager.LANGUAGES.ENGLISH;
    expect(languageManager.setLanguageSpecification(languageSpecification)).toBe(true);
  });
  
  test("Allow language change to portuguese.", () => {
    const languageSpecification = languageManager.LANGUAGES.PORTUGUESE;
    expect(languageManager.setLanguageSpecification(languageSpecification)).toBe(true);
  });

  test("Allow language change to french.", () => {
    const languageSpecification = languageManager.LANGUAGES.FRENCH;
    expect(languageManager.setLanguageSpecification(languageSpecification)).toBe(true);
  });

  test("Not allow language change to language not supported: german.", () => {
    const languageSpecification = "de";
    expect(languageManager.setLanguageSpecification(languageSpecification)).toBe(false);
  });

  test("Not allow language change to non valid type language argument: number.", () => {
    const languageSpecification = 1234;
    expect(languageManager.setLanguageSpecification(languageSpecification)).toBe(false);
  });
});

describe("Getting support for languages..", () => {
  test("Get supported languages equal to [\"es\", \"en\", \"pt\", \"fr\"].", () => {
    expect(languageManager.getSupportedLanguages()).toEqual(["es", "en", "pt", "fr"]);
  });

  test("Check if there is language support for spanish.", () => {
    expect(languageManager.getSupportedLanguages()).toContain("es");
  });

  test("Check if there is language support for english.", () => {
    expect(languageManager.getSupportedLanguages()).toContain("en");
  });

  test("Check if there is language support for portuguese.", () => {
    expect(languageManager.getSupportedLanguages()).toContain("pt");
  });

  test("Check if there is language support for french.", () => {
    expect(languageManager.getSupportedLanguages()).toContain("fr");
  });

  test("Check if there is not language support for german.", () => {
    expect(languageManager.getSupportedLanguages()).not.toContain("ge");
  });
});

describe("Getting current language specification.", () => {
  test("Change language to spanish, and check if it was set to current language specification.", () => {
    const languageSpecification = languageManager.LANGUAGES.SPANISH;
    languageManager.setLanguageSpecification(languageSpecification);
    expect(languageManager.getCurrentLanguageSpecification()).toBe(languageSpecification);
  });

  test("Change language to english, and check if it was set to current language specification.", () => {
    const languageSpecification = languageManager.LANGUAGES.ENGLISH;
    languageManager.setLanguageSpecification(languageSpecification);
    expect(languageManager.getCurrentLanguageSpecification()).toBe(languageSpecification);
  });

  test("Change language to portuguese, and check if it was set to current language specification.", () => {
    const languageSpecification = languageManager.LANGUAGES.PORTUGUESE;
    languageManager.setLanguageSpecification(languageSpecification);
    expect(languageManager.getCurrentLanguageSpecification()).toBe(languageSpecification);
  });

  test("Change language to french, and check if it was set to current language specification.", () => {
    const languageSpecification = languageManager.LANGUAGES.FRENCH;
    languageManager.setLanguageSpecification(languageSpecification);
    expect(languageManager.getCurrentLanguageSpecification()).toBe(languageSpecification);
  });
});