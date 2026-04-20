import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudLightning, 
  Snowflake, 
  MapPin, 
  RefreshCw, 
  Heart, 
  Scale, 
  Sparkles, 
  Clock 
} from 'lucide-react';

// --- Weather Dictionary (Audio Removed) ---
const WEATHER_DICTIONARY = {
  clear: {
    codes: [0],
    label: 'Sunny',
    mood: 'Joyful & Bouncy ✨',
    description: 'Perfect day for a cute picnic or sketching outside!',
    icon: Sun,
    theme: { bg: '#fdf4ff', accent: 'bg-yellow-200' },
    effect: 'sun'
  },
  cloudy: {
    codes: [1, 2, 3],
    label: 'Cloudy',
    mood: 'Cozy & Calm 🍵',
    description: 'A gentle sky. Great time to doodle near the window.',
    icon: Cloud,
    theme: { bg: '#f1f5f9', accent: 'bg-slate-200' },
    effect: 'fog'
  },
  fog: {
    codes: [45, 48],
    label: 'Foggy',
    mood: 'Mysterious & Thoughtful 🌫️',
    description: 'The world looks so soft and painted today.',
    icon: Cloud,
    theme: { bg: '#fafafa', accent: 'bg-zinc-300' },
    effect: 'fog'
  },
  rain: {
    codes: [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82],
    label: 'Rainy',
    mood: 'Sleepy & Snuggly 🌧️',
    description: 'Pitter patter! Time to wrap up in your softest blanket.',
    icon: CloudRain,
    theme: { bg: '#f0f9ff', accent: 'bg-blue-200' },
    effect: 'rain'
  },
  snow: {
    codes: [71, 73, 75, 77, 85, 86],
    label: 'Snowy',
    mood: 'Playful & Chilly ❄️',
    description: 'Brrr! Let\'s draw a tiny snowman!',
    icon: Snowflake,
    theme: { bg: '#f8fafc', accent: 'bg-cyan-100' },
    effect: 'snow'
  },
  storm: {
    codes: [95, 96, 99],
    label: 'Stormy',
    mood: 'A little anxious! ⚡',
    description: 'Loud noises outside, but it\'s safe and warm in here.',
    icon: CloudLightning,
    theme: { bg: '#f5f3ff', accent: 'bg-purple-200' },
    effect: 'storm'
  }
};

const getWeatherState = (code) => {
  for (const [key, data] of Object.entries(WEATHER_DICTIONARY)) {
    if (data.codes.includes(code)) return data;
  }
  return WEATHER_DICTIONARY.clear;
};

