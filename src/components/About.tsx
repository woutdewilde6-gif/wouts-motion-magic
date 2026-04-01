import { motion } from "framer-motion";
import { Camera, Film, Monitor, Clapperboard } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const skills = [
  { icon: Camera, label: "Sony A7 IV" },
  { icon: Clapperboard, label: "DJI RS 3 Mini" },
  { icon: Film, label: "Adobe Premiere Pro" },
  { icon: Monitor, label: "After Effects" },
];

const timeline = [
  { year: "2021", text: "Begonnen met video editing" },
  { year: "2022", text: "Eerste social media klant" },
  { year: "2024", text: "Uitgegroeid met meer klanten en projecten" },
  { year: "2025", text: "Begonnen met filmen en De Wilde Media Producties opgericht" },
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
            De mens achter de camera
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-center max-w-4xl mx-auto">
          {/* Foto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden border border-border card-shadow">
              <img
                src={heroBg}
                alt="Wout de Wilde"
                className="w-full aspect-[3/4] object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-5 py-2 rounded-lg font-display font-bold text-sm">
              18 jaar
            </div>
          </motion.div>

          {/* Tekst */}
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
            <p className="text-muted-foreground leading-relaxed">
              Ik focus me vooral op video editing. Van korte social media clips 
              tot langere projecten. Ik vind het leuk om verhalen visueel tot leven 
              te brengen en elk project net dat beetje extra mee te geven.
            </p>

            {/* Skills */}
            <div>
              <h3 className="font-display font-semibold text-foreground mb-3">
                Mijn tools
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {skills.map((skill) => (
                  <div
                    key={skill.label}
                    className="flex items-center gap-3 bg-background/60 border border-border rounded-lg px-4 py-3"
                  >
                    <skill.icon size={18} className="text-primary shrink-0" />
                    <span className="text-sm text-foreground">{skill.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tijdlijn */}
            <div>
              <h3 className="font-display font-semibold text-foreground mb-3">
                Mijn pad
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
