import { NodeView, NodeViewConstructor } from "prosemirror-view";
import { Component, JSXElement } from "solid-js";
import { rendererStore } from "./rendererStore";

export type StyleDOMNode = (node: HTMLDivElement) => void;

type ConstructorParams = Parameters<NodeViewConstructor>;

export interface SolidNodeViewProps<ContentDOM extends HTMLElement = any> {
  node: Parameters<NodeViewConstructor>[0];
  view: Parameters<NodeViewConstructor>[1];
  getPos: Parameters<NodeViewConstructor>[2];
  decorations: Parameters<NodeViewConstructor>[3];
  innerDecorations: Parameters<NodeViewConstructor>[4];
  ref: ContentDOM;
}

export class SolidNodeView<ContentDOM extends HTMLElement = any>
  implements NodeView
{
  dom: HTMLDivElement;
  contentDOM?: ContentDOM;
  id: string;
  element: JSXElement;

  constructor(
    C: Component<SolidNodeViewProps<ContentDOM>>,
    ...args: ConstructorParams
  ) {
    let [node, view, getPos, decorations, innerDecorations] = args;
    this.id = Math.floor(Math.random() * 0xffffffff).toString();
    this.dom = document.createElement("div");

    this.element = (
      <C
        node={node}
        view={view}
        getPos={getPos}
        decorations={decorations}
        innerDecorations={innerDecorations}
        // @ts-ignore
        ref={this.contentDOM}
      />
    );

    rendererStore.addRenderer(this.id, {
      element: this.element,
      mount: this.dom,
    });
  }

  destroy() {
    rendererStore.deleteRenderer(this.id);
  }
}

export const createSolidNodeView =
  <El extends HTMLElement>(C: Component<SolidNodeViewProps<El>>) =>
  (...args: Parameters<NodeViewConstructor>) =>
    new SolidNodeView(C, ...args);
