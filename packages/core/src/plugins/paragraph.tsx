import { Component } from "solid-js";
import { SolidNodeViewProps } from "../solidNodeView";
import { NodePlugin } from "../plugin";
import { createSolidNodeView } from "../solidNodeView";

const Paragraph: Component<SolidNodeViewProps<HTMLParagraphElement>> = (
  props
) => {
  return <p ref={props.ref} />;
};

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
  nodeView: createSolidNodeView(Paragraph),
});
