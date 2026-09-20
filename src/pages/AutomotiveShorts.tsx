import { motion } from "framer-motion";
import { Play } from "lucide-react";

interface ShortVideo {
  title: string;
  vimeoUrl: string;
  format: "portrait" | "landscape";
}

// Voeg hier je test videos toe. Plak gewoon de Vimeo link erin.
const videos: ShortVideo[] = [
  // Voorbeeld:
  // { title: "Automotive Short 1", vimeoUrl: "https://vimeo.com/123456789", format: "portrait" },
];

function getEmbedUrl(url: string): string | null {
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=0&muted=0`;
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0`;
  return null;
}

const AutomotiveShorts = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="font-display text-xl font-bold text-gradient">
            DE WILDE MEDIA
          </a>
          <a
            href="/#contact"
            className="px-5 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Neem contact op
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary font-display mb-3">
            Automotive Shorts
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Voorbeeld videos
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Dit zijn shorts die we in een vergelijkbare stijl voor je kunnen maken.
            Ze laten vooral zien wat we kunnen met tempo, energie en kwaliteit.
          </p>
          <p className="text-muted-foreground max-w-xl mx-auto mt-4">
            De eerste is met een professionele camera opgenomen en oogt echt van hoge
            kwaliteit. De andere zijn met de telefoon gemaakt, lekker naturel. Beide
            stijlen kunnen, dus we kijken samen wat het beste bij jouw merk past.
          </p>
        </motion.div>

        {videos.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-8">
            {videos.map((video, i) => {
              const embed = getEmbedUrl(video.vimeoUrl);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className={`w-full ${video.format === "portrait" ? "max-w-xs" : "max-w-3xl"}`}
                >
                  <div
                    className={`rounded-xl overflow-hidden card-shadow bg-black ${
                      video.format === "portrait" ? "aspect-[9/16]" : "aspect-video"
                    }`}
                  >
                    {embed ? (
                      <iframe
                        src={embed}
                        className="w-full h-full"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        title={video.title}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Play size={32} className="text-primary" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-display text-lg font-semibold mt-4 text-center">
                    {video.title}
                  </h3>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            <p>Videos worden binnenkort toegevoegd.</p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="text-muted-foreground mb-4">
            Interesse in vergelijkbare content voor jouw merk?
          </p>
          <a
            href="/#contact"
            className="inline-block px-8 py-3 rounded-md bg-primary text-primary-foreground font-display font-semibold hover:opacity-90 transition-opacity"
          >
            Neem contact op
          </a>
        </motion.div>
      </main>
    </div>
  );
};

export default AutomotiveShorts;
