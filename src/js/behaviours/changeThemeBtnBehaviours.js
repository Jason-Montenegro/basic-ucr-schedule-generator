/// Copyright 2025 Jason Montenegro <jasonmontenegro49@gmail.com>

import * as DOM_SELECTORS from "../selectors.js";
import EventsListener from "../EventsListener.js";

const colorThemeMap = Object.freeze({
  [DOM_SELECTORS.COLOR_THEME_DEFAULT_ID]: DOM_SELECTORS.COLOR_THEME_ATTRIBUTE_VALUE_DEFAULT,
  [DOM_SELECTORS.COLOR_THEME_LIGHT_ID]: DOM_SELECTORS.COLOR_THEME_ATTRIBUTE_VALUE_LIGHT,
  [DOM_SELECTORS.COLOR_THEME_DARK_ID]: DOM_SELECTORS.COLOR_THEME_ATTRIBUTE_VALUE_DARK,
  [DOM_SELECTORS.COLOR_THEME_MATRIX_ID]: DOM_SELECTORS.COLOR_THEME_ATTRIBUTE_VALUE_MATRIX,
  [DOM_SELECTORS.COLOR_THEME_ARCTIC_ID]: DOM_SELECTORS.COLOR_THEME_ATTRIBUTE_VALUE_ARCTIC,
  [DOM_SELECTORS.COLOR_THEME_CUTESY_ID]: DOM_SELECTORS.COLOR_THEME_ATTRIBUTE_VALUE_CUTESY,
  [DOM_SELECTORS.COLOR_THEME_SOLARIS_ID]: DOM_SELECTORS.COLOR_THEME_ATTRIBUTE_VALUE_SOLARIS,
  [DOM_SELECTORS.COLOR_THEME_NEBULA_ID]: DOM_SELECTORS.COLOR_THEME_ATTRIBUTE_VALUE_NEBULA,
  [DOM_SELECTORS.COLOR_THEME_TROPICAL_ID]: DOM_SELECTORS.COLOR_THEME_ATTRIBUTE_VALUE_TROPICAL
});

/**
 * @brief Initializes change theme events to all buttons related to changing themes.
 * - Adds behavour to change theme buttons: alters the color theme of the whole page.
 */
export function initChangeThemeBtnBehaviours() {
  const changeThemeButtons = document.getElementsByClassName(DOM_SELECTORS.CHANGE_THEME_BUTTON_CLASS_NAME);

  for (const button of changeThemeButtons) {
    const selectedTheme = getPageColorTheme(button.id);

    if (selectedTheme) {
      const rootElement = document.documentElement;
      EventsListener.addAttributeSettingEvent(
        EventsListener.EVENT_TYPES.CLICK,
        DOM_SELECTORS.PAGE_THEME_ATTRIBUTE_NAME,
        selectedTheme,
        button.id,
        rootElement.id);
    }
  }
}

/**
 * @brief Gets the related page color theme if it exists. 
 * 
 * @param {string} actionerElementId Actioner element id.
 * @returns Page color theme related to actioner, or null if there is no corresponding value.
 */
function getPageColorTheme(actionerElementId) {
  return colorThemeMap[actionerElementId] || null;
}