import React, { useState, useEffect, useMemo, memo } from 'react';

// --- Local Lucide Icons ---
const LocalIcon = ({ children, size = 24, className = '', style = {}, ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className} 
    style={style} 
    {...props}
  >
    {children}
  </svg>
);

const Sun = (props) => <LocalIcon {...props}><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></LocalIcon>;
const Cloud = (props) => <LocalIcon {...props}><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></LocalIcon>;
const CloudRain = (props) => <LocalIcon {...props}><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></LocalIcon>;
const CloudLightning = (props) => <LocalIcon {...props}><path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973"/><path d="m13 12-3 5h4l-3 5"/></LocalIcon>;
const Snowflake = (props) => <LocalIcon {...props}><line x1="2" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="22"/><path d="m20 16-4-4 4-4"/><path d="m4 8 4 4-4 4"/><path d="m16 4-4 4-4-4"/><path d="m8 20 4-4 4 4"/></LocalIcon>;
const MapPin = (props) => <LocalIcon {...props}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></LocalIcon>;
const RefreshCw = (props) => <LocalIcon {...props}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></LocalIcon>;
const Heart = (props) => <LocalIcon {...props}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></LocalIcon>;
const Sparkles = (props) => <LocalIcon {...props}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></LocalIcon>;
const Clock = (props) => <LocalIcon {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></LocalIcon>;

// --- Weather Dictionary ---
const WEATHER_DICTIONARY = {
  clear: {
    codes: [0],
    label: 'Sunny',
    mood: 'Joyful & Bouncy ✨',
    description: 'Perfect day for a cute picnic or sketching outside!',
    icon: Sun,
    theme: { bg: '#fdf2f8', accent: 'bg-pink-300' }, 
    effect: 'sun'
  },
  cloudy: {
    codes: [1, 2, 3],
    label: 'Cloudy',
    mood: 'Cozy & Calm 🍵',
    description: 'A gentle sky. Great time to doodle near the window.',
    icon: Cloud,
    theme: { bg: '#f1f5f9', accent: 'bg-slate-300' },
    effect: 'fog'
  },
  fog: {
    codes: [45, 48],
    label: 'Foggy',
    mood: 'Mysterious & Thoughtful 🌫️',
    description: 'The world looks so soft and painted today.',
    icon: Cloud,
    theme: { bg: '#fafafa', accent: 'bg-zinc-400' },
    effect: 'fog'
  },
  rain: {
    codes: [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82],
    label: 'Rainy',
    mood: 'Sleepy & Snuggly 🌧️',
    description: 'Pitter patter! Time to wrap up in your softest blanket.',
    icon: CloudRain,
    theme: { bg: '#eff6ff', accent: 'bg-blue-600' }, 
    effect: 'rain'
  },
  snow: {
    codes: [71, 73, 75, 77, 85, 86],
    label: 'Snowy',
    mood: 'Playful & Chilly ❄️',
    description: 'Brrr! Let\'s draw a tiny snowman!',
    icon: Snowflake,
    theme: { bg: '#f8fafc', accent: 'bg-cyan-200' },
    effect: 'snow'
  },
  storm: {
    codes: [95, 96, 99],
    label: 'Stormy',
    mood: 'A little anxious! ⚡',
    description: 'Loud noises outside, but it\'s safe and warm in here.',
    icon: CloudLightning,
    theme: { bg: '#fff1f2', accent: 'bg-red-500' }, 
    effect: 'storm'
  }
};

const getWeatherState = (code) => {
  for (const [key, data] of Object.entries(WEATHER_DICTIONARY)) {
    if (data.codes.includes(code)) return data;
  }
  return WEATHER_DICTIONARY.clear;
};

const ClockDisplay = () => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="text-lg font-bold tracking-tight">
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </span>
  );
};

