/// Copyright 2025 Jason Montenegro <jasonmontenegro49@gmail.com>

import ListenerManager from "./ListenerManager.js";
import languageManager from "../siteLanguages/languageManager.js";

/**
 * NavBarMenuListenerManager
 * 
 * @brief Event listener manager for elements in nav bar section.
 */
class NavBarMenuListenerManager extends ListenerManager {
  #submenuMap = Object.freeze({
    [this.DOM_SELECTORS.SAVE_SCHEDULE_SUBMENU_TOGGLE_BUTTON_ID]: this.DOM_SELECTORS.SAVE_SCHEDULE_AS_FILE_SUBMENU_ID,
    [this.DOM_SELECTORS.HOW_TO_USE_REGEX_CONTAINER_TOGGLE_BUTTON_ID]: this.DOM_SELECTORS.HOW_TO_USE_REGEX_CONTAINER_ID,
    [this.DOM_SELECTORS.CHANGE_PAGE_THEME_SUBMENU_TOGGLE_BUTTON_ID]: this.DOM_SELECTORS.CHANGE_PAGE_THEME_SUBMENU_ID,
    [this.DOM_SELECTORS.CHANGE_PAGE_LANGUAGE_SUBMENU_TOGGLE_BUTTON_ID]: this.DOM_SELECTORS.CHANGE_PAGE_LANGUAGE_SUBMENU_ID
  });

  #languageMap = Object.freeze({
    [this.DOM_SELECTORS.LANGUAGE_TRANSLATION_BUTTON_SPANISH_ID]: languageManager.LANGUAGES.SPANISH,
    [this.DOM_SELECTORS.LANGUAGE_TRANSLATION_BUTTON_ENGLISH_ID]: languageManager.LANGUAGES.ENGLISH,
    [this.DOM_SELECTORS.LANGUAGE_TRANSLATION_BUTTON_PORTUGUESE_ID]: languageManager.LANGUAGES.PORTUGUESE,
    [this.DOM_SELECTORS.LANGUAGE_TRANSLATION_BUTTON_FRENCH_ID]: languageManager.LANGUAGES.FRENCH
  });

  #colorThemeMap = Object.freeze({
    [this.DOM_SELECTORS.COLOR_THEME_DEFAULT_ID]: this.DOM_SELECTORS.COLOR_THEME_ATTRIBUTE_VALUE_DEFAULT,
    [this.DOM_SELECTORS.COLOR_THEME_LIGHT_ID]: this.DOM_SELECTORS.COLOR_THEME_ATTRIBUTE_VALUE_LIGHT,
    [this.DOM_SELECTORS.COLOR_THEME_DARK_ID]: this.DOM_SELECTORS.COLOR_THEME_ATTRIBUTE_VALUE_DARK,
    [this.DOM_SELECTORS.COLOR_THEME_MATRIX_ID]: this.DOM_SELECTORS.COLOR_THEME_ATTRIBUTE_VALUE_MATRIX,
    [this.DOM_SELECTORS.COLOR_THEME_ARCTIC_ID]: this.DOM_SELECTORS.COLOR_THEME_ATTRIBUTE_VALUE_ARCTIC,
    [this.DOM_SELECTORS.COLOR_THEME_CUTESY_ID]: this.DOM_SELECTORS.COLOR_THEME_ATTRIBUTE_VALUE_CUTESY,
    [this.DOM_SELECTORS.COLOR_THEME_SOLARIS_ID]: this.DOM_SELECTORS.COLOR_THEME_ATTRIBUTE_VALUE_SOLARIS,
    [this.DOM_SELECTORS.COLOR_THEME_NEBULA_ID]: this.DOM_SELECTORS.COLOR_THEME_ATTRIBUTE_VALUE_NEBULA,
    [this.DOM_SELECTORS.COLOR_THEME_TROPICAL_ID]: this.DOM_SELECTORS.COLOR_THEME_ATTRIBUTE_VALUE_TROPICAL
  })
  
  constructor() {
    super();
  }

  /**
   * @brief Initializes the event listeners for all elements in the nav bar section.
   */
  initializeListeners() {
    // console.log("Nav bar menu listeners inactive"); /// DEBUG
    this.#initializeMainMenuToggleButton();
    this.#initializeSubmenuButtons();
    this.#initializeChangeLanguageButtons();
    this.#initializeChangePageColorThemeButtons();
    // console.log("Nav bar menu listeners active"); /// DEBUG
  }

  /**
   * @brief Initializes main menu toggle button with event listener, to
   * open or close functionality for the nav bar menu list.
   */
  #initializeMainMenuToggleButton() {
    this.addToggleHiddenClassEvent(
      this.EVENT_TYPES.CLICK,
      this.DOM_SELECTORS.NAV_BAR_MENU_TOGGLE_BUTTON_ID,
      this.DOM_SELECTORS.NAV_BAR_CONTENT_CONTAINER_ID);
  }

  /**
   * @brief Initializes sub-menu toggle buttons with event listeners, to
   * open or close functionality if they have a sub menu related.
   */
  #initializeSubmenuButtons() {
    const navListButtons = document.getElementsByClassName(this.DOM_SELECTORS.NAV_BAR_BUTTON_CLASS_NAME);
    for (const button of navListButtons) {
      const receiverElementId = this.#getSubmenuReceiverElementId(button.id);
      if (receiverElementId) {
        this.addToggleHiddenClassEvent(this.EVENT_TYPES.CLICK, button.id, receiverElementId);
      }
    }
  }
  
  /**
   * @brief Gets the related sub-menu if it exists. 
   * 
   * @param {string} actionerElementId Actioner element id.
   * @returns Receiver element id related to actioner,
   * or null if there is no corresponding value.
   */
  #getSubmenuReceiverElementId(actionerElementId) {
    return this.#submenuMap[actionerElementId] || null;
  }

  /**
   * @brief Initializes change language buttons to event listeners,
   * that update the language translation in the website.
   */
  #initializeChangeLanguageButtons() {
    const changeLanguageButtons = document.getElementsByClassName(this.DOM_SELECTORS.CHANGE_PAGE_LANGUAGE_BUTTON_CLASS_NAME);
    for (const button of changeLanguageButtons) {
      const languageSpecification = this.#getLanguageSpecification(button.id);
      if (languageSpecification) {
        const rootElement = document.documentElement;
        this.addAttributeSettingEvent(
          this.EVENT_TYPES.CLICK,
          languageManager.HTML_LANGUAGE_TRANSLATION_ATTRIBUTE,
          languageSpecification,
          button.id,
          rootElement.id);

        const updateLanguageCallback = () => languageManager.updateLanguageTranslations(languageSpecification);
        this.addCallbacksEvent(this.EVENT_TYPES.CLICK, button.id, updateLanguageCallback);
      }
    }
  }
  
  /**
   * @brief Gets the related language specification if it exists. 
   * 
   * @param {string} actionerElementId Actioner element id.
   * @returns Language specification related to actioner,
   * or null if there is no corresponding value.
   */
  #getLanguageSpecification(actionerElementId) {
    return this.#languageMap[actionerElementId] || null;
  }

  #initializeChangePageColorThemeButtons() {
    const changeThemeButtons = document.getElementsByClassName(this.DOM_SELECTORS.CHANGE_THEME_BUTTON_CLASS_NAME);

    for (const button of changeThemeButtons) {
      const selectedTheme = this.#getPageColorTheme(button.id);

      if (selectedTheme) {
        const rootElement = document.documentElement;
        this.addAttributeSettingEvent(
          this.EVENT_TYPES.CLICK,
          this.DOM_SELECTORS.PAGE_THEME_ATTRIBUTE_NAME,
          selectedTheme,
          button.id,
          rootElement.id);
      }
    }
  }

  /**
   * @brief Gets the related language specification if it exists. 
   * 
   * @param {string} actionerElementId Actioner element id.
   * @returns Language specification related to actioner,
   * or null if there is no corresponding value.
   */
  #getPageColorTheme(actionerElementId) {
    return this.#colorThemeMap[actionerElementId] || null;
  }
}

const navBarMenuListenerManager = new NavBarMenuListenerManager();

export default navBarMenuListenerManager;