import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";

const Editor = ({ value, onChange }: { value: string; onChange: (content: string) => void }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose max-w-none min-h-[200px] p-4 focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="bg-white mb-4 border rounded-lg">
      <div className="border-b p-2 flex flex-wrap gap-2">
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`px-2 py-1 rounded ${editor.isActive("heading", { level: 1 }) ? "bg-gray-200" : "hover:bg-gray-100"}`}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-2 py-1 rounded ${editor.isActive("heading", { level: 2 }) ? "bg-gray-200" : "hover:bg-gray-100"}`}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded ${editor.isActive("bold") ? "bg-gray-200" : "hover:bg-gray-100"}`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded ${editor.isActive("italic") ? "bg-gray-200" : "hover:bg-gray-100"}`}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-2 py-1 rounded ${editor.isActive("underline") ? "bg-gray-200" : "hover:bg-gray-100"}`}
        >
          Underline
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-2 py-1 rounded ${editor.isActive("orderedList") ? "bg-gray-200" : "hover:bg-gray-100"}`}
        >
          Ordered List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1 rounded ${editor.isActive("bulletList") ? "bg-gray-200" : "hover:bg-gray-100"}`}
        >
          Bullet List
        </button>
        <button
          onClick={() => {
            const url = window.prompt("Enter URL:");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className="px-2 py-1 rounded hover:bg-gray-100"
        >
          Link
        </button>
        <button
          onClick={() => {
            const url = window.prompt("Enter image URL:");
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
          className="px-2 py-1 rounded hover:bg-gray-100"
        >
          Image
        </button>
        <button
          onClick={() => editor.chain().focus().clearContent().run()}
          className="px-2 py-1 rounded hover:bg-gray-100"
        >
          Clear
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
