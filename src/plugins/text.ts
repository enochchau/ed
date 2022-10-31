import { NodePlugin } from "../plugin";

export const textPlugin = new NodePlugin({
  name: "text",
  nodeSpec: { inline: true },
});
