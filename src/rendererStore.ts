import { createRoot, JSXElement } from "solid-js";
import { createStore } from "solid-js/store";

export interface Renderer {
  element: JSXElement;
}
const createRenderers = () => {
  let [renderers, setRenderers] = createStore<Record<string, Renderer>>({});
  const deleteRenderer = (id: string) => {
    setRenderers({ [id]: undefined });
  };
  const addRenderer = (id: string, renderer: Renderer) => {
    setRenderers({ [id]: renderer });
  };
  return { renderers, deleteRenderer, addRenderer };
};

export const rendererStore = createRoot(createRenderers);
