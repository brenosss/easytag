import { type Dispatch, type SetStateAction } from "react";
import { ImageInput } from "../Inputs/Image";
import { LabelInput } from "../Inputs/Label";
import { TextAreaInput, TextInput } from "../Inputs/Text";
import Preview from "./Preview";
import { type SocialCardProps } from "./SocialCards/ISocialCard";

interface PageFormProps {
  socialCard: SocialCardProps;
  setSocialCard: Dispatch<SetStateAction<SocialCardProps | undefined>>;
  url: string;
  setUrl: Dispatch<SetStateAction<string>>;
  submitFunction: (event: React.FormEvent) => void;
}

const PageForm = ({
  socialCard,
  setSocialCard,
  url,
  setUrl,
  submitFunction,
}: PageFormProps) => {
  return (
    <form className="mt-12 p-3" onSubmit={submitFunction}>
      <div className="mb-12 flex justify-around px-36">
        <LabelInput label="URL" className="mb-2" />
        <TextInput
          className="ml-2 w-11/12"
          name="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
        <button
          className="ml-12 w-20 rounded-lg bg-emerald-500 py-2.5 text-sm font-medium text-white shadow ring-offset-0 hover:bg-emerald-700 focus:outline-none"
          type="submit"
        >
          Save
        </button>
      </div>
      <div className="flex justify-center">
        <div className="w-full max-w-2xl px-8">
          <div className="mb-4">
            <LabelInput label="Title" className="mb-2" />
            <TextInput
              className="ml-2 w-11/12"
              name="title"
              onChange={(event) =>
                setSocialCard({ ...socialCard, title: event.target.value })
              }
              value={socialCard.title}
            />
          </div>
          <div className="mb-4">
            <LabelInput label="Description" className="mb-2" />
            <TextAreaInput
              name="description"
              className="ml-2 w-11/12"
              onChange={(event) =>
                setSocialCard({
                  ...socialCard,
                  description: event.target.value,
                })
              }
              value={socialCard.description}
            />
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
