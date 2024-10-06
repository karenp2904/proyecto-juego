import * as React from 'react';

interface TextAreaProps {
  value: string;
  label:string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
}

const TextArea: React.FC<TextAreaProps> = ({ value, onChange, placeholder = "Type your message here...", rows = 4, label }) => {
  return (
    <div className="flex flex-col gap-2 w-full h-full p-2 ">
      <label htmlFor="textarea" className="text-gray-700 font-semibold">
        {label}
      </label>
      <textarea
        id="textarea"
        //rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          p-3
          border rounded-md
          border-gray-300
          shadow-sm
          focus:outline-none
          focus:ring-2 focus:ring-blue-500
          resize-none
          transition-all
          bg-gray-50
          text-gray-800
          placeholder-gray-400
          h-full
        "
      />
    </div>
  );
};

export default TextArea;
