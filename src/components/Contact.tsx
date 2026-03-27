import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, ArrowUpRight } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary font-display mb-3">
            Contact
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Laten we samenwerken
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <a
              href="mailto:info@woutvisuals.nl"
              className="flex items-center gap-4 p-5 rounded-lg bg-secondary hover:bg-border transition-colors group"
            >
              <Mail size={20} className="text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  info@woutvisuals.nl
                </p>
              </div>
            </a>
            <a
              href="tel:+31612345678"
              className="flex items-center gap-4 p-5 rounded-lg bg-secondary hover:bg-border transition-colors group"
            >
              <Phone size={20} className="text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Telefoon</p>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  +31 6 12345678
                </p>
              </div>
            </a>
            <div className="flex items-center gap-4 p-5 rounded-lg bg-secondary">
              <MapPin size={20} className="text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Locatie</p>
                <p className="text-sm font-medium text-foreground">
                  Nederland
                </p>
              </div>
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-lg bg-secondary hover:bg-border transition-colors group"
            >
              <Instagram size={20} className="text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Instagram</p>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                  @woutvisuals <ArrowUpRight size={14} />
                </p>
              </div>
            </a>
          </div>

          <div className="text-center">
            <a
              href="mailto:info@woutvisuals.nl"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-md bg-primary text-primary-foreground font-display font-semibold hover:opacity-90 transition-opacity glow"
            >
              <Mail size={18} />
              Stuur een bericht
            </a>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-4 mt-24 pt-8 border-t border-border">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Wout Visuals. Alle rechten voorbehouden.
        </p>
      </div>
    </section>
  );
};

export default Contact;
