import React, { useRef, useState, useCallback } from 'react';
import { UploadIcon } from './Icons';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleContainerClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragEvents = useCallback((e: React.DragEvent<HTMLDivElement>, dragging: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(dragging);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    handleDragEvents(e, false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
        onImageUpload(file);
    }
  }, [onImageUpload, handleDragEvents]);

  const borderClass = isDragging ? 'border-brand-primary ring-2 ring-brand-primary/50' : 'border-slate-200';

  return (
    <div
      onClick={handleContainerClick}
      onDragEnter={(e) => handleDragEvents(e, true)}
      onDragLeave={(e) => handleDragEvents(e, false)}
      onDragOver={(e) => handleDragEvents(e, true)}
      onDrop={handleDrop}
      className={`w-full aspect-square bg-base-100 rounded-lg flex flex-col items-center justify-center text-center p-6 border-2 border-dashed ${borderClass} cursor-pointer transition-all duration-300 hover:bg-slate-50 hover:border-brand-primary/50 shadow-lg`}
      aria-label="Image uploader"
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />
      <div className="w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4 bg-base-200 rounded-full flex items-center justify-center">
        <UploadIcon className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />
      </div>
      <p className="text-sm sm:text-base font-semibold text-base-content-strong">Click or drag & drop</p>
      <p className="text-xs sm:text-sm text-slate-400 mt-1">PNG, JPG, or WEBP</p>
    </div>
  );
};