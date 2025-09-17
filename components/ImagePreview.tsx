import React from 'react';

interface ImagePreviewProps {
  src: string;
  alt: string;
  children?: React.ReactNode;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ src, alt, children }) => {
  return (
    <div className="group w-full aspect-square bg-white rounded-lg overflow-hidden flex items-center justify-center relative border border-slate-200 transition-all duration-300 shadow-lg hover:shadow-xl">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain"
      />
      {children}
    </div>
  );
};