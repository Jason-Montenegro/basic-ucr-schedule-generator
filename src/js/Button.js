/// Copyright 2025 Jason Montenegro <jasonmontenegro49@gmail.com>

/**
 * Button
 * 
 * @brief Abstract class for buttons.
 */
export default class Button {
  #id

  /**
   * @brief Initializes id.
   * 
   * @param {string} id CSS ID attribute.
   */
  constructor(id) {
    if (new.target == Button) {
      throw Error("Button class is abstract. Which does not allow instantiation");
    }
    this.#id = id;
  }

  /**
   * @brief Gets id attribute.
   */
  get id() {
    return this.#id;
  }

  /**
   * @brief Sets id attribute.
   * @param {string} id CSS ID attribute.
   */
  set id(id) {
    if (typeof(id) === "string") {
      this.#id = id;
    }
  }
}