// import "./styles.scss";
// import "prosemirror-view/style/prosemirror.css";
// import applyDevTools from "prosemirror-dev-tools";
// import { Component, createEffect, createSignal, onMount, Show } from "solid-js";
// import { DevtoolsOverlay } from "@solid-devtools/overlay";
// import { render } from "solid-js/web";
// import { EditorContent } from "./EditorContent";
// import { keymapPlugin } from "./plugins/keymap";
// import { Editor } from "./editor";
// import { historyPlugin } from "./plugins/history";
// import { docPlugin } from "./plugins/doc";
// import { paragraphPlugin } from "./plugins/paragraph";
// import { textPlugin } from "./plugins/text";
// import { headingPlugin } from "./plugins/heading";
// import { dividerPlugin } from "./plugins/divider";

// const App: Component = () => {
//   let editorRef: HTMLDivElement;
//   let [editor, setEditor] = createSignal<null | Editor>();

//   onMount(() => {
//     let ed = new Editor({
//       plugins: [
//         keymapPlugin,
//         historyPlugin,
//         docPlugin,
//         paragraphPlugin,
//         textPlugin,
//         headingPlugin,
//         dividerPlugin,
//       ],
//       content: (schema) => schema.node("doc", null, [schema.node("paragraph")]),
//       bindingElement: editorRef,
//     });
//     setEditor(ed);
//   });

//   if (import.meta.env.DEV) {
//     createEffect(() => {
//       let ed = editor();
//       if (ed) {
//         applyDevTools(ed.view);
//       }
//     });
//   }

//   return (
//     <Show when={editor()}>
//       <EditorContent
//         editor={editor()}
//         class="ed-page"
//         // @ts-ignore
//         ref={editorRef}
//       />
//     </Show>
//   );
// };

// render(
//   () =>
//     import.meta.env.PROD ? (
//       <App />
//     ) : (
//       <>
//         <App />
//         <DevtoolsOverlay />
//       </>
//     ),
//   appRoot
// );
import {
  DragDropProvider,
  DragDropSensors,
  useDragDropContext,
  createDraggable,
  createDroppable,
} from "@thisbeyond/solid-dnd";
import { render } from 'solid-js/web'

const Draggable = (props) => {
  const draggable = createDraggable(props.id);
  return <div use:draggable>draggable</div>;
};

const Droppable = (props) => {
  const droppable = createDroppable(props.id);
  return <div use:droppable>droppable</div>;
};

const Sandbox = () => {
  const [, { onDragEnd }] = useDragDropContext();

  onDragEnd(({draggable, droppable}) => {
    if (droppable) {
      // Handle the drop. Note that solid-dnd doesn't move a draggable into a
      // droppable on drop. It leaves it up to you how you want to handle the
      // drop.
    }
  });

  return (
    <div>
      <Draggable id="draggable-1" />
      <Droppable id="droppable-1" />
    </div>
  );
};

const App = () => {
  return (
    <DragDropProvider>
      <DragDropSensors>
        <Sandbox />
      </DragDropSensors>
    </DragDropProvider>
  );
};


let appRoot = document.getElementById("app")! as HTMLDivElement;
render(() => <App/>, appRoot);
