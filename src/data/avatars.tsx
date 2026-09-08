import React from 'react';

export interface AvatarOption {
  id: string;
  name: string;
  bg: string;
  border: string;
  icon: (size?: number) => React.ReactNode;
}

export const PRESET_AVATARS: AvatarOption[] = [
  {
    id: 'dog',
    name: 'Perrito Megatrol',
    bg: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
    border: '#0284c7',
    icon: (size = 32) => (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        {/* Cute Dog illustration */}
        {/* Ears */}
        <path d="M10 16C7 20 6 28 11 31C14 33 16 29 16 23C16 18 13 14 10 16Z" fill="#b45309" />
        <path d="M38 16C41 20 42 28 37 31C34 33 32 29 32 23C32 18 35 14 38 16Z" fill="#b45309" />
        {/* Head */}
        <ellipse cx="24" cy="25" rx="14" ry="13" fill="#f59e0b" />
        {/* Snout */}
        <ellipse cx="24" cy="28" rx="7" ry="5.5" fill="#fef3c7" />
        {/* Nose */}
        <path d="M22 26C22 25.5 26 25.5 26 26C26 27.5 24.5 29 24 29C23.5 29 22 27.5 22 26Z" fill="#1e293b" />
        {/* Mouth */}
        <path d="M24 29V31M22 31C22.5 32 23.5 32.5 24 32.5C24.5 32.5 25.5 32 26 31" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
        {/* Eyes */}
        <circle cx="19" cy="22" r="2.2" fill="#1e293b" />
        <circle cx="18.3" cy="21.3" r="0.8" fill="#ffffff" />
        <circle cx="29" cy="22" r="2.2" fill="#1e293b" />
        <circle cx="28.3" cy="21.3" r="0.8" fill="#ffffff" />
        {/* Cute cheeks */}
        <circle cx="15.5" cy="26" r="1.8" fill="#f43f5e" opacity="0.4" />
        <circle cx="32.5" cy="26" r="1.8" fill="#f43f5e" opacity="0.4" />
      </svg>
    )
  },
  {
    id: 'cat',
    name: 'Gatito Megatrol',
    bg: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
    border: '#ec4899',
    icon: (size = 32) => (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        {/* Cute Cat */}
        {/* Ears */}
        <polygon points="12,20 16,8 23,17" fill="#f97316" />
        <polygon points="14,18 17,11 21,17" fill="#fecdd3" />
        <polygon points="36,20 32,8 25,17" fill="#f97316" />
        <polygon points="34,18 31,11 27,17" fill="#fecdd3" />
        {/* Head */}
        <ellipse cx="24" cy="26" rx="14" ry="12" fill="#fb923c" />
        {/* Cheeks & Snout */}
        <ellipse cx="24" cy="29" rx="6" ry="4" fill="#fff7ed" />
        {/* Nose */}
        <polygon points="23,28 25,28 24,29.5" fill="#f43f5e" />
        {/* Whiskers */}
        <line x1="13" y1="28" x2="8" y2="27" stroke="#fdba74" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="13" y1="30" x2="8" y2="31" stroke="#fdba74" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="35" y1="28" x2="40" y2="27" stroke="#fdba74" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="35" y1="30" x2="40" y2="31" stroke="#fdba74" strokeWidth="1.5" strokeLinecap="round" />
        {/* Eyes */}
        <ellipse cx="18.5" cy="23" rx="2.5" ry="3" fill="#1e293b" />
        <circle cx="18" cy="22" r="1" fill="#ffffff" />
        <ellipse cx="29.5" cy="23" rx="2.5" ry="3" fill="#1e293b" />
        <circle cx="29" cy="22" r="1" fill="#ffffff" />
        {/* Cute blush */}
        <circle cx="15" cy="27" r="2" fill="#fb7185" opacity="0.45" />
        <circle cx="33" cy="27" r="2" fill="#fb7185" opacity="0.45" />
      </svg>
    )
  },
  {
    id: 'paw',
    name: 'Huellita Megatrol',
    bg: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
    border: '#10b981',
    icon: (size = 32) => (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        {/* Main pad */}
        <path d="M24 21C18.5 21 15 25 16 30C17 35 21 37 24 37C27 37 31 35 32 30C33 25 29.5 21 24 21Z" fill="#059669" />
        {/* Center shine */}
        <ellipse cx="24" cy="28" rx="4" ry="3" fill="#34d399" opacity="0.6" />
        {/* 4 Toe pads */}
        <ellipse cx="14" cy="19" rx="3.2" ry="4.5" transform="rotate(-20 14 19)" fill="#059669" />
        <ellipse cx="20.5" cy="14" rx="3.2" ry="4.8" transform="rotate(-7 20.5 14)" fill="#059669" />
        <ellipse cx="27.5" cy="14" rx="3.2" ry="4.8" transform="rotate(7 27.5 14)" fill="#059669" />
        <ellipse cx="34" cy="19" rx="3.2" ry="4.5" transform="rotate(20 34 19)" fill="#059669" />
      </svg>
    )
  },
  {
    id: 'vet_male',
    name: 'Doctor Veterinario',
    bg: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    border: '#0284c7',
    icon: (size = 32) => (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        {/* Lab coat collar background */}
        <path d="M14 43C14 36.5 17.5 33 24 33C30.5 33 34 36.5 34 43H14Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
        <path d="M20 33L24 38.5L28 33" fill="#0284c7" />
        {/* Stethoscope */}
        <path d="M16 25V30C16 34.5 19 37 24 37C29 37 32 34.5 32 30V25" stroke="#0369a1" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="16" cy="24" r="1.8" fill="#0284c7" />
        <circle cx="32" cy="24" r="1.8" fill="#0284c7" />
        <path d="M24 37V40M24 40C22 40 22 42.5 24 42.5C26 42.5 26 40 24 40Z" stroke="#0369a1" strokeWidth="1.8" strokeLinecap="round" />
        {/* Doctor Head */}
        <circle cx="24" cy="20" r="9" fill="#fed7aa" />
        {/* Hair peeking at temples */}
        <path d="M15 19C15 15 16.5 13 18 12.5C16.5 15.5 16.5 18.5 16.5 21H15V19Z" fill="#334155" />
        <path d="M33 19C33 15 31.5 13 30 12.5C31.5 15.5 31.5 18.5 31.5 21H33V19Z" fill="#334155" />
        {/* Medical Scrub Cap */}
        <path d="M15 17C15 11 18 9 24 9C30 9 33 11 33 17H15Z" fill="#0284c7" />
        <path d="M22.5 13H25.5M24 11.5V14.5" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
        {/* Face */}
        <circle cx="21" cy="20" r="1.2" fill="#1e293b" />
        <circle cx="27" cy="20" r="1.2" fill="#1e293b" />
        <path d="M22 23.8C22.6 24.8 23.4 25.1 24 25.1C24.6 25.1 25.4 24.8 26 23.8" stroke="#1e293b" strokeWidth="1.2" strokeLinecap="round" />
        {/* Cheeks */}
        <circle cx="18" cy="22" r="1.3" fill="#f43f5e" opacity="0.35" />
        <circle cx="30" cy="22" r="1.3" fill="#f43f5e" opacity="0.35" />
      </svg>
    )
  },
  {
    id: 'vet_female',
    name: 'Doctora Veterinaria',
    bg: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
    border: '#ec4899',
    icon: (size = 32) => (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        {/* Lab coat collar background */}
        <path d="M14 43C14 36.5 17.5 33 24 33C30.5 33 34 36.5 34 43H14Z" fill="#ffffff" stroke="#fbcfe8" strokeWidth="1.2" />
        <path d="M20 33L24 38.5L28 33" fill="#ec4899" />
        {/* Hair behind shoulders */}
        <path d="M14 22C13 27 14 33 16 35C17 33 16 27 16 23Z" fill="#854d0e" />
        <path d="M34 22C35 27 34 33 32 35C31 33 32 27 32 23Z" fill="#854d0e" />
        {/* Stethoscope */}
        <path d="M16 25V30C16 34.5 19 37 24 37C29 37 32 34.5 32 30V25" stroke="#db2777" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="16" cy="24" r="1.8" fill="#ec4899" />
        <circle cx="32" cy="24" r="1.8" fill="#ec4899" />
        <path d="M24 37V40M24 40C22 40 22 42.5 24 42.5C26 42.5 26 40 24 40Z" stroke="#db2777" strokeWidth="1.8" strokeLinecap="round" />
        {/* Head */}
        <circle cx="24" cy="20" r="9" fill="#fed7aa" />
        {/* Hair strands framing face */}
        <path d="M16 17C16 20 17 23 18 24C17 22 17 19 18 17Z" fill="#854d0e" />
        <path d="M32 17C32 20 31 23 30 24C31 22 31 19 30 17Z" fill="#854d0e" />
        {/* Medical Scrub Cap */}
        <path d="M15 17C15 11 18 9 24 9C30 9 33 11 33 17H15Z" fill="#ec4899" />
        <circle cx="24" cy="7.5" r="2.2" fill="#db2777" />
        <path d="M22.5 13H25.5M24 11.5V14.5" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
        {/* Face */}
        <circle cx="21" cy="20" r="1.2" fill="#1e293b" />
        <circle cx="20.6" cy="19.6" r="0.4" fill="#ffffff" />
        <circle cx="27" cy="20" r="1.2" fill="#1e293b" />
        <circle cx="26.6" cy="19.6" r="0.4" fill="#ffffff" />
        <path d="M22 23.8C22.6 24.8 23.4 25.1 24 25.1C24.6 25.1 25.4 24.8 26 23.8" stroke="#1e293b" strokeWidth="1.2" strokeLinecap="round" />
        {/* Rosy cheeks */}
        <circle cx="18" cy="22" r="1.6" fill="#f43f5e" opacity="0.45" />
        <circle cx="30" cy="22" r="1.6" fill="#f43f5e" opacity="0.45" />
      </svg>
    )
  },
  {
    id: 'leaf',
    name: 'Hoja Botánica Neem',
    bg: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
    border: '#16a34a',
    icon: (size = 32) => (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        {/* Botanical leaf */}
        <path d="M12 36C12 36 14 26 22 18C30 10 38 10 38 10C38 10 38 18 30 26C22 34 12 36 12 36Z" fill="#16a34a" />
        {/* Inner glow */}
        <path d="M17 32C17 32 19 25 25 19C31 13 36 12 36 12C36 12 34 18 28 24C22 30 17 32 17 32Z" fill="#4ade80" opacity="0.6" />
        {/* Main vein */}
        <path d="M12 36L34 14" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
        {/* Branch veins */}
        <path d="M20 28L25 27M24 24L30 22M28 20L32 17" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
      </svg>
    )
  },
  {
    id: 'shield',
    name: 'Escudo Clínico',
    bg: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
    border: '#0369a1',
    icon: (size = 32) => (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        {/* Shield */}
        <path d="M24 8L36 12V23C36 31 29 37 24 40C19 37 12 31 12 23V12L24 8Z" fill="#0284c7" />
        <path d="M24 11L33 14.5V23C33 29.5 28 34.5 24 37C20 34.5 15 29.5 15 23V14.5L24 11Z" fill="#0369a1" />
        {/* Medical Cross */}
        <rect x="21.5" y="18" width="5" height="14" rx="2.5" fill="#ffffff" />
        <rect x="17" y="22.5" width="14" height="5" rx="2.5" fill="#ffffff" />
      </svg>
    )
  },
  {
    id: 'star',
    name: 'Estrella Dorada',
    bg: 'linear-gradient(135deg, #fef9c3 0%, #fde047 100%)',
    border: '#eab308',
    icon: (size = 32) => (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        {/* Golden Star */}
        <polygon points="24,8 28.5,18 39,19.5 31,27 33,38 24,32.5 15,38 17,27 9,19.5 19.5,18" fill="#eab308" />
        <polygon points="24,12 27,19 34,20 29,25 30.5,33 24,29 17.5,33 19,25 14,20 21,19" fill="#fef08a" opacity="0.6" />
        {/* Little face on star */}
        <circle cx="21" cy="24" r="1.3" fill="#854d0e" />
        <circle cx="27" cy="24" r="1.3" fill="#854d0e" />
        <path d="M22 27C22.5 28 23.5 28.5 24 28.5C24.5 28.5 25.5 28 26 27" stroke="#854d0e" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="19" cy="26" r="1.2" fill="#f43f5e" opacity="0.5" />
        <circle cx="29" cy="26" r="1.2" fill="#f43f5e" opacity="0.5" />
      </svg>
    )
  }
];

