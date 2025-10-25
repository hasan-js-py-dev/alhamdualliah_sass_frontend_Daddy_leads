import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedStars from './AnimatedStars';
import { Button } from './ui/button';
import { MessageCircle } from 'lucide-react';

const FooterLandscapeDecoration: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-black min-h-[600px] pb-20" style={{ marginTop: '-1px' }}>
      {/* Curved transition from peachy section */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-20" style={{ marginTop: '-1px' }}>
        <svg
          className="relative block w-full h-[120px] md:h-[150px]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ transform: 'rotate(180deg)' }}
        >
          <path
            d="M0,0 C150,80 350,80 600,40 C850,0 1050,0 1200,40 L1200,120 L0,120 Z"
            fill="#FFBFA9"
          />
        </svg>
      </div>

      {/* Animated Stars Background */}
      <div className="absolute inset-0 z-10" style={{ marginTop: '100px' }}>
        <AnimatedStars />
      </div>

      {/* Get Started Button and Messaging Icons */}
      <div className="relative z-30 flex flex-col items-center justify-center min-h-[500px] px-6">
        <Link to="/access?p=signup" className="mb-12">
          <Button size="lg" className="bg-white text-black hover:bg-white/90 text-lg px-12 py-6 h-auto rounded-full shadow-2xl">
            Get Started
          </Button>
        </Link>

        {/* Messaging Apps Icons */}
        <div className="flex justify-center gap-8">
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 transition-transform hover:scale-110"
          >
            <div className="w-16 h-16 rounded-full bg-[#25D366] hover:bg-[#20bd5a] flex items-center justify-center transition-colors shadow-2xl">
              <MessageCircle className="w-8 h-8 text-white" fill="currentColor" />
            </div>
            <span className="text-sm text-white/90 group-hover:text-white transition-colors font-medium">WhatsApp</span>
          </a>
          
          <a
            href="https://t.me/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 transition-transform hover:scale-110"
          >
            <div className="w-16 h-16 rounded-full bg-[#0088cc] hover:bg-[#0077b5] flex items-center justify-center transition-colors shadow-2xl">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
              </svg>
            </div>
            <span className="text-sm text-white/90 group-hover:text-white transition-colors font-medium">Telegram</span>
          </a>
          
          <a
            href="https://discord.gg/yourinvite"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 transition-transform hover:scale-110"
          >
            <div className="w-16 h-16 rounded-full bg-[#5865F2] hover:bg-[#4752C4] flex items-center justify-center transition-colors shadow-2xl">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </div>
            <span className="text-sm text-white/90 group-hover:text-white transition-colors font-medium">Discord</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FooterLandscapeDecoration;


