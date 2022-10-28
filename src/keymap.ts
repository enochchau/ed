import { keymap as keymapPlugin } from "prosemirror-keymap";
import { redo, undo } from "prosemirror-history";
import { deleteSelection, selectAll } from "prosemirror-commands";
import { insertSameBlock } from "./commands/insertSameBlock";
import { insertNewline } from "./commands/insertNewline";

export const keymap = keymapPlugin({
  "Mod-z": undo,
  "Mod-y": redo,
  Enter: insertSameBlock,
  Backspace: deleteSelection,
  "Shift-Enter": insertNewline,
  "Mod-a": selectAll,
});
