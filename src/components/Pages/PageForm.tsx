import { type Dispatch, type SetStateAction } from "react";
import { ImageInput } from "../Inputs/Image";
import { LabelInput } from "../Inputs/Label";
import { TextAreaInput, TextInput } from "../Inputs/Text";
import Preview from "./Preview";
import { type SocialCardProps } from "./SocialCards/ISocialCard";
import { useState, useContext } from "react";
import projectContext from "src/contexts/projectContext";
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
  const [pathError, setPathError] = useState("");
  const [imageTip, setImageTip] = useState(false)
  const [imageDimensionsTip, setImageDimensionsTip] = useState(false)
  const { currentProject, setCurrentProject } = useContext(projectContext);
  const regexDomain = /^([a-zA-Z0-9\-{1,63}]+(\.[a-zA-Z]{2,})+)$/;

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
  function validatePath(path: string) {
    if (regexDomain.test(path)) {
      setPathError("")
    } else {
      setPathError("Invalid path!")
    }
    return;
  }
  return (
    <form className="mt-12 p-3" onSubmit={submitFunction}>
      <div className="mb-12">
        <div className=" flex justify-around px-32">
          <LabelInput label="Path" className="mb-2" />
          <div className="ml-5 w-10/12 flex">
            <TextInput
              displayText={currentProject.domain + "/"}
              className="ml-2 w-full"
              name="url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              onBlur={() => validatePath(url)}
            />
          </div>
          <button
            className="ml-12 w-1/12 items-center rounded-lg disabled:cursor-not-allowed bg-emerald-500 py-2.5 text-sm font-medium text-white shadow ring-offset-0 hover:bg-emerald-700 focus:outline-none"
            type="submit"
            onSubmit={submitFunction}
            disabled={isLoading || pathError.length > 0}
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
        {pathError && <p className="text-red-500 relative text-xs italic pt-2 cmb-12 px-44">{pathError}</p>}
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
            {imageTip && <p className="mt-1 text-orange-200">
              Adjust image sizes to meet recommended dimensions for each platform:
              <ul>
                <li className="hover:font-semibold">- Facebook: 1200x630 px (1.91:1)</li>
                <li className="hover:font-semibold">- Twitter: 1200x675 px (16:9)</li>
                <li className="hover:font-semibold">- LinkedIn: 1200x627 px (1.91:1)</li>
                <li className="hover:font-semibold">- Pinterest: min width 600 px (2:3)</li>
              </ul>
            </p>}
            {imageDimensionsTip && <p className="mt-1 text-orange-200">
              keep the file size under 200 KB to ensure faster loading times and better user experience.
              To achieve this, consider the following tips:
              <ul>
                <li className="hover:font-semibold">- Optimize image compression: Save images in formats like JPEG or WebP, which typically offer better compression without significant loss of quality. Adjust the compression level to balance image quality and file size.</li>
                <li className="hover:font-semibold">- Use image optimization tools: Tools like TinyPNG, ImageOptim, or Kraken.io can help compress your images without a noticeable loss of quality, reducing file size significantly.</li>
                <li className="hover:font-semibold">- Remove unnecessary metadata: Image files often contain metadata like camera information, location data, and color profiles. Use tools to remove this unnecessary data, which can reduce the file size without affecting the image quality.</li>
                <li className="hover:font-semibold">- Consider responsive images: If your website uses responsive design, you might want to serve different image sizes for different devices to ensure faster loading times on mobile devices with smaller screens and slower connections.</li>
                <li className="hover:font-semibold">- Remember, the most important factor is to ensure your images maintain good visual quality when shared on social media, so always test your images on various platforms to make sure they appear clear and sharp.</li>
              </ul>
            </p>}
          </div>
        </div>
        <Preview socialCard={socialCard} />
      </div>
    </form>
  );
};
export default PageForm;
