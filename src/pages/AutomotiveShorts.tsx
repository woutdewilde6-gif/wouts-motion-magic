import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Expand, Play } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ShortVideo {
  title: string;
  file: string;
  format: "portrait" | "landscape";
  thumb?: string; // optioneel: bestandsnaam van een afbeelding in dezelfde opslag
}

// Voeg hier je videos toe. file is de bestandsnaam in de opslag.
// thumb is optioneel: upload een afbeelding in dezelfde opslag en vul de naam hier in.
const videos: ShortVideo[] = [
  { title: "Short 1", file: "Short 1.mp4", format: "portrait", thumb: "short-1-thumb.png" },
  { title: "Short 2", file: "Short 2.mp4", format: "portrait" },
];

const BUCKET = "automotive-shorts";

const AutomotiveShorts = () => {
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [active, setActive] = useState<ShortVideo | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.storage
        .from(BUCKET)
        .createSignedUrls(
          videos.flatMap((v) => (v.thumb ? [v.file, v.thumb] : [v.file])),
          60 * 60 * 24 * 7
        );
      if (data) {
        const map: Record<string, string> = {};
        data.forEach((entry) => {
          if (entry.path && entry.signedUrl) map[entry.path] = entry.signedUrl;
        });
        setUrls(map);
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="font-display text-xl font-bold text-gradient">
            DE WILDE MEDIA
          </a>
          <a
            href="/#contact"
            className="px-5 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Neem contact op
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary font-display mb-3">
            Automotive Shorts
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Voorbeeld videos
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Dit zijn shorts die we in een vergelijkbare stijl voor je kunnen
            maken. Ze laten vooral zien wat we kunnen met tempo, energie en
            kwaliteit.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto">
          {videos.map((video, i) => {
            const url = urls[video.file];
            return (
              <motion.div
                key={video.file}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
              >
                <button
                  onClick={() => url && setActive(video)}
                  className="group relative w-full rounded-xl overflow-hidden card-shadow bg-black aspect-[9/16] block"
                  aria-label={`${video.title} groot afspelen`}
                >
                  {video.thumb && urls[video.thumb] ? (
                    <img
                      src={urls[video.thumb]}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  ) : url ? (
                    <video
                      src={url}
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Play size={32} className="text-primary" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="flex items-center gap-2 text-sm font-semibold text-white">
                      <Expand size={18} /> Groot kijken
                    </span>
                  </div>
                </button>
                <h3 className="font-display text-base font-semibold mt-3 text-center">
                  {video.title}
                </h3>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="text-muted-foreground mb-4">
            Interesse in vergelijkbare content voor jouw merk?
          </p>
          <a
            href="/#contact"
            className="inline-block px-8 py-3 rounded-md bg-primary text-primary-foreground font-display font-semibold hover:opacity-90 transition-opacity"
          >
            Neem contact op
          </a>
        </motion.div>
      </main>

      <AnimatePresence>
        {active && urls[active.file] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setActive(null)}
          >
            <button
              onClick={() => setActive(null)}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
              aria-label="Sluiten"
            >
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full ${
                active.format === "portrait"
                  ? "max-w-sm aspect-[9/16]"
                  : "max-w-4xl aspect-video"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={urls[active.file]}
                className="w-full h-full rounded-xl bg-black"
                controls
                autoPlay
                playsInline
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AutomotiveShorts;
