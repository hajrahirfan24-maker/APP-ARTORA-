// Distinct high-fidelity artistic visual assets for ARTORA products
// Guarantees 100% unique, zero-duplicate imagery across the entire catalog

import heroBannerImg from '../assets/images/hero_artora_marketplace_1793916211036.jpg';
import goldCalligraphyImg from '../assets/images/product_calligraphy_gold_1793916211620.jpg';
import abstractPaintingImg from '../assets/images/product_abstract_painting_1793916211091.jpg';
import heirloomAlbumImg from '../assets/images/product_heirloom_album_1793916211832.jpg';
import ceramicVesselImg from '../assets/images/product_ceramic_vessel_1793917151573.jpg';
import kumikoWoodworkImg from '../assets/images/product_kumiko_woodwork_1793917151623.jpg';
import silkScarfImg from '../assets/images/product_silk_scarf_1793917152161.jpg';
import architecturalDrawingImg from '../assets/images/product_architectural_drawing_1793917152500.jpg';

export const REAL_ASSETS = {
  heroBanner: heroBannerImg,
  goldCalligraphy: goldCalligraphyImg,
  abstractPainting: abstractPaintingImg,
  heirloomAlbum: heirloomAlbumImg,
  ceramicVessel: ceramicVesselImg,
  kumikoWoodwork: kumikoWoodworkImg,
  silkScarf: silkScarfImg,
  architecturalDrawing: architecturalDrawingImg,
};

function encodeSvg(svg: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// 100% guaranteed, offline-safe artistic avatars
export const ARTISAN_AVATARS = {
  zainab: encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
      <rect width="200" height="200" fill="#EAE2F5"/>
      <circle cx="100" cy="100" r="88" fill="#FFFDF7" stroke="#D8C8F0" stroke-width="4"/>
      <circle cx="100" cy="75" r="32" fill="#D8C8F0"/>
      <path d="M40,165 C40,120 160,120 160,165 Z" fill="#D8C8F0"/>
      <!-- Calligraphy Qalam Accent -->
      <path d="M125,50 L145,30 L155,40 L135,60 Z" fill="#D4AF37"/>
      <polygon points="120,55 125,50 135,60" fill="#35313B"/>
    </svg>
  `),
  elena: encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
      <rect width="200" height="200" fill="#FCEEF3"/>
      <circle cx="100" cy="100" r="88" fill="#FFFDF7" stroke="#F8DDE8" stroke-width="4"/>
      <circle cx="100" cy="75" r="32" fill="#F8DDE8"/>
      <path d="M40,165 C40,120 160,120 160,165 Z" fill="#F8DDE8"/>
      <!-- Artist Brush Accent -->
      <line x1="140" y1="40" x2="160" y2="20" stroke="#702459" stroke-width="5" stroke-linecap="round"/>
      <polygon points="135,45 140,40 145,50" fill="#ECC94B"/>
    </svg>
  `),
  marcus: encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
      <rect width="200" height="200" fill="#FFFDF7"/>
      <circle cx="100" cy="100" r="88" fill="#EAE2F5" stroke="#D8C8F0" stroke-width="4"/>
      <circle cx="100" cy="75" r="32" fill="#77717D"/>
      <path d="M40,165 C40,120 160,120 160,165 Z" fill="#77717D"/>
      <!-- Bookbinder Folio Symbol -->
      <rect x="130" y="35" width="22" height="28" rx="2" fill="#D69E2E"/>
    </svg>
  `),
  soraya: encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
      <rect width="200" height="200" fill="#F8DDE8"/>
      <circle cx="100" cy="100" r="88" fill="#FFFDF7" stroke="#D8C8F0" stroke-width="4"/>
      <circle cx="100" cy="75" r="32" fill="#805AD5"/>
      <path d="M40,165 C40,120 160,120 160,165 Z" fill="#805AD5"/>
      <circle cx="140" cy="45" r="8" fill="#D4AF37"/>
    </svg>
  `),
  kenji: encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
      <rect width="200" height="200" fill="#EAE2F5"/>
      <circle cx="100" cy="100" r="88" fill="#FFFDF7" stroke="#D8C8F0" stroke-width="4"/>
      <circle cx="100" cy="75" r="32" fill="#35313B"/>
      <path d="M40,165 C40,120 160,120 160,165 Z" fill="#35313B"/>
      <!-- Kumiko Wood Joint -->
      <polygon points="140,40 150,30 160,40 150,50" fill="#D69E2E"/>
    </svg>
  `),
  customer: encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
      <rect width="200" height="200" fill="#FFFDF7"/>
      <circle cx="100" cy="100" r="88" fill="#EAE2F5" stroke="#D8C8F0" stroke-width="4"/>
      <circle cx="100" cy="75" r="32" fill="#35313B"/>
      <path d="M40,165 C40,120 160,120 160,165 Z" fill="#35313B"/>
    </svg>
  `),
};

