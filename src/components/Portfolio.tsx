import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Eye, Heart, TrendingUp } from "lucide-react";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";
import portfolio7 from "@/assets/portfolio-7.jpg";
import portfolio8 from "@/assets/portfolio-8.jpg";

type ProjectFormat = "landscape" | "portrait";

interface ProjectStats {
  views: string;
  likes: string;
  exposure: number;
}

const projects: {
  img: string;
  title: string;
  category: string;
  videoUrl: string;
  format: ProjectFormat;
  stats?: ProjectStats;
}[] = [
  {
    img: portfolio1,
    title: "Steven Grosveld",
    category: "Entertainment",
    videoUrl: "https://youtu.be/kJ48LtGEmgY?si=YosH9h2KwVQkpvok",
    format: "landscape",
    stats: { views: "11.720", likes: "274", exposure: 2.5 },
  },
  {
    img: portfolio3,
    title: "The Base Legacy",
    category: "Commercial",
    videoUrl: "https://vimeo.com/1179367811?fl=tl&fe=ec",
    format: "portrait",
    stats: { views: "33.702", likes: "641", exposure: 2.0 },
  },
  { img: portfolio4, title: "Neon Dreams", category: "Muziekvideo", videoUrl: "", format: "portrait" },
  {
    img: portfolio5,
    title: "Kaluno",
    category: "Entertainment",
    videoUrl: "https://youtu.be/axew6Qdy3jU?si=5V3-Qn2SCLpGhbiX",
    format: "landscape",
    stats: { views: "1.342", likes: "75", exposure: 6.7 },
  },
  { 
    img: portfolio6, 
    title: "Steven Grosveld MCE Aftermovie", 
    category: "Evenement", 
    videoUrl: "https://vimeo.com/1179357991?fl=tl&fe=ec", 
    format: "portrait" 
    stats: { views: "3.583", likes: "112", exposure: 3.5 },
  },
  {
    img: portfolio8,
    title: "Festival Vibes",
    category: "Evenement",
    videoUrl: "https://www.instagram.com/reel/DVoSkUoAr_I/",
    format: "landscape",
  },
  {
    img: portfolio7,
    title: "Steven Grosveld Show Aftermovie",
    category: "Evenement",
    videoUrl: "https://vimeo.com/1179358045",
    format: "landscape",
    stats: { views: "3.211", likes: "66", exposure: 2.1 },
  },
  {
    img: portfolio2,
    title: "Steven Grosveld",
    category: "Entertainment",
    videoUrl: "https://youtu.be/VIEXefxEHco?si=pbDIxpw-85_PshF5",
    format: "landscape",
    stats: { views: "11.592", likes: "66", exposure: 2.7 },
  },
];

function getEmbedUrl(url: string): { type: "iframe" | "tiktok"; url: string } | null {
  if (!url) return null;
  // TikTok
  const tiktokMatch = url.match(/tiktok\.com\/@[\w.]+\/video\/(\d+)/);
  if (tiktokMatch) return { type: "tiktok", url: `https://www.tiktok.com/embed/${tiktokMatch[1]}` };
  // YouTube
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  );
  if (ytMatch) return { type: "iframe", url: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0` };
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return { type: "iframe", url: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&muted=1` };
  // Instagram Reels
  const reelMatch = url.match(/instagram\.com\/reel\/([\w-]+)/);
  if (reelMatch) return { type: "iframe", url: `https://www.instagram.com/reel/${reelMatch[1]}/embed` };
  return null;
}

const Portfolio = () => {
  const [activeProject, setActiveProject] = useState<(typeof projects)[0] | null>(null);

  const embed = activeProject ? getEmbedUrl(activeProject.videoUrl) : null;

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
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-display mb-3">Portfolio</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">Recente projecten</h2>
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
              <div
                className={activeProject.format === "portrait" ? "aspect-[9/16]" : "aspect-video"}
                style={{ background: "black" }}
              >
                {embed ? (
                  <iframe
                    src={embed.url}
                    className="w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title={activeProject.title}
                    sandbox={embed.type === "tiktok" ? "allow-scripts allow-same-origin allow-popups" : undefined}
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
                      <p className="text-sm font-display text-foreground/70">Video binnenkort beschikbaar</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Stats bar */}
              {activeProject.stats && (
                <div className="px-6 py-4 border-t border-border flex items-center gap-6">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Eye size={16} />
                    <span className="text-sm font-medium text-foreground">{activeProject.stats.views}</span>
                    <span className="text-xs">views</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Heart size={16} />
                    <span className="text-sm font-medium text-foreground">{activeProject.stats.likes}</span>
                    <span className="text-xs">likes</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <TrendingUp size={16} />
                    <span className="text-sm font-medium text-foreground">{activeProject.stats.exposure}%</span>
                    <span className="text-xs">exposure</span>
                  </div>
                </div>
              )}

              {/* Info bar */}
              <div className="p-6 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-primary font-display">
                    {activeProject.category}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-foreground mt-1">{activeProject.title}</h3>
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
