import { NodePlugin } from "../plugin";

export const docPlugin = new NodePlugin({
  name: "doc",
  nodeSpec: {
    content: "block+",
  },
});
