import { clsx } from "clsx";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

interface TextAreaInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}


export function TextInput(props: TextInputProps) {
  return (
    <input
      type="text"
      {...props}
      className={clsx(
        "w-full block rounded-md border-gray-300 shadow-sm focus:border-emerald-400 focus:ring-emerald-400 p-2",
        props.className
      )}
    />
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
