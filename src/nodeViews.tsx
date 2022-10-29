import { EditorProps } from "prosemirror-view";
import { Divider } from "./components/Divider";
import { Heading } from "./components/Heading";
import { Paragraph } from "./components/Paragraph";
import { createSolidNodeView } from "./solidNodeView";

export const nodeViews: EditorProps["nodeViews"] = {
  paragraph: createSolidNodeView(Paragraph),
  divider: createSolidNodeView(Divider),
  heading: createSolidNodeView(Heading),
};
