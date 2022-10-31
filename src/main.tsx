import "./styles.scss";
import "prosemirror-view/style/prosemirror.css";
import applyDevTools from "prosemirror-dev-tools";
import { Component } from "solid-js";
import { DevtoolsOverlay } from "@solid-devtools/overlay";
import { render } from "solid-js/web";
import { EditorContent } from "./EditorContent";
import { keymapPlugin } from "./plugins/keymap";
import { Editor } from "./editor";
import { historyPlugin } from "./plugins/history";
import { docPlugin } from "./plugins/doc";
import { paragraphPlugin } from "./plugins/paragraph";
import { textPlugin } from "./plugins/text";
import { headingPlugin } from "./plugins/heading";
import { dividerPlugin } from "./plugins/divider";

let appRoot = document.getElementById("app")! as HTMLDivElement;

const App: Component = () => {
  return (
    <EditorContent
      class="ed-page"
      ref={(editorViewEl) => {
        let editor = new Editor({
          plugins: [
            keymapPlugin,
            historyPlugin,
            docPlugin,
            paragraphPlugin,
            textPlugin,
            headingPlugin,
            dividerPlugin,
          ],
          content: (schema) =>
            schema.node("doc", null, [schema.node("paragraph")]),
          bindingElement: editorViewEl,
        });

        if (import.meta.env.DEV) {
          applyDevTools(editor.view);
        }
      }}
    />
  );
};

render(
  () =>
    import.meta.env.PROD ? (
      <App />
    ) : (
      <>
        <App />
        <DevtoolsOverlay />
      </>
    ),
  appRoot
);
