import React from "react";
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

function NotesInput({ value, onChange }) {

    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        }
    });

    return (
        <EditorContent editor={editor} />
    )
}

export default NotesInput;