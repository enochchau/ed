import {
  chainCommands,
  deleteSelection,
  joinForward,
  selectAll,
  splitBlock,
} from "prosemirror-commands";
import { insertNewline } from "../commands/insertNewline";
import { resetEmptyBlock } from "../commands/resetEmptyBlock";
import { deleteEmptyBlock } from "../commands/deleteEmptyBlock";
import { BasicPlugin } from "../plugin";

export const keymapPlugin = new BasicPlugin({
  name: 'keymap',
  keymap: {
    Enter: splitBlock,
    Backspace: chainCommands(
      deleteSelection,
      joinForward,
      resetEmptyBlock,
      deleteEmptyBlock
    ),
    "Shift-Enter": insertNewline,
    "Mod-a": selectAll,
  },
});
