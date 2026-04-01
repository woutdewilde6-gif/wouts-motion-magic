import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Wat kost een video?",
    answer:
      "Dat verschilt per project en hangt af van het type video, de lengte en wat er bij komt kijken. Neem gerust contact op, dan bespreek ik graag de mogelijkheden met je!",
  },
  {
    question: "Hoe lang duurt het voordat mijn video klaar is?",
    answer:
      "Dat verschilt per project. Korte social media content kan vaak dezelfde dag nog geleverd worden. Bij grotere projecten neem ik graag wat meer tijd om alles tot in de puntjes af te werken — kwaliteit gaat altijd voor. We spreken vooraf altijd een deadline af.",
  },
  {
    question: "Welke apparatuur en software gebruik je?",
    answer:
      "Ik film met een Sony A7 IV op een DJI RS 3 Mini gimbal, met een 28-70mm f/2.8 lens. Voor de editing werk ik in Adobe Premiere Pro en gebruik ik After Effects voor motion graphics en visuele effecten.",
  },
  {
    question: "Kan ik ook korte content voor social media laten maken?",
    answer:
      "Zeker! Ik maak regelmatig short-form content voor TikTok, Instagram Reels en YouTube Shorts. Dit kan als los project of als extra naast een andere video.",
  },
  {
    question: "Werk je ook buiten de regio?",
    answer:
      "Ja, ik ben flexibel en reis graag voor projecten door heel Nederland en daarbuiten. Reiskosten worden vooraf besproken.",
  },
  {
    question: "Hoeveel revisierondes zijn inbegrepen?",
    answer:
      "De eerste revisieronde is altijd gratis. Extra aanpassingen zijn uiteraard mogelijk en worden vooraf besproken.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary font-display mb-3">
            FAQ
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Veelgestelde vragen
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Antwoorden op de meest gestelde vragen over mijn werk.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 card-shadow">
            <div className="flex items-center gap-3 mb-6">
              <HelpCircle size={24} className="text-primary" />
              <h3 className="font-display text-lg font-semibold text-foreground">
                Heb je een vraag?
              </h3>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-border"
                >
                  <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
