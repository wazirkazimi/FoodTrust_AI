import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

const ImageUploader = ({ onImageSelect, selectedImage, onRemove }) => {
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      onImageSelect(file);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: false,
    maxSize: 5 * 1024 * 1024 // 5MB
  });

  const handleRemove = () => {
    setPreview(null);
    onRemove();
  };

  if (preview) {
    return (
      <Card className="relative">
        <img
          src={preview}
          alt="Selected product"
          className="w-full h-64 object-cover rounded-xl"
        />
        <button
          onClick={handleRemove}
          className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
        >
          <X size={16} />
        </button>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 mb-2">Image selected successfully!</p>
          <p className="text-xs text-gray-500">
            {selectedImage?.name} ({(selectedImage?.size / 1024 / 1024).toFixed(2)} MB)
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors duration-200 ${
          isDragActive
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 hover:border-primary-400 hover:bg-primary-50'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
            <Upload size={24} className="text-primary-600" />
          </div>
          <div>
            <p className="text-lg font-medium text-gray-800 mb-2">
              {isDragActive ? 'Drop the image here' : 'Upload Product Image'}
            </p>
            <p className="text-sm text-gray-600">
              Drag & drop a photo of your product label, or click to browse
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Supports JPG, PNG, WebP (max 5MB)
            </p>
          </div>
          <Button variant="outline" size="sm">
            <ImageIcon size={16} className="mr-2" />
            Choose File
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ImageUploader;