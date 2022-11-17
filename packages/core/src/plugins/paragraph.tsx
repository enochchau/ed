import { Component } from "solid-js";
import { SolidNodeViewProps } from "../solidNodeView";
import { NodePlugin } from "../plugin";
import { createSolidNodeView } from "../solidNodeView";
import { createDraggable, createDroppable } from '@thisbeyond/solid-dnd'

const Paragraph: Component<SolidNodeViewProps<HTMLParagraphElement>> = (
  props
) => {
  const draggable = createDraggable(props.id)
  const droppable = createDroppable(props.id)

  return <p ref={props.ref} use:draggable use:droppable/>;
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
