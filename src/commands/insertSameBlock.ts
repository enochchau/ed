import { Command } from "prosemirror-state";
import { Node } from "prosemirror-model";
import { TextSelection } from "prosemirror-state";

export const insertSameBlock: Command = (state, dispatch) => {
  let block: Node | null = null;
  let pos = state.selection.from;
  for (; pos >= 0 && block?.type !== state.schema.nodes.block; pos--) {
    block = state.doc.nodeAt(pos);
  }

  if (!block) return false;

  let blockChild = block.firstChild;

  if (!blockChild) return false;

  let newBlock = state.schema.nodes.block.create(null, [
    state.schema.node(blockChild.type),
  ]);

  let tr = state.tr.insert(pos + block.nodeSize, newBlock);
  tr = tr.setSelection(
    TextSelection.near(tr.doc.resolve(pos + block.nodeSize))
  );
  dispatch?.(tr);
  return true;
};
