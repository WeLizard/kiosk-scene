import { bootstrapSceneShellApp } from "@kiosk-scene/shell-browser";
import "@kiosk-scene/shell-browser/styles";

const root = document.getElementById("app");
if (!root) {
  throw new Error("Missing #app root element");
}

void bootstrapSceneShellApp(root);