const RainDropsPaper = memo(() => {
  const drops = useMemo(() => Array.from({ length: 120 }).map(() => ({
    left: `${Math.random() * 100}%`,
    width: `${Math.random() > 0.8 ? 2 : 1.5}px`,
    height: `${8 + Math.random() * 25}px`,
    duration: `${0.3 + Math.random() * 0.3}s`,
    delay: `${Math.random() * 2}s`
  })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
      {drops.map((style, i) => (
        <div 
          key={i} 
          className="absolute bg-slate-500 rounded-full animate-rain-paper"
          style={{
            left: style.left,
            width: style.width,
            height: style.height,
            animationDuration: style.duration,
            animationDelay: style.delay
          }}
        />
      ))}
    </div>
  );
});

const SnowFlakesPaper = memo(() => {
  const colors = ['#ffffff', '#f1f5f9', '#e2e8f0'];
  const flakes = useMemo(() => Array.from({ length: 90 }).map(() => {
    const size = 5 + Math.random() * 12;
    return {
      bg: colors[Math.floor(Math.random() * colors.length)],
      left: `${Math.random() * 100}%`,
      width: `${size}px`,
      height: `${size}px`,
      radius: Math.random() > 0.3 ? '50%' : '2px',
      duration: `${3 + Math.random() * 6}s`,
      delay: `${Math.random() * 5}s`
    };
  }), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-70">
      {flakes.map((style, i) => (
        <div 
          key={i} 
          className="absolute animate-snow-drift border border-slate-200/50"
          style={{
            backgroundColor: style.bg,
            left: style.left,
            width: style.width,
            height: style.height,
            borderRadius: style.radius,
            boxShadow: '1px 1px 2px rgba(51, 65, 85, 0.1)',
            animationDuration: style.duration,
            animationDelay: style.delay
          }}
        />
      ))}
    </div>
  );
});

const FogMistPaper = memo(() => (
  <div className="absolute inset-0 pointer-events-none opacity-25">
    {[
      { delay: '0s', size: '64', color: 'slate-100', top: '15%', left: '-25%', rotate: '15deg' },
      { delay: '2s', size: '80', color: 'slate-200', bottom: '10%', right: '-30%', rotate: '-10deg' },
      { delay: '4s', size: '56', color: 'slate-100', top: '50%', left: '-15%', rotate: '-5deg' },
      { delay: '6s', size: '72', color: 'slate-200', bottom: '45%', right: '-20%', rotate: '12deg' },
    ].map((m, i) => (
      <div 
        key={i} 
        className={`absolute w-${m.size} h-${m.size} bg-${m.color}/80 border border-slate-300 blur-2xl animate-paper-float`}
        style={{
          top: m.top, bottom: m.bottom, left: m.left, right: m.right,
          borderRadius: '50%',
          animationDelay: m.delay,
          transform: `rotate(${m.rotate})`
        }} 
      />
    ))}
  </div>
));

const SunPaper = memo(() => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-15">
    <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle,rgba(253,224,71,0.25)_0%,transparent_70%)] animate-pulse" style={{ animationDuration: '6s' }} />
    <div className="absolute top-10 right-10 w-48 h-48 opacity-60 z-0">
        <div className="absolute inset-0 bg-yellow-400 rotate-[-10deg] paper-blob scale-[1.05]" style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%'}}></div>
        <div className="absolute inset-2 bg-yellow-300 rotate-[8deg] paper-blob" style={{ borderRadius: '60% 40% 30% 70% / 50% 50% 50% 50%'}}></div>
    </div>
  </div>
));

