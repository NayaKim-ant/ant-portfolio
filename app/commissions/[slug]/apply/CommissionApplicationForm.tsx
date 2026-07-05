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
import type { ApplicationQuestionRecord } from "../../../api/_data/mock-database";

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
  questions,
}: {
  typeName: string;
  typeSlug: string;
  questions: ApplicationQuestionRecord[];
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
          {questions.map((question) => (
            <fieldset className="application-question" key={question.id}>
              <legend>
                <span>{question.number}.</span> {question.label}
              </legend>
              {question.helpText && <p>{question.helpText}</p>}

              {question.inputType === "radio" &&
                question.options.map((option) => (
                  <label key={option.id}>
                    <input
                      type="radio"
                      name={question.id}
                      value={option.value}
                      required={question.required}
                    />
                    {option.label}
                  </label>
                ))}

              {question.inputType === "short_text" && (
                <input name={question.id} required={question.required} />
              )}

              {question.inputType === "date" && (
                <input type="date" name={question.id} required={question.required} />
              )}

              {question.inputType === "rich_text" && (
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
              )}
            </fieldset>
          ))}

          <button className="application-submit" type="submit">
            Order
          </button>

          {submitted && (
            <p className="application-success" role="status">
              Application captured in the current mock UI. The BFF submission
              endpoint is ready for persistence later.
            </p>
          )}
        </form>
      </main>

      <footer className="site-footer">© 2026 Ant</footer>
    </div>
  );
}
