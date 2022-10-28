import { Command } from "prosemirror-state";

export const insertNewline: Command = (state, dispatch) => {
  dispatch?.(
    state.tr.insertText("\n", state.selection.from, state.selection.to)
  );
  return true;
};

