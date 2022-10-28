import { EditorProps, NodeView, NodeViewConstructor } from "prosemirror-view";

type ConstructorParams = Parameters<NodeViewConstructor>;

const blockWrapper = (...children: (string | Node)[]) => {
  let node = document.createElement("div");
  node.classList.add("ed-block");
  node.append(...children);
  return node;
};

export class ParagraphView implements NodeView {
  dom: HTMLDivElement;
  contentDOM: HTMLParagraphElement;

  constructor() {
    this.contentDOM = document.createElement("p");
    this.dom = blockWrapper(this.contentDOM);
  }
}

export class DividerView implements NodeView {
  dom: HTMLDivElement;
  contentDOM: HTMLParagraphElement;

  constructor() {
    this.contentDOM = document.createElement("hr");
    this.dom = blockWrapper(this.contentDOM);
  }
}

export class HeadingView implements NodeView {
  dom: HTMLDivElement;
  contentDOM: HTMLHeadElement;

  constructor(node: ConstructorParams[0]) {
    this.contentDOM = document.createElement("h" + node.attrs.size);
    this.dom = blockWrapper(this.contentDOM);
  }
}

export const nodeViews: EditorProps["nodeViews"] = {
  paragraph: () => new ParagraphView(),
  divider: () => new DividerView(),
  heading: (node) => new HeadingView(node)
};
