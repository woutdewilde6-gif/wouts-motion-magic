import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Linkedin, ArrowUpRight, Send, CheckCircle } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", type: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // mailto fallback
    const subject = encodeURIComponent(`Aanvraag: ${formData.type || "Project"}`);
    const body = encodeURIComponent(
      `Naam: ${formData.name}\nEmail: ${formData.email}\nType: ${formData.type}\n\n${formData.message}`
    );
    window.open(`mailto:info@dewildemedia.nl?subject=${subject}&body=${body}`);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const projectTypes = ["Bruiloft", "Commercial", "Muziekvideo", "Evenement", "Social Media", "Documentaire"];

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
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Vertel me over je project en ik neem zo snel mogelijk contact op.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-10">
          {/* Form — 3 cols */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-display font-medium text-foreground mb-2">Naam</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Je naam"
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-display font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="je@email.nl"
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-display font-medium text-foreground mb-2">Type project</label>
              <div className="flex flex-wrap gap-2">
                {projectTypes.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFormData({ ...formData, type: t })}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      formData.type === t
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-border"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-display font-medium text-foreground mb-2">Bericht</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Vertel over je project, gewenste datum, stijl..."
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-sm hover:opacity-90 transition-opacity glow w-full sm:w-auto justify-center"
            >
              {submitted ? (
                <>
                  <CheckCircle size={18} />
                  Verstuurd!
                </>
              ) : (
                <>
                  <Send size={18} />
                  Verstuur bericht
                </>
              )}
            </button>
          </motion.form>

          {/* Info — 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="bg-secondary/50 border border-border rounded-xl p-6 space-y-5">
              <h3 className="font-display font-semibold text-foreground">Direct contact</h3>

              <a
                href="mailto:info@dewildemedia.nl"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-foreground font-medium group-hover:text-primary transition-colors">info@dewildemedia.nl</p>
                  <p className="text-xs text-muted-foreground">Email</p>
                </div>
              </a>

              <a
                href="tel:+31612345678"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Phone size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-foreground font-medium group-hover:text-primary transition-colors">+31 6 12345678</p>
                  <p className="text-xs text-muted-foreground">Telefoon</p>
                </div>
              </a>

              <div className="flex items-center gap-3 text-sm">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-foreground font-medium">Nederland</p>
                  <p className="text-xs text-muted-foreground">Locatie</p>
                </div>
              </div>
            </div>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-secondary/50 border border-border rounded-xl p-5 hover:border-primary/50 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Instagram size={18} className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-foreground font-medium text-sm group-hover:text-primary transition-colors">@dewildemedia</p>
                <p className="text-xs text-muted-foreground">Volg op Instagram</p>
              </div>
              <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-4 mt-24 pt-8 border-t border-border">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} De Wilde Media Producties. Alle rechten voorbehouden.
        </p>
      </div>
    </section>
  );
};

export default Contact;
