import { type Dispatch, type SetStateAction } from "react";
import { ImageInput } from "../Inputs/Image";
import { LabelInput } from "../Inputs/Label";
import { TextAreaInput, TextInput } from "../Inputs/Text";
import Preview from "./Preview";
import { type SocialCardProps } from "./SocialCards/ISocialCard";
import { useState } from "react";

interface PageFormProps {
  socialCard: SocialCardProps;
  setSocialCard: Dispatch<SetStateAction<SocialCardProps | undefined>>;
  url: string;
  setUrl: Dispatch<SetStateAction<string>>;
  submitFunction: (event: React.FormEvent) => void;
  isLoading: boolean;
}

const PageForm = ({
  socialCard,
  setSocialCard,
  url,
  setUrl,
  submitFunction,
  isLoading,
}: PageFormProps) => {
  const [descriptionTip, setDescriptionTip] = useState(false)
  const [titleTip, setTitleTip] = useState(false)

  function validateTitle(title: string) {
    if (title.length >= 60 && title.length <= 70) {
      setTitleTip(false)
    } else {
      setTitleTip(true)
    }
  }
  function validateDescription(description: string) {
    if (description.length >= 150 && description.length <= 200) {
      setDescriptionTip(false)
    } else {
      setDescriptionTip(true)
    }
  }
  return (
    <form className="mt-12 p-3" onSubmit={submitFunction}>
      <div className="mb-12 flex justify-around px-32">
        <LabelInput label="URL" className="mb-2" />
        <TextInput
          className="ml-2 w-10/12"
          name="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
        <button
          className="ml-12 w-1/12 items-center rounded-lg disabled:cursor-not-allowed bg-emerald-500 py-2.5 text-sm font-medium text-white shadow ring-offset-0 hover:bg-emerald-700 focus:outline-none"
          type="submit"
          onSubmit={submitFunction}
          disabled={isLoading}
        >
          {isLoading ? 
            <div className="pl-2 text-sm font-medium text-white flex items-center">
               <svg className="animate-spin h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24">
                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
             Loading
            </div>
            : "Save"}
        </button>
      </div>
      <div className="flex justify-center">
        <div className="w-full max-w-2xl px-8">
          <div className="mb-4">
            <LabelInput label="Title" className="mb-2" />
            <TextInput
              className="ml-2 w-11/12"
              name="title"
              onChange={(event) => {
                const title = event.target.value;
                setSocialCard({ ...socialCard, title })
              }
              }
              onBlur={() => validateTitle(socialCard.title)}
              value={socialCard.title}
            />
            {titleTip && <p className="mt-1 text-orange-200">Keep the title between 60-70 characters to ensure it displays properly across platforms without truncation. Ensure the title is descriptive and accurately represents the content.</p>}
          </div>
          <div className="mb-4">
            <LabelInput label="Description" className="mb-2" />
            <TextAreaInput
              name="description"
              className="ml-2 w-11/12"
              onChange={(event) => {
                const description = event.target.value;
                setSocialCard({
                  ...socialCard,
                  description
                })
              }
              }
              onBlur={() => validateDescription(socialCard.description)}
              value={socialCard.description}
            />
            {descriptionTip && <p className="mt-1 text-amber-200">Limit the description to 150-200 characters to ensure proper display without truncation on different platforms. Make the description engaging, concise, and accurately represent the content.</p>}
          </div>
          <div className="mb-4">
            <LabelInput label="Image" className="mb-2" />
            <ImageInput
              image={socialCard.image}
              className="ml-2 w-11/12"
              onChange={(e) => {
                if (e.target.files !== null && e.target.files.length > 0) {
                  const file = e.target.files[0] as File;
                  setSocialCard({
                    ...socialCard,
                    image: URL.createObjectURL(file),
                  });
                }
              }}
            />
          </div>
        </div>
        <Preview socialCard={socialCard} />
      </div>
    </form>
  );
};
export default PageForm;
