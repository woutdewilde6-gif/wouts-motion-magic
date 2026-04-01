import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "Reviews", href: "#reviews" },
  { label: "Prijscalculator", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <a href="#" className="font-display text-xl font-bold text-gradient">
          DE WILDE MEDIA
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="px-5 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Neem contact op
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-card border-b border-border px-4 pb-4"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="block mt-2 px-5 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold text-center"
          >
            Neem contact op
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
