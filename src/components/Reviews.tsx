import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const reviews = [
  {
    name: "Lisa de Vries",
    role: "Bruiloft",
    text: "Wout heeft onze trouwdag prachtig vastgelegd. Het eindresultaat was cinematisch en emotioneel — precies wat we wilden. Absoluut een aanrader!",
    stars: 5,
  },
  {
    name: "Mark Janssen",
    role: "Bedrijfsvideo",
    text: "Professioneel, creatief en ongelofelijk snel. Wout begrijpt precies wat je nodig hebt en levert altijd boven verwachting. Fantastische samenwerking!",
    stars: 5,
  },
  {
    name: "Sophie Bakker",
    role: "Muziekvideo",
    text: "De muziekvideo die Wout voor ons maakte was next level. De shots, de editing, de kleurgrading — alles klopte. We werken zeker weer samen!",
    stars: 5,
  },
  {
    name: "Thomas van Dijk",
    role: "Evenement",
    text: "Wout filmde ons jaarlijkse bedrijfsevent en de aftermovie was perfect. Snelle communicatie en een prachtig eindproduct.",
    stars: 5,
  },
];

const Reviews = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? reviews.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === reviews.length - 1 ? 0 : c + 1));

  const review = reviews[current];

  return (
    <section id="reviews" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary font-display mb-3">
            Reviews
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Wat klanten zeggen
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="text-center"
          >
            <Quote size={40} className="text-primary mx-auto mb-6 opacity-40" />

            <p className="text-xl md:text-2xl leading-relaxed text-foreground mb-8 font-body">
              "{review.text}"
            </p>

            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: review.stars }).map((_, i) => (
                <Star key={i} size={18} className="fill-primary text-primary" />
              ))}
            </div>

            <p className="font-display font-semibold text-foreground">
              {review.name}
            </p>
            <p className="text-sm text-muted-foreground">{review.role}</p>
          </motion.div>

          <div className="flex justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="p-3 rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="p-3 rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Trustpilot integration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 pt-10 border-t border-border"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href="https://nl.trustpilot.com/review/dewildemedia.nl"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3 rounded-xl border border-border bg-background hover:border-primary transition-colors group"
              >
                <div className="flex items-center gap-1.5">
                  <Star size={16} className="fill-[#00b67a] text-[#00b67a]" />
                  <span className="font-display font-semibold text-foreground text-sm">Trustpilot</span>
                </div>
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                  Bekijk profiel →
                </span>
              </a>

              <a
                href="https://nl.trustpilot.com/evaluate/dewildemedia.nl"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00b67a] text-white font-display font-semibold text-sm hover:bg-[#00a06a] transition-colors"
              >
                <ExternalLink size={15} />
                Laat een review achter
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
