import "./styles.scss";
import "prosemirror-view/style/prosemirror.css";
import applyDevTools from "prosemirror-dev-tools";
import { Component } from "solid-js";
import { DevtoolsOverlay } from "@solid-devtools/overlay";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { history } from "prosemirror-history";
import { nodeViews } from "./nodeViews";
import { render } from "solid-js/web";
import { schema } from "./schema";
import { EditorContent } from "./EditorContent";
import { PluginManager } from "./pluginManager";
import { keymapPlugin } from "./plugins/keymap";
import { keymap } from "prosemirror-keymap";
import { inputRules } from "prosemirror-inputrules";
import { inputRulesPlugin } from "./plugins/inputRules";

let appRoot = document.getElementById("app")! as HTMLDivElement;

const App: Component = () => {
  return (
    <EditorContent
      class="ed-page"
      ref={(editorViewEl) => {
        const pluginManager = new PluginManager([
          keymapPlugin,
          inputRulesPlugin,
        ]);

        const state = EditorState.create({
          doc: schema.node("doc", null, [schema.node("paragraph")]),
          schema,
          plugins: [
            history(),
            keymap(pluginManager.keymap),
            inputRules({ rules: pluginManager.inputRules }),
          ],
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
