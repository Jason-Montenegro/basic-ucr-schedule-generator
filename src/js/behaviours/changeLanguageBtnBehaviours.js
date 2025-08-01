/// Copyright 2025 Jason Montenegro <jasonmontenegro49@gmail.com>

import * as DOM_SELECTORS from "../selectors.js";
import languageManager from "../siteLanguages/languageManager.js";
import EventsListener from "../EventsListener.js";

const languageMap = Object.freeze({
  [DOM_SELECTORS.LANGUAGE_TRANSLATION_BUTTON_SPANISH_ID]: languageManager.LANGUAGES.SPANISH,
  [DOM_SELECTORS.LANGUAGE_TRANSLATION_BUTTON_ENGLISH_ID]: languageManager.LANGUAGES.ENGLISH,
  [DOM_SELECTORS.LANGUAGE_TRANSLATION_BUTTON_PORTUGUESE_ID]: languageManager.LANGUAGES.PORTUGUESE,
  [DOM_SELECTORS.LANGUAGE_TRANSLATION_BUTTON_FRENCH_ID]: languageManager.LANGUAGES.FRENCH
});

/**
 * @brief Initializes change language events to all buttons related to changing language.
 * - Adds behavour to change language buttons: alters the language of the whole page.
 */
export function initChangeLanguageBtnBehaviours() {
  const changeLanguageButtons = document.getElementsByClassName(DOM_SELECTORS.CHANGE_PAGE_LANGUAGE_BUTTON_CLASS_NAME);
  for (const button of changeLanguageButtons) {
    const languageSpecification = getLanguageSpecification(button.id);
    if (languageSpecification) {
      const rootElement = document.documentElement;
      EventsListener.addAttributeSettingEvent(
        EventsListener.EVENT_TYPES.CLICK,
        languageManager.HTML_LANGUAGE_TRANSLATION_ATTRIBUTE,
        languageSpecification,
        button.id,
        rootElement.id);
      const updateLanguageCallback = () => languageManager.updateLanguageTranslations(languageSpecification);
      EventsListener.addCallbacksEvent(EventsListener.EVENT_TYPES.CLICK, button.id, updateLanguageCallback);
    }
  }
}

/**
 * @brief Gets the related language specification if it exists. 
 * 
 * @param {string} actionerElementId Actioner element id.
 * @returns Language specification related to actioner, or null if there is no corresponding value.
 */
function getLanguageSpecification(actionerElementId) {
  return languageMap[actionerElementId] || null;
}