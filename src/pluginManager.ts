import { InputRule } from "prosemirror-inputrules";
import { MarkSpec, NodeSpec } from "prosemirror-model";
import { Command } from "prosemirror-state";
import { NodeViewConstructor } from "prosemirror-view";
import { BasicPlugin, MarkPlugin, NodePlugin } from "./plugin";

export class PluginManager {
  plugins: { [name: string]: NodePlugin | MarkPlugin | BasicPlugin } = {};

  nodes: { [name: string]: NodeSpec } = {};
  marks: { [name: string]: MarkSpec } = {};

  nodeViews: { [nodeViewName: string]: NodeViewConstructor } = {};
  inputRules: InputRule[] = [];
  keymap: { [key: string]: Command } = {};

  constructor(plugins: (NodePlugin | MarkPlugin | BasicPlugin)[]) {
    for (const plugin of plugins) {
      if (this.plugins[plugin.name]) {
        console.error(
          `Duplicate plugin name detected for '${plugin.name}' Plugin!`
        );
      }
      this.plugins[plugin.name] = plugin;

      // process node plugins
      if (plugin instanceof NodePlugin) {
        this.nodes[plugin.name] = plugin.nodeSpec;
        if (plugin.nodeView) {
          this.nodeViews[plugin.name] = plugin.nodeView;
        }
      } else if (plugin instanceof MarkPlugin) {
        // process mark plugins
        this.marks[plugin.name] = plugin.markSpec;
      }

      // process input rules
      if (plugin.inputRules) {
        this.inputRules.push(...plugin.inputRules);
      }

      // process keymaps
      if (plugin.keymap) {
        for (const key in plugin.keymap) {
          if (this.keymap[key]) {
            console.error(
              `Duplicate keymap detected for '${key}' in '${plugin.name}' Plugin!`
            );
          }
          this.keymap[key] = plugin.keymap[key];
        }
      }
    }
  }
}
