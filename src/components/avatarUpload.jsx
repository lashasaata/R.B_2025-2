import { useRef, useState } from "react";

export const AvatarUpload = ({ setAvatarFile }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
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
    <div className="flex items-center gap-[15px] mb-[46px]">
      {previewUrl ? (
        <div className="w-[100px] h-[100px] rounded-full flex items-center justify-center border border-[#fff]">
          <img
            src={previewUrl}
            alt="Avatar preview"
            className="w-[98px] h-[98px] rounded-full "
          />
        </div>
      ) : (
        <div className="flex items-center justify-center w-[100px] h-[100px] rounded-full border  border-[#E1DFE1]">
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
      <p
        className="text-sm text-[#3e424a] hover:text-[#10151f] leading-[21px] cursor-pointer"
        onClick={handleClick}
      >
        {previewUrl ? "Upload new" : "Upload image"}
      </p>
      {previewUrl ? (
        <p
          className="text-sm text-[#3e424a] hover:text-[#10151f] leading-[21px] cursor-pointer"
          onClick={handleRemove}
        >
          Remove
        </p>
      ) : (
        ""
      )}
    </div>
  );
};
