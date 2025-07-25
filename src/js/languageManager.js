/// Copyright 2025 Jason Montenegro-Navarro <jasonmontenegro49@gmail.com>

class LanguageManager {
  static #SUPPORTED_LANGUAGES = ["es", "en", "pt", "fr"];
  #PAGE_SUPPORTED_LANGUAGES_URL = "./src/js/locales";
  static #BROWSER_LANG = navigator.language.split("-")[0];
  static #Languages = Object.freeze({
    SPANISH: "es",
    ENGLISH: "en",
    PORTUGUESE: "pt",
    FRENCH: "fr"
  });
  #translationsCache = {};
  
  static #LANG_ATTRIBUTE = "lang";
  static #LANGUAGE_TAG_ATTRIBUTE = "data-i18n";
  #currentLanguageSpecification;

  /**
   * 
   * @param {string} localePath Locale directory path respective to the html root element.
   */
  constructor(localePath = "./src/js/locales") {
    this.#PAGE_SUPPORTED_LANGUAGES_URL = localePath;
    const savedLang = localStorage.getItem(LanguageManager.#LANG_ATTRIBUTE);

    this.#currentLanguageSpecification =
      savedLang ??
      (LanguageManager.#SUPPORTED_LANGUAGES.includes(LanguageManager.#BROWSER_LANG)
        ? LanguageManager.#BROWSER_LANG
        : LanguageManager.#Languages.SPANISH);
  }

  /**
   * Gets the current language specification.
   * 
   * @returns Current language specification
   */
  getCurrentLanguage() {
    return this.#currentLanguageSpecification;
  }

  /**
   * Accesor to supported languages identifiers.
   * @returns Supported languages object
   */
  get Languages() {
    return LanguageManager.#Languages;
  }

  /**
   * Sets a default language specification, only if its a supported specification.
   * Logs the language as preferred language for the user.
   * 
   * @param {string} language Language specification
   * @returns A boolean value representing that the default language specification was set, or not.
   */
  setLanguageSpecification(language) {
    let wasDefaultLanguageUpdated = false;
    if (this.#isValidLanguageSpecification(language)) {
      this.#currentLanguageSpecification = language;
      this.#setPreferredLanguageInLocalStorage(language);
      wasDefaultLanguageUpdated = true;
    }
    return wasDefaultLanguageUpdated;
  }

  /**
   * Checks that the language specification provided has valid translations.
   * 
   * @param {string} language Language specification.
   * @returns A boolean value representing that the language specification
   * is a valid language with translations supported.
   */
  #isValidLanguageSpecification(language) {
    return typeof(language) === "string" && LanguageManager.#SUPPORTED_LANGUAGES.includes(language);
  }

  /**
   * Sets language specification as preferred language in localStorage.
   * 
   * @param {string} language Language specification
   */
  #setPreferredLanguageInLocalStorage(language) {
    localStorage.setItem(LanguageManager.#LANG_ATTRIBUTE, language);
  }

  /**
   * Gets all the supported language translations as an a list.
   * 
   * @returns Supported language translations.
   */
  getSupportedLanguages() {
    return [...LanguageManager.#SUPPORTED_LANGUAGES];
  }

  /**
   * Updates the language of the website.
   * Will only change the language to supported languages.
   * 
   * If a language argument is provided it will be set to the default language specification.
   * 
   * Supported languages:
   *  - Spanish
   *  - English
   *  - Portuguese
   *  - French
   * 
   * @param {string} language Language specification
   * @returns A Promise<any> that contains a boolean value representing
   * that the website was successful loading the language translations, or not.
   */
  async updateLanguage(language = this.#currentLanguageSpecification) {
    let wasLanguageChanged = false;
    if (this.#isValidLanguageSpecification(language)) {
      const translation = await this.#getLanguageTranslation(language);
      wasLanguageChanged = this.#applyTranslation(translation);
      this.setLanguageSpecification(language);
    }
    return wasLanguageChanged;
  }

  /**
   * Fetches for the language translation in the supported languages directory.
   * 
   * @param {string} language Language specification
   * @returns Promise<any> containing the translation object.
   */
  async #getLanguageTranslation(language) {
    let result = {};
    if (this.#translationsCache[language]) {
      result = this.#translationsCache[language];
    } else {
      try {
        const languagesUrl = `${this.#PAGE_SUPPORTED_LANGUAGES_URL}/${language}.json`;
        const loadedLanguage = await fetch(languagesUrl);
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
   * @param {object} languageTranslations Language translations
   * @returns A boolean value representing that the website was successful loading the language translations, or not.
   */
  #applyTranslation(languageTranslations) {
    const pageElements = document.querySelectorAll(`[${LanguageManager.#LANGUAGE_TAG_ATTRIBUTE}]`);
    return this.#traverseElementsAndApplyTranslation(pageElements, languageTranslations);
  }

  /**
   * @brief Traverses a list of html elements, and applies a translation to every element
   * in the website that contains the attribute "[data-i18n]".
   * 
   * @param {NodeList} pageElements All the elements in the html files that contain the attribute "[data-i18n]"
   * @param {object} languageTranslations Language translations
   * @returns A boolean value representing that the website was successful loading the language translations, or not.
   */
  #traverseElementsAndApplyTranslation(pageElements, languageTranslations) {
    let wasTranslationApplied = false;
    pageElements.forEach((element) => {
      const key = element.getAttribute(LanguageManager.#LANGUAGE_TAG_ATTRIBUTE);
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