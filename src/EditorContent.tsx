import { JSX, Component, For } from "solid-js";
import { Portal } from "solid-js/web";
import { rendererStore } from "./rendererStore";

export const EditorContent: Component<JSX.HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  const { renderers } = rendererStore;
  return (
    <div {...props}>
      <For each={Object.values(renderers)}>
        {(item) => <Portal>{item.element}</Portal>}
      </For>
    </div>
  );
};
