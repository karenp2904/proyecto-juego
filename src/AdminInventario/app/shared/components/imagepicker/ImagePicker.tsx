import React, { useState, useEffect } from 'react';

interface ImagePickerProps {
  defaultImageUrl?: string;
  onChange: (file: File | null) => void;
}

const ImagePicker: React.FC<ImagePickerProps> = ({ defaultImageUrl, onChange }) => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (defaultImageUrl) {
      setImage(defaultImageUrl);
      getFile(defaultImageUrl)
        .then(file => {
          onChange(file);
        })
    }
  }, [defaultImageUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        onChange(file);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      onChange(null);
    }
  };

  const getFile = (url: string): Promise<File> => {
    return new Promise((res) => {
      fetch(url)
        .then(response => {
          response.blob()
            .then(blob => {
              res(new File([blob], "image.jpg", { type: "image/jpeg" }))
            })
        })
    });
  }

  return (
    <div className="max-w-full max-h-full relative flex flex-col items-center">
      {image && (
        <img 
          src={image} 
          alt="Selected" 
          className="max-w-full max-h-full object-scale-down rounded-lg" 
        />
      )}
      <label 
        htmlFor="file-upload" 
        className="absolute top-2 right-2 bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer shadow-lg hover:bg-blue-600">
        Choose Image
      </label>
      <input 
        id="file-upload"
        type="file" 
        accept="image/*" 
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImagePicker;
