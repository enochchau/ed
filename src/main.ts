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

let appRoot = document.querySelector<HTMLDivElement>("#app")!;
appRoot.classList.add("ed-page")

const state = EditorState.create({
  doc: schema.node("doc", null, [schema.node("paragraph")]),
  plugins: [history(), keymap, inputRules],
});

const view = new EditorView(appRoot, {
  state,
  nodeViews,
});

if (import.meta.env.DEV) {
  applyDevTools(view);
}