const DeskScrapbookObjects = memo(() => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-0">
    <div className="absolute top-[30%] -right-16 w-32 h-32 border-[10px] border-slate-700/60 rotate-[-15deg]" style={{ borderRadius: '50%'}}></div>
    <div className="absolute bottom-[20%] -left-10 w-40 h-8 bg-slate-400/80 border border-slate-700/80 rotate-[-4deg]"></div>
    <div className="absolute bottom-[40%] -right-12 w-20 h-16 border-2 border-slate-700/80 rotate-[10deg]"></div>
  </div>
));

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locationName, setLocationName] = useState('Detecting location...');

  useEffect(() => {
    document.title = "Cutesense Weather";
    // #region agent log
    try {
      const existing = document.querySelector("link[rel~='icon']");
      fetch('http://127.0.0.1:7678/ingest/8f249182-6124-4e5a-8b39-1e6be2004bce',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'1b9c81'},body:JSON.stringify({sessionId:'1b9c81',runId:'pre-fix',hypothesisId:'H2',location:'src/App.jsx:useEffect(icon)',message:'Before favicon override',data:{hasExisting:Boolean(existing),existingHref:existing?.href||null,baseUrl:import.meta?.env?.BASE_URL||null,locationHref:window.location.href},timestamp:Date.now()})}).catch(()=>{});
    } catch (e) {
      fetch('http://127.0.0.1:7678/ingest/8f249182-6124-4e5a-8b39-1e6be2004bce',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'1b9c81'},body:JSON.stringify({sessionId:'1b9c81',runId:'pre-fix',hypothesisId:'H2',location:'src/App.jsx:useEffect(icon)',message:'Before favicon override (log failed)',data:{error:String(e)},timestamp:Date.now()})}).catch(()=>{});
    }
    // #endregion agent log
    const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
    link.type = 'image/svg+xml';
    link.rel = 'icon';
    link.href = `${import.meta.env.BASE_URL}assets/icons/favicon.svg`;
    document.getElementsByTagName('head')[0].appendChild(link);
    // #region agent log
    (async () => {
      try {
        const href = link.href;
        const res = await fetch(href, { method: 'HEAD', cache: 'no-store' });
        fetch('http://127.0.0.1:7678/ingest/8f249182-6124-4e5a-8b39-1e6be2004bce',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'1b9c81'},body:JSON.stringify({sessionId:'1b9c81',runId:'pre-fix',hypothesisId:'H2',location:'src/App.jsx:useEffect(icon)',message:'After favicon override',data:{assignedHref:`${import.meta.env.BASE_URL}assets/icons/favicon.svg`,resolvedHref:href,status:res.status,ok:res.ok},timestamp:Date.now()})}).catch(()=>{});
      } catch (e) {
        fetch('http://127.0.0.1:7678/ingest/8f249182-6124-4e5a-8b39-1e6be2004bce',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'1b9c81'},body:JSON.stringify({sessionId:'1b9c81',runId:'pre-fix',hypothesisId:'H2',location:'src/App.jsx:useEffect(icon)',message:'After favicon override (HEAD failed)',data:{error:String(e),resolvedHref:link?.href||null},timestamp:Date.now()})}).catch(()=>{});
      }
    })();
    // #endregion agent log
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
      {/* Background Layers */}
      {dataState.effect === 'rain' || dataState.effect === 'storm' ? <RainDropsPaper /> : null}
      {dataState.effect === 'snow' ? <SnowFlakesPaper /> : null}
      {dataState.effect === 'fog' ? <FogMistPaper /> : null}
      {dataState.effect === 'sun' ? <SunPaper /> : null}
      <DeskScrapbookObjects />

      <div className="absolute inset-0 pointer-events-none opacity-[0.1] bg-repeat mix-blend-multiply" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/p6.png")' }}></div>
      <div className="absolute inset-0 pointer-events-none opacity-[0.08] bg-repeat" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cardboard-flat.png")' }}></div>

      {/* Main Card */}
      <div className="max-w-md w-full paper-card relative p-10 flex flex-col items-center text-center z-10 animate-gentle-tilt">
        
        <div className="absolute top-0 left-0 w-8 h-8 border-t-[5px] border-l-[5px] border-slate-700 opacity-80" style={{ borderRadius: '5px 0 20px 0'}}></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-[5px] border-r-[5px] border-slate-700 opacity-80" style={{ borderRadius: '0 5px 0 20px'}}></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[5px] border-l-[5px] border-slate-700 opacity-80" style={{ borderRadius: '0 20px 5px 0'}}></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[5px] border-r-[5px] border-slate-700 opacity-80" style={{ borderRadius: '20px 0 0 5px'}}></div>

        <div className="absolute bottom-6 right-6 opacity-30 z-20 border-4 border-double border-red-700/80 ink-stamp rotate-[15deg] p-1.5 font-bold tracking-widest uppercase text-red-900/90 text-xs"> 
            Cozy Approved
        </div>

        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-10 bg-blue-100/60 border-x-2 border-dashed border-blue-300/50 rotate-[-1deg] z-30 mix-blend-multiply flex items-center justify-center overflow-hidden">
        </div>

        <div className="flex justify-between items-center w-full mb-10 relative z-10">
          <div className="flex items-center gap-2 ink-text bg-white/80 px-4 py-1.5 border-2 border-slate-700 shadow-[3px_3px_0px_0px_#334155]" style={{ borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px' }}>
            <MapPin size={18} />
            <span className="font-bold text-sm tracking-wide">{loading ? 'Locating...' : locationName}</span>
          </div>
          <button onClick={locateUser} className={`p-2.5 paper-btn flex items-center justify-center ${loading ? 'animate-spin' : ''}`}>
            <RefreshCw size={20} />
          </button>
        </div>

        <div className="absolute top-24 left-8 ink-text rotate-[-6deg] opacity-70 z-20 flex items-center gap-1.5 bg-yellow-50/50 px-2 border-b border-slate-400">
          <Clock size={14} />
          <ClockDisplay />
        </div>

        {!loading && (
          <div className="absolute top-24 right-10 font-bold text-5xl ink-text rotate-6 opacity-90 z-20 ink-bleed" style={{ filter: 'drop-shadow(1px 1px 0px rgba(51,65,85,0.2))' }}>
            {currentTemp}
          </div>
        )}

        <div className="relative w-40 h-40 mb-8 flex items-center justify-center">
          <div className={`absolute inset-0 ${currentTheme.accent} highlight-blob opacity-60 animate-float-blob transition-colors duration-1000`}></div>
          <CurrentIcon size={80} className="ink-text relative z-10" style={{ filter: 'drop-shadow(3px 3px 0px rgba(51,65,85,0.15))' }} />
        </div>

        <div className="text-xs uppercase tracking-[0.3em] font-black mb-1 ink-text opacity-50 border-b-2 border-slate-700/30 border-dashed pb-1">Current Mood</div>
        <h1 className="text-4xl font-bold mb-4 ink-text mt-3 leading-tight ink-bleed">{currentMood}</h1>
        <p className="text-2xl px-2 leading-relaxed ink-text font-medium opacity-90 italic">"{currentDesc}"</p>
        
        <div className="scribble-divider mt-10 mb-2"></div>
      </div>

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

      <style dangerouslySetInnerHTML={{__html: `
        @font-face {
          font-family: 'Kalam';
          src: url('${import.meta.env.BASE_URL}assets/fonts/kalam-v18-latin-regular.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
        }
        
        .font-kalam { font-family: 'Kalam', cursive; }
        .ink-text { color: #2d3748; }
        .ink-bleed { text-shadow: 0.5px 0.5px 1px rgba(45, 55, 72, 0.3); }

        .ink-stamp { 
            border-radius: 4px 10px 4px 10px / 10px 4px 10px 4px;
            box-shadow: 1px 1px 1px rgba(127, 29, 29, 0.4);
            filter: blur(0.2px) contrast(1.2);
        }

        .paper-card {
          background-color: #fffefc;
          border: 3px solid #334155;
          border-radius: 1% 99% 2% 98% / 99% 2% 98% 1%;
          box-shadow: 12px 12px 0px 0px rgba(51, 65, 85, 0.1), 8px 8px 0px 0px rgba(51, 65, 85, 0.9);
          background-image: 
            repeating-linear-gradient(transparent, transparent 31px, rgba(226, 232, 240, 0.5) 31px, rgba(226, 232, 240, 0.5) 32px),
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
        
        .highlight-blob, .paper-blob { 
          mix-blend-mode: multiply; 
          filter: drop-shadow(1px 1px 1px rgba(51, 65, 85, 0.1)); 
        }
        
        @keyframes morph-blob {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(-5px) rotate(-1deg) scale(1); }
          50% { transform: translateY(5px) rotate(1deg) scale(1.08); }
        }

        .animate-float-blob { 
          animation: float-slow 5s ease-in-out infinite, morph-blob 8s ease-in-out infinite alternate; 
        }

        @keyframes paper-float {
            0%, 100% { transform: translate(0,0) rotate(-1deg); }
            33% { transform: translate(10px, -5px) rotate(1deg); }
            66% { transform: translate(-5px, 10px) rotate(-0.5deg); }
        }
        .animate-paper-float { animation: paper-float 15s ease-in-out infinite; }

        @keyframes gentle-tilt {
            0%, 100% { transform: rotate(-0.5deg); }
            50% { transform: rotate(0.5deg); }
        }
        .animate-gentle-tilt { animation: gentle-tilt 10s ease-in-out infinite; }

        @keyframes rain-paper {
          0% { transform: translateY(-110vh) skewX(-10deg); opacity: 0; }
          20% { opacity: 0.6; }
          100% { transform: translateY(110vh) skewX(-10deg); opacity: 0; }
        }
        .animate-rain-paper { animation: rain-paper linear infinite; }

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