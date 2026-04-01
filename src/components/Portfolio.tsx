import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";

type ProjectFormat = "landscape" | "portrait";

const projects: { img: string; title: string; category: string; videoUrl: string; format: ProjectFormat }[] = [
  { img: portfolio1, title: "Skyline at Golden Hour", category: "Drone", videoUrl: "https://youtu.be/grmlV73ndAs", format: "landscape" },
  { img: portfolio2, title: "Love in the Dark", category: "Bruiloft", videoUrl: "", format: "landscape" },
  { img: portfolio3, title: "Product Showcase", category: "Commercial", videoUrl: "", format: "portrait" },
  { img: portfolio4, title: "Neon Dreams", category: "Muziekvideo", videoUrl: "", format: "portrait" },
  { img: portfolio5, title: "Into the Wild", category: "Documentaire", videoUrl: "", format: "landscape" },
  { img: portfolio6, title: "Live & Loud", category: "Evenement", videoUrl: "", format: "portrait" },
];

function getEmbedUrl(url: string): string | null {
  if (!url) return null;
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`;
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
  return null;
}

const Portfolio = () => {
  const [activeProject, setActiveProject] = useState<typeof projects[0] | null>(null);

  const embedUrl = activeProject ? getEmbedUrl(activeProject.videoUrl) : null;

  return (
    <>
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[240px]">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setActiveProject(project)}
                className={`group relative rounded-lg overflow-hidden cursor-pointer card-shadow ${
                  project.format === "portrait" ? "row-span-2" : "col-span-1"
                }`}
              >
                <img
                  src={project.img}
                  alt={project.title}
                  loading="lazy"
                  width={project.format === "portrait" ? 400 : 800}
                  height={project.format === "portrait" ? 712 : 512}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/60 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                    <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center">
                      <Play size={24} className="text-primary-foreground ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-xs uppercase tracking-wider text-primary font-display">
                      {project.category}
                    </span>
                    <h3 className="font-display text-sm md:text-lg font-semibold text-foreground mt-1">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full bg-card border border-border rounded-2xl overflow-hidden card-shadow ${
                activeProject.format === "portrait" ? "max-w-sm" : "max-w-4xl"
              }`}
            >
              {/* Close button */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors"
              >
                <X size={20} />
              </button>

              {/* Video area */}
              <div className="aspect-video bg-black">
                {embedUrl ? (
                  <iframe
                    src={embedUrl}
                    className="w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title={activeProject.title}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground gap-4">
                    <img
                      src={activeProject.img}
                      alt={activeProject.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-30"
                    />
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full border-2 border-primary/50 flex items-center justify-center">
                        <Play size={28} className="text-primary ml-1" />
                      </div>
                      <p className="text-sm font-display text-foreground/70">
                        Video binnenkort beschikbaar
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Info bar */}
              <div className="p-6 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-primary font-display">
                    {activeProject.category}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-foreground mt-1">
                    {activeProject.title}
                  </h3>
                </div>
                <a
                  href="#contact"
                  onClick={() => setActiveProject(null)}
                  className="px-6 py-2.5 rounded-md bg-primary text-primary-foreground font-display font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  Vergelijkbaar project?
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Portfolio;
