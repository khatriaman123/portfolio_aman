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
    link.download = 'Aman-Web-Craft-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* Resume buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={handlePreview}
          className="btn-icon w-auto px-3 py-2 text-xs font-medium text-gray-300 gap-1.5"
        >
          <Eye size={12} /> Preview
        </button>
        <button
          onClick={handleDownload}
          className="btn-icon w-auto px-3 py-2 text-xs font-medium text-gray-300 gap-1.5"
        >
          <Download size={12} /> Download
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl h-[85vh] glass-premium rounded-2xl overflow-hidden">
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <button
                onClick={handleDownload}
                className="btn-icon"
                aria-label="Download resume"
              >
                <Download size={16} />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="btn-icon"
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
