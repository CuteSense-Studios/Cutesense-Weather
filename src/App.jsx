import React, { useState, useEffect } from 'react';

// --- Lucide Icons (Inline SVGs for single-file portability) ---
const IconSun = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
  </svg>
);

const IconCloud = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
  </svg>
);

const IconCloudRain = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/>
  </svg>
);

const IconCloudLightning = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973"/><path d="m13 12-3 5h4l-3 5"/>
  </svg>
);

const IconSnowflake = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m20 16-4-4 4-4"/><path d="m4 8 4 4-4 4"/><path d="m16 4-4 4-4-4"/><path d="m8 20 4-4 4 4"/><path d="M12 2v20"/><path d="M2 12h20"/>
  </svg>
);

const IconMapPin = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

const IconRefreshCw = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>
  </svg>
);

const IconHeart = ({ className, fill = "none" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
  </svg>
);

const IconScale = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h18"/>
  </svg>
);

const IconSparkles = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3 1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3Z"/>
  </svg>
);

// --- Weather Logic ---
const WEATHER_DICTIONARY = {
  clear: {
    codes: [0],
    label: 'Sunny',
    mood: 'Joyful & Bouncy ✨',
    description: 'Perfect day for a cute picnic or sketching outside!',
    icon: IconSun,
    theme: { bg: 'bg-[#f0e6d2]', accent: 'bg-yellow-300' }
  },
  cloudy: {
    codes: [1, 2, 3],
    label: 'Cloudy',
    mood: 'Cozy & Calm 🍵',
    description: 'A gentle sky. Great time to doodle near the window.',
    icon: IconCloud,
    theme: { bg: 'bg-[#e2e8f0]', accent: 'bg-slate-300' }
  },
  fog: {
    codes: [45, 48],
    label: 'Foggy',
    mood: 'Mysterious & Thoughtful 🌫️',
    description: 'The world looks so soft and painted today.',
    icon: IconCloud,
    theme: { bg: 'bg-[#d4d4d8]', accent: 'bg-zinc-400' }
  },
  rain: {
    codes: [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82],
    label: 'Rainy',
    mood: 'Sleepy & Snuggly 🌧️',
    description: 'Pitter patter! Time to wrap up in your softest blanket.',
    icon: IconCloudRain,
    theme: { bg: 'bg-[#dbeafe]', accent: 'bg-blue-300' }
  },
  snow: {
    codes: [71, 73, 75, 77, 85, 86],
    label: 'Snowy',
    mood: 'Playful & Chilly ❄️',
    description: 'Brrr! Let\'s draw a tiny snowman!',
    icon: IconSnowflake,
    theme: { bg: 'bg-[#cffafe]', accent: 'bg-cyan-300' }
  },
  storm: {
    codes: [95, 96, 99],
    label: 'Stormy',
    mood: 'A little anxious! ⚡',
    description: 'Loud noises outside, but it\'s safe and warm in here.',
    icon: IconCloudLightning,
    theme: { bg: 'bg-[#e9d5ff]', accent: 'bg-purple-300' }
  }
};

