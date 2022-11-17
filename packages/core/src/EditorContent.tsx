import { JSX, Component, For } from "solid-js";
import { Portal } from "solid-js/web";
import { rendererStore } from "./rendererStore";
import { DragDropProvider, DragDropSensors } from "@thisbeyond/solid-dnd";
import { Editor } from "./editor";

interface EditorContentProps extends JSX.HTMLAttributes<HTMLDivElement> {
  editor: Editor;
}

export const EditorContent: Component<EditorContentProps> = (props) => {
  const { renderers } = rendererStore;
  return (
    <DragDropProvider onDragEnd={props.editor.onDragEnd}>
      <DragDropSensors />
      <div {...props}>
        <For each={Object.values(renderers)}>
          {(item) => <Portal mount={item.mount}>{item.element()}</Portal>}
        </For>
      </div>
    </DragDropProvider>
  );
};
