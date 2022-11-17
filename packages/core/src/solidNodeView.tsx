import { NodeView, NodeViewConstructor } from "prosemirror-view";
import { Component, JSXElement } from "solid-js";
import { rendererStore } from "./rendererStore";

export type StyleDOMNode = (node: HTMLDivElement) => void;

type ConstructorParams = Parameters<NodeViewConstructor>;

export interface SolidNodeViewProps<ContentDOM extends HTMLElement = any> {
  id: string;
  node: ConstructorParams[0];
  view: ConstructorParams[1];
  getPos: ConstructorParams[2];
  decorations: ConstructorParams[3];
  innerDecorations: ConstructorParams[4];
  ref: ContentDOM;
}

export class SolidNodeView<ContentDOM extends HTMLElement = any>
  implements NodeView
{
  dom: HTMLDivElement;
  contentDOM?: ContentDOM;
  id: string;
  element: () => JSXElement;

  constructor(
    C: Component<SolidNodeViewProps<ContentDOM>>,
    ...args: ConstructorParams
  ) {
    let [node, view, getPos, decorations, innerDecorations] = args;
    this.id = Math.floor(Math.random() * 0xffffffff).toString();
    this.dom = document.createElement("div");

    this.element = () => (
      <C
        id={this.id}
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
  (...args: ConstructorParams) =>
    new SolidNodeView(C, ...args);
