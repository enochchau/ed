import { NodeView, NodeViewConstructor } from "prosemirror-view";
import { Component } from "solid-js";
import { rendererStore } from "./rendererStore";

export type StyleDOMNode = (node: HTMLDivElement) => void;

type ConstructorParams = Parameters<NodeViewConstructor>;

export interface SolidNodeViewProps<El extends HTMLElement> {
  node: Parameters<NodeViewConstructor>[0];
  view: Parameters<NodeViewConstructor>[1];
  getPos: Parameters<NodeViewConstructor>[2];
  decorations: Parameters<NodeViewConstructor>[3];
  innerDecorations: Parameters<NodeViewConstructor>[4];
  ref?: El;
}

export class SolidNodeView<ContentElement extends HTMLElement = HTMLElement>
  implements NodeView
{
  dom: HTMLDivElement;
  contentDOM?: ContentElement;
  id: string;

  constructor(
    C: Component<SolidNodeViewProps<ContentElement>>,
    styleDOMNode?: StyleDOMNode,
    ...args: ConstructorParams
  ) {
    let [node, view, getPos, decorations, innerDecorations] = args;
    this.id = Math.floor(Math.random() * 0xffffffff).toString();

    this.dom = document.createElement("div");
    styleDOMNode?.(this.dom);

    rendererStore.addRenderer(this.id, {
      element: (
        <C
          node={node}
          view={view}
          getPos={getPos}
          decorations={decorations}
          innerDecorations={innerDecorations}
          ref={this.contentDOM}
        />
      ),
      dom: this.dom,
    });
  }

  destroy() {
    rendererStore.deleteRenderer(this.id);
  }
}

export const createSolidNodeView =
  <El extends HTMLElement>(
    C: Component<SolidNodeViewProps<El>>,
    styleDOMNode?: StyleDOMNode
  ) =>
  (...args: Parameters<NodeViewConstructor>) =>
    new SolidNodeView(C, styleDOMNode, ...args);
