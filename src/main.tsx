import "./styles.scss";
import "prosemirror-view/style/prosemirror.css";
import applyDevTools from "prosemirror-dev-tools";
import { Component } from "solid-js";
import { DevtoolsOverlay } from "@solid-devtools/overlay";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { history } from "prosemirror-history";
import { inputRules } from "./inputRules";
import { keymap } from "./keymap";
import { nodeViews } from "./nodeViews";
import { render } from "solid-js/web";
import { schema } from "./schema";
import { EditorContent } from "./EditorContent";

let appRoot = document.getElementById("app")! as HTMLDivElement;


const App: Component = () => {
  return (
    <EditorContent
      class="ed-page"
      ref={(editorViewEl) => {
        const state = EditorState.create({
          doc: schema.node("doc", null, [schema.node("paragraph")]),
          plugins: [history(), keymap, inputRules],
        });

        const view = new EditorView(editorViewEl, {
          state,
          nodeViews,
        });

        if (import.meta.env.DEV) {
          applyDevTools(view);
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
