import { type Dispatch, type SetStateAction } from "react";
import { ImageInput } from "../Inputs/Image";
import { LabelInput } from "../Inputs/Label";
import { TextAreaInput, TextInput } from "../Inputs/Text";
import Preview from "./Preview";
import { type SocialCardProps } from "./SocialCards/ISocialCard";
import { useState } from "react";
import { ShowMore } from "src/components/Buttons/ShowMore";
import Modal from "src/components/Buttons/Modal";
import { LoadingButton } from "src/components/Buttons/LoadingButton";
import { XTypesSelect } from "src/components/Pages/XForms";


interface PageFormProps {
  socialCard: SocialCardProps;
  setSocialCard: Dispatch<SetStateAction<SocialCardProps | undefined>>;
  url: string;
  setUrl: Dispatch<SetStateAction<string>>;
  submitFunction: (event: React.FormEvent) => void;
  isLoading: boolean;
  deleteButton: boolean;
  deleteFunction?: (event: React.FormEvent) => void;
}

function PageForm({
  socialCard,
  setSocialCard,
  url,
  setUrl,
  submitFunction,
  isLoading,
  deleteButton,
  deleteFunction,
}: PageFormProps) {
  const [descriptionTip, setDescriptionTip] = useState(false)
  const [titleTip, setTitleTip] = useState(false)
  const [pathError, setPathError] = useState("");
  const [imageTip, setImageTip] = useState(false)
  const [imageDimensionsTip, setImageDimensionsTip] = useState(false)
  const regexPath = /^[\w\-\?=\&][\w\/\-\?=\&]*$/;
  const [modal, setModal] = useState(false);

  function validateTitle(title: string) {
    if (title.length >= 20 && title.length <= 70) {
      setTitleTip(false)
    } else {
      setTitleTip(true)
    }
  }
  function validateDescription(description: string) {
    if (description.length >= 100 && description.length <= 200) {
      setDescriptionTip(false)
    } else {
      setDescriptionTip(true)
    }
  }
  function validatePath(path: string) {
    if (regexPath.test(path)){
      setPathError("")
    } else {
      setPathError("Invalid path!")
    }
    return;
  }
  return (
    <form className="" onSubmit={submitFunction}>
      {
        modal && <Modal
          onClose={() => {
            setModal(false);
          }}
          onAccept={deleteFunction}
          title="You are about to delete this page"
          acceptButtonMessage="Delete"
        >
          Are you sure you want to proceed? All of this data will be permanently removed from our servers forever. This action cannot be undone.
        </Modal>
      }
      <div className="mb-12">
        <LabelInput label="Path" className="mb-2" />
        <div className="flex justify-around">
          <div className="w-10/12 flex">
            <TextInput
              displayText={socialCard.domain + "/"}
              className="w-full"
              name="url"
              value={url}
              onChange={(event) => { setUrl(event.target.value), setSocialCard({ ...socialCard, path: event.target.value }) }}
              onBlur={() => validatePath(url)}
            />
          </div>
          <LoadingButton
            className="ml-12 w-2/12 items-center rounded-lg disabled:cursor-not-allowed bg-emerald-500 py-2.5 text-base font-medium text-white shadow ring-offset-0 hover:bg-emerald-700 focus:outline-none"
            type="submit"
            onSubmit={submitFunction}
            disabled={isLoading || pathError.length > 0}
            isLoading={isLoading}
            text="Save"
          />
          {deleteButton &&
            <button
              className="ml-5 w-2/12 items-center rounded-lg disabled:cursor-not-allowed bg-red-500 py-2.5 text-base font-medium text-white shadow ring-offset-0 hover:bg-red-800 focus:outline-none"
              type="submit"
              onClick={() => setModal(true)}
            >
              Delete
            </button>
          }
        </div>
        {pathError && <p className="text-red-500 pt-2">{pathError}</p>}
      </div>
      <div className="flex justify-between">
        <div className="w-full max-w-2xl pr-8">
          <div className="mb-4">
            <LabelInput label="Title" className="mb-2" />
            <TextInput
              className="ml-2"
              name="title"
              onChange={(event) => {
                const title = event.target.value;
                setSocialCard({ ...socialCard, title })
              }
              }
              onBlur={() => validateTitle(socialCard.title)}
              value={socialCard.title}
            />
            {titleTip && <p className="mt-1 text-amber-700">Keep the title between 20-70 characters to ensure it displays properly across platforms without truncation. Ensure the title is descriptive and accurately represents the content.</p>}
          </div>
          <div className="mb-4">
            <LabelInput label="Description" className="mb-2" />
            <TextAreaInput
              name="description"
              className="ml-2"
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
            {descriptionTip && <p className="mt-1 text-amber-700">Limit the description to 100-200 characters to ensure proper display without truncation on different platforms. Make the description engaging, concise, and accurately represent the content.</p>}
          </div>
          <div className="mb-4">
            <LabelInput label="Image" className="mb-2" />
            <ImageInput
              image={socialCard.image}
              className="ml-2"
              onChange={(e) => {
                if (e.target.files !== null && e.target.files.length > 0) {
                  const file = e.target.files[0] as File;
                  const image = new Image();
                  image.src = URL.createObjectURL(file);

                  image.onload = function () {
                    const width = image.naturalWidth;
                    const height = image.naturalHeight;
                    if ((width > 1200 || width < 600) && (height > 675 || height < 450)) {
                      setImageTip(true)
                    } else {
                      setImageTip(false)
                    }
                    const size = file.size;
                    if (size / 1024 > 200) {
                      setImageDimensionsTip(true)
                    } else {
                      setImageDimensionsTip(false)
                    }
                  };
                  setSocialCard({
                    ...socialCard,
                    image: URL.createObjectURL(file),
                  });
                }
              }}
            />
            {imageTip &&
              <ShowMore title="Adjust image sizes to meet recommended dimensions for each platform:" description={
                <ul>
                  <li>- Facebook: 1200x630 px (1.91:1)</li>
                  <li>- Twitter: 1200x675 px (16:9)</li>
                  <li>- LinkedIn: 1200x627 px (1.91:1)</li>
                  <li>- Pinterest: min width 600 px (2:3)</li>
                </ul>
              }></ShowMore>
            }
            {imageDimensionsTip &&
              <ShowMore title="keep the file size under 200 KB to ensure faster loading times and better user experience.
            To achieve this, consider the following tips:" description={
                  <ul>
                    <li>- Optimize image compression: Save images in formats like JPEG or WebP, which typically offer better compression without significant loss of quality. Adjust the compression level to balance image quality and file size.</li>
                    <li>- Use image optimization tools: Tools like TinyPNG, ImageOptim, or Kraken.io can help compress your images without a noticeable loss of quality, reducing file size significantly.</li>
                    <li>- Remove unnecessary metadata: Image files often contain metadata like camera information, location data, and color profiles. Use tools to remove this unnecessary data, which can reduce the file size without affecting the image quality.</li>
                  </ul>
                }></ShowMore>
            }
          </div>
          <XTypesSelect setSocialCard={setSocialCard} socialCard={socialCard}/>
        </div>
        <Preview socialCard={socialCard} />
      </div>
    </form>
  );
}

export default PageForm;