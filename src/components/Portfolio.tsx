import { motion } from "framer-motion";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";

const projects = [
  { img: portfolio1, title: "Skyline at Golden Hour", category: "Drone" },
  { img: portfolio2, title: "Love in the Dark", category: "Bruiloft" },
  { img: portfolio3, title: "Product Showcase", category: "Commercial" },
  { img: portfolio4, title: "Neon Dreams", category: "Muziekvideo" },
  { img: portfolio5, title: "Into the Wild", category: "Documentaire" },
  { img: portfolio6, title: "Live & Loud", category: "Evenement" },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary font-display mb-3">
            Portfolio
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Recente projecten
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-lg overflow-hidden cursor-pointer card-shadow"
            >
              <img
                src={project.img}
                alt={project.title}
                loading="lazy"
                width={800}
                height={512}
                className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/60 transition-colors duration-300 flex items-end">
                <div className="p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-xs uppercase tracking-wider text-primary font-display">
                    {project.category}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-foreground mt-1">
                    {project.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
