import React from 'react';

export default function ImageUploader({ onUpload }) {
  return (
    <div className="border-dashed border-2 border-primary p-8 rounded-xl text-center">
      <p>Drag & drop an image or click to upload</p>
      <input type="file" accept="image/*" onChange={(e) => onUpload(e.target.files[0])} className="hidden" />
    </div>
  );
}
