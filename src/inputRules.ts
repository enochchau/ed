import {
  InputRule,
  inputRules as inputRulesPlugin,
} from "prosemirror-inputrules";

let divider: InputRule = new InputRule(
  /^--- $/,
  (state, _match, start, end) => {
    return state.tr
      .split(end)
      .replaceRangeWith(start, end, state.schema.nodes.divider.create());
  }
);

let heading: InputRule = new InputRule(
  /^#{1,3} $/,
  (state, match, start, end) => {
    let size = match[0].length - 1;
    return state.tr.replaceRangeWith(
      start,
      end,
      state.schema.nodes.heading.create({ size })
    );
  }
);

export const inputRules = inputRulesPlugin({
  rules: [divider, heading],
});
