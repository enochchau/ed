import { InputRule } from "prosemirror-inputrules";
import { MarkSpec, NodeSpec } from "prosemirror-model";
import { Command, Plugin } from "prosemirror-state";
import { NodeViewConstructor } from "prosemirror-view";

export interface BasicPluginConstructorParams {
  // similar to prosemirror plugin key
  name: string;
  keymap?: { [key: string]: Command };
  inputRules?: InputRule[];
  prosemirrorPlugin?: Plugin;
}

export class BasicPlugin {
  keymap?: { [key: string]: Command };
  inputRules?: InputRule[];
  name: string;
  prosemirrorPlugin?: Plugin;

  constructor({
    keymap,
    inputRules,
    name,
    prosemirrorPlugin
  }: BasicPluginConstructorParams) {
    this.keymap = keymap;
    this.inputRules = inputRules;
    this.name = name;
    this.prosemirrorPlugin = prosemirrorPlugin;
  }
}

export interface NodePluginConstructorParams
  extends BasicPluginConstructorParams {
  nodeSpec: NodeSpec;
  nodeView?: NodeViewConstructor;
}

export class NodePlugin extends BasicPlugin {
  nodeSpec: NodeSpec;
  nodeView?: NodeViewConstructor

  constructor(params: NodePluginConstructorParams) {
    super(params);
    this.nodeSpec = params.nodeSpec;
    this.nodeView = params.nodeView;
  }
}

export interface MarkPluginConstructorParams
  extends BasicPluginConstructorParams {
  markSpec: MarkSpec;
}

export class MarkPlugin extends BasicPlugin {
  markSpec: MarkSpec;
  constructor(params: MarkPluginConstructorParams) {
    super(params);
    this.markSpec = params.markSpec;
  }
}
