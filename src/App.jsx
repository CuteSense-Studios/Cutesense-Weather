import React, { useState, useEffect, useRef } from 'react';

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

const IconClock = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

const IconVolume2 = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
  </svg>
);

const IconVolumeX = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/>
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
    theme: { bg: '#f0e6d2', accent: 'bg-yellow-300' },
    audio: 'https://assets.mixkit.co/active_storage/sfx/2403/2403-preview.mp3',
    effect: 'sun'
  },
  cloudy: {
    codes: [1, 2, 3],
    label: 'Cloudy',
    mood: 'Cozy & Calm 🍵',
    description: 'A gentle sky. Great time to doodle near the window.',
    icon: IconCloud,
    theme: { bg: '#e2e8f0', accent: 'bg-slate-300' },
    audio: 'https://assets.mixkit.co/active_storage/sfx/139/139-preview.mp3',
    effect: 'cloud'
  },
  fog: {
    codes: [45, 48],
    label: 'Foggy',
    mood: 'Mysterious & Thoughtful 🌫️',
    description: 'The world looks so soft and painted today.',
    icon: IconCloud,
    theme: { bg: '#d4d4d8', accent: 'bg-zinc-400' },
    audio: 'https://assets.mixkit.co/active_storage/sfx/139/139-preview.mp3',
    effect: 'cloud'
  },
  rain: {
    codes: [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82],
    label: 'Rainy',
    mood: 'Sleepy & Snuggly 🌧️',
    description: 'Pitter patter! Time to wrap up in your softest blanket.',
    icon: IconCloudRain,
    theme: { bg: '#dbeafe', accent: 'bg-blue-300' },
    audio: 'https://assets.mixkit.co/active_storage/sfx/2493/2493-preview.mp3',
    effect: 'rain'
  },
  snow: {
    codes: [71, 73, 75, 77, 85, 86],
    label: 'Snowy',
    mood: 'Playful & Chilly ❄️',
    description: 'Brrr! Let\'s draw a tiny snowman!',
    icon: IconSnowflake,
    theme: { bg: '#cffafe', accent: 'bg-cyan-300' },
    audio: 'https://assets.mixkit.co/active_storage/sfx/2141/2141-preview.mp3',
    effect: 'snow'
  },
  storm: {
    codes: [95, 96, 99],
    label: 'Stormy',
    mood: 'A little anxious! ⚡',
    description: 'Loud noises outside, but it\'s safe and warm in here.',
    icon: IconCloudLightning,
    theme: { bg: '#e9d5ff', accent: 'bg-purple-300' },
    audio: 'https://assets.mixkit.co/active_storage/sfx/2491/2491-preview.mp3',
    effect: 'storm'
  }
};

const getWeatherState = (code) => {
  for (const [key, data] of Object.entries(WEATHER_DICTIONARY)) {
    if (data.codes.includes(code)) return data;
  }
  return WEATHER_DICTIONARY.clear;
};

// --- Atmosphere Effects Components ---
const RainDrops = () => {
  const drops = Array.from({ length: 20 });
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
      {drops.map((_, i) => (
        <div 
          key={i} 
          className="absolute bg-blue-900 rounded-full animate-rain-ink"
          style={{
            left: `${Math.random() * 100}%`,
            width: '2px',
            height: '15px',
            animationDuration: `${0.5 + Math.random()}s`,
            animationDelay: `${Math.random()}s`
          }}
        />
      ))}
    </div>
  );
};

