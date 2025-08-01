/// Copyright 2025 Jason Montenegro <jasonmontenegro49@gmail.com>

import * as DOM_SELECTORS from "../selectors.js";
import EventsListener from "../EventsListener.js";

/**
 * @brief Initializes the behaviours of how to use regex container.
 * - Adds behaviour to exit container button: closes the content container.
 */
export function initHowToUseRegexContainerBehaviours() {
  EventsListener.addToggleHiddenClassEvent(
    EventsListener.EVENT_TYPES.CLICK,
    DOM_SELECTORS.HOW_TO_USE_REGEX_CONTAINER_CLOSE_BUTTON_ID,
    DOM_SELECTORS.HOW_TO_USE_REGEX_CONTAINER_ID
  );
}