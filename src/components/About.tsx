import { motion } from "framer-motion";
import aboutPhoto from "@/assets/about-photo.jpg";

const timeline = [
  { year: "2021", text: "Begonnen met video editing" },
  { year: "2022", text: "Eerste social media klant" },
  { year: "2024", text: "Bedrijf opgericht bij de KVK" },
  { year: "2025", text: "Begonnen met videografie" },
];

const About = () => {
  return (
    <section id="about" className="py-16 bg-card/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary font-display mb-3">
            Over mij
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            De persoon achter de camera
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-center max-w-4xl mx-auto">
          {/* Foto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="rounded-2xl overflow-hidden border border-border card-shadow">
              <img
                src={aboutPhoto}
                alt="Wout de Wilde"
                className="w-full aspect-square object-cover grayscale"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-5 py-2 rounded-lg font-display font-bold text-sm">
              18 jaar
            </div>
          </motion.div>

          {/* Tekst + Tijdlijn */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-foreground leading-relaxed">
              Hey, ik ben <span className="text-primary font-semibold">Wout</span>. 
              18 jaar en gepassioneerd door alles wat met video te maken heeft. 
              Wat begon als een hobby is uitgegroeid tot mijn eigen bedrijf: De Wilde Media Producties.
            </p>

            <div>
              <h3 className="font-display font-semibold text-foreground mb-3">
                Videografie
              </h3>
              <div className="space-y-3">
                {timeline.map((item) => (
                  <div key={item.year} className="flex items-start gap-4">
                    <span className="text-primary font-display font-bold text-sm mt-0.5 shrink-0">
                      {item.year}
                    </span>
                    <div className="h-px bg-border flex-1 mt-3" />
                    <span className="text-sm text-muted-foreground">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
