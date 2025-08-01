/// Copyright 2025 Jason Montenegro <jasonmontenegro49@gmail.com>

/**
 * LanguageManager
 * 
 * @brief Instances alter the language translations of the whole website.
 * 
 * Supported languages:
 * - Spanish
 * - English
 * - Portuguese
 * - French
 */
class LanguageManager {
  static #DEFAULT_LOCALE_PATH = "./src/js/siteLanguages/locales";
  static #LANG_ATTRIBUTE = "lang";
  static #HTML_LANGUAGE_TRANSLATION_ATTRIBUTE = "data-i18n";
  static #BROWSER_LANG = navigator.language.split("-")[0];
  static #SUPPORTED_LANGUAGES = ["es", "en", "pt", "fr"];
  static #LANGUAGES = Object.freeze({
    SPANISH: "es",
    ENGLISH: "en",
    PORTUGUESE: "pt",
    FRENCH: "fr"
  });
  #translationsCache = {};
  #PAGE_SUPPORTED_LANGUAGES_URL;
  #currentLanguageSpecification;
  static #languageDirectoryUrlRegex = /\.?[\/\S/]{1,}/;

  /**
   * @brief Initializes the page supported languages directory url, and the current language specification.
   * 
   * @param {string} localePath Locale directory path respective to the html root element.
   */
  constructor(localePath = LanguageManager.#DEFAULT_LOCALE_PATH) {
    this.#PAGE_SUPPORTED_LANGUAGES_URL = 
      (typeof(localePath) === "string" && LanguageManager.#languageDirectoryUrlRegex.test(localePath))
        ? localePath
        : LanguageManager.#DEFAULT_LOCALE_PATH;
  
    const savedLang = window.localStorage.getItem(LanguageManager.#LANG_ATTRIBUTE);
    this.#currentLanguageSpecification =
      savedLang ??
      (LanguageManager.#SUPPORTED_LANGUAGES.includes(LanguageManager.#BROWSER_LANG)
        ? LanguageManager.#BROWSER_LANG
        : LanguageManager.#LANGUAGES.SPANISH);
  }

  /**
   * @brief Accesor to supported language specifications.
   * 
   * @returns Supported language specifications object.
   */
  get LANGUAGES() {
    return LanguageManager.#LANGUAGES;
  }

  /**
   * @brief Accesor to html language translation attribute.
   * 
   * @return Language translation attribute.
   */
  get HTML_LANGUAGE_TRANSLATION_ATTRIBUTE() {
    return LanguageManager.#HTML_LANGUAGE_TRANSLATION_ATTRIBUTE;
  }

  /**
   * @brief Gets the current language specification.
   * 
   * @returns Current language specification.
   */
  getCurrentLanguageSpecification() {
    return this.#currentLanguageSpecification;
  }

  /**
   * @brief Sets a language specification, only if its supported.
   * Logs the language as preferred language for the user in localStorage.
   * 
   * @param {string} language Language specification.
   * @returns A boolean value representing that the language specification was set, or not.
   */
  setLanguageSpecification(language) {
    let wasLanguageSpecificationSet = false;
    if (this.#isValidLanguageSpecification(language)) {
      this.#currentLanguageSpecification = language;
      this.#setPreferredLanguageInLocalStorage(language);
      wasLanguageSpecificationSet = true;
    }
    return wasLanguageSpecificationSet;
  }

  /**
   * @brief Checks that the language specification provided has valid translations.
   * 
   * @param {string} language Language specification.
   * @returns A boolean value representing that the language specification is supported, or not.
   */
  #isValidLanguageSpecification(language) {
    return typeof(language) === "string" && LanguageManager.#SUPPORTED_LANGUAGES.includes(language);
  }

  /**
   * @brief Sets language specification as preferred language in localStorage.
   * 
   * @param {string} language Language specification.
   */
  #setPreferredLanguageInLocalStorage(language) {
    localStorage.setItem(LanguageManager.#LANG_ATTRIBUTE, language);
  }

  /**
   * @brief Gets all the supported language specifications.
   * 
   * @returns Supported language specifications.
   */
  getSupportedLanguages() {
    return [...LanguageManager.#SUPPORTED_LANGUAGES];
  }

  /**
   * @brief Updates the language of the website.
   * 
   * If a language specification argument is provided,
   * it will be set to the current language specification.
   * 
   * Supported languages:
   *  - Spanish
   *  - English
   *  - Portuguese
   *  - French
   * 
   * @param {string} language Language specification.
   * @returns A Promise<any> that contains a boolean value representing
   * that the website was successful loading the language translations, or not.
   */
  async updateLanguageTranslations(language = this.#currentLanguageSpecification) {
    this.setLanguageSpecification(language);
    const translation = await this.#getLanguageTranslation(this.#currentLanguageSpecification);
    let wereLanguageTranslationsUpdated = this.#applyTranslation(translation);
    if (!this.#isValidLanguageSpecification(language)) {
      wereLanguageTranslationsUpdated = false;
    }
    return wereLanguageTranslationsUpdated;
  }

  /**
   * @brief Fetches for the language translation in the supported languages directory.
   * 
   * @param {string} language Language specification.
   * @returns Promise<any> containing the translation object.
   */
  async #getLanguageTranslation(language) {
    let result = this.#translationsCache[language];
    if (!result) {
      try {
        const url = `${this.#PAGE_SUPPORTED_LANGUAGES_URL}/${language}.json`;
        const loadedLanguage = await fetch(url);
        if (!loadedLanguage.ok) {
          throw new Error(`Failed to load language file: ${language}`);
        }
        this.#translationsCache[language] = await loadedLanguage.json();
        result = this.#translationsCache[language];
      } catch(e) {
        console.error(e);
      }
    }
    return result;
  }

  /**
   * @brief Fetches for all html elements that contain the attribute "[data-i18n]",
   * and traverses them applying the translations for each corresponding key.
   * 
   * @param {object} languageTranslations Language translations.
   * @returns A boolean value representing that the website was successful loading the language translations, or not.
   */
  #applyTranslation(languageTranslations) {
    const pageElements = document.querySelectorAll(`[${LanguageManager.#HTML_LANGUAGE_TRANSLATION_ATTRIBUTE}]`);
    return this.#traverseElementsAndApplyTranslation(pageElements, languageTranslations);
  }

  /**
   * @brief Traverses a list of html elements, and applies a translation to every element
   * in the website that contains the attribute "[data-i18n]".
   * 
   * @param {NodeList} pageElements All the elements in the html files that contain the attribute "[data-i18n]".
   * @param {object} languageTranslations Language translation.
   * @returns A boolean value representing that the website was successful loading the language translations, or not.
   */
  #traverseElementsAndApplyTranslation(pageElements, languageTranslations) {
    let wasTranslationApplied = false;
    pageElements.forEach((element) => {
      const key = element.getAttribute(LanguageManager.#HTML_LANGUAGE_TRANSLATION_ATTRIBUTE);
      if (languageTranslations[key] && element.innerHTML !== languageTranslations[key]) {
        element.innerHTML = languageTranslations[key];
        wasTranslationApplied = true;
      }
    });
    return wasTranslationApplied;
  }
}

const languageManager = new LanguageManager();
export default languageManager;