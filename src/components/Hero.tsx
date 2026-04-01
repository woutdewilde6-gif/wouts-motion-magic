import { useState } from "react";
import { motion } from "framer-motion";
import { Play, ChevronDown, Volume2, VolumeX } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

// Set your hero background video URL here (YouTube embed, mp4 URL, or leave empty for image fallback)
const HERO_VIDEO_URL = "";

const Hero = () => {
  const [muted, setMuted] = useState(true);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background — video or image */}
      <div className="absolute inset-0">
        {HERO_VIDEO_URL ? (
          <>
            <video
              src={HERO_VIDEO_URL}
              autoPlay
              loop
              muted={muted}
              playsInline
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setMuted(!muted)}
              className="absolute bottom-24 right-6 z-20 p-3 rounded-full bg-background/60 backdrop-blur-sm border border-border text-foreground hover:bg-background/80 transition-colors"
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </>
        ) : (
          <img
            src={heroBg}
            alt="De Wilde Media Producties — filming on set"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-sm uppercase tracking-[0.3em] text-primary font-display mb-6"
        >
          Videograaf & Editor
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
        >
          Van idee,
          <br />
          <span className="text-gradient">tot Eindresultaat.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          De Wilde Media Producties. Professionele video content die jouw visie tot leven brengt.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-md bg-primary text-primary-foreground font-display font-semibold text-sm hover:opacity-90 transition-opacity glow"
          >
            <Play size={18} />
            Bekijk mijn werk
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-md border border-border text-foreground font-display font-semibold text-sm hover:border-primary hover:text-primary transition-colors"
          >
            Neem contact op
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown size={24} className="text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
