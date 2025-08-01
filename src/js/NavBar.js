/// Copyright 2025 Jason Montenegro <jasonmontenegro49@gmail.com>

import * as DOM_SELECTORS from "./selectors.js";
import * as behaviourInitializers from "./behaviours/index.js";
import EventsListener from "./EventsListener.js";
import SubmenuButton from "./SubmenuButton.js";

/**
 * NavBar
 * 
 * @brief Nav bar section which holds all buttons related.
 */
class NavBar {
  #navSubmenuTogglingButtons = [
    new SubmenuButton(DOM_SELECTORS.CHANGE_PAGE_THEME_SUBMENU_TOGGLE_BUTTON_ID, DOM_SELECTORS.CHANGE_PAGE_THEME_SUBMENU_ID),
    new SubmenuButton(DOM_SELECTORS.CHANGE_PAGE_LANGUAGE_SUBMENU_TOGGLE_BUTTON_ID, DOM_SELECTORS.CHANGE_PAGE_LANGUAGE_SUBMENU_ID),
    new SubmenuButton(DOM_SELECTORS.HOW_TO_USE_REGEX_CONTAINER_TOGGLE_BUTTON_ID, DOM_SELECTORS.HOW_TO_USE_REGEX_CONTAINER_ID),
    new SubmenuButton(DOM_SELECTORS.SAVE_SCHEDULE_SUBMENU_TOGGLE_BUTTON_ID, DOM_SELECTORS.SAVE_SCHEDULE_AS_FILE_SUBMENU_ID),
  ];

  /**
   * @brief Initializes all nav buttons and their submenu behaviours.
   */
  constructor() {
    NavBar.#initToggleBehaviourNavContainerButton();
    this.#initToggleBehaviourSubmenuButtons();
    behaviourInitializers.initChangeLanguageBtnBehaviours();
    behaviourInitializers.initChangeThemeBtnBehaviours();
    behaviourInitializers.initHowToUseRegexContainerBehaviours();
  }

  /**
   * @brief Initializes nav bar main submenu toggle button with toggle behaviour.
   */
  static #initToggleBehaviourNavContainerButton() {
    EventsListener.addToggleHiddenClassEvent(
      EventsListener.EVENT_TYPES.CLICK,
      DOM_SELECTORS.NAV_BAR_MENU_TOGGLE_BUTTON_ID,
      DOM_SELECTORS.NAV_BAR_CONTENT_CONTAINER_ID
    );
  }

  /**
   * @brief Initializes submenu toggle buttons with toggle behaviour.
   */
  #initToggleBehaviourSubmenuButtons() {
    for (const button of this.#navSubmenuTogglingButtons) {
      EventsListener.addToggleHiddenClassEvent(
        EventsListener.EVENT_TYPES.CLICK,
        button.id,
        button.submenuContainerId
      );
    }
  }
}

const navBar = new NavBar();

export default navBar;