// --- Enhanced Atmospheric Effects ---
const RainDrops = () => {
  const drops = Array.from({ length: 60 }); // Increased density
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
      {drops.map((_, i) => (
        <div 
          key={i} 
          className="absolute bg-slate-500 rounded-full animate-rain-ink"
          style={{
            left: `${Math.random() * 100}%`,
            width: '1.5px',
            height: `${10 + Math.random() * 20}px`,
            animationDuration: `${0.4 + Math.random() * 0.4}s`,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
};

const SnowFlakes = () => {
  const flakes = Array.from({ length: 50 }); // Increased density
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
      {flakes.map((_, i) => (
        <div 
          key={i} 
          className="absolute bg-white rounded-full animate-snow-drift border border-slate-200 shadow-sm"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${5 + Math.random() * 8}px`,
            height: `${5 + Math.random() * 8}px`,
            animationDuration: `${4 + Math.random() * 6}s`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
    </div>
  );
};

const FogMist = () => (
  <div className="absolute inset-0 pointer-events-none opacity-20">
    <div className="absolute inset-0 bg-gradient-to-t from-slate-300/50 to-transparent animate-pulse" style={{ animationDuration: '8s' }} />
    <div className="absolute top-1/4 -left-20 w-64 h-64 bg-slate-200 rounded-full blur-3xl animate-float" />
    <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-slate-100 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
  </div>
);

const SunBeams = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
    <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle,rgba(253,224,71,0.3)_0%,transparent_70%)] animate-pulse" />
  </div>
);

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locationName, setLocationName] = useState('Detecting location...');
  const [time, setTime] = useState(new Date());
  
  // Clock Effect
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Favicon and Title Effect
  useEffect(() => {
    document.title = "Cutesense Weather";
  }, []);

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
  const CurrentIcon = weatherData ? dataState.icon : Sun;
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
      {dataState.effect === 'fog' ? <FogMist /> : null}
      {dataState.effect === 'sun' ? <SunBeams /> : null}

      {/* Textured Paper Overlay - Increased Opacity for papery vibe */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08] bg-repeat mix-blend-multiply" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/p6.png")' }}></div>
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-repeat" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cardboard-flat.png")' }}></div>

      {/* Main Handwritten Paper Card */}
      <div className="max-w-md w-full paper-card relative p-10 flex flex-col items-center text-center z-10 animate-gentle-tilt">
        
        {/* Washi Tape Effect */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-10 bg-blue-100/60 border-x-2 border-dashed border-blue-300/50 rotate-[-1deg] z-30 mix-blend-multiply flex items-center justify-center overflow-hidden">
             <div className="opacity-20 text-[8px] font-bold text-blue-900 uppercase tracking-widest whitespace-nowrap"> CUTESENSE • CUTESENSE • CUTESENSE </div>
        </div>

        {/* Top Bar */}
        <div className="flex justify-between items-center w-full mb-10 relative z-10">
          <div className="flex items-center gap-2 ink-text bg-white/80 px-4 py-1.5 border-2 border-slate-700 shadow-[3px_3px_0px_0px_#334155]" style={{ borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px' }}>
            <MapPin size={18} />
            <span className="font-bold text-sm tracking-wide">{loading ? 'Locating...' : locationName}</span>
          </div>
          <button onClick={locateUser} className={`p-2.5 paper-btn flex items-center justify-center ${loading ? 'animate-spin' : ''}`}>
            <RefreshCw size={20} />
          </button>
        </div>

        {/* Clock */}
        <div className="absolute top-24 left-8 ink-text rotate-[-6deg] opacity-70 z-20 flex items-center gap-1.5 bg-yellow-50/50 px-2 border-b border-slate-400">
          <Clock size={14} />
          <span className="text-lg font-bold tracking-tight">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        {/* Temperature scribbled */}
        {!loading && (
          <div className="absolute top-24 right-10 font-bold text-5xl ink-text rotate-6 opacity-90 z-20 ink-bleed" style={{ filter: 'drop-shadow(1px 1px 0px rgba(51,65,85,0.2))' }}>
            {currentTemp}
          </div>
        )}

        {/* Icon & Highlight */}
        <div className="relative w-40 h-40 mb-8 flex items-center justify-center">
          <div className={`absolute inset-0 ${currentTheme.accent} highlight-blob opacity-60 animate-float transition-colors duration-1000`}></div>
          <CurrentIcon size={80} className="ink-text relative z-10" style={{ filter: 'drop-shadow(3px 3px 0px rgba(51,65,85,0.15))' }} />
        </div>

        <div className="text-xs uppercase tracking-[0.3em] font-black mb-1 ink-text opacity-50 border-b-2 border-slate-700/30 border-dashed pb-1">Current Mood</div>
        <h1 className="text-4xl font-bold mb-4 ink-text mt-3 leading-tight ink-bleed">{currentMood}</h1>
        <p className="text-2xl px-2 leading-relaxed ink-text font-medium opacity-90 italic">"{currentDesc}"</p>
        
        <div className="scribble-divider mt-10 mb-2"></div>
      </div>

      {/* Refined Separated Footer */}
      <footer className="mt-10 flex flex-col items-center gap-2 relative z-10 w-full ink-text">
        <div className="text-xl font-bold opacity-30 tracking-[1em]">***</div>
        
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-1.5 text-sm font-bold opacity-70">
            <Heart size={14} className="fill-red-400 text-slate-700" /> 
            <span>Hand-sketched by Cutesense Studios</span>
          </div>
          
          <div className="flex items-center gap-1.5 text-xs font-bold opacity-50 mt-1">
            <Sparkles size={12} className="text-yellow-600" />
            <span>Refined with Gemini's creative spark</span>
          </div>
        </div>

        <div className="mt-4 opacity-30 text-[10px] uppercase tracking-widest flex items-center gap-4">
            <span className="border border-slate-700 px-2 py-0.5 rounded">Issue #2026</span>
            <span>•</span>
            <span className="underline decoration-dotted">GNU AGPL v3.0</span>
        </div>
      </footer>

      {/* Custom Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @font-face {
          font-family: 'Kalam';
          src: url('/fonts/kalam-v18-latin-regular.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
        }
        
        .font-kalam { font-family: 'Kalam', cursive; }
        .ink-text { color: #2d3748; }
        
        /* Subtle ink bleed effect for larger text */
        .ink-bleed {
            text-shadow: 0.5px 0.5px 1px rgba(45, 55, 72, 0.3);
        }

        .paper-card {
          background-color: #fffefc;
          border: 3px solid #334155;
          border-radius: 1% 99% 2% 98% / 99% 2% 98% 1%;
          box-shadow: 12px 12px 0px 0px rgba(51, 65, 85, 0.1), 
                      8px 8px 0px 0px rgba(51, 65, 85, 0.9);
          background-image: 
            repeating-linear-gradient(transparent, transparent 31px, #e2e8f0 31px, #e2e8f0 32px),
            linear-gradient(90deg, #f1f5f9 1px, transparent 1px);
          background-size: 100% 32px, 40px 100%;
          background-position: 0 1.5rem, 2rem 0;
        }

        .paper-btn {
          background-color: #fffefc;
          border: 2px solid #334155;
          border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
          box-shadow: 4px 4px 0px 0px #334155;
          transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
          color: #334155;
        }

        .paper-btn:hover { transform: translate(-1px, -1px); box-shadow: 5px 5px 0px 0px #334155; }
        .paper-btn:active { transform: translate(4px, 4px); box-shadow: 0px 0px 0px 0px #334155; }
        
        .highlight-blob { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; mix-blend-mode: multiply; }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(-5px) rotate(-1deg) scale(1); }
          50% { transform: translateY(5px) rotate(1deg) scale(1.08); }
        }
        .animate-float { animation: float-slow 5s ease-in-out infinite; }

        @keyframes gentle-tilt {
            0%, 100% { transform: rotate(-0.5deg); }
            50% { transform: rotate(0.5deg); }
        }
        .animate-gentle-tilt { animation: gentle-tilt 10s ease-in-out infinite; }

        @keyframes rain-ink {
          0% { transform: translateY(-110vh) skewX(-10deg); opacity: 0; }
          20% { opacity: 0.6; }
          100% { transform: translateY(110vh) skewX(-10deg); opacity: 0; }
        }
        .animate-rain-ink { animation: rain-ink linear infinite; }

        @keyframes snow-drift {
          0% { transform: translateY(-10vh) translateX(0) rotate(0); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(110vh) translateX(40px) rotate(720deg); opacity: 0; }
        }
        .animate-snow-drift { animation: snow-drift linear infinite; }

        .scribble-divider {
          width: 70%; height: 12px;
          background-image: radial-gradient(circle, #334155 1.5px, transparent 1.5px);
          background-size: 10px 10px; background-repeat: repeat-x; opacity: 0.3;
        }
      `}} />
    </div>
  );
}