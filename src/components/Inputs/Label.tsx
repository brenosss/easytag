import { clsx } from "clsx";

interface InputLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
}

export function LabelInput({ label, ...props }: InputLabelProps) {
  return (
    <label
      {...props}
      className={clsx(
        "block text-sm font-medium text-gray-700",
        props.className
      )}
    >
      {label}
    </label>
  );
}