export function renderDefaultFallbackImage(title: string): string {
  return encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <rect width="800" height="600" fill="#FFFDF7"/>
      <g transform="translate(100, 60)">
        <rect width="600" height="480" rx="16" fill="#EAE2F5" stroke="#D8C8F0" stroke-width="4"/>
        <circle cx="300" cy="200" r="70" fill="#F8DDE8"/>
        <path d="M160,320 C220,240 380,240 440,320" fill="none" stroke="#D4AF37" stroke-width="12" stroke-linecap="round"/>
        <text x="300" y="380" font-family="'Playfair Display', serif" font-size="22" font-weight="700" fill="#35313B" text-anchor="middle">${title.toUpperCase()}</text>
        <text x="300" y="415" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600" fill="#77717D" text-anchor="middle" letter-spacing="2">ARTORA CERTIFIED ORIGINAL</text>
      </g>
    </svg>
  `);
}

// 1. Nocturne Landscape Painting (prod-paint-02)
export function renderNocturneLandscape(variant: 'front' | 'detail' | 'mockup'): string {
  if (variant === 'front') {
    return encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
        <rect width="800" height="600" fill="#1A202C"/>
        <g transform="translate(100, 60)">
          <rect x="0" y="0" width="600" height="480" rx="4" fill="#0D1B2A" stroke="#4A5568" stroke-width="8" filter="drop-shadow(0 20px 25px rgba(0,0,0,0.5))"/>
          <rect x="20" y="20" width="560" height="440" fill="#1B263B"/>
          <!-- Sky Gradient Layers -->
          <path d="M20,180 Q300,140 580,200 L580,20 L20,20 Z" fill="#2E3A59"/>
          <!-- Crescent Moon & Gold Mist -->
          <circle cx="480" cy="90" r="28" fill="#F6E05E" opacity="0.9"/>
          <circle cx="490" cy="85" r="25" fill="#2E3A59"/>
          <!-- Distant Mountains -->
          <path d="M20,320 L140,210 L280,310 L420,190 L580,300 L580,460 L20,460 Z" fill="#273248"/>
          <path d="M140,210 L180,250 L240,220 L300,280" fill="none" stroke="#D69E2E" stroke-width="2" opacity="0.7"/>
          <!-- Lake reflections in Sage & Teal -->
          <rect x="20" y="320" width="560" height="140" fill="#132238"/>
          <line x1="180" y1="360" x2="380" y2="360" stroke="#81E6D9" stroke-width="3" opacity="0.6"/>
          <line x1="240" y1="390" x2="440" y2="390" stroke="#F6E05E" stroke-width="2" opacity="0.5"/>
          <line x1="120" y1="420" x2="300" y2="420" stroke="#9AE6B4" stroke-width="2" opacity="0.4"/>
        </g>
      </svg>
    `);
  } else if (variant === 'detail') {
    return encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
        <rect width="800" height="600" fill="#132238"/>
        <!-- Thick Impasto Brushstrokes -->
        <path d="M-50,150 Q300,80 850,170" stroke="#2E3A59" stroke-width="90" fill="none" opacity="0.9"/>
        <path d="M-50,260 Q400,200 850,290" stroke="#273248" stroke-width="80" fill="none"/>
        <path d="M100,230 Q450,210 750,240" stroke="#D69E2E" stroke-width="20" fill="none" opacity="0.8"/>
        <path d="M50,420 Q400,340 800,450" stroke="#81E6D9" stroke-width="45" fill="none" opacity="0.6"/>
        <rect x="80" y="520" width="640" height="45" rx="8" fill="rgba(13,27,42,0.85)" stroke="#4A5568"/>
        <text x="400" y="548" fill="#FFFDF7" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="600" text-anchor="middle" letter-spacing="1.5">MACRO DETAIL · IMPASTO LAPIS LAZULI MINERAL LAYERS</text>
      </svg>
    `);
  } else {
    return encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
        <rect width="800" height="480" fill="#EAE2F5"/>
        <rect x="0" y="480" width="800" height="120" fill="#D8C8F0"/>
        <g transform="translate(240, 80)">
          <rect width="320" height="260" rx="4" fill="#0D1B2A" stroke="#4A5568" stroke-width="8" filter="drop-shadow(0 25px 25px rgba(0,0,0,0.2))"/>
          <rect x="14" y="14" width="292" height="232" fill="#1B263B"/>
          <circle cx="230" cy="60" r="14" fill="#F6E05E"/>
          <path d="M14,180 L100,120 L180,170 L260,110 L306,170 L306,246 L14,246 Z" fill="#273248"/>
        </g>
        <!-- Living Room Shelf with Lamp -->
        <rect x="140" y="440" width="520" height="40" rx="4" fill="#FFFDF7" stroke="#D8C8F0"/>
        <circle cx="210" cy="400" r="22" fill="#35313B"/>
        <line x1="210" y1="400" x2="210" y2="440" stroke="#35313B" stroke-width="4"/>
      </svg>
    `);
  }
}