export const getPresetAvatar = (avatarId?: string): AvatarOption | undefined => {
  if (!avatarId) return undefined;
  if (avatarId === 'vet') return PRESET_AVATARS.find(a => a.id === 'vet_male');
  if (avatarId === 'horse') return PRESET_AVATARS.find(a => a.id === 'dog');
  return PRESET_AVATARS.find(a => a.id === avatarId);
};

interface UserAvatarProps {
  avatarId?: string;
  name?: string;
  size?: number;
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ 
  avatarId, 
  name = 'Cliente', 
  size = 48,
  className = ''
}) => {
  // Check if preset avatar
  const preset = getPresetAvatar(avatarId);
  if (preset) {
    return (
      <div 
        className={`user-avatar-badge ${className}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          minWidth: `${size}px`,
          minHeight: `${size}px`,
          borderRadius: '50%',
          background: preset.bg,
          border: `2.5px solid ${preset.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
          overflow: 'hidden',
          flexShrink: 0
        }}
        title={preset.name}
      >
        {preset.icon(Math.round(size * 0.75))}
      </div>
    );
  }

  // Check if URL image
  if (avatarId && (avatarId.startsWith('http') || avatarId.startsWith('data:'))) {
    return (
      <img
        src={avatarId}
        alt={name}
        className={`user-avatar-img ${className}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          minWidth: `${size}px`,
          minHeight: `${size}px`,
          borderRadius: '50%',
          objectFit: 'cover',
          border: '2.5px solid #0084c7',
          boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
          flexShrink: 0
        }}
      />
    );
  }

  // Fallback: Initials with nice gradient
  const parts = name.trim().split(' ');
  const initials = parts.length >= 2 
    ? `${parts[0][0]}${parts[1][0]}`.toUpperCase() 
    : name.slice(0, 2).toUpperCase() || 'M';

  return (
    <div
      className={`user-avatar-initials ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        minWidth: `${size}px`,
        minHeight: `${size}px`,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #0084c7 0%, #0369a1 100%)',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 800,
        fontSize: `${Math.round(size * 0.42)}px`,
        border: '2.5px solid rgba(255, 255, 255, 0.25)',
        boxShadow: '0 4px 12px rgba(0, 132, 199, 0.25)',
        flexShrink: 0
      }}
      title={name}
    >
      {initials}
    </div>
  );
};
