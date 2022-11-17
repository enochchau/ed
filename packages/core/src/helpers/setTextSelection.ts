import { TextSelection, Transaction } from "prosemirror-state";

export const setTextSelection = (tr: Transaction, pos: number) =>
  tr.setSelection(TextSelection.near(tr.doc.resolve(pos)));
