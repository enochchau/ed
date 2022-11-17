import { Component, Match, Switch } from "solid-js";
import { SolidNodeViewProps } from "../solidNodeView";

export const Heading: Component<SolidNodeViewProps<HTMLHeadingElement>> = (
  props
) => {
  return (
    <Switch>
      <Match when={props.node.attrs.size === 1}>
        <h1 ref={props.ref} />
      </Match>
      <Match when={props.node.attrs.size === 2}>
        <h2 ref={props.ref} />
      </Match>
      <Match when={props.node.attrs.size === 3}>
        <h3 ref={props.ref} />
      </Match>
    </Switch>
  );
};
