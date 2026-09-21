import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Expand,
  Play,
  Car,
  MessagesSquare,
  FileText,
  CalendarDays,
  Camera,
  Clapperboard,
} from "lucide-react";
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
      "Een strakke short waarin de lijnen en details van de auto centraal staan. Gefilmd met een professionele camera, voor een premium uitstraling.",
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

const steps = [
  {
    icon: MessagesSquare,
    title: "Het doel",
    text: "We beginnen met luisteren. Nieuwe klanten aantrekken, of meer naamsbekendheid door trends te volgen? Dat bepaalt alles wat daarna komt.",
  },
  {
    icon: FileText,
    title: "De scripts",
    text: "Wij schrijven de scripts op het doel. Jouw input gebruiken we als basis, maar we kunnen het ook helemaal zelf bedenken.",
  },
  {
    icon: CalendarDays,
    title: "Upload schema",
    text: "Wij maken een upload schema met welke video op welke dag online gaat. Jullie hebben daar natuurlijk inzicht in, dus je weet altijd wat er wanneer komt.",
  },
  {
    icon: Camera,
    title: "De shootdag",
    text: "Door de scripts weten we precies wat er moet gebeuren en schieten we alles in korte tijd. Willen jullie niet voor de camera staan? Geen probleem, dan doen wij dat zelf.",
  },
  {
    icon: Clapperboard,
    title: "Edit en upload",
    text: "Thuis gaan we meteen aan de slag met de edit. Daarna beheren wij je social media en uploaden alles volgens het schema.",
  },
];




const AutomotiveShorts = () => {
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [active, setActive] = useState<ShortVideo | null>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);

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
          className="text-center mb-10 md:mb-12"
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
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto mb-20 md:mb-28 grid gap-8 md:grid-cols-[1fr_1.08fr] md:items-center"
        >
          <div className="md:pr-6">
            <p className="text-sm uppercase tracking-[0.2em] text-primary font-display mb-3">
              Zo werken we
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-5">
              Van eerste gesprek tot upload
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                We beginnen met goed luisteren. Wat wil je bereiken met je
                content: nieuwe klanten, of gewoon meer naamsbekendheid door
                trends te volgen? Daar schrijven we de scripts op. Geef je zelf
                input, dan gebruiken we die als basis, anders maken we alles
                helemaal zelf.
              </p>
              <p>
                Daarna maken wij een upload schema. Daarin staat welke video op
                welke dag online gaat, afgestemd op hoeveel posts je wilt. Door
                de scripts weten we precies wat er moet gebeuren, dus zijn we op
                de shootdag niet lang bezig. Willen jullie niet voor de camera
                staan? Geen probleem, dan doen wij dat zelf.
              </p>
              <p>
                Thuis gaan we meteen aan de slag met de edit. Daarna hoeven
                jullie niets meer te doen: wij nemen het beheer van je social
                media over en uploaden alles volgens het schema. Jullie hebben
                daar altijd inzicht in, dus je weet wat er wanneer online komt.
              </p>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-card card-shadow">
            {BEHIND_THE_SCENES_FILE && urls[BEHIND_THE_SCENES_FILE] ? (
              <video
                src={urls[BEHIND_THE_SCENES_FILE]}
                className="h-full w-full object-cover"
                controls
                muted
                playsInline
                preload="metadata"
              />
            ) : urls["short-2-thumb.png"] ? (
              <img
                src={urls["short-2-thumb.png"]}
                alt="Achter de schermen tijdens het filmen van de Opel Corsa"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <Car size={40} className="text-primary" />
              </div>
            )}
            <div className="absolute left-4 bottom-4 rounded-md bg-background/85 px-3 py-2 text-sm font-display font-semibold backdrop-blur-md">
              Achter de schermen
            </div>
          </div>
        </motion.section>

        <div className="max-w-5xl mx-auto mb-20 md:mb-28">
          <p className="text-sm text-muted-foreground mb-6 text-center">
            Klik op een stap om te zien wat er gebeurt
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isActive = activeStep === i;
              return (
                <button
                  key={step.title}
                  onClick={() => setActiveStep(isActive ? null : i)}
                  className={`group text-left rounded-md border p-4 transition-all duration-300 ${
                    isActive
                      ? "border-primary bg-card card-shadow"
                      : "border-border bg-card/40 hover:border-primary/50 hover:bg-card/80"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-primary/10 text-primary group-hover:bg-primary/20"
                      }`}
                    >
                      <Icon size={16} />
                    </span>
                    <span className="font-display text-sm font-semibold">
                      {step.title}
                    </span>
                  </div>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden text-xs text-muted-foreground leading-relaxed"
                      >
                        {step.text}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>
        </div>

        <div className="max-w-5xl mx-auto mb-10 md:mb-14">
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-display mb-3">
            De voorbeelden
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Twee manieren van filmen
          </h2>
        </div>

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
                <motion.button
                  onClick={() => url && setActive(video)}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 250, damping: 20 }}
                  className="group relative w-full max-w-[290px] mx-auto rounded-md overflow-hidden card-shadow bg-card aspect-[9/16] block cursor-pointer"
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
                </motion.button>

                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-primary font-display mb-3">
                    {video.category}
                  </p>
                  <h2 className="font-display text-3xl font-bold mb-4">
                    {video.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed max-w-xl">
                    {video.description}
                  </p>
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
