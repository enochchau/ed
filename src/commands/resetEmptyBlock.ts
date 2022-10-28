import { Command } from "prosemirror-state";
import { findClosestParent } from "../helpers/findClosestParent";

export const resetEmptyBlock: Command = (state, dispatch) => {
  let block = findClosestParent(
    state.doc,
    state.selection.from,
    (node) => node.isBlock
  );

  if (
    block.node &&
    block.node.type !== state.schema.nodes.paragraph &&
    block.node.content.size === 0
  ) {
    let tr = state.tr.replaceWith(
      block.pos,
      block.pos + block.node.nodeSize,
      state.schema.nodes.paragraph.create()
    );
    dispatch?.(tr);
    return true;
  }
  return false;
};