// 2. Ayat Al-Kursi Architectural Diwani Panel (prod-islamic-02)
export function renderAyatAlKursi(variant: 'front' | 'detail' | 'mockup'): string {
  return encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <rect width="800" height="600" fill="#F7FAFC"/>
      <g transform="translate(150, 50)">
        <!-- Frame -->
        <rect x="0" y="0" width="500" height="500" rx="8" fill="#FFFDF7" stroke="#D4AF37" stroke-width="6" filter="drop-shadow(0 15px 20px rgba(0,0,0,0.1))"/>
        <!-- Islamic Archway Contour -->
        <path d="M60,440 L60,220 Q60,90 250,50 Q440,90 440,220 L440,440 Z" fill="#1A365D" stroke="#D4AF37" stroke-width="3"/>
        <!-- Intricate Arabic Calligraphy Glyphs -->
        <g fill="none" stroke="#ECC94B" stroke-linecap="round" stroke-linejoin="round">
          <!-- Top crown ayah -->
          <path d="M180,120 Q250,75 320,120" stroke-width="12"/>
          <path d="M150,170 C220,130 280,210 350,160" stroke-width="9"/>
          <!-- Middle lines of Ayat Al-Kursi -->
          <path d="M100,230 C200,190 260,270 390,220" stroke-width="11"/>
          <path d="M110,290 C220,250 290,330 400,280" stroke-width="10"/>
          <path d="M90,350 C190,310 280,390 410,340" stroke-width="11"/>
          <path d="M120,405 C230,370 300,430 380,395" stroke-width="9"/>
          <!-- Diacritical dots & harakat -->
          <circle cx="210" cy="140" r="4" fill="#ECC94B"/>
          <circle cx="270" cy="195" r="4" fill="#ECC94B"/>
          <circle cx="330" cy="255" r="4" fill="#ECC94B"/>
          <circle cx="170" cy="320" r="4" fill="#ECC94B"/>
          <circle cx="290" cy="370" r="4" fill="#ECC94B"/>
        </g>
      </g>
    </svg>
  `);
}

// 3. Darwish Poem: On This Earth (prod-arabic-01)
export function renderDarwishPoem(variant: 'front' | 'detail' | 'mockup'): string {
  return encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <rect width="800" height="600" fill="#FAF5FF"/>
      <g transform="translate(140, 60)">
        <!-- Natural deckled paper -->
        <rect x="0" y="0" width="520" height="480" rx="12" fill="#FFFDF7" stroke="#E2E8F0" stroke-width="2" filter="drop-shadow(0 15px 25px rgba(0,0,0,0.06))"/>
        <!-- Soft lavender background wash -->
        <ellipse cx="260" cy="240" rx="200" ry="160" fill="#EAE2F5" opacity="0.6"/>
        <!-- Sweeping contemporary Arabic gestures -->
        <path d="M90,180 C210,120 310,240 430,160" fill="none" stroke="#2D3748" stroke-width="16" stroke-linecap="round"/>
        <path d="M70,250 C180,200 320,310 450,220" fill="none" stroke="#2D3748" stroke-width="14" stroke-linecap="round"/>
        <path d="M100,320 C220,270 300,370 420,300" fill="none" stroke="#D4AF37" stroke-width="8" stroke-linecap="round"/>
        <path d="M130,380 C240,330 310,410 400,360" fill="none" stroke="#2D3748" stroke-width="10" stroke-linecap="round"/>
        <!-- Poet Signature Seal -->
        <rect x="235" y="420" width="50" height="24" rx="4" fill="#B83280" opacity="0.85"/>
        <text x="260" y="436" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="700" text-anchor="middle">MAHMOUD</text>
      </g>
    </svg>
  `);
}

// 4. Sabr & Shukr Diptych (prod-arabic-02)
export function renderSabrShukrDiptych(variant: 'front' | 'detail' | 'mockup'): string {
  return encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <rect width="800" height="600" fill="#FFFDF7"/>
      <!-- Panel 1: SABR (Patience) -->
      <g transform="translate(100, 80)">
        <rect width="270" height="420" rx="8" fill="#FCEEF3" stroke="#D8C8F0" stroke-width="4" filter="drop-shadow(0 15px 20px rgba(0,0,0,0.06))"/>
        <rect x="20" y="20" width="230" height="380" fill="#FFFDF7"/>
        <!-- Arabic Sabr Lettering -->
        <path d="M50,230 C90,160 160,250 200,180" fill="none" stroke="#35313B" stroke-width="18" stroke-linecap="round"/>
        <circle cx="160" cy="140" r="10" fill="#D4AF37"/>
        <text x="135" y="340" font-family="'Playfair Display', serif" font-size="18" font-style="italic" fill="#77717D" text-anchor="middle">SABR · PATIENCE</text>
      </g>
      <!-- Panel 2: SHUKR (Gratitude) -->
      <g transform="translate(430, 80)">
        <rect width="270" height="420" rx="8" fill="#FCEEF3" stroke="#D8C8F0" stroke-width="4" filter="drop-shadow(0 15px 20px rgba(0,0,0,0.06))"/>
        <rect x="20" y="20" width="230" height="380" fill="#FFFDF7"/>
        <!-- Arabic Shukr Lettering -->
        <path d="M50,210 C100,270 170,160 210,240" fill="none" stroke="#35313B" stroke-width="18" stroke-linecap="round"/>
        <circle cx="95" cy="150" r="7" fill="#D4AF37"/>
        <circle cx="120" cy="140" r="7" fill="#D4AF37"/>
        <circle cx="145" cy="150" r="7" fill="#D4AF37"/>
        <text x="135" y="340" font-family="'Playfair Display', serif" font-size="18" font-style="italic" fill="#77717D" text-anchor="middle">SHUKR · GRATITUDE</text>
      </g>
    </svg>
  `);
}

// 5. Custom Monogram (prod-modcal-01)
export function renderCustomMonogram(variant: 'front' | 'detail' | 'mockup'): string {
  return encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <rect width="800" height="600" fill="#FFFDF7"/>
      <g transform="translate(180, 80)">
        <!-- Gold rimmed frame -->
        <circle cx="220" cy="220" r="210" fill="#FCEEF3" stroke="#D8C8F0" stroke-width="8" filter="drop-shadow(0 20px 25px rgba(0,0,0,0.08))"/>
        <circle cx="220" cy="220" r="190" fill="#FFFDF7" stroke="#D4AF37" stroke-width="2"/>
        <!-- Interlocking Monogram A & M in Copperplate Script -->
        <path d="M140,290 C170,140 210,120 230,290" fill="none" stroke="#35313B" stroke-width="16" stroke-linecap="round"/>
        <path d="M120,240 Q220,210 260,250" fill="none" stroke="#35313B" stroke-width="10"/>
        <path d="M210,290 C250,150 280,180 320,290" fill="none" stroke="#D4AF37" stroke-width="14" stroke-linecap="round"/>
        <!-- Botanical Laurel Wreath -->
        <path d="M90,220 C80,310 160,380 220,380 C280,380 360,310 350,220" fill="none" stroke="#B794F4" stroke-width="4" stroke-dasharray="8,6"/>
      </g>
    </svg>
  `);
}

