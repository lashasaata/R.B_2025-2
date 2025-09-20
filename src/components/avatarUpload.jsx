import { useRef, useState } from "react";

export const AvatarUpload = ({ setAvatarFile, error, setErrors }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          avatar: "Please upload an image file.",
        }));
        return;
      }

      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        setErrors((prev) => ({
          ...prev,
          avatar: "File is too large! Max 2MB allowed.",
        }));
        return;
      }
      // updates the errors state in order to triger avatar error
      setErrors((prev) => ({
        ...prev,
        avatar: "",
      }));

      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result);
      };
      reader.readAsDataURL(file);
      setAvatarFile(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setPreviewUrl(null);
    setAvatarFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex gap-[15px] mb-[46px]">
      {previewUrl ? (
        <div className="w-[100px] h-[100px] rounded-full overflow-hidden border border-[#fff]">
          <img
            src={previewUrl}
            alt="Avatar preview"
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div
          className={`${
            error ? "border-[#ff4000]" : "border-[#E1DFE1]"
          } flex items-center justify-center w-[100px] h-[100px] rounded-full border`}
        >
          <img src="/camera.svg" alt="Upload" className="w-5 h-5 " />
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      <div className="flex flex-col gap-2 mt-10">
        <div className="flex items-center gap-[15px]">
          <p
            className="text-sm text-[#3e424a] hover:text-[#10151f] leading-[21px] cursor-pointer"
            onClick={handleClick}
          >
            {previewUrl ? "Upload new" : "Upload image"}
          </p>
          {previewUrl ? (
            <p
              className="text-sm text-[#ff4000] hover:opacity-80 leading-[21px] cursor-pointer"
              onClick={handleRemove}
            >
              Remove
            </p>
          ) : (
            ""
          )}
        </div>
        {error ? (
          <span className="text-[10px] text-[#FF4000] font-[300] leading-[15px]">
            {error}
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
