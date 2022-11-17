import { DOMParser as PMDOMParser, Node, Schema } from "prosemirror-model";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { BasicPlugin, MarkPlugin, NodePlugin } from "./plugin";
import { PluginManager } from "./pluginManager";

function parseHTMLStringToPMNode(schema: Schema, content: string) {
  let domParser = PMDOMParser.fromSchema(schema);
  let dom = new DOMParser().parseFromString(content, "text/html");
  return domParser.parse(dom);
}

export interface EditorConstructorParams {
  plugins: (NodePlugin | BasicPlugin | MarkPlugin)[];
  content: string | ((schema: Schema) => Node) | Record<string, any>;
  bindingElement: HTMLElement;
  onDragEnd?: () => void;
}

export class Editor {
  state: EditorState;
  view: EditorView;
  schema: Schema;
  pluginManager: PluginManager;
  onDragEnd?: () => void;

  constructor({
    plugins,
    bindingElement,
    content,
    onDragEnd,
  }: EditorConstructorParams) {
    this.onDragEnd = onDragEnd;
    this.pluginManager = new PluginManager(plugins);
    this.schema = new Schema({
      nodes: this.pluginManager.nodes,
      marks: this.pluginManager.marks,
    });

    const editorConfig = {
      schema: this.schema,
      plugins: [
        this.pluginManager.keymapPlugin,
        this.pluginManager.inputRulePlugin,
        ...this.pluginManager.prosemirrorPlugins,
      ],
    };

    // create state
    if (typeof content === "string") {
      // parse string to doc

      this.state = EditorState.create({
        doc: parseHTMLStringToPMNode(this.schema, content),
        ...editorConfig,
      });
    } else if (typeof content === "function") {
      // do nothing
      let doc = content(this.schema);
      this.state = EditorState.create({ doc, ...editorConfig });
    } else {
      this.state = EditorState.fromJSON(editorConfig, content);
    }

    // create view
    this.view = new EditorView(bindingElement, {
      state: this.state,
      nodeViews: this.pluginManager.nodeViews,
    });
  }
}
