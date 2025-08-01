/// Copyright 2025 Jason Montenegro <jasonmontenegro49@gmail.com>

import * as DOM_SELECTORS from "./selectors.js";

/**
 * EventsListener
 * 
 * @brief Class reponsible for adding event listeners to objects, using IDs.
 */
export default class EventsListener {
  static EVENT_TYPES = Object.freeze({
    CLICK: "click"
  });

  /**
   * @brief Empty constructor.
   */
  constructor() { }

  /**
   * @brief Accesor to DOM selectors.
   * 
   * @returns DOM selectors.
   */
  get EVENT_TYPES() {
    return EventsListener.EVENT_TYPES;
  }

  /**
   * @brief Adds event listener to a unique actioner element, 
   * which will toggle hidden CSS class to another receiver element.
   * 
   * @param {string} eventType Event listener type.
   * @param {string} actionerElementId Actioner element CSS id.
   * @param {string} receiverElementId Receiver element CSS id.
   */
  static addToggleHiddenClassEvent(eventType, actionerElementId, receiverElementId) {
    if (EventsListener.validStringArguments(eventType, actionerElementId, receiverElementId)) {
      const actionerElement = document.getElementById(actionerElementId);
      const receiverElement = document.getElementById(receiverElementId);
      actionerElement.addEventListener(eventType, () => {
        receiverElement.classList.toggle(DOM_SELECTORS.HIDDEN_STYLE_CLASS_NAME);
      });
    }
  }

  /**
  * @brief Adds event listener to a unique actioner element, 
  * which will set an attribute to another receiver element.
  * 
  * @param {string} eventType Event listener type.
  * @param {string} attributeName Valid HTML attribute key name.
  * @param {string} attributeValue HTML attribute key value.
  * @param {string} actionerElementId Actioner element CSS id.
  * @param {string} receiverElementId Receiver element CSS id.
  */
  static addAttributeSettingEvent(eventType, attributeName, attributeValue, actionerElementId, receiverElementId) {
    if (EventsListener.validStringArguments(eventType, actionerElementId, receiverElementId, attributeName, attributeValue)) {
      const actionerElement = document.getElementById(actionerElementId);
      const receiverElement = document.getElementById(receiverElementId);
      actionerElement.addEventListener(eventType, () => {
        receiverElement.setAttribute(attributeName, attributeValue);
      });
    }
  }

  /**
   * @brief Adds event listener to a unique actioner element, 
   * which will trigger a list of callbacks in the order they are
   * set in the argument list.
   * 
   * @param {string} eventType Event listener type.
   * @param {string} actionerElementId Actioner element CSS id.
   * @param {callbacks} callbacks Function callbacks to execute during the event.
   */
  static addCallbacksEvent(eventType, actionerElementId, ...callbacks) {
    if (EventsListener.validStringArguments(eventType, actionerElementId)) {
      const actionerElement = document.getElementById(actionerElementId);
      actionerElement.addEventListener(eventType, () => {
        for (const call of callbacks) {
          call();
        }
      });
    }
  }

  /**
   * @brief Checks if the arguments are of string type and are not empty.
   * 
   * @param  {...string} stringArgs String arguments to check.
   */
  static validStringArguments(...stringArgs) {
    let result = true;
    for (const arg of stringArgs) {
      if (typeof(arg) !== "string" || arg.length === 0) {
        result = false;
        break;
      }
    }
    return result;
  }
}