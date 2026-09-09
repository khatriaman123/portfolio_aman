import { useState } from 'react';
import { X, Download, Eye } from 'lucide-react';

interface ResumeModalProps {
  playClick: () => void;
}

export default function ResumeModal({ playClick }: ResumeModalProps) {
  const [open, setOpen] = useState(false);

  const handlePreview = () => {
    playClick();
    setOpen(true);
  };

  const handleDownload = () => {
    playClick();
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Aman_Web_Craft_Resume.pdf';
    link.target = '_blank';
    link.click();
  };

  return (
    <>
      {/* Resume buttons - can be used in navbar or elsewhere */}
      <div className="flex items-center gap-2">
        <button
          onClick={handlePreview}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-300 border border-gray-700 rounded-lg hover:border-blue-500/50 hover:text-white transition-all"
        >
          <Eye size={12} /> Preview
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-300 border border-gray-700 rounded-lg hover:border-cyan-500/50 hover:text-white transition-all"
        >
          <Download size={12} /> Download
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl h-[85vh] glass rounded-2xl overflow-hidden">
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <button
                onClick={handleDownload}
                className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all"
                aria-label="Download resume"
              >
                <Download size={16} />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg bg-white/10 text-gray-400 hover:text-white hover:bg-white/20 transition-all"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
            <iframe
              src="/resume.pdf"
              className="w-full h-full"
              title="Resume Preview"
            />
          </div>
        </div>
      )}
    </>
  );
}
