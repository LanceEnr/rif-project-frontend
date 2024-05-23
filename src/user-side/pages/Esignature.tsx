import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { MdKeyboardArrowDown } from "react-icons/md";
import AuthContext from "../../auth/AuthContext";

interface Tag {
  id: number;
  value: string;
}

interface ESignatureData {
  professionalTitle: string;
  postNominalTitle: string;
  eSignaturePhoto: string;
}

async function uploadESignature(
  professionalTitle: string,
  postNominalTitle: string,
  file: File
) {
  const formData = new FormData();
  formData.append("professionalTitle", professionalTitle);
  formData.append("postNominalTitle", postNominalTitle);
  formData.append("file", file);

  const response = await fetch("http://localhost:8080/api/esignatures/upload", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.json();
}

async function fetchESignature() {
  const response = await fetch("http://localhost:8080/api/esignatures", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (response.ok) {
    return response.json();
  } else {
    return null;
  }
}

async function fetchESignatureImage() {
  const response = await fetch("http://localhost:8080/api/esignatures/image", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (response.ok) {
    const imageBlob = await response.blob();
    return URL.createObjectURL(imageBlob);
  } else {
    return null;
  }
}

const Esignature: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [tags, setTags] = useState<Tag[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [professionalTitle, setProfessionalTitle] = useState("");
  const [postNominalTitle, setPostNominalTitle] = useState("");

  useEffect(() => {
    const loadESignature = async () => {
      const data = await fetchESignature();
      if (data) {
        setProfessionalTitle(data.professionalTitle);
        setPostNominalTitle(data.postNominalTitle);
        if (data.postNominalTitle) {
          setTags(
            data.postNominalTitle
              .split(", ")
              .map((value: string, index: number) => ({
                id: index + 1,
                value,
              }))
          );
        }
      }

      const image = await fetchESignatureImage();
      if (image) {
        setPreviewUrl(image);
      }
    };
    loadESignature();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setFile(null);
    setPreviewUrl(null);
    const fileInput = document.getElementById(
      "dropzone-file"
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && event.currentTarget.value) {
      event.preventDefault();
      const newTagValue = event.currentTarget.value.trim();
      if (newTagValue && !tags.some((tag) => tag.value === newTagValue)) {
        const newTag: Tag = { id: tags.length + 1, value: newTagValue };
        setTags([...tags, newTag]);
        event.currentTarget.value = "";
      }
    }
  };

  const removeTag = (idToRemove: number) => {
    setTags(tags.filter((tag) => tag.id !== idToRemove));
  };

  const handleSubmit = async () => {
    if (file) {
      const response = await uploadESignature(
        professionalTitle,
        tags.map((tag) => tag.value).join(", "),
        file
      );
      console.log("Upload response:", response);
      alert("Signature uploaded successfully!");
    } else {
      alert("Please fill in all required fields and upload a file.");
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 min-h-screen my-24">
      <div className="flex flex-col items-right">
        <h2 className="font-bold text-5xl mt-5 tracking-tight">Settings</h2>
        <hr className="h-px my-8 border-yellow-500 border-2" />
      </div>
      <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
        <div className="col-span-2 hidden sm:block">
          <ul>
            <Link to="/prerequisites">
              <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-yellow-500 hover:text-yellow-500">
                Prerequisites
              </li>
            </Link>
            <li className="mt-5 cursor-pointer border-l-2 border-l-yellow-500 px-2 py-2 font-semibold text-yellow-500 transition hover:border-l-yellow-500 hover:text-yellow-500">
              E-Signature Upload
            </li>
          </ul>
        </div>
        <div className="col-span-8 overflow-hidden rounded-xl sm:bg-yellow-100 sm:px-8 sm:shadow-md">
          <div className="pt-4">
            <h1 className="py-2 text-2xl font-semibold">E-Signature Upload</h1>
            <div className="col-span-8 sm:hidden">
              <Dropdown
                label=""
                inline
                dismissOnClick={false}
                renderTrigger={() => (
                  <button
                    id="dropdownActionButton"
                    data-dropdown-toggle="dropdownAction"
                    className="inline-flex w-full py-2.5 items-center bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 rounded-lg text-sm px-3"
                    type="button"
                  >
                    <div className="flex justify-between w-full">
                      <span>E-signature Upload</span>
                      <MdKeyboardArrowDown className="h-5 w-5" />
                    </div>
                  </button>
                )}
              >
                <Dropdown.Item as={Link} to="/prerequisites">
                  Prerequisites
                </Dropdown.Item>
              </Dropdown>
            </div>
          </div>
          <hr className="mt-4 mb-8" />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="professionalTitle"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Professional Title
              </label>
              <select
                id="professionalTitle"
                name="professionalTitle"
                value={professionalTitle}
                onChange={(e) => setProfessionalTitle(e.target.value)}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5"
              >
                <option value="">Select a title</option>
                <option value="Mr.">Mr.</option>
                <option value="Ms.">Ms.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Asst. Prof.">Assistant Professor</option>
                <option value="Assoc. Prof.">Associate Professor</option>
                <option value="Prof.">Professor</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="postNominalTitle"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Post-Nominal Title
              </label>
              <input
                type="text"
                name="postNominalTitle"
                id="postNominalTitle"
                value={postNominalTitle}
                onChange={(e) => setPostNominalTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5"
                placeholder="e.g., PhD, MSc"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-yellow-200 px-2 py-1 rounded"
                  >
                    {tag.value}
                    <button
                      type="button"
                      onClick={() => removeTag(tag.id)}
                      className="text-sm text-gray-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <hr className="mt-4 mb-8" />
          <div className="mb-10">
            <label
              htmlFor="dropzone-file"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Upload your E-signature
            </label>
            <p
              id="helper-text-explanation"
              className="mt-2 text-sm text-gray-500 dark:text-gray-400"
            >
              By uploading your signature, you are providing explicit consent
              for us to store and use this data for the intended purpose. We are
              committed to protecting your personal data in compliance with the
              Data Privacy Act. Your signature will be stored securely and will
              not be shared with any third parties without your explicit
              consent.
            </p>
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className=" w-auto max-h-full object-cover rounded-lg mt-4"
                style={{ opacity: 0.85 }}
              />
            )}
            <div className="flex items-center justify-center w-full my-4">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      d="M13 13h3a3 3 0 00 0-6h-.025A5.56 5.56 0 0016 6.5 5.5 5.5 0 005.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 000 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">
                      Click to upload your E-signature
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG or JPG (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <button
              type="submit"
              className="text-white bg-yellow-500 hover:bg-yellow-600 font-medium rounded-lg text-sm px-5 py-2.5"
              onClick={handleSubmit}
            >
              Save all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Esignature;
