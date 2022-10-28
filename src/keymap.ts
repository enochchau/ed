import { keymap as keymapPlugin } from "prosemirror-keymap";
import { redo, undo } from "prosemirror-history";
import {
  chainCommands,
  deleteSelection,
  joinForward,
  selectAll,
  splitBlock,
} from "prosemirror-commands";
import { insertNewline } from "./commands/insertNewline";
import { resetEmptyBlock } from "./commands/resetEmptyBlock";
import { deleteEmptyBlock } from "./commands/deleteEmptyBlock";

export const keymap = keymapPlugin({
  "Mod-z": undo,
  "Mod-y": redo,
  Enter: splitBlock,
  Backspace: chainCommands(
    deleteSelection,
    joinForward,
    resetEmptyBlock,
    deleteEmptyBlock
  ),
  "Shift-Enter": insertNewline,
  "Mod-a": selectAll,
});
