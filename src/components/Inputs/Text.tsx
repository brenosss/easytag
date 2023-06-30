import { clsx } from "clsx";

interface TextAreaInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }
interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  displayText?: string;
}

export function TextInput({ ...props }: TextInputProps) {
  return (
    <div className="flex w-full rounded-md ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-400 ">
      {props.displayText && <span className="flex select-none items-center pl-3 text-gray-500">{props.displayText}</span>}
      <input
        type="text"
        {...props}
        className={clsx(
          "w-full block focus:ring-0 border-0 bg-transparent border-gray-300 px-0.5 py-2",
          props.className
        )}
      />

    </div>
  );
}

export function TextAreaInput(props: TextAreaInputProps) {
  return (
    <textarea
      {...props}
      className={clsx(
        "w-full block rounded-md border-gray-300 shadow-sm focus:border-emerald-400 focus:ring-emerald-400 p-2",
        props.className
      )}
      rows={3}
    />
  );
}
