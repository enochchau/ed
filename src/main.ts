import { EditorState } from "prosemirror-state";
import "prosemirror-view/style/prosemirror.css";
import { history } from "prosemirror-history";
import { EditorView } from "prosemirror-view";
import applyDevTools from "prosemirror-dev-tools";
import { schema } from "./schema";
import { keymap } from "./keymap";

let appRoot = document.querySelector<HTMLDivElement>("#app")!;

const view = new EditorView(appRoot, {
  state: EditorState.create({
    doc: schema.node("doc", null, [
      schema.node("block", null, [schema.node("paragraph")]),
    ]),
    plugins: [
      history(),
      keymap
    ],
  }),
});

if (import.meta.env.DEV) {
  applyDevTools(view);
}
