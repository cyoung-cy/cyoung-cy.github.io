import React from "react";
import { useState } from "react";
import "./Editor.css";
import { useRef } from "react";

function Editor({ onCreate }) {
  const [content, setContent] = useState("");
  const contentRef = useRef("");

  const onSubmit = () => {
    if (content === "") {
      contentRef.current.focus();
      return;
    }

    onCreate(content);
    setContent("");
  };

  const onkeydown = (e) => {
    if (e.keyCode === "13") {
      onSubmit();
    }
  };

  return (
    <div className="Editor">
      <input
        type="text"
        placeholder="새로운 todo"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        ref={contentRef}
        onKeyDown={onkeydown}
      />
      <button onClick={onSubmit}>추가</button>
    </div>
  );
}

export default Editor;
