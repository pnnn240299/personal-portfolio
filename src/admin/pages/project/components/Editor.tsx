import React from 'react';
import ReactQuill from "react-quill";

const Editor = ({ value, onChange }: { value: string; onChange: (content: string) => void }) => {
  return React.createElement(ReactQuill, {
    value: value,
    onChange: onChange,
    className: "bg-white mb-4",
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
    },
  });
};

export default Editor;
