// Social-Profile Florian Zimmer
const SOCIALS = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/florianzimmer",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <rect x="2.5" y="2.5" width="19" height="19" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4.3" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@florian_zimmer",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
        <path d="M16.5 3c.32 2.02 1.6 3.62 3.5 3.9v2.64c-1.27 0-2.46-.4-3.5-1.05v6.06c0 3-2.42 5.45-5.4 5.45S5.7 17.6 5.7 14.6s2.42-5.45 5.4-5.45c.32 0 .63.03.93.08v2.74c-.3-.1-.6-.16-.93-.16-1.48 0-2.68 1.22-2.68 2.72s1.2 2.72 2.68 2.72 2.69-1.22 2.69-2.72V3h2.71z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/c/FlorianZimmerMagic",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
        <path d="M23 12s0-3.2-.4-4.73a2.5 2.5 0 0 0-1.76-1.77C19.31 5.1 12 5.1 12 5.1s-7.31 0-8.84.4A2.5 2.5 0 0 0 1.4 7.27C1 8.8 1 12 1 12s0 3.2.4 4.73a2.5 2.5 0 0 0 1.76 1.77c1.53.4 8.84.4 8.84.4s7.31 0 8.84-.4a2.5 2.5 0 0 0 1.76-1.77C23 15.2 23 12 23 12zM9.75 15.27V8.73L15.5 12l-5.75 3.27z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/florianzimmer",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
        <path d="M14 9h3V6h-3c-1.66 0-3 1.34-3 3v2H8.5v3H11v7h3v-7h2.5l.5-3H14V9.5c0-.28.22-.5.5-.5z" />
      </svg>
    ),
  },
];

export default function SocialLinks({ variant = "footer" }: { variant?: "footer" | "follow" }) {
  return (
    <div className={variant === "follow" ? "social-follow" : "footer-social"}>
      {SOCIALS.map(s => (
        <a key={s.name} href={s.url} className="social-btn" target="_blank" rel="noopener noreferrer" aria-label={s.name}>
          {s.icon}
        </a>
      ))}
    </div>
  );
}
