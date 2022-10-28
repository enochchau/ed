import { NodeSpec, Schema } from "prosemirror-model";

let doc: NodeSpec = {
  content: "block+",
};

let paragraph: NodeSpec = {
  group: "block",
  whitespace: "pre",
  content: "text*",
  toDOM() {
    return ["p", 0];
  },
  parseDOM: [{ tag: "p" }],
};

let text: NodeSpec = {
  inline: true,
};

let divider: NodeSpec = {
  group: "block",
  toDOM() {
    return ["hr"];
  },
  parseDOM: [{ tag: "hr" }],
};

let heading: NodeSpec = {
  group: "block",
  content: "text*",
  attrs: {
    size: { default: 1 },
  },
  toDOM(node) {
    let tag = "h" + node.attrs.size;

    return [tag, 0];
  },
  parseDOM: [{ tag: "h1" }, { tag: "h2" }, { tag: "h3" }],
};

export const schema = new Schema({
  nodes: {
    doc,
    paragraph,
    text,
    divider,
    heading
  },
});
