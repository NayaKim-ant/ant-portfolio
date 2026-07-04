"use client";

import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { BackButton } from "../../../components/BackButton";

type EditorCommand = "bold" | "italic" | "underline" | "strikeThrough" | "undo" | "redo";
type FormatCommand = "bold" | "italic" | "underline" | "strikeThrough";

const formatCommands: FormatCommand[] = [
  "bold",
  "italic",
  "underline",
  "strikeThrough",
];

export function CommissionApplicationForm({
  typeName,
  typeSlug,
}: {
  typeName: string;
  typeSlug: string;
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [activeFormats, setActiveFormats] = useState<FormatCommand[]>([]);

  const refreshFormats = useCallback(() => {
    const selection = window.getSelection();
    const editor = editorRef.current;
    if (!selection?.anchorNode || !editor?.contains(selection.anchorNode)) {
      setActiveFormats([]);
      return;
    }

    setActiveFormats(
      formatCommands.filter((command) => document.queryCommandState(command)),
    );
  }, []);

  useEffect(() => {
    document.addEventListener("selectionchange", refreshFormats);
    return () => document.removeEventListener("selectionchange", refreshFormats);
  }, [refreshFormats]);

  const runCommand = (
    event: MouseEvent<HTMLButtonElement>,
    command: EditorCommand,
  ) => {
    event.preventDefault();
    editorRef.current?.focus();
    document.execCommand(command);
    refreshFormats();
  };

  const insertImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      editorRef.current?.focus();
      document.execCommand("insertImage", false, String(reader.result));
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="site-shell paper-page">
      <main className="application-page">
        <div className="subpage-title-row">
          <header className="application-heading">
            <h1>Ordering {typeName} type</h1>
            <p>Fill in the form below</p>
          </header>
          <BackButton href={`/commissions/${typeSlug}`} />
        </div>

        <form className="commission-application-form" onSubmit={submit}>
          <fieldset className="application-question">
            <legend>
              <span>1.</span> Placeholder question with one choice
            </legend>
            <label>
              <input type="radio" name="placeholder-choice" value="option-a" required />
              Placeholder option A
            </label>
            <label>
              <input type="radio" name="placeholder-choice" value="option-b" />
              Placeholder option B
            </label>
            <label>
              <input type="radio" name="placeholder-choice" value="option-c" />
              Placeholder option C
            </label>
          </fieldset>

          <fieldset className="application-question">
            <legend>
              <span>2.</span> Placeholder question with a custom answer
            </legend>
            <div className="rich-editor">
              <div className="rich-editor-toolbar" aria-label="Text formatting">
                <div>
                  <button
                    className={activeFormats.includes("bold") ? "active" : ""}
                    type="button"
                    title="Bold"
                    aria-pressed={activeFormats.includes("bold")}
                    onMouseDown={(event) => runCommand(event, "bold")}
                  >
                    <strong>B</strong>
                  </button>
                  <button
                    className={activeFormats.includes("italic") ? "active" : ""}
                    type="button"
                    title="Italic"
                    aria-pressed={activeFormats.includes("italic")}
                    onMouseDown={(event) => runCommand(event, "italic")}
                  >
                    <em>I</em>
                  </button>
                  <button
                    className={activeFormats.includes("underline") ? "active" : ""}
                    type="button"
                    title="Underline"
                    aria-pressed={activeFormats.includes("underline")}
                    onMouseDown={(event) => runCommand(event, "underline")}
                  >
                    <u>U</u>
                  </button>
                  <button
                    className={
                      activeFormats.includes("strikeThrough") ? "active" : ""
                    }
                    type="button"
                    title="Strikethrough"
                    aria-pressed={activeFormats.includes("strikeThrough")}
                    onMouseDown={(event) =>
                      runCommand(event, "strikeThrough")
                    }
                  >
                    <s>S</s>
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    title="Insert image"
                    aria-label="Insert image"
                    onClick={() => imageInputRef.current?.click()}
                  >
                    ▧
                  </button>
                  <button type="button" title="Undo" aria-label="Undo" onMouseDown={(event) => runCommand(event, "undo")}>
                    ↶
                  </button>
                  <button type="button" title="Redo" aria-label="Redo" onMouseDown={(event) => runCommand(event, "redo")}>
                    ↷
                  </button>
                </div>
              </div>
              <div
                ref={editorRef}
                className="rich-editor-content"
                contentEditable
                role="textbox"
                aria-multiline="true"
                data-placeholder="Type text and add reference images..."
                onKeyUp={refreshFormats}
                onMouseUp={refreshFormats}
                suppressContentEditableWarning
              />
              <input
                ref={imageInputRef}
                className="visually-hidden"
                type="file"
                accept="image/*"
                onChange={insertImage}
                tabIndex={-1}
              />
            </div>
          </fieldset>

          <fieldset className="application-question">
            <legend>
              <span>3.</span> Placeholder delivery preference
            </legend>
            <label>
              <input type="radio" name="delivery" value="standard" required />
              Standard schedule
            </label>
            <label>
              <input type="radio" name="delivery" value="discuss" />
              Discuss another schedule
            </label>
          </fieldset>

          <button className="application-submit" type="submit">
            Order
          </button>

          {submitted && (
            <p className="application-success" role="status">
              Application captured as a frontend mock. Database submission will
              be connected later.
            </p>
          )}
        </form>
      </main>

      <footer className="site-footer">© 2026 Ant</footer>
    </div>
  );
}
