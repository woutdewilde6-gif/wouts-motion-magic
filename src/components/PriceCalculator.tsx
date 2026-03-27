import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, Film, Clock, Palette, Sparkles } from "lucide-react";

type VideoType = "bruiloft" | "commercial" | "muziekvideo" | "evenement" | "social" | "documentaire";

const videoTypes: { value: VideoType; label: string; base: number }[] = [
  { value: "social", label: "Social Media Content", base: 250 },
  { value: "commercial", label: "Commercial / Reclame", base: 600 },
  { value: "bruiloft", label: "Bruiloft", base: 900 },
  { value: "muziekvideo", label: "Muziekvideo", base: 700 },
  { value: "evenement", label: "Evenement / Aftermovie", base: 500 },
  { value: "documentaire", label: "Documentaire", base: 800 },
];

const PriceCalculator = () => {
  const [type, setType] = useState<VideoType>("commercial");
  const [duration, setDuration] = useState(2);
  const [videoCount, setVideoCount] = useState(3);
  const [shootDays, setShootDays] = useState(1);
  const [colorGrading, setColorGrading] = useState(false);
  const [drone, setDrone] = useState(false);

  const price = useMemo(() => {
    const selected = videoTypes.find((v) => v.value === type)!;
    let total = selected.base;
    if (type === "social") {
      total += (videoCount - 1) * 150;
    } else {
      total += (duration - 1) * 120;
    }
    total += (shootDays - 1) * 350;
    if (colorGrading) total += 150;
    if (drone) total += 200;
    return total;
  }, [type, duration, videoCount, shootDays, colorGrading, drone]);

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary font-display mb-3">
            Prijscalculator
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Wat gaat het kosten?
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Krijg een indicatie van de kosten voor jouw project. Exacte prijzen worden altijd in overleg bepaald.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Type */}
            <div>
              <label className="flex items-center gap-2 text-sm font-display font-medium text-foreground mb-3">
                <Film size={16} className="text-primary" />
                Type video
              </label>
              <div className="grid grid-cols-2 gap-2">
                {videoTypes.map((v) => (
                  <button
                    key={v.value}
                    onClick={() => setType(v.value)}
                    className={`px-4 py-3 rounded-md text-sm font-medium transition-all ${
                      type === v.value
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-border"
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="flex items-center gap-2 text-sm font-display font-medium text-foreground mb-3">
                <Clock size={16} className="text-primary" />
                Videoduur: {duration} {duration === 1 ? "minuut" : "minuten"}
              </label>
              <input
                type="range"
                min={1}
                max={15}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1 min</span>
                <span>15 min</span>
              </div>
            </div>

            {/* Shoot days */}
            <div>
              <label className="flex items-center gap-2 text-sm font-display font-medium text-foreground mb-3">
                <Sparkles size={16} className="text-primary" />
                Draaidagen: {shootDays}
              </label>
              <input
                type="range"
                min={1}
                max={5}
                value={shootDays}
                onChange={(e) => setShootDays(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1 dag</span>
                <span>5 dagen</span>
              </div>
            </div>

            {/* Extras */}
            <div>
              <label className="flex items-center gap-2 text-sm font-display font-medium text-foreground mb-3">
                <Palette size={16} className="text-primary" />
                Extra's
              </label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={colorGrading}
                    onChange={(e) => setColorGrading(e.target.checked)}
                    className="w-4 h-4 accent-primary rounded"
                  />
                  <span className="text-sm text-secondary-foreground">
                    Geavanceerde kleurgrading (+€150)
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={drone}
                    onChange={(e) => setDrone(e.target.checked)}
                    className="w-4 h-4 accent-primary rounded"
                  />
                  <span className="text-sm text-secondary-foreground">
                    Drone opnames (+€200)
                  </span>
                </label>
              </div>
            </div>
          </motion.div>

          {/* Result */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <div className="bg-card border border-border rounded-2xl p-10 text-center w-full card-shadow">
              <Calculator size={32} className="text-primary mx-auto mb-4" />
              <p className="text-sm text-muted-foreground font-display uppercase tracking-wider mb-2">
                Geschatte prijs
              </p>
              <motion.p
                key={price}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="font-display text-5xl md:text-6xl font-bold text-gradient mb-4"
              >
                €{price.toLocaleString("nl-NL")}
              </motion.p>
              <p className="text-sm text-muted-foreground mb-8">
                Dit is een indicatie. Neem contact op voor een exacte offerte.
              </p>
              <a
                href="#contact"
                className="inline-block px-8 py-3 rounded-md bg-primary text-primary-foreground font-display font-semibold text-sm hover:opacity-90 transition-opacity glow"
              >
                Vraag een offerte aan
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PriceCalculator;
