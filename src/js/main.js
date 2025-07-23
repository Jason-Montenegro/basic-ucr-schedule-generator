const navListContentBtn = document.getElementById("nav-list-content-toggle-btn");

navListContentBtn.addEventListener("click", () => {
  const navListContent = document.getElementById("nav-list-content");
  navListContent.classList.toggle("hidden");
})

const saveScheduleSubmenuBtn = document.getElementById("save-schedule-submenu-toggle-btn");

saveScheduleSubmenuBtn.addEventListener("click", () => {
  const saveScheduleAsFileSubmenu = document.getElementById("save-schedule-as-file-submenu");
  saveScheduleAsFileSubmenu.classList.toggle('hidden');
})

const pageThemeSelectorBtn = document.getElementById("page-theme-selector-container-toggle-btn");

pageThemeSelectorBtn.addEventListener("click", () => {
  const pageThemeSelectorContainer = document.getElementById("page-theme-selector-container");
  pageThemeSelectorContainer.classList.toggle("hidden");
});

const pageLanguageSelectorBtn = document.getElementById("page-language-selector-container-toggle-btn");

pageLanguageSelectorBtn.addEventListener("click", () => {
  const pageLanguageSelectorContainer = document.getElementById("page-language-selector-container");
  pageLanguageSelectorContainer.classList.toggle("hidden");
})

const languageSelectors = document.querySelectorAll(".theme-selector");

const rootElement = document.querySelector("html");


languageSelectors.forEach(button => {
  button.addEventListener("click", () => {
    const selectedTheme = button.value;
    rootElement.setAttribute("data-theme", selectedTheme);
  });
});

const howToUseRegexBtn = document.getElementById("how-to-use-regex-submenu")

howToUseRegexBtn.addEventListener("click", () => {
  const howToUseRegexContainer = document.getElementById("how-to-use-regex-container");
  howToUseRegexContainer.classList.toggle("hidden");
  navListContentBtn.click();
})

const closeHowToUseRegexTn = document.getElementById("how-to-use-regex-close-btn");

closeHowToUseRegexTn.addEventListener("click", () => {
  const howToUseRegexContent = document.getElementById("how-to-use-regex-container");
  howToUseRegexContent.classList.toggle("hidden")
})