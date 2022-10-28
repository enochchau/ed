import { NodeSpec, Schema } from "prosemirror-model";
import { iStyle } from "./util/iStyle";

let doc: NodeSpec = {
  content: "block+",
};

let block: NodeSpec = {
  // blocks can only have one block child
  content: "(paragraph|block*)",
  draggable: true,
  toDOM() {
    return ["div", { style: iStyle({ display: "inline" }) }, 0];
  },
  parseDOM: [{ tag: "div" }],
};

let paragraph: NodeSpec = {
  whitespace: "pre",
  content: "text*",
  toDOM() {
    return ["p", 0];
  },
};

let text: NodeSpec = {
  inline: true,
};

export const schema = new Schema({
  nodes: {
    doc,
    block,
    paragraph,
    text,
  },
});