const SnowFlakes = () => {
  const flakes = Array.from({ length: 15 });
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
      {flakes.map((_, i) => (
        <div 
          key={i} 
          className="absolute bg-white rounded-full animate-snow-drift border border-slate-300"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${4 + Math.random() * 6}px`,
            height: `${4 + Math.random() * 6}px`,
            animationDuration: `${3 + Math.random() * 4}s`,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
};

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locationName, setLocationName] = useState('Detecting location...');
  const [time, setTime] = useState(new Date());
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  
  const audioRef = useRef(null);

  // Clock Effect
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Favicon and Title Effect
  useEffect(() => {
    document.title = "Cutesense Weather";
    const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
    link.type = 'image/svg+xml';
    link.rel = 'icon';
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#334155" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
    link.href = `data:image/svg+xml;base64,${btoa(svgString)}`;
    document.getElementsByTagName('head')[0].appendChild(link);
  }, []);

  // Audio Management
  useEffect(() => {
    if (isAudioEnabled && weatherData) {
      const state = getWeatherState(weatherData.weathercode);
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(state.audio);
      audio.loop = true;
      audio.volume = 0.4;
      audio.play().catch(e => console.log("Audio playback prevented."));
      audioRef.current = audio;
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [isAudioEnabled, weatherData]);

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

  const dataState = weatherData ? getWeatherState(weatherData.weathercode) : WEATHER_DICTIONARY.clear;
  const currentTheme = dataState.theme;
  const currentMood = weatherData ? dataState.mood : 'Waking up...';
  const CurrentIcon = weatherData ? dataState.icon : IconSun;
  const currentDesc = weatherData ? dataState.description : 'Gathering the cutest weather data...';
  const currentTemp = weatherData ? `${Math.round(weatherData.temperature)}°C` : '';

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-1000 font-kalam relative overflow-hidden"
      style={{ backgroundColor: currentTheme.bg }}
    >
      {/* Visual Weather Effects Background Layers */}
      {dataState.effect === 'rain' || dataState.effect === 'storm' ? <RainDrops /> : null}
      {dataState.effect === 'snow' ? <SnowFlakes /> : null}

      {/* Textured Paper Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-repeat mix-blend-multiply" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/p6.png")' }}></div>

      {/* Main Handwritten Paper Card */}
      <div className="max-w-md w-full paper-card relative p-8 flex flex-col items-center text-center z-10">
        
        {/* Top Bar */}
        <div className="flex justify-between items-center w-full mb-8 relative z-10">
          <div className="flex items-center gap-2 ink-text bg-white bg-opacity-70 px-3 py-1 border-2 border-slate-700 shadow-[2px_2px_0px_0px_#334155]" style={{ borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px' }}>
            <IconMapPin className="w-5 h-5" />
            <span className="font-bold text-sm tracking-wide">{loading ? 'Locating...' : locationName}</span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsAudioEnabled(!isAudioEnabled)} 
              className={`p-2 paper-btn flex items-center justify-center transition-all ${isAudioEnabled ? 'bg-yellow-100' : ''}`}
              title={isAudioEnabled ? "Mute Atmosphere" : "Play Atmosphere"}
            >
              {isAudioEnabled ? <IconVolume2 className="w-5 h-5" /> : <IconVolumeX className="w-5 h-5" />}
            </button>
            <button onClick={locateUser} className={`p-2 paper-btn flex items-center justify-center ${loading ? 'animate-spin' : ''}`}>
              <IconRefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Clock */}
        <div className="absolute top-20 left-6 ink-text rotate-[-4deg] opacity-80 z-20 flex items-center gap-1.5 bg-white bg-opacity-40 px-2 rounded-md">
          <IconClock className="w-3.5 h-3.5" />
          <span className="text-lg font-bold tracking-tight">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
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
        <h1 className="text-4xl font-bold mb-4 ink-text mt-2 leading-tight">{currentMood}</h1>
        <p className="text-xl px-4 leading-relaxed ink-text font-medium opacity-90">{currentDesc}</p>
        <div className="scribble-divider mt-8 mb-2"></div>
      </div>

      {/* Refined Separated Footer */}
      <footer className="mt-8 flex flex-col items-center gap-1.5 relative z-10 w-full ink-text">
        <div className="text-lg font-bold opacity-40">~ --- ~</div>
        
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-1.5 text-sm font-bold opacity-80">
            <IconHeart className="w-3.5 h-3.5 fill-red-400 text-slate-700" /> 
            <span>A labor of love from Cutesense Studios</span>
          </div>
          
          <div className="flex items-center gap-1.5 text-xs font-bold opacity-60 mt-0.5">
            <IconSparkles className="w-3 h-3 text-yellow-600 fill-yellow-200" />
            <span>Woven with Gemini’s digital magic</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 opacity-40 mt-1 hover:opacity-100 transition-opacity cursor-help text-[9px] uppercase tracking-[0.2em]">
          <IconScale className="w-3 h-3" />
          <span className="underline decoration-dotted underline-offset-4">GNU AGPL v3.0</span>
          <span className="mx-1">|</span>
          <span className="underline decoration-dotted underline-offset-4">Atmosphere CC-Zero</span>
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

        /* Weather Animations */
        @keyframes rain-ink {
          0% { transform: translateY(-100vh); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        .animate-rain-ink { animation: rain-ink linear infinite; }

        @keyframes snow-drift {
          0% { transform: translateY(-10vh) translateX(0) rotate(0); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(110vh) translateX(20px) rotate(360deg); opacity: 0; }
        }
        .animate-snow-drift { animation: snow-drift linear infinite; }

        .scribble-divider {
          width: 50%; height: 8px;
          background-image: radial-gradient(circle, #334155 2px, transparent 2px);
          background-size: 12px 12px; background-repeat: repeat-x; opacity: 0.5;
        }
      `}} />
    </div>
  );
}