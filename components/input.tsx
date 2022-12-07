import { cx } from "../lib/util";

export function Input(props: {
  type: "textarea" | "text";
  label: string;
  spellCheck?: boolean;
  value: string;
  disabled?: boolean;
  error?: string;
  maxLength?: number;
  onInput: (newValue: string) => void;
}) {
  return (<>
    <label
      className={cx(
        "input",
        props.value && "--filled",
        props.error && "--error",
      )}
      data-placeholder={
        props.error ? props.error
        : props.maxLength && props.value.length > props.maxLength / 2 ? (
          `${props.label} (${props.value.length} / ${props.maxLength})`
        )
        : props.label
      }
    >
      {props.type === "text" && (
        <input
          type="text"
          placeholder={props.label}
          value={props.value}
          disabled={props.disabled}
          spellCheck={props.spellCheck}
          onInput={evt => {
            props.onInput(
              (evt.target as HTMLInputElement).value.slice(0, props.maxLength),
            );
          }}
        />
      )}
      {props.type === "textarea" && (
        <textarea
          placeholder={props.label}
          value={props.value}
          disabled={props.disabled}
          spellCheck={props.spellCheck}
          onInput={evt => {
            props.onInput((evt.target as HTMLTextAreaElement).value);
          }}
        ></textarea>
      )}
    </label>
  </>);
}
