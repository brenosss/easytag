interface LoadingButtonProps extends React.InputHTMLAttributes<HTMLButtonElement> {
  className: string
  isLoading: boolean,
  text: string
}

export function LoadingButton(props: LoadingButtonProps) {
  return (
    <button
      className={props.className}
      onSubmit={props.onSubmit}
      onClick={props.onClick}
      disabled={props.disabled}
      type="submit"
    >
      {props.isLoading ?
        <div className="pl-2 text-base font-medium text-white  items-center">
          <svg className="animate-spin h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        : props.text}
    </button>
  )
}