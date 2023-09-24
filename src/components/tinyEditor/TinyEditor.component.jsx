import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import parse from 'html-react-parser';

const TinyEditor = ({ handleChange, initialContent }) => {
  const editorRef = useRef('editor');

  return (
    <Editor
      onInit={(evt, editor) => {
        editorRef.current = editor;
      }}
      initialValue={parse(initialContent)}
      onChange={(e) => handleChange(e.target.getContent())}
      apiKey="dh9kclzz1mh67rg0cyvkmrqs6rso8b5aunovwvd57l9fz4qw"
      init={{
        height: 500,
        menubar: "insert view format table tools help",
        plugins: [
          "advlist autolink lists link image charmap print preview anchor codesample",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount autolink",
        ],
        toolbar:
          "undo redo | formatselect | image | codesample |" +
          "bold italic backcolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        codesample_languages: [
          { text: "HTML/XML", value: "markup" },
          { text: "JavaScript", value: "javascript" },
          { text: "CSS", value: "css" },
        ],
      }}
    />
  );
};

export default TinyEditor;
