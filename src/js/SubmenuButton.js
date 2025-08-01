/// Copyright 2025 Jason Montenegro <jasonmontenegro49@gmail.com>

import Button from "./Button.js"

/**
 * SubmenuButton
 * 
 * @brief Button derivative for submenu buttons.
 */
export default class SubmenuButton extends Button {
  #submenuContainerId;

  /**
   * @brief Initializes submenuContainerId.
   * 
   * @param {string} id CSS ID attribute.
   * @param {string} submenuContainerId CSS ID attribute.
   */
  constructor(id, submenuContainerId) {
    super(id);
    this.#submenuContainerId = submenuContainerId;
  }


  /**
   * @brief Accesor to submenuContainerId attribute.
   * 
   * @returns submenuContainerId attribute.
   */
  get submenuContainerId() {
    return this.#submenuContainerId;
  }

  /**
   * @brief Mutator for submenuContainerId attribute.
   * 
   * @param {string} submenuContainerId CSS ID attribute.
   */
  set submenuContainerId(submenuContainerId) {
    if (typeof(submenuContainerId) === "string") {
      this.#submenuContainerId = submenuContainerId;
    }
  }
}