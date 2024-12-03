import PropTypes from 'prop-types';
import { useEditor, EditorContent } from '@tiptap/react';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';

function NotesInput({ value, onChange, focus }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Tell your own story...',
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (focus && editor) {
      editor.commands.focus();
    }
  }, [focus, editor]);

  return (
    <div>
      <EditorContent editor={editor} />
    </div>
  );
}

NotesInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  focus: PropTypes.bool,
};

export default NotesInput;
