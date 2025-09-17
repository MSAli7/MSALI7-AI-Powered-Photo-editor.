import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-2 h-2 rounded-full bg-current animate-[pulse_0.6s_ease-in-out_infinite] [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 rounded-full bg-current animate-[pulse_0.6s_ease-in-out_infinite] [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 rounded-full bg-current animate-[pulse_0.6s_ease-in-out_infinite]"></div>
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(0.75); opacity: 0.5; }
          50% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};