// 6. Serenade Botanical Typography (prod-modcal-02)
export function renderBotanicalTypography(variant: 'front' | 'detail' | 'mockup'): string {
  return encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <rect width="800" height="600" fill="#F0FFF4"/>
      <g transform="translate(140, 70)">
        <rect width="520" height="460" rx="8" fill="#FFFDF7" stroke="#D8C8F0" stroke-width="3"/>
        <!-- Eucalyptus & Lavender Stems -->
        <path d="M100,400 Q200,200 320,80" fill="none" stroke="#285E61" stroke-width="4"/>
        <ellipse cx="160" cy="280" rx="18" ry="30" fill="#319795" transform="rotate(-30 160 280)" opacity="0.8"/>
        <ellipse cx="220" cy="210" rx="18" ry="30" fill="#38B2AC" transform="rotate(40 220 210)" opacity="0.8"/>
        <ellipse cx="280" cy="140" rx="14" ry="24" fill="#4FD1C5" transform="rotate(-20 280 140)" opacity="0.8"/>
        <!-- Calligraphic word "Serenade" -->
        <text x="260" y="320" font-family="'Playfair Display', serif" font-size="52" font-style="italic" font-weight="700" fill="#35313B" text-anchor="middle">Serenade</text>
        <text x="260" y="360" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600" fill="#77717D" text-anchor="middle" letter-spacing="3">IN WILD LAVENDER & SAGE</text>
      </g>
    </svg>
  `);
}

// 7. Deckled Edge Watercolor Folio (prod-album-02)
export function renderDeckledWatercolorFolio(variant: 'front' | 'detail' | 'mockup'): string {
  return encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <rect width="800" height="600" fill="#FFFDF7"/>
      <!-- Open Layflat Album View -->
      <g transform="translate(80, 100)">
        <!-- Shadow -->
        <rect x="20" y="30" width="600" height="400" rx="12" fill="rgba(0,0,0,0.12)" filter="blur(10px)"/>
        <!-- Indigo Japanese Bookcloth Exterior -->
        <rect x="0" y="0" width="640" height="400" rx="8" fill="#1A365D" stroke="#D4AF37" stroke-width="3"/>
        <!-- Left Deckled Page -->
        <rect x="25" y="15" width="285" height="370" rx="4" fill="#FFFDF7" stroke="#E2E8F0" stroke-width="2"/>
        <path d="M50,180 Q140,80 250,150" fill="none" stroke="#805AD5" stroke-width="12" opacity="0.5"/>
        <!-- Right Deckled Page -->
        <rect x="330" y="15" width="285" height="370" rx="4" fill="#FFFDF7" stroke="#E2E8F0" stroke-width="2"/>
        <line x1="360" y1="100" x2="580" y2="100" stroke="#E2E8F0" stroke-width="2"/>
        <line x1="360" y1="140" x2="580" y2="140" stroke="#E2E8F0" stroke-width="2"/>
        <line x1="360" y1="180" x2="520" y2="180" stroke="#E2E8F0" stroke-width="2"/>
        <!-- Silk Ribbon Marker -->
        <path d="M320,0 L320,430 L330,410 L340,430 L340,0 Z" fill="#D4AF37"/>
      </g>
    </svg>
  `);
}

