import "./styles.scss";
import { EditorState } from "prosemirror-state";
import "prosemirror-view/style/prosemirror.css";
import { history } from "prosemirror-history";
import { EditorView } from "prosemirror-view";
import applyDevTools from "prosemirror-dev-tools";
import { schema } from "./schema";
import { keymap } from "./keymap";
import { inputRules } from "./inputRules";
import { nodeViews } from "./nodeViews";
import { render } from "solid-js/web";
import { onMount } from "solid-js";

let appRoot = document.getElementById("app")! as HTMLDivElement;

function Editor() {
  let editorViewEl: HTMLDivElement;

  onMount(() => {
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
  });

  return (
    <div
      class="ed-page"
      // @ts-ignore
      ref={editorViewEl}
    ></div>
  );
}

render(() => <Editor />, appRoot);
