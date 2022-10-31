import { InputRule } from "prosemirror-inputrules";
import { Divider } from "../components/Divider";
import { NodePlugin } from "../plugin";
import { createSolidNodeView } from "../solidNodeView";

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
