import { Component } from "solid-js";
import { SolidNodeViewProps } from "../solidNodeView";

export const Paragraph: Component<SolidNodeViewProps<HTMLParagraphElement>> = (
  props
) => {
  return <p ref={props.ref.dom} />;
};
