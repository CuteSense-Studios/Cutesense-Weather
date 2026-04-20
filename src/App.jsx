/*
 * Cute Weather & Mood Indicator
 * Licensed under GNU Affero General Public License v3.0
 * Hand-crafted with love at Cutesense Studios
 * Updated to use local assets and lucide-react
 */

import React, { useState, useEffect, useRef } from 'react';
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
  Clock, 
  Volume2, 
  VolumeX 
} from 'lucide-react';

// --- Weather Dictionary using Lucide Components ---
const WEATHER_DICTIONARY = {
  clear: {
    codes: [0],
    label: 'Sunny',
    mood: 'Joyful & Bouncy ✨',
    description: 'Perfect day for a cute picnic or sketching outside!',
    icon: Sun,
    theme: { bg: '#f0e6d2', accent: 'bg-yellow-300' },
    audio: 'https://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=Forest+Nature+Birds&filename=24/241834-31514781-a7da-4e4b-9721-39589d3810f4.mp3', 
    effect: 'sun'
  },
  cloudy: {
    codes: [1, 2, 3],
    label: 'Cloudy',
    mood: 'Cozy & Calm 🍵',
    description: 'A gentle sky. Great time to doodle near the window.',
    icon: Cloud,
    theme: { bg: '#e2e8f0', accent: 'bg-slate-300' },
    audio: ' ', 
    effect: 'cloud'
  },
  fog: {
    codes: [45, 48],
    label: 'Foggy',
    mood: 'Mysterious & Thoughtful 🌫️',
    description: 'The world looks so soft and painted today.',
    icon: Cloud,
    theme: { bg: '#d4d4d8', accent: 'bg-zinc-400' },
    audio: ' ',
    effect: 'cloud'
  },
  rain: {
    codes: [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82],
    label: 'Rainy',
    mood: 'Sleepy & Snuggly 🌧️',
    description: 'Pitter patter! Time to wrap up in your softest blanket.',
    icon: CloudRain,
    theme: { bg: '#dbeafe', accent: 'bg-blue-300' },
    audio: ' ',
    effect: 'rain'
  },
  snow: {
    codes: [71, 73, 75, 77, 85, 86],
    label: 'Snowy',
    mood: 'Playful & Chilly ❄️',
    description: 'Brrr! Let\'s draw a tiny snowman!',
    icon: Snowflake,
    theme: { bg: '#cffafe', accent: 'bg-cyan-300' },
    audio: ' ',
    effect: 'snow'
  },
  storm: {
    codes: [95, 96, 99],
    label: 'Stormy',
    mood: 'A little anxious! ⚡',
    description: 'Loud noises outside, but it\'s safe and warm in here.',
    icon: CloudLightning,
    theme: { bg: '#e9d5ff', accent: 'bg-purple-300' },
    audio: ' ', 
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
      if (audioRef.current) audioRef.current.pause();
      
      const audio = new Audio(state.audio);
      audio.loop = true;
      audio.volume = 0.3;
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => console.log("Interaction required for audio."));
      }
      audioRef.current = audio;
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    }
    return () => {
      if (audioRef.current) audioRef.current.pause();
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

      {/* Textured Paper Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-repeat mix-blend-multiply" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/p6.png")' }}></div>

      {/* Main Handwritten Paper Card */}
      <div className="max-w-md w-full paper-card relative p-8 flex flex-col items-center text-center z-10">
        
        {/* Top Bar */}
        <div className="flex justify-between items-center w-full mb-8 relative z-10">
          <div className="flex items-center gap-2 ink-text bg-white bg-opacity-70 px-3 py-1 border-2 border-slate-700 shadow-[2px_2px_0px_0px_#334155]" style={{ borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px' }}>
            <MapPin size={20} />
            <span className="font-bold text-sm tracking-wide">{loading ? 'Locating...' : locationName}</span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsAudioEnabled(!isAudioEnabled)} 
              className={`p-2 paper-btn flex items-center justify-center transition-all ${isAudioEnabled ? 'bg-yellow-100 shadow-none translate-x-0.5 translate-y-0.5' : ''}`}
              title={isAudioEnabled ? "Mute Atmosphere" : "Play Atmosphere"}
            >
              {isAudioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
            <button onClick={locateUser} className={`p-2 paper-btn flex items-center justify-center ${loading ? 'animate-spin' : ''}`}>
              <RefreshCw size={20} />
            </button>
          </div>
        </div>

        {/* Clock */}
        <div className="absolute top-20 left-6 ink-text rotate-[-4deg] opacity-80 z-20 flex items-center gap-1.5 bg-white bg-opacity-40 px-2 rounded-md">
          <Clock size={14} />
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
          <CurrentIcon size={64} className="ink-text relative z-10" style={{ filter: 'drop-shadow(2px 2px 0px rgba(51,65,85,0.2))' }} />
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
            <Heart size={14} className="fill-red-400 text-slate-700" /> 
            <span>A labor of love from Cutesense Studios</span>
          </div>
          
          <div className="flex items-center gap-1.5 text-xs font-bold opacity-60 mt-0.5">
            <Sparkles size={12} className="text-yellow-600 fill-yellow-200" />
            <span>Woven with Gemini’s digital magic</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 opacity-40 mt-1 hover:opacity-100 transition-opacity cursor-help text-[9px] uppercase tracking-[0.2em]">
          <Scale size={12} />
          <span className="underline decoration-dotted underline-offset-4">GNU AGPL v3.0</span>
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