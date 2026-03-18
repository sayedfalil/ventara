"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import { useEffect } from "react";

type Props = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

type ButtonProps = {
  onClick: () => void;
  active?: boolean;
  title?: string;
  children: React.ReactNode;
};

function Btn({ onClick, active, title, children }: ButtonProps) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      style={{
        padding: "4px 8px",
        background: active ? "var(--teal)" : "transparent",
        color: active ? "#fff" : "var(--text-secondary)",
        border: "1px solid",
        borderColor: active ? "var(--teal)" : "transparent",
        borderRadius: "2px",
        cursor: "pointer",
        fontSize: "0.8rem",
        fontWeight: 500,
        transition: "all 0.15s",
        minWidth: 28,
        lineHeight: 1.4,
      }}
    >
      {children}
    </button>
  );
}

function Sep() {
  return <div style={{ width: 1, height: 20, background: "var(--border)", margin: "0 4px" }} />;
}

export default function RichTextEditor({ value, onChange, placeholder = "Write your content here…" }: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false, HTMLAttributes: { target: "_blank", rel: "noopener noreferrer" } }),
      Image,
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (!editor) return null;

  function addLink() {
    const url = prompt("Enter URL:");
    if (url) editor?.chain().focus().setLink({ href: url }).run();
  }

  function addImage() {
    const url = prompt("Enter image URL:");
    if (url) editor?.chain().focus().setImage({ src: url }).run();
  }

  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: "2px", overflow: "hidden" }}>
      {/* Toolbar */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "2px",
        padding: "8px 12px",
        background: "var(--bg-secondary)",
        borderBottom: "1px solid var(--border)",
        alignItems: "center",
      }}>
        <Btn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold">B</Btn>
        <Btn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic"><em>I</em></Btn>
        <Btn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline"><u>U</u></Btn>
        <Btn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strike"><s>S</s></Btn>
        <Btn onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")} title="Inline Code">{"`"}</Btn>
        <Sep />
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} title="Heading 1">H1</Btn>
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Heading 2">H2</Btn>
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Heading 3">H3</Btn>
        <Sep />
        <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet List">• List</Btn>
        <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Numbered List">1. List</Btn>
        <Btn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Quote">"</Btn>
        <Btn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")} title="Code Block">{"</>"}</Btn>
        <Sep />
        <Btn onClick={addLink} active={editor.isActive("link")} title="Add Link">🔗</Btn>
        <Btn onClick={addImage} title="Add Image">🖼</Btn>
        <Sep />
        <Btn onClick={() => editor.chain().focus().undo().run()} title="Undo">↩</Btn>
        <Btn onClick={() => editor.chain().focus().redo().run()} title="Redo">↪</Btn>
      </div>

      {/* Editor area */}
      <EditorContent
        editor={editor}
        style={{ minHeight: 320, padding: "1.25rem", background: "#fff" }}
      />

      <style>{`
        .tiptap { outline: none; font-family: var(--font-sans); font-size: 0.95rem; line-height: 1.75; color: var(--text-primary); }
        .tiptap h1 { font-family: var(--font-serif); font-size: 1.8rem; margin: 1.5rem 0 0.75rem; color: var(--text-primary); }
        .tiptap h2 { font-family: var(--font-serif); font-size: 1.4rem; margin: 1.25rem 0 0.5rem; }
        .tiptap h3 { font-size: 1.1rem; font-weight: 600; margin: 1rem 0 0.5rem; }
        .tiptap p { margin: 0.5rem 0; }
        .tiptap ul, .tiptap ol { padding-left: 1.5rem; margin: 0.75rem 0; }
        .tiptap li { margin: 0.25rem 0; }
        .tiptap blockquote { border-left: 3px solid var(--teal); margin: 1rem 0; padding: 0.5rem 1rem; color: var(--text-secondary); background: var(--bg-secondary); }
        .tiptap code { background: var(--bg-tertiary); padding: 2px 6px; border-radius: 3px; font-size: 0.85em; font-family: monospace; }
        .tiptap pre { background: #1a1a2e; color: #e0e0e0; padding: 1rem; border-radius: 4px; overflow-x: auto; margin: 1rem 0; }
        .tiptap pre code { background: none; color: inherit; padding: 0; }
        .tiptap a { color: var(--teal); text-decoration: underline; }
        .tiptap img { max-width: 100%; height: auto; border-radius: 2px; margin: 0.5rem 0; }
        .tiptap p.is-editor-empty:first-child::before { content: attr(data-placeholder); color: var(--text-light); float: left; height: 0; pointer-events: none; }
      `}</style>
    </div>
  );
}
