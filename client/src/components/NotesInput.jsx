import PropTypes from 'prop-types';
import { useEditor, EditorContent } from '@tiptap/react';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';

function NotesInput({ value, onChange, focus, editing }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Tell your own story...',
      }),
    ],
    content: value,
    editable: editing,
    onUpdate: ({ editor }) => {
      if (editing) {
        onChange(editor.getHTML());
      }
    },
  });

  useEffect(() => {
    if (editor) {
      editor.setEditable(editing);
      if (focus && editing) {
        editor.commands.focus();
      }
    }
  }, [focus, editor, editing]);

  return (
    <div>
      <EditorContent editor={editor} />
    </div>
  );
}

NotesInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  focus: PropTypes.bool,
  editing: PropTypes.bool,
};

export default NotesInput;
