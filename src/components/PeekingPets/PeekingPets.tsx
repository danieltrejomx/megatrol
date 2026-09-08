import React, { useState } from 'react';
import './PeekingPets.css';

interface PeekingPetsProps {
  className?: string;
}

export const PeekingPets: React.FC<PeekingPetsProps> = ({ className = '' }) => {
  const [isWaved, setIsWaved] = useState(false);

  const handleClick = () => {
    setIsWaved(true);
    setTimeout(() => setIsWaved(false), 2500);
  };

  return (
    <div 
      className={`peeking-pets-container ${className} ${isWaved ? 'is-interacted' : ''}`} 
      onClick={handleClick}
      role="button"
      tabIndex={0}
      title="¡Tócame para saludar!"
      aria-label="Perrito y gatito saludando"
    >
      {/* Friendly Speech Bubble */}
      <div className="peeking-bubble">
        <span className="bubble-sparkle">✨</span>
        <span className="bubble-text">{isWaved ? '¡Guau! 🐶 ¡Miau! 🐱' : '¡Hola! 🐾'}</span>
        <div className="bubble-tail"></div>
      </div>

      {/* SVG Illustration */}
      <svg
        className="peeking-pets-svg"
        viewBox="0 0 210 95"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="petDropShadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.10" floodColor="#00325a" />
          </filter>
        </defs>

        {/* ── 1. PERRITO (LEFT) ── */}
        <g className="peeking-pup" filter="url(#petDropShadow)">
          {/* Floppy Left Ear */}
          <path
            className="pup-ear-left"
            d="M 28 32 C 14 36, 10 58, 20 68 C 26 73, 34 68, 36 52 Z"
            fill="#c9772a"
          />
          {/* Floppy Right Ear */}
          <path
            className="pup-ear-right"
            d="M 76 32 C 90 36, 94 58, 84 68 C 78 73, 70 68, 68 52 Z"
            fill="#c9772a"
          />

          {/* Pup Head */}
          <circle cx="52" cy="48" r="28" fill="#f6be7b" />

          {/* White forehead patch */}
          <path
            d="M 48 22 C 48 34, 46 44, 43 49 C 47 50, 57 50, 61 49 C 58 44, 56 34, 56 22 Z"
            fill="#fff8ee"
          />

          {/* Cheeks blush */}
          <ellipse cx="36" cy="54" rx="5" ry="3.5" fill="#f87171" opacity="0.45" />
          <ellipse cx="68" cy="54" rx="5" ry="3.5" fill="#f87171" opacity="0.45" />

          {/* Pup Eyes with highlights */}
          <ellipse cx="41" cy="45" rx="3.8" ry="4.5" fill="#1e293b" />
          <circle cx="39.5" cy="43.5" r="1.5" fill="#ffffff" />
          <circle cx="42.5" cy="46.5" r="0.8" fill="#ffffff" />

          <ellipse cx="63" cy="45" rx="3.8" ry="4.5" fill="#1e293b" />
          <circle cx="61.5" cy="43.5" r="1.5" fill="#ffffff" />
          <circle cx="64.5" cy="46.5" r="0.8" fill="#ffffff" />

          {/* Eyebrow dots */}
          <circle cx="41" cy="38" r="1.8" fill="#c9772a" />
          <circle cx="63" cy="38" r="1.8" fill="#c9772a" />

          {/* Snout */}
          <ellipse cx="52" cy="56" rx="13" ry="9" fill="#fff8ee" />

          {/* Nose */}
          <path
            d="M 47 51 C 47 48.5, 57 48.5, 57 51 C 57 54.5, 53 56, 52 56 C 51 56, 47 54.5, 47 51 Z"
            fill="#0f172a"
          />
          <ellipse cx="50" cy="50.5" rx="1.5" ry="0.8" fill="#ffffff" opacity="0.6" />

          {/* Smile and Tongue */}
          <path
            d="M 47 58 Q 52 61 57 58"
            stroke="#0f172a"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 49 59 C 49 66, 55 66, 55 59 Z"
            fill="#f43f5e"
          />

          {/* Left Paw Resting */}
          <g className="pup-paw-resting">
            <rect x="22" y="70" width="18" height="15" rx="7" fill="#fff8ee" />
            <line x1="28" y1="74" x2="28" y2="81" stroke="#cbd5e1" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="34" y1="74" x2="34" y2="81" stroke="#cbd5e1" strokeWidth="1.6" strokeLinecap="round" />
          </g>

          {/* Right Paw Waving (Saludando) */}
          <g className="pup-paw-waving">
            <path
              d="M 72 68 C 76 60, 84 48, 88 44 C 94 38, 102 44, 98 52 C 94 60, 84 70, 78 74 Z"
              fill="#f6be7b"
            />
            <ellipse cx="92" cy="46" rx="6.5" ry="6" fill="#fff8ee" />
            <path
              d="M 89 47 C 89 44, 95 44, 95 47 C 95 49.5, 92 51, 92 51 C 92 51, 89 49.5, 89 47 Z"
              fill="#f472b6"
            />
            <circle cx="88" cy="42" r="1.4" fill="#f472b6" />
            <circle cx="92" cy="40.5" r="1.4" fill="#f472b6" />
            <circle cx="96" cy="42" r="1.4" fill="#f472b6" />
          </g>
        </g>

        {/* ── 2. GATITO (RIGHT) ── */}
        <g className="peeking-kitty" filter="url(#petDropShadow)">
          {/* Pointy Ears */}
          <polygon points="120,40 128,18 140,36" fill="#e2e8f0" />
          <polygon points="123,38 128,23 137,35" fill="#fbcfe8" />

          <polygon points="152,36 164,18 172,40" fill="#e2e8f0" />
          <polygon points="155,35 164,23 169,38" fill="#fbcfe8" />

          {/* Kitty Head */}
          <circle cx="146" cy="50" r="26" fill="#f1f5f9" />

          {/* Stripes */}
          <path d="M 143 28 L 143 36" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
          <path d="M 146 26 L 146 38" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 149 28 L 149 36" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />

          {/* Cheeks */}
          <ellipse cx="132" cy="55" rx="5" ry="3.5" fill="#f87171" opacity="0.45" />
          <ellipse cx="160" cy="55" rx="5" ry="3.5" fill="#f87171" opacity="0.45" />

          {/* Whiskers */}
          <path d="M 132 54 Q 120 52 110 50" stroke="#94a3b8" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M 132 57 Q 118 58 108 60" stroke="#94a3b8" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M 132 60 Q 120 63 112 68" stroke="#94a3b8" strokeWidth="1.4" strokeLinecap="round" />

          <path d="M 160 54 Q 172 52 182 50" stroke="#94a3b8" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M 160 57 Q 174 58 184 60" stroke="#94a3b8" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M 160 60 Q 172 63 180 68" stroke="#94a3b8" strokeWidth="1.4" strokeLinecap="round" />

          {/* Happy Eyes ^_^ */}
          <path
            d="M 133 48 C 135 44, 140 44, 142 48"
            stroke="#0f172a"
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 150 48 C 152 44, 157 44, 159 48"
            stroke="#0f172a"
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
          />

          {/* Nose */}
          <polygon points="144,53 148,53 146,56" fill="#f472b6" />

          {/* Mouth */}
          <path
            d="M 142 58 Q 146 61 146 56 Q 146 61 150 58"
            stroke="#0f172a"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Kitty Left Paw Resting */}
          <g className="kitty-paw-resting">
            <rect x="122" y="71" width="16" height="14" rx="6" fill="#ffffff" />
            <line x1="127" y1="75" x2="127" y2="81" stroke="#cbd5e1" strokeWidth="1.4" strokeLinecap="round" />
            <line x1="133" y1="75" x2="133" y2="81" stroke="#cbd5e1" strokeWidth="1.4" strokeLinecap="round" />
          </g>

          {/* Kitty Right Paw (Greeting) */}
          <g className="kitty-paw-waving">
            <path
              d="M 162 70 C 166 62, 172 52, 178 48 C 183 44, 189 48, 186 55 C 182 62, 174 71, 168 75 Z"
              fill="#f1f5f9"
            />
            <ellipse cx="181" cy="51" rx="5.5" ry="5" fill="#ffffff" />
            <ellipse cx="181" cy="52" rx="3" ry="2.2" fill="#fbcfe8" />
            <circle cx="178" cy="48" r="1.1" fill="#fbcfe8" />
            <circle cx="181" cy="47" r="1.1" fill="#fbcfe8" />
            <circle cx="184" cy="48" r="1.1" fill="#fbcfe8" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default PeekingPets;
