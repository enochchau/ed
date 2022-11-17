import { Command } from "prosemirror-state";
import { findClosestParent } from "../helpers/findClosestParent";

export const deleteEmptyBlock: Command = (state, dispatch) => {
  let block = findClosestParent(
    state.doc,
    state.selection.from,
    (node) => node.isBlock
  );

  if (block.node && block.node.content.size === 0) {
    dispatch?.(state.tr.delete(block.pos, block.pos + block.node.nodeSize));
    return true;
  }

  return false;
};
