import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Expand, Play, Gauge, CalendarDays, Palette, Car } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ShortVideo {
  title: string;
  category: string;
  description: string;
  file: string;
  format: "portrait" | "landscape";
  thumb?: string;
}

const videos: ShortVideo[] = [
  {
    title: "Short 1",
    category: "Professionele camera",
    description:
      "Een strakke short waarin de lijnen en details van de auto centraal staan. Gefilmd met een professionele camera voor een verzorgde uitstraling.",
    file: "Short 1.mp4",
    format: "portrait",
    thumb: "short-1-thumb.png",
  },
  {
    title: "Short 2",
    category: "Telefoon content",
    description:
      "Een directe en natuurlijke short die goed past tussen de dagelijkse content op social media. Laagdrempelig opgenomen, met aandacht voor tempo en energie.",
    file: "Short 2.mp4",
    format: "portrait",
    thumb: "short-2-thumb.png",
  },
];

const BUCKET = "automotive-shorts";
// Vul hier later de exacte bestandsnaam uit de opslag in, bijvoorbeeld "achter de schermen.mp4".
const BEHIND_THE_SCENES_FILE = "";

const carSpecifications = [
  { label: "Model", value: "Opel Corsa", icon: Car },
  { label: "Motor", value: "1.2 Turbo", icon: Gauge },
  { label: "Bouwjaar", value: "2024", icon: CalendarDays },
  { label: "Vermogen", value: "101 pk", icon: Gauge },
  { label: "Kleur", value: "Wit", icon: Palette },
];

const AutomotiveShorts = () => {
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [active, setActive] = useState<ShortVideo | null>(null);

  useEffect(() => {
    const load = async () => {
      const files = videos.flatMap((video) =>
        video.thumb ? [video.file, video.thumb] : [video.file]
      );
      if (BEHIND_THE_SCENES_FILE) files.push(BEHIND_THE_SCENES_FILE);

      const { data } = await supabase.storage
        .from(BUCKET)
        .createSignedUrls(files, 60 * 60 * 24 * 7);
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

      <main className="container mx-auto px-4 py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary font-display mb-3">
            Automotive Shorts
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Voorbeeld videos
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Dit zijn shorts die we in een vergelijkbare stijl voor je kunnen
            maken. Ze laten vooral zien wat we kunnen met tempo, energie en
            kwaliteit.
          </p>
          <p className="text-foreground/80 max-w-2xl mx-auto mt-5 leading-relaxed">
            We maken samen content die past bij de auto en het bedrijf erachter.
            Van het bedenken van de beelden tot het filmen en editen, we letten
            op de details die een auto herkenbaar maken.
          </p>
        </motion.div>

        {BEHIND_THE_SCENES_FILE && urls[BEHIND_THE_SCENES_FILE] && (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto mb-20"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-primary font-display mb-3">
              Achter de schermen
            </p>
            <video
              src={urls[BEHIND_THE_SCENES_FILE]}
              className="w-full max-h-[420px] rounded-md bg-card object-cover"
              controls
              muted
              playsInline
              preload="metadata"
            />
          </motion.section>
        )}

        <div className="max-w-5xl mx-auto space-y-20 md:space-y-28">
          {videos.map((video, i) => {
            const url = urls[video.file];
            return (
              <motion.section
                key={video.file}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.08 }}
                className={`grid gap-8 md:grid-cols-[minmax(240px,320px)_1fr] md:items-center ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <button
                  onClick={() => url && setActive(video)}
                  className="group relative w-full max-w-[290px] mx-auto rounded-md overflow-hidden card-shadow bg-card aspect-[9/16] block"
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
                  <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Expand size={18} /> Groot kijken
                    </span>
                  </div>
                </button>

                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-primary font-display mb-3">
                    {video.category}
                  </p>
                  <h2 className="font-display text-3xl font-bold mb-4">
                    {video.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed max-w-xl mb-8">
                    {video.description}
                  </p>

                  <div className="border-y border-border divide-y divide-border">
                    {carSpecifications.map(({ label, value, icon: Icon }) => (
                      <div
                        key={label}
                        className="grid grid-cols-[1fr_auto] items-center gap-4 py-3"
                      >
                        <span className="flex items-center gap-3 text-sm text-muted-foreground">
                          <Icon size={16} className="text-primary" />
                          {label}
                        </span>
                        <span className="font-display text-sm font-semibold">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.section>
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
            className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4"
            onClick={() => setActive(null)}
          >
            <button
              onClick={() => setActive(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
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
                className="w-full h-full rounded-md bg-card"
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
