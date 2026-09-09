import { useState, useEffect } from 'react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1800;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(elapsed / duration, 1);
      setProgress(p * 100);
      
      if (p < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setVisible(false);
          setTimeout(onComplete, 500);
        }, 200);
      }
    };
    
    requestAnimationFrame(animate);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className={`loading-screen ${!visible ? 'hidden' : ''}`}>
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-2 border-blue-500/30 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full border border-cyan-400/50 flex items-center justify-center animate-pulse">
              <span className="text-2xl font-bold gradient-text">A</span>
            </div>
          </div>
          <div className="absolute inset-0 rounded-full animate-ping opacity-20 border border-blue-500/30" />
        </div>
        
        <div className="text-center">
          <h2 className="text-lg font-semibold tracking-wider gradient-text">AMAN WEB CRAFT</h2>
          <p className="text-xs text-gray-400 mt-1 tracking-widest">WE BUILD YOUR ONLINE PRESENCE</p>
        </div>
        
        <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
