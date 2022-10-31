import { Paragraph } from "../components/Paragraph";
import { NodePlugin } from "../plugin";
import { createSolidNodeView } from "../solidNodeView";

export const paragraphPlugin = new NodePlugin({
  name: "paragraph",
  nodeSpec: {
    group: "block",
    whitespace: "pre",
    content: "text*",
    toDOM() {
      return ["p", 0];
    },
    parseDOM: [{ tag: "p" }],
  },
  nodeView: createSolidNodeView(Paragraph)
});
