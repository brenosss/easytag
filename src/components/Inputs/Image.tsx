import { clsx } from "clsx";

interface ImageInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  image?: string;
}

export function ImageInput({ image, ...props }: ImageInputProps) {
  return (
    <>
      <div
        className={clsx(
          "mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6",
          props.className
        )}
      >
        <div className="space-y-1 text-center">
          {image ? (
            <img src={image} />
          ) : (
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          <div className="flex text-base text-gray-600 justify-center">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-white font-medium text-emerald-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-emerald-400 focus-within:ring-offset-2 hover:text-emerald-400"
            >
              <span>Upload a file</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                onChange={props.onChange}
              />
            </label>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 200KB</p>
        </div>
      </div>
    </>
  );
}
