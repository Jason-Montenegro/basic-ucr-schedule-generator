/// Copyright 2025 Jason Montenegro <jasonmontenegro49@gmail.com>

import navBarMenuListerManager from "./NavBarMenuListenerManager.js";

const listenerManagers = [
  navBarMenuListerManager
];

export default function initializeSiteListeners() {
  for (const manager of listenerManagers) {
    manager.initializeListeners();
  }
}