/// Copyright 2025 Jason Montenegro <jasonmontenegro49@gmail.com>

import * as SELECTORS from "../selectors.js";

/**
 * ListenerManager
 * 
 * @brief Abstract class that defines an interface for subclasses that manage event listeners. 
 */
export default class ListenerManager {
  static #DOM_SELECTORS = SELECTORS;
  static #EVENT_TYPES = Object.freeze({
    CLICK: "click"
  });

    /**
   * @brief Abstract constructor. Shall not be invoked.
   * 
   * @throws Error due to being a virtual constructor.
   */
  constructor() {
    if (new.target === ListenerManager) {
      throw new Error("ListenerManager is an abstract class and cannot be instantiated directly.");
    }
  }

  /**
   * @brief Accesor to DOM selectors.
   * 
   * @returns DOM selectors.
   */
  get DOM_SELECTORS() {
    return ListenerManager.#DOM_SELECTORS;
  }

  /**
   * @brief Accesor to DOM selectors.
   * 
   * @returns DOM selectors.
   */
  get EVENT_TYPES() {
    return ListenerManager.#EVENT_TYPES;
  }

  /**
   * @brief Abstract method. Shall not be invoked
   * Implementations should initialize event listeners for DOM elements.
   * 
   * @throws Error due to being a virtual method.
   */
  initializeListeners() {
    throw new Error("initializeListeners is a pure virtual method, and should be implemented in all subclasses.");
  }

  /**
   * @brief Adds event listener to a unique actioner element, 
   * which will toggle hidden CSS class to another receiver element.
   * 
   * @param {string} eventType Event listener type.
   * @param {string} actionerElementId Actioner element CSS id.
   * @param {string} receiverElementId Receiver element CSS id.
   */
  addToggleHiddenClassEvent(eventType, actionerElementId, receiverElementId) {
    if (typeof(eventType) === "string" && typeof(actionerElementId) === "string" && typeof(receiverElementId) === "string") {
      const actionerElement = document.getElementById(actionerElementId);
      const receiverElement = document.getElementById(receiverElementId);
      actionerElement.addEventListener(eventType, () => {
        receiverElement.classList.toggle(this.DOM_SELECTORS.HIDDEN_STYLE_CLASS_NAME);
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
  addAttributeSettingEvent(eventType, attributeName, attributeValue, actionerElementId, receiverElementId) {
    if (typeof(eventType) === "string"
      && typeof(actionerElementId) === "string"
      && typeof(receiverElementId) === "string"
      && typeof(attributeName) == "string"
      && typeof(attributeValue) === "string") {
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
  addCallbacksEvent(eventType, actionerElementId, ...callbacks) {
    if (typeof(eventType) === "string" && typeof(actionerElementId) === "string") {
      const actionerElement = document.getElementById(actionerElementId);
      actionerElement.addEventListener(eventType, () => {
        for (const call of callbacks) {
          call();
        }
      });
    }
  }
}