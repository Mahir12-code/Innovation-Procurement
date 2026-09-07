import React from 'react';

export function MaharashtraMapSvg({ className = "w-full h-full opacity-20" }) {
  return (
    <svg
      viewBox="0 0 800 650"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Maharashtra State Detailed Silhouette */}
      <path
        d="M130,120 
           C160,110 210,125 260,115 
           C310,105 370,110 420,95 
           C470,80 520,70 580,75 
           C630,80 670,95 720,110 
           C750,120 780,145 775,175 
           C770,205 735,230 710,255 
           C685,280 660,310 635,340 
           C610,370 590,410 560,440 
           C530,470 490,495 450,515 
           C410,535 365,545 320,550 
           C280,555 240,545 205,530 
           C170,515 145,485 130,450 
           C115,415 105,375 95,335 
           C85,295 75,250 85,210 
           C95,170 105,130 130,120 Z"
        fill="url(#orangeGlowGradient)"
        stroke="#ea580c"
        strokeWidth="2.5"
        strokeDasharray="4 2"
      />

      {/* Internal Region Divisions & Innovation Nodes */}
      {/* Konkan Coastline */}
      <path
        d="M95,210 C105,270 115,350 130,450"
        stroke="#f97316"
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />
      {/* Western Maharashtra / Pune Division */}
      <path
        d="M160,280 C220,320 280,380 320,460"
        stroke="#ea580c"
        strokeWidth="1.5"
        strokeOpacity="0.3"
      />
      {/* Marathwada Division */}
      <path
        d="M280,240 C360,290 440,340 490,420"
        stroke="#ea580c"
        strokeWidth="1.5"
        strokeOpacity="0.3"
      />
      {/* Vidarbha Division */}
      <path
        d="M450,150 C520,200 600,240 680,280"
        stroke="#f97316"
        strokeWidth="1.5"
        strokeOpacity="0.35"
      />
      {/* North Maharashtra / Khandesh */}
      <path
        d="M220,130 C270,180 320,210 390,230"
        stroke="#ea580c"
        strokeWidth="1.5"
        strokeOpacity="0.3"
      />

      {/* Strategic Innovation Pilot Zone Hubs (Mumbai, Pune, Nagpur, Aurangabad, Nashik) */}
      {/* Mumbai */}
      <g transform="translate(110, 310)">
        <circle r="8" fill="#ea580c" fillOpacity="0.4" className="animate-ping" />
        <circle r="4" fill="#f97316" />
        <text x="10" y="4" fill="#fb923c" fontSize="11" fontWeight="800" fontFamily="sans-serif">MUMBAI</text>
      </g>

      {/* Pune */}
      <g transform="translate(190, 375)">
        <circle r="7" fill="#ea580c" fillOpacity="0.4" className="animate-ping" style={{ animationDuration: '3s' }} />
        <circle r="4" fill="#f97316" />
        <text x="10" y="4" fill="#fb923c" fontSize="11" fontWeight="800" fontFamily="sans-serif">PUNE</text>
      </g>

      {/* Nagpur */}
      <g transform="translate(620, 160)">
        <circle r="7" fill="#ea580c" fillOpacity="0.4" className="animate-ping" style={{ animationDuration: '4s' }} />
        <circle r="4" fill="#f97316" />
        <text x="10" y="4" fill="#fb923c" fontSize="11" fontWeight="800" fontFamily="sans-serif">NAGPUR</text>
      </g>

      {/* Chhatrapati Sambhajinagar (Aurangabad) */}
      <g transform="translate(320, 260)">
        <circle r="6" fill="#ea580c" fillOpacity="0.4" />
        <circle r="3.5" fill="#f97316" />
        <text x="9" y="4" fill="#fb923c" fontSize="10" fontWeight="700" fontFamily="sans-serif">SAMBHAJINAGAR</text>
      </g>

      {/* Nashik */}
      <g transform="translate(180, 220)">
        <circle r="6" fill="#ea580c" fillOpacity="0.4" />
        <circle r="3.5" fill="#f97316" />
        <text x="9" y="4" fill="#fb923c" fontSize="10" fontWeight="700" fontFamily="sans-serif">NASHIK</text>
      </g>

      {/* Interconnecting Innovation Grid Lines */}
      <path
        d="M110,310 L190,375 L320,260 L620,160 M180,220 L320,260"
        stroke="#ea580c"
        strokeWidth="1.2"
        strokeDasharray="6 4"
        strokeOpacity="0.5"
      />

      <defs>
        <radialGradient id="orangeGlowGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ea580c" stopOpacity="0.18" />
          <stop offset="60%" stopColor="#f97316" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.01" />
        </radialGradient>
      </defs>
    </svg>
  );
}
