import React, { useState, useCallback } from 'react';
import { editImageWithNanoBANA } from './services/geminiService';
import { ImageUploader } from './components/ImageUploader';
import { ImagePreview } from './components/ImagePreview';
import { Loader } from './components/Loader';
import { EditIcon, SparklesIcon, DownloadIcon, TrashIcon, ArrowRightIcon, LightbulbIcon } from './components/Icons';

interface ImageFile {
  dataUrl: string;
  mimeType: string;
}

const EDITING_SUGGESTIONS = [
  'Add a birthday hat',
  'Make it a vintage photograph',
  'Change background to a cyberpunk city',
  'Add a cute cat sitting nearby',
  'Change the season to winter',
  'Apply a watercolor painting effect',
];

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<ImageFile | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modelTextResponse, setModelTextResponse] = useState<string>('');

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImage({
        dataUrl: reader.result as string,
        mimeType: file.type,
      });
      setEditedImage(null);
      setError(null);
      setModelTextResponse('');
    };
    reader.onerror = () => {
      setError('Failed to read the image file.');
    };
    reader.readAsDataURL(file);
  };

  const clearImages = useCallback(() => {
    setOriginalImage(null);
    setEditedImage(null);
    setModelTextResponse('');
    setError(null);
  }, []);

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!originalImage || !prompt.trim()) {
      setError('Please upload an image and provide an editing prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEditedImage(null);
    setModelTextResponse('');

    try {
      const base64Data = originalImage.dataUrl.split(',')[1];
      const result = await editImageWithNanoBANA(
        base64Data,
        originalImage.mimeType,
        prompt
      );
      
      if (result.imageUrl) {
        setEditedImage(result.imageUrl);
      } else {
        setError("The model did not return an image. Please try a different prompt.");
      }
      setModelTextResponse(result.textResponse || 'The model did not provide a text response.');
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to edit image: ${errorMessage}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, prompt]);

  const handleDownload = useCallback(() => {
    if (!editedImage) return;
    const link = document.createElement('a');
    link.href = editedImage;
    const extension = editedImage.split(';')[0].split('/')[1] || 'png';
    link.download = `edited-image-${Date.now()}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [editedImage]);

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 animate-fade-in">
      <header className="w-full max-w-7xl text-center mb-8">
        <div className="inline-flex items-center gap-3">
          <h1 className="text-4xl sm:text-5xl font-bold text-base-content-strong">
            MSALI7
          </h1>
        </div>
        <p className="mt-2 text-base text-slate-600">
          Transform your photos with AI, powered by <code className="bg-base-300/70 px-1.5 py-1 rounded-md text-sm text-slate-700 font-medium">gemini-2.5-flash-image-preview</code>.
        </p>
      </header>

      <main className="w-full max-w-7xl flex-grow grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-start gap-y-8 gap-x-6">
        {/* Original Image Panel */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-center text-base-content-strong">Original</h2>
          {originalImage ? (
            <ImagePreview src={originalImage.dataUrl} alt="Original image">
               <button
                  onClick={clearImages}
                  className="absolute top-3 right-3 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                  aria-label="Clear image"
                  title="Clear image"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
            </ImagePreview>
          ) : (
            <ImageUploader onImageUpload={handleImageUpload} />
          )}
        </div>

        {/* Control Panel */}
        <div className="w-full lg:w-96 bg-base-100 rounded-2xl shadow-xl p-6 self-start mt-0 lg:mt-10 backdrop-blur-sm border border-slate-200">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
             <div className="relative">
              <label htmlFor="prompt-input" className="block text-sm font-medium text-slate-700 mb-2">Your Editing Instruction</label>
              <div className="relative">
                 <EditIcon className="w-5 h-5 absolute top-3.5 left-3.5 text-slate-400" />
                 <textarea
                    id="prompt-input"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., 'Add a birthday hat...'"
                    className="w-full p-3 pl-10 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200 resize-none text-base-content-strong placeholder-slate-400"
                    rows={3}
                    disabled={isLoading}
                  />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading || !originalImage || !prompt.trim()}
              className="w-full flex items-center justify-center gap-3 text-white font-semibold py-3 px-6 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-100 focus:ring-brand-primary transition-all duration-300 disabled:from-slate-300 disabled:to-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed shadow-lg shadow-brand-primary/30 hover:shadow-xl hover:shadow-brand-primary/40 hover:-translate-y-1"
            >
              {isLoading ? (
                <>
                  <Loader />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <span>Generate</span>
                  <ArrowRightIcon className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Suggestion Section */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
              <LightbulbIcon className="w-5 h-5 text-slate-400" />
              Need inspiration? Try one of these:
            </h3>
            <div className="flex flex-wrap gap-2">
              {EDITING_SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  disabled={isLoading}
                  className="px-2.5 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm bg-slate-100 text-slate-600 rounded-full hover:bg-slate-200 hover:text-slate-800 disabled:opacity-50 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {error && <div className="mt-4 p-3 bg-red-100 text-red-700 border border-red-200 rounded-lg text-sm">{error}</div>}
        </div>

        {/* Edited Image Panel */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-center text-base-content-strong">Edited</h2>
          <div className="w-full aspect-square bg-base-100 rounded-lg flex items-center justify-center relative overflow-hidden border border-slate-200 shadow-lg">
            {isLoading && (
              <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center z-10 backdrop-blur-sm">
                <Loader />
                <p className="mt-4 text-slate-500">AI is creating magic...</p>
              </div>
            )}
            {editedImage ? (
               <ImagePreview src={editedImage} alt="Edited image">
                 <button
                    onClick={handleDownload}
                    className="absolute top-3 right-3 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                    aria-label="Download edited image"
                    title="Download edited image"
                  >
                    <DownloadIcon className="w-5 h-5" />
                  </button>
               </ImagePreview>
            ) : (
              <div className="text-center text-slate-400 p-4">
                <SparklesIcon className="w-12 h-12 mx-auto mb-2 opacity-30" />
                Your edited image will appear here.
              </div>
            )}
          </div>
          {modelTextResponse && !isLoading && (
             <div className="mt-2">
                <blockquote className="p-4 bg-slate-50 border-l-4 border-brand-primary rounded-r-lg text-slate-600 italic">
                  {modelTextResponse}
                </blockquote>
             </div>
           )}
        </div>
      </main>
    </div>
  );
};

export default App;