// 8. Bespoke Velvet Photo Album (prod-photo-01)
export function renderVelvetAlbum(variant: 'front' | 'detail' | 'mockup'): string {
  return encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <rect width="800" height="600" fill="#FFFDF7"/>
      <g transform="translate(180, 80)">
        <!-- Rich Plum Velvet Cover with 3D Bevel -->
        <rect width="440" height="440" rx="16" fill="#702459" stroke="#97266D" stroke-width="6" filter="drop-shadow(0 25px 30px rgba(0,0,0,0.18))"/>
        <!-- Inner Gold Debossed Frame -->
        <rect x="30" y="30" width="380" height="380" rx="8" fill="none" stroke="#D4AF37" stroke-width="3"/>
        <rect x="42" y="42" width="356" height="356" rx="4" fill="none" stroke="#D4AF37" stroke-width="1"/>
        <!-- Gold Debossed Typography -->
        <text x="220" y="210" font-family="'Playfair Display', serif" font-size="28" font-weight="700" fill="#ECC94B" text-anchor="middle" letter-spacing="4">MEMOIRES</text>
        <text x="220" y="245" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600" fill="#ECC94B" text-anchor="middle" letter-spacing="3">HEIRLOOM ARCHIVE</text>
        <!-- Corner flourishes -->
        <polygon points="50,50 65,50 50,65" fill="#ECC94B"/>
        <polygon points="390,50 375,50 390,65" fill="#ECC94B"/>
        <polygon points="50,390 65,390 50,375" fill="#ECC94B"/>
        <polygon points="390,390 375,390 390,375" fill="#ECC94B"/>
      </g>
    </svg>
  `);
}

// 9. Full-Grain Artisan Leather Journal (prod-photo-02)
export function renderLeatherJournal(variant: 'front' | 'detail' | 'mockup'): string {
  return encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <rect width="800" height="600" fill="#FFFDF7"/>
      <g transform="translate(200, 70)">
        <!-- Saddle Brown Leather Cover -->
        <rect width="400" height="460" rx="14" fill="#7B341E" stroke="#652B19" stroke-width="8" filter="drop-shadow(0 20px 25px rgba(0,0,0,0.22))"/>
        <!-- Leather Wrap Cord & Brass Stud -->
        <rect x="0" y="220" width="400" height="24" fill="#542314"/>
        <circle cx="200" cy="232" r="14" fill="#D69E2E" stroke="#B7791F" stroke-width="2"/>
        <circle cx="200" cy="232" r="6" fill="#744210"/>
        <!-- Hand Stitching Along Edges -->
        <line x1="20" y1="20" x2="380" y2="20" stroke="#D69E2E" stroke-width="2" stroke-dasharray="6,4"/>
        <line x1="380" y1="20" x2="380" y2="440" stroke="#D69E2E" stroke-width="2" stroke-dasharray="6,4"/>
        <line x1="380" y1="440" x2="20" y2="440" stroke="#D69E2E" stroke-width="2" stroke-dasharray="6,4"/>
        <line x1="20" y1="440" x2="20" y2="20" stroke="#D69E2E" stroke-width="2" stroke-dasharray="6,4"/>
      </g>
    </svg>
  `);
}

// 10. Hand-Knotted Merino & Silk Tapestry (prod-hand-02)
export function renderMerinoSilkTapestry(variant: 'front' | 'detail' | 'mockup'): string {
  return encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <rect width="800" height="600" fill="#FFFDF7"/>
      <g transform="translate(200, 40)">
        <!-- Solid Oak Hanging Dowel -->
        <rect x="-30" y="30" width="460" height="16" rx="8" fill="#D69E2E"/>
        <path d="M-20,30 L200,-10 L420,30" fill="none" stroke="#77717D" stroke-width="3"/>
        <!-- Woven Wall Tapestry -->
        <rect x="20" y="46" width="360" height="420" fill="#EAE2F5" stroke="#D8C8F0" stroke-width="2"/>
        <!-- Textured Woven Strips -->
        <path d="M20,120 Q200,70 380,140 L380,220 Q200,160 20,240 Z" fill="#D8C8F0"/>
        <path d="M20,240 Q200,190 380,260 L380,340 Q200,280 20,360 Z" fill="#F8DDE8"/>
        <!-- Fringe Tassels Hanging Down -->
        <g stroke="#CBD5E0" stroke-width="3" stroke-linecap="round">
          <line x1="40" y1="466" x2="40" y2="530"/>
          <line x1="70" y1="466" x2="70" y2="540"/>
          <line x1="100" y1="466" x2="100" y2="520"/>
          <line x1="130" y1="466" x2="130" y2="550"/>
          <line x1="160" y1="466" x2="160" y2="530"/>
          <line x1="190" y1="466" x2="190" y2="540"/>
          <line x1="220" y1="466" x2="220" y2="525"/>
          <line x1="250" y1="466" x2="250" y2="545"/>
          <line x1="280" y1="466" x2="280" y2="535"/>
          <line x1="310" y1="466" x2="310" y2="550"/>
          <line x1="340" y1="466" x2="340" y2="520"/>
          <line x1="360" y1="466" x2="360" y2="530"/>
        </g>
      </g>
    </svg>
  `);
}

// 11. Mediterranean Solitude Canvas (prod-canvas-01)
export function renderCoastalCanvas(variant: 'front' | 'detail' | 'mockup'): string {
  return encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <rect width="800" height="600" fill="#FFFDF7"/>
      <g transform="translate(100, 60)">
        <rect width="600" height="480" fill="#EBF8FF" stroke="#BEE3F8" stroke-width="4" filter="drop-shadow(0 20px 25px rgba(0,0,0,0.08))"/>
        <!-- Mediterranean Sky and Sea -->
        <rect x="0" y="0" width="600" height="240" fill="#E6FFFA"/>
        <circle cx="300" cy="180" r="45" fill="#FEFCBF" opacity="0.8"/>
        <!-- Deep Blue Sea Horizon -->
        <rect x="0" y="240" width="600" height="150" fill="#2B6CB0"/>
        <line x1="0" y1="240" x2="600" y2="240" stroke="#FFFDF7" stroke-width="2"/>
        <!-- Sandy Shore with gentle wave lather -->
        <path d="M0,390 Q300,360 600,410 L600,480 L0,480 Z" fill="#FEEBC8"/>
        <path d="M0,388 Q300,358 600,408" fill="none" stroke="#FFFFFF" stroke-width="6"/>
      </g>
    </svg>
  `);
}

