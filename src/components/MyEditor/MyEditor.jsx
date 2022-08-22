import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useState } from "react";
import {
  ChatAutoComplete,
  EmojiIconLarge,
  EmojiPicker,
  SendButton,
  Tooltip,
  useMessageInputContext,
  useTranslationContext,
} from "stream-chat-react";
import { config } from "../ckEditorConfig";

const MyEditor = ({ ...inputProps }) => {
  const [editorState, setEditorState] = useState("<p>Write Something...</p>");
  const { t } = useTranslationContext();

  const {
    closeEmojiPicker,
    emojiPickerIsOpen,
    handleEmojiKeyDown,
    handleSubmit,
    openEmojiPicker,
  } = useMessageInputContext();

  return (
    <div className="str-chat__input-flat str-chat__input-flat--send-button-active">
      <div className="str-chat__input-flat-wrapper">
        <div className="str-chat__input-flat--textarea-wrapper">
          <ChatAutoComplete />
          {/* <CKEditor
            editor={ClassicEditor}
            data="<p>Hello from CKEditor 5!</p>"
            config={config}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
            }}
          /> */}
          <div className="str-chat__emojiselect-wrapper">
            <Tooltip>
              {emojiPickerIsOpen
                ? t("Close emoji picker")
                : t("Open emoji picker")}
            </Tooltip>
            <span
              className="str-chat__input-flat-emojiselect"
              onClick={emojiPickerIsOpen ? closeEmojiPicker : openEmojiPicker}
              onKeyDown={handleEmojiKeyDown}
              role="button"
              tabIndex={0}
            >
              <EmojiIconLarge />
            </span>
          </div>
          <EmojiPicker />
        </div>
        <SendButton sendMessage={(e) => handleSubmit(e, editorState)} />
      </div>
    </div>
  );
};

export default MyEditor;
