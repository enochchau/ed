import { Component } from "solid-js";
import { SolidNodeViewProps } from "../solidNodeView";

export const Divider: Component<SolidNodeViewProps<HTMLHRElement>> = (
  props
) => {
  return <hr ref={props.ref} />;
};
