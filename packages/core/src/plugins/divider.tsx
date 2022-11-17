import { InputRule } from "prosemirror-inputrules";
import { Component } from "solid-js";
import { NodePlugin } from "../plugin";
import { createSolidNodeView, SolidNodeViewProps } from "../solidNodeView";

const Divider: Component<SolidNodeViewProps<HTMLHRElement>> = (props) => {
  return <hr ref={props.ref} data-id={props.id} />;
};

export const dividerPlugin = new NodePlugin({
  name: "divider",
  nodeSpec: {
    group: "block",
    toDOM() {
      return ["hr"];
    },
    parseDOM: [{ tag: "hr" }],
  },
  inputRules: [
    new InputRule(/^--- $/, (state, _match, start, end) => {
      return state.tr
        .split(end)
        .replaceRangeWith(start, end, state.schema.nodes.divider.create());
    }),
  ],
  nodeView: createSolidNodeView(Divider),
});