const getWeatherState = (code) => {
  for (const [key, data] of Object.entries(WEATHER_DICTIONARY)) {
    if (data.codes.includes(code)) return data;
  }
  return WEATHER_DICTIONARY.clear;
};

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locationName, setLocationName] = useState('Detecting location...');

  const fetchWeather = async (lat, lon) => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
      const data = await res.json();
      setWeatherData(data.current_weather);
      
      try {
        const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
        const geoData = await geoRes.json();
        const city = geoData.address.city || geoData.address.town || geoData.address.village || 'Your Cozy Spot';
        setLocationName((prev) => prev.includes('Detecting') || prev.includes('Fallback') ? city : prev);
      } catch (e) {}
    } catch (err) {
      setWeatherData({ weathercode: 0, temperature: 25 });
    } finally {
      setLoading(false);
    }
  };

  const locateUser = () => {
    setLoading(true);
    setLocationName('Detecting location...');

    const fallbackToIP = async () => {
      try {
        const res = await fetch('https://get.geojs.io/v1/ip/geo.json');
        const data = await res.json();
        setLocationName(data.city || 'Somewhere cozy');
        fetchWeather(parseFloat(data.latitude), parseFloat(data.longitude));
      } catch (err) {
        setLocationName('Tokyo (Fallback)');
        fetchWeather(35.6895, 139.6917);
      }
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => fetchWeather(position.coords.latitude, position.coords.longitude),
        () => fallbackToIP(),
        { timeout: 5000 }
      );
    } else {
      fallbackToIP();
    }
  };

  useEffect(() => {
    locateUser();
  }, []);

  const data = weatherData ? getWeatherState(weatherData.weathercode) : WEATHER_DICTIONARY.clear;
  const currentTheme = data.theme;
  const currentMood = weatherData ? data.mood : 'Waking up...';
  const CurrentIcon = weatherData ? data.icon : IconSun;
  const currentDesc = weatherData ? data.description : 'Gathering the cutest weather data...';
  const currentTemp = weatherData ? `${Math.round(weatherData.temperature)}°C` : '';

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-1000 ${currentTheme.bg} font-kalam`}>
      
      {/* Main Handwritten Paper Card */}
      <div className="max-w-md w-full paper-card relative p-8 flex flex-col items-center text-center">
        
        {/* Top Bar */}
        <div className="flex justify-between items-center w-full mb-8 relative z-10">
          <div className="flex items-center gap-2 ink-text bg-white bg-opacity-70 px-3 py-1 border-2 border-slate-700 shadow-[2px_2px_0px_0px_#334155]" style={{ borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px' }}>
            <IconMapPin className="w-5 h-5" />
            <span className="font-bold text-sm tracking-wide">{loading ? 'Locating...' : locationName}</span>
          </div>
          <button onClick={locateUser} className={`p-2 paper-btn flex items-center justify-center ${loading ? 'animate-spin' : ''}`}>
            <IconRefreshCw className="w-5 h-5" />
          </button>
        </div>

        {/* Temperature scribbled */}
        {!loading && (
          <div className="absolute top-20 right-8 font-bold text-4xl ink-text rotate-3 opacity-90 z-20" style={{ filter: 'drop-shadow(1px 1px 0px rgba(51,65,85,0.3))' }}>
            {currentTemp}
          </div>
        )}

        {/* Icon & Highlight */}
        <div className="relative w-32 h-32 mb-6 flex items-center justify-center">
          <div className={`absolute inset-0 ${currentTheme.accent} highlight-blob opacity-70 animate-float transition-colors duration-1000`}></div>
          <CurrentIcon className="w-16 h-16 ink-text relative z-10" style={{ filter: 'drop-shadow(2px 2px 0px rgba(51,65,85,0.2))' }} />
        </div>

        <div className="text-sm uppercase tracking-widest font-bold mb-1 ink-text opacity-70 border-b-2 border-slate-700 border-dashed pb-1">Current Mood</div>
        <h1 className="text-4xl font-bold mb-4 ink-text mt-2">{currentMood}</h1>
        <p className="text-xl px-4 leading-relaxed ink-text font-medium opacity-90">{currentDesc}</p>
        <div className="scribble-divider mt-8 mb-2"></div>
      </div>

      {/* Redesigned Footer */}
      <footer className="mt-12 flex flex-col items-center gap-4 relative z-10 max-w-sm w-full">
        
        {/* Credits Sticker */}
        <div className="bg-white border-2 border-slate-700 p-4 shadow-[4px_4px_0px_0px_#334155] -rotate-1 relative sticker-effect" style={{ borderRadius: '5px 45px 5px 45px/45px 5px 45px 5px' }}>
          <div className="flex items-center gap-2 ink-text font-bold text-lg mb-1">
            <IconHeart className="w-5 h-5 fill-red-400 text-slate-700" /> 
            <span>Made with love in Cutesense Studios</span>
          </div>
          <div className="flex items-center gap-2 ink-text opacity-70 text-sm font-bold pl-7">
            <IconSparkles className="w-4 h-4" />
            <span>Generated with Gemini</span>
          </div>
        </div>

        {/* License Link Style */}
        <div className="flex items-center gap-2 ink-text opacity-60 hover:opacity-100 transition-opacity cursor-help">
          <IconScale className="w-4 h-4" />
          <span className="text-xs font-bold underline decoration-dashed underline-offset-4">Licensed under GNU AGPL v3.0</span>
        </div>
      </footer>

      {/* Custom Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap');
        .font-kalam { font-family: 'Kalam', cursive; }
        .ink-text { color: #334155; }
        .paper-card {
          background-color: #fdfbf7;
          border: 3px solid #334155;
          border-radius: 2% 98% 3% 97% / 98% 3% 97% 2%;
          box-shadow: 6px 6px 0px 0px rgba(51, 65, 85, 0.9);
          background-image: repeating-linear-gradient(transparent, transparent 31px, #cbd5e1 31px, #cbd5e1 33px);
          background-position: 0 1.5rem;
        }
        .paper-btn {
          background-color: #fdfbf7;
          border: 2px solid #334155;
          border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
          box-shadow: 3px 3px 0px 0px #334155;
          transition: all 0.1s ease;
          color: #334155;
        }
        .paper-btn:active { transform: translate(3px, 3px); box-shadow: 0px 0px 0px 0px #334155; }
        .highlight-blob { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; mix-blend-mode: multiply; }
        @keyframes float-slow {
          0%, 100% { transform: translateY(-3px) rotate(-2deg) scale(1); }
          50% { transform: translateY(3px) rotate(2deg) scale(1.05); }
        }
        .animate-float { animation: float-slow 4s ease-in-out infinite; }
        .scribble-divider {
          width: 50%; height: 8px;
          background-image: radial-gradient(circle, #334155 2px, transparent 2px);
          background-size: 12px 12px; background-repeat: repeat-x; opacity: 0.5;
        }
        /* Sticky tape effect */
        .sticker-effect::before {
          content: ''; position: absolute; top: -10px; left: 50%; transform: translateX(-50%);
          width: 60px; height: 25px; background: rgba(255,255,255,0.4); border: 1px solid rgba(0,0,0,0.05);
        }
      `}} />
    </div>
  );
}