import { Node } from "prosemirror-model";

type Predicate = (node: Node) => boolean;

export const findClosestParent = (
  doc: Node,
  pos: number,
  predicate: Predicate
) => {
  let node = doc.nodeAt(pos);
  while (pos > -1 && !(node && predicate(node))) {
    pos -= 1;
    node = doc.nodeAt(pos);
  }

  return { node, pos };
};
