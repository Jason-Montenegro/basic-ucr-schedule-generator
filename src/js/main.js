/// Copyright 2025 Jason Montenegro <jasonmontenegro49@gmail.com>

import navBar from "./NavBar.js";
import languageManager from "./siteLanguages/languageManager.js";

document.addEventListener('DOMContentLoaded', () => {
  languageManager.updateLanguageTranslations();
});