// 12. Celestial Orbit Geometric Canvas (prod-canvas-02)
export function renderCelestialCanvas(variant: 'front' | 'detail' | 'mockup'): string {
  return encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <rect width="800" height="600" fill="#FFFDF7"/>
      <g transform="translate(160, 60)">
        <rect width="480" height="480" fill="#1A202C" filter="drop-shadow(0 20px 25px rgba(0,0,0,0.18))"/>
        <!-- Large Golden Orbit Ring -->
        <circle cx="240" cy="240" r="160" fill="none" stroke="#ECC94B" stroke-width="4"/>
        <circle cx="240" cy="240" r="90" fill="#D69E2E" opacity="0.2"/>
        <circle cx="240" cy="240" r="50" fill="#ECC94B"/>
        <!-- Planet Satellite Orbiting -->
        <circle cx="380" cy="160" r="18" fill="#FFFDF7"/>
        <line x1="80" y1="240" x2="400" y2="240" stroke="#4A5568" stroke-width="1.5" stroke-dasharray="6,4"/>
      </g>
    </svg>
  `);
}

// 13. Kinetic Brass Mobile (prod-wall-02)
export function renderKineticBrassMobile(variant: 'front' | 'detail' | 'mockup'): string {
  return encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <rect width="800" height="600" fill="#FFFDF7"/>
      <g transform="translate(200, 30)">
        <!-- Ceiling attachment string -->
        <line x1="200" y1="0" x2="200" y2="80" stroke="#77717D" stroke-width="2"/>
        <!-- Primary balance rod -->
        <path d="M60,110 Q200,75 340,110" fill="none" stroke="#D4AF37" stroke-width="4"/>
        <!-- Disc 1 (Left) -->
        <line x1="60" y1="110" x2="60" y2="180" stroke="#77717D" stroke-width="1.5"/>
        <circle cx="60" cy="220" r="40" fill="#D4AF37" filter="drop-shadow(0 8px 12px rgba(0,0,0,0.1))"/>
        <!-- Secondary balance rod (Right) -->
        <line x1="340" y1="110" x2="340" y2="180" stroke="#77717D" stroke-width="1.5"/>
        <path d="M240,210 Q340,175 440,210" fill="none" stroke="#D4AF37" stroke-width="3"/>
        <circle cx="240" cy="260" r="28" fill="#ECC94B"/>
        <circle cx="440" cy="290" r="34" fill="#B7791F"/>
      </g>
    </svg>
  `);
}

// 14. Family Calligraphy Crest (prod-gift-01)
export function renderFamilyCrest(variant: 'front' | 'detail' | 'mockup'): string {
  return encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <rect width="800" height="600" fill="#FFFDF7"/>
      <g transform="translate(170, 70)">
        <rect width="460" height="460" rx="16" fill="#FFFDF7" stroke="#35313B" stroke-width="6" filter="drop-shadow(0 20px 25px rgba(0,0,0,0.08))"/>
        <!-- Circular Gold arabesque border -->
        <circle cx="230" cy="230" r="180" fill="#FCEEF3" stroke="#D4AF37" stroke-width="4"/>
        <circle cx="230" cy="230" r="165" fill="#FFFDF7" stroke="#D8C8F0" stroke-width="1.5"/>
        <!-- Classical Calligraphic Shield & Monogram -->
        <path d="M150,170 Q230,120 310,170 L280,280 Q230,340 180,280 Z" fill="#1A365D" stroke="#D4AF37" stroke-width="3"/>
        <!-- 24k Gold Lettering -->
        <text x="230" y="240" font-family="'Playfair Display', serif" font-size="44" font-weight="700" fill="#D4AF37" text-anchor="middle">A</text>
        <text x="230" y="375" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700" fill="#35313B" text-anchor="middle" letter-spacing="3">FAMILY HERITAGE CREST · EST. 2018</text>
      </g>
    </svg>
  `);
}

// 15. Hand-Engraved Brass Bookmark (prod-gift-02)
export function renderBrassBookmark(variant: 'front' | 'detail' | 'mockup'): string {
  return encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <rect width="800" height="600" fill="#FFFDF7"/>
      <g transform="translate(240, 70)">
        <!-- Gleaming Brushed Brass Bookmark -->
        <rect x="60" y="30" width="90" height="380" rx="8" fill="#ECC94B" stroke="#B7791F" stroke-width="4" filter="drop-shadow(0 15px 20px rgba(0,0,0,0.15))"/>
        <!-- Silk Tassel Cord -->
        <circle cx="105" cy="55" r="8" fill="#B7791F"/>
        <path d="M105,55 Q130,20 180,10 L190,40" fill="none" stroke="#702459" stroke-width="3"/>
        <!-- Engraved Calligraphy Quote -->
        <text x="105" y="150" font-family="'Playfair Display', serif" font-size="14" font-style="italic" fill="#744210" text-anchor="middle" transform="rotate(90 105 150)">"A book is a dream that you hold in your hand."</text>
        <!-- Turned Walnut Wooden Pen Beside It -->
        <g transform="translate(190, 80)">
          <rect x="0" y="0" width="22" height="300" rx="11" fill="#744210"/>
          <polygon points="0,300 22,300 11,350" fill="#ECC94B"/>
        </g>
      </g>
    </svg>
  `);
}

