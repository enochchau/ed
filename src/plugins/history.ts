import { history, redo, undo } from "prosemirror-history";
import { BasicPlugin } from "../plugin";

export const historyPlugin = new BasicPlugin({
  name: "history",
  prosemirrorPlugin: history(),
  keymap: {
    "Mod-z": undo,
    "Mod-y": redo,
  },
});
