import "./styles.scss";
import "prosemirror-view/style/prosemirror.css";
import applyDevTools from "prosemirror-dev-tools";
import { Component, createEffect, createSignal, onMount } from "solid-js";
import { DevtoolsOverlay } from "@solid-devtools/overlay";
import { render } from "solid-js/web";
import { EditorContent } from "./EditorContent";
import { keymapPlugin } from "./plugins/keymap";
import { Editor, EditorConstructorParams } from "./editor";
import { historyPlugin } from "./plugins/history";
import { docPlugin } from "./plugins/doc";
import { paragraphPlugin } from "./plugins/paragraph";
import { textPlugin } from "./plugins/text";
import { headingPlugin } from "./plugins/heading";
import { dividerPlugin } from "./plugins/divider";

let appRoot = document.getElementById("app")! as HTMLDivElement;

const App: Component = () => {
  let editorRef: HTMLDivElement;
  let [editor, setEditor] = createSignal<null | Editor>();

  onMount(() => {
    let ed = new Editor({
      plugins: [
        keymapPlugin,
        historyPlugin,
        docPlugin,
        paragraphPlugin,
        textPlugin,
        headingPlugin,
        dividerPlugin,
      ],
      content: (schema) => schema.node("doc", null, [schema.node("paragraph")]),
      bindingElement: editorRef,
    });
    setEditor(ed);
  });

  createEffect(() => {
    let ed = editor();
    if (ed) {
      applyDevTools(ed.view);
    }
  });

  return (
    <EditorContent
      class="ed-page"
      // @ts-ignore
      ref={editorRef}
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