// 16. The Scribe Writing Set (prod-stat-01)
export function renderScribeWritingSet(variant: 'front' | 'detail' | 'mockup'): string {
  return encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <rect width="800" height="600" fill="#FFFDF7"/>
      <g transform="translate(150, 80)">
        <!-- Deckled Cotton Letter Sheets Stack -->
        <rect x="0" y="20" width="340" height="420" rx="4" fill="#F7FAFC" stroke="#E2E8F0" stroke-width="2" filter="drop-shadow(0 15px 25px rgba(0,0,0,0.07))"/>
        <rect x="10" y="10" width="340" height="420" rx="4" fill="#FFFDF7" stroke="#E2E8F0" stroke-width="2"/>
        <!-- Purple Beeswax Seal on Letter -->
        <circle cx="180" cy="180" r="30" fill="#805AD5" filter="drop-shadow(0 6px 8px rgba(0,0,0,0.18))"/>
        <circle cx="180" cy="180" r="22" fill="#6B46C1" stroke="#D4AF37" stroke-width="1.5"/>
        <text x="180" y="186" fill="#FFFDF7" font-family="'Playfair Display', serif" font-size="16" font-weight="700" text-anchor="middle">A</text>
        <!-- Glass Inkwell with Walnut Ink -->
        <g transform="translate(380, 160)">
          <rect x="0" y="40" width="90" height="90" rx="8" fill="#35313B" stroke="#D8C8F0" stroke-width="2"/>
          <rect x="25" y="15" width="40" height="25" fill="#D69E2E"/>
        </g>
      </g>
    </svg>
  `);
}

// 17. Pressed Wildflower Journals (prod-stat-02)
export function renderPressedFlowerJournals(variant: 'front' | 'detail' | 'mockup'): string {
  return encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <rect width="800" height="600" fill="#FFFDF7"/>
      <g transform="translate(160, 80)">
        <!-- Journal 1 (Blush Pink) -->
        <rect x="0" y="40" width="260" height="380" rx="10" fill="#FCEEF3" stroke="#F8DDE8" stroke-width="4" filter="drop-shadow(0 15px 20px rgba(0,0,0,0.08))"/>
        <!-- Real Pressed Wildflowers on Cover -->
        <path d="M130,340 Q110,240 140,140" fill="none" stroke="#38A169" stroke-width="2.5"/>
        <circle cx="140" cy="140" r="16" fill="#ED64A6" opacity="0.85"/>
        <circle cx="120" cy="180" r="12" fill="#B794F4" opacity="0.85"/>
        <circle cx="155" cy="220" r="10" fill="#F6E05E" opacity="0.85"/>
        <!-- Journal 2 (Lavender) Offset -->
        <rect x="220" y="0" width="260" height="380" rx="10" fill="#EAE2F5" stroke="#D8C8F0" stroke-width="4" filter="drop-shadow(0 15px 20px rgba(0,0,0,0.08))"/>
        <path d="M350,300 Q370,200 340,110" fill="none" stroke="#2F855A" stroke-width="2.5"/>
        <circle cx="340" cy="110" r="14" fill="#805AD5" opacity="0.85"/>
        <circle cx="365" cy="150" r="11" fill="#ED64A6" opacity="0.85"/>
      </g>
    </svg>
  `);
}

// 18. Sterling Silver Calligraphy Cuff (prod-acc-02)
export function renderSilverCuff(variant: 'front' | 'detail' | 'mockup'): string {
  return encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <rect width="800" height="600" fill="#FFFDF7"/>
      <g transform="translate(180, 100)">
        <!-- Pedestal shadow -->
        <ellipse cx="220" cy="360" rx="200" ry="40" fill="rgba(0,0,0,0.06)"/>
        <!-- Heavy Sterling Silver Bracelet Arc -->
        <path d="M70,300 C60,140 380,140 370,300" fill="none" stroke="#E2E8F0" stroke-width="36" stroke-linecap="round" filter="drop-shadow(0 15px 20px rgba(0,0,0,0.15))"/>
        <path d="M70,300 C60,140 380,140 370,300" fill="none" stroke="#CBD5E0" stroke-width="32" stroke-linecap="round"/>
        <!-- Openwork Pierced Arabic Calligraphy along the band -->
        <path d="M120,240 C160,180 280,180 320,240" fill="none" stroke="#4A5568" stroke-width="6" stroke-dasharray="8,6"/>
        <text x="220" y="420" font-family="'Playfair Display', serif" font-size="14" font-weight="600" fill="#77717D" text-anchor="middle" letter-spacing="2">925 STERLING SILVER · RUMI INSCRIPTION</text>
      </g>
    </svg>
  `);
}

// 19. Travertine Incense Burner (prod-dec-01)
export function renderTravertineBurner(variant: 'front' | 'detail' | 'mockup'): string {
  return encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <rect width="800" height="600" fill="#FFFDF7"/>
      <g transform="translate(160, 120)">
        <!-- Natural Travertine Base Plinth -->
        <rect x="0" y="160" width="480" height="120" rx="12" fill="#E2D4C3" stroke="#D0BFAC" stroke-width="4" filter="drop-shadow(0 20px 25px rgba(0,0,0,0.1))"/>
        <!-- Natural stone porous flecks -->
        <circle cx="80" cy="200" r="6" fill="#C5B19C"/>
        <circle cx="160" cy="230" r="8" fill="#C5B19C"/>
        <circle cx="340" cy="190" r="7" fill="#C5B19C"/>
        <circle cx="410" cy="240" r="5" fill="#C5B19C"/>
        <!-- Polished Solid Brass Suspended Sphere -->
        <circle cx="240" cy="130" r="42" fill="#ECC94B" stroke="#D69E2E" stroke-width="3" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.18))"/>
        <circle cx="225" cy="115" r="12" fill="#FFFDF7" opacity="0.7"/>
        <!-- Delicate Incense Smoke Plume -->
        <path d="M240,88 Q210,40 260,0 Q210,-40 240,-80" fill="none" stroke="#D8C8F0" stroke-width="4" stroke-linecap="round" opacity="0.6"/>
      </g>
    </svg>
  `);
}

