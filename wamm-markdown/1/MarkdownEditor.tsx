import * as React from "react";
import MdEditor from 'react-markdown-editor-lite';
import { MarkdownRenderer } from "./MarkdownRenderer";

interface MarkdownEditorProps {
    text: string;
    setText: (newText: string) => void;
    height?: string;
    backgroundColor?: string;
    textColor?: string;
    codeBlockColor?: string;
    blockQuoteBorderColor?: string;
    blockQuoteTextColor?: string;
}

const _MarkdownEditor = (props: MarkdownEditorProps) => {
    const [textareaState, setTextareaState] = React.useState<{ elem: HTMLTextAreaElement | null, newRange: number }>({
        elem: null,
        newRange: 0
    });

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key == "Tab") {
            e.preventDefault();
            const textAreaElem = e.target as HTMLTextAreaElement;
            let newText = props.text.substr(0, textAreaElem.selectionStart) + '\t' + props.text.substr(textAreaElem.selectionEnd);
            props.setText(newText);
            setTextareaState({ elem: textAreaElem, newRange: textAreaElem.selectionStart + 1 });
        }
    }

    React.useEffect(() => {
        setTimeout(() => {
            if (textareaState.elem)
                textareaState.elem.setSelectionRange(textareaState.newRange, textareaState.newRange);
        });
    }, [textareaState.newRange]);

    return (
        <div onKeyDown={onKeyDown}>
            <style>
                {` /* jank overrides here because of the way the editor is structured */
                    textarea {
                        background-color: ${props.backgroundColor ?? "white"};
                        color: ${props.textColor ?? "black"};
                    }
                    .custom-html-style table td {
                        padding: 1.5rem;
                        border: 0.001rem solid grey
                    }
                    .custom-html-style table {
                        border-spacing: 0;
                        text-align: center;
                    }
                    blockquote {
						color: ${props.blockQuoteTextColor ?? "rgba(0, 0, 0, .75)"};
						border-left: 5px solid ${props.blockQuoteBorderColor ?? "rgba(0, 0, 0, .1)"};
						padding-left: 1.5em;
					},
					code {
						background-color: ${props.codeBlockColor ?? "rgba(0, 0, 0, .15)"};
						padding: 2px 4px;
						font-size: 14px;
					},
                    pre {
						background-color: ${props.codeBlockColor ?? "rgba(0, 0, 0, .15)"};
						padding: 20px;
						word-break: break-word;
						white-space: pre-wrap;
						font-size: 14px;
					},
					pre > code {
						background-color: rgba(0,0,0,0);
						padding: 0;
					}
                `}
            </style>
            <MdEditor
                style={{ height: props.height ?? "100%", textAlign: "left", border: "none", backgroundColor: props.backgroundColor ?? "white", zIndex: 11, color: props.textColor ?? "black" }}
                renderHTML={(text) => <MarkdownRenderer content={text} />}
                value={props.text}
                onChange={(data) => props.setText(data.text)}
            />
        </div>
    );
}

export const MarkdownEditor = React.memo(_MarkdownEditor);