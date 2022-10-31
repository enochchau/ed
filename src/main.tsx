import "./styles.scss";
import "prosemirror-view/style/prosemirror.css";
import applyDevTools from "prosemirror-dev-tools";
import { Component } from "solid-js";
import { DevtoolsOverlay } from "@solid-devtools/overlay";
import { render } from "solid-js/web";
import { schema } from "./schema";
import { EditorContent } from "./EditorContent";
import { keymapPlugin } from "./plugins/keymap";
import { inputRulesPlugin } from "./plugins/inputRules";
import { Editor } from "./editor";

let appRoot = document.getElementById("app")! as HTMLDivElement;

const App: Component = () => {
  return (
    <EditorContent
      class="ed-page"
      ref={(editorViewEl) => {
        let editor = new Editor({
          plugins: [keymapPlugin, inputRulesPlugin],
          content: schema.node("doc", null, [schema.node("paragraph")]),
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