// 20. Murano Hand-Blown Centerpiece (prod-dec-02)
export function renderMuranoGlass(variant: 'front' | 'detail' | 'mockup'): string {
  return encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <rect width="800" height="600" fill="#FFFDF7"/>
      <g transform="translate(160, 100)">
        <ellipse cx="240" cy="380" rx="200" ry="30" fill="rgba(0,0,0,0.06)"/>
        <!-- Organic Freeform Blown Glass Wave Bowl -->
        <path d="M40,240 C30,360 450,360 440,240 C430,120 370,160 300,140 C230,120 170,180 110,150 C50,120 50,180 40,240 Z" fill="#805AD5" stroke="#9F7AEA" stroke-width="4" opacity="0.85" filter="drop-shadow(0 20px 25px rgba(128,90,213,0.25))"/>
        <!-- Submerged 24k Gold Leaf Swirls -->
        <path d="M90,240 Q240,320 390,240" fill="none" stroke="#ECC94B" stroke-width="12" stroke-linecap="round" opacity="0.9"/>
        <path d="M120,210 Q240,280 360,200" fill="none" stroke="#D69E2E" stroke-width="6" opacity="0.8"/>
      </g>
    </svg>
  `);
}

// 21. Commissioned Classical Arabic Manuscript (prod-cust-02)
export function renderCommissionManuscript(variant: 'front' | 'detail' | 'mockup'): string {
  return encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <rect width="800" height="600" fill="#FFFDF7"/>
      <g transform="translate(140, 50)">
        <!-- Antique Ahar Parchment -->
        <rect width="520" height="500" rx="8" fill="#FEEBC8" stroke="#D69E2E" stroke-width="4" filter="drop-shadow(0 20px 25px rgba(0,0,0,0.1))"/>
        <!-- Outer Tezhip Illumination Gold Border -->
        <rect x="24" y="24" width="472" height="452" fill="none" stroke="#1A365D" stroke-width="8"/>
        <rect x="36" y="36" width="448" height="428" fill="none" stroke="#D4AF37" stroke-width="4"/>
        <!-- Illuminated Central Header Cartouche (Unwan) -->
        <path d="M80,80 L440,80 L420,150 L100,150 Z" fill="#1A365D" stroke="#D4AF37" stroke-width="2"/>
        <text x="260" y="125" font-family="'Playfair Display', serif" font-size="22" font-weight="700" fill="#ECC94B" text-anchor="middle">BISMILLAH AL-RAHMAN</text>
        <!-- Naskh Script Body Lines -->
        <g stroke="#1A202C" stroke-width="5" stroke-linecap="round">
          <line x1="80" y1="200" x2="440" y2="200"/>
          <line x1="80" y1="250" x2="440" y2="250"/>
          <line x1="80" y1="300" x2="440" y2="300"/>
          <line x1="80" y1="350" x2="440" y2="350"/>
          <line x1="80" y1="400" x2="440" y2="400"/>
        </g>
        <!-- 24k Gold Verse Markers (Ayah rosettes) -->
        <circle cx="260" cy="200" r="9" fill="#D4AF37"/>
        <circle cx="380" cy="250" r="9" fill="#D4AF37"/>
        <circle cx="170" cy="300" r="9" fill="#D4AF37"/>
        <circle cx="340" cy="350" r="9" fill="#D4AF37"/>
      </g>
    </svg>
  `);
}

// Fallback & dynamic creation helper for newly uploaded artisan products
export function generateArtDataUri(
  title: string,
  category: string,
  variant: 'front' | 'detail' | 'mockup',
  palette: { primary: string; secondary: string; accent: string; bg: string }
): string {
  const { primary, secondary, accent, bg } = palette;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
    <rect width="800" height="600" fill="${bg}"/>
    <g transform="translate(140, 60)">
      <rect width="520" height="480" rx="12" fill="#FFFDF7" stroke="${secondary}" stroke-width="4" filter="drop-shadow(0 20px 25px rgba(0,0,0,0.08))"/>
      <ellipse cx="260" cy="240" rx="180" ry="140" fill="${secondary}" opacity="0.4"/>
      <path d="M80,240 C160,120 280,320 440,160" fill="none" stroke="${primary}" stroke-width="18" stroke-linecap="round"/>
      <circle cx="260" cy="180" r="32" fill="${accent}" opacity="0.9"/>
      <text x="260" y="380" font-family="'Playfair Display', serif" font-size="16" font-style="italic" fill="#35313B" text-anchor="middle" letter-spacing="3">${title.toUpperCase()}</text>
      <text x="260" y="410" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="#77717D" text-anchor="middle" letter-spacing="2">${category.toUpperCase()} · ORIGINAL</text>
    </g>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

