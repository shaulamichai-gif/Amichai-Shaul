import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Flame, Leaf, Snowflake } from 'lucide-react';

export default function Concept() {
  const [activeWorld, setActiveWorld] = useState<'ostsee' | 'mittelmeer' | 'asien'>('ostsee');

  const worlds = [
    {
      id: 'ostsee' as const,
      title: 'Ostsee-Küste',
      icon: '🌊',
      quote: 'Frisch, salzig & bodenständig.',
      description: 'Unsere nordische Heimat auf dem Teller. Fangfrischer Ostsee-Dorsch, zarte Schollenfilets und saftiges Ribeye-Rindfleisch von der Schleswig-Holsteinischen Färse.',
      highlights: ['Dorschfilet à la Schleieck', 'Schleswig-Holstein Färse Rind', 'Regionale Feld- & Ackerkräuter'],
      color: 'border-blue-400/30 text-blue-400 bg-blue-500/5'
    },
    {
      id: 'mittelmeer' as const,
      title: 'Mittelmeer',
      icon: '☀️',
      quote: 'Sonnengeküsst, aromatisch & leicht.',
      description: 'Südländische Lebensfreude zum Teilen. Cremige Burrata, hausgemachtes Basilikum-Pesto, würzige Harissa-Pasten und goldgelb gerösteter Fetakäse im krossen Filoteig.',
      highlights: ['Riesengarnelen & Burrata', 'Gerösteter Fetakäse im Filoteig', 'Piccata Milanese & Kirschtomatenragout'],
      color: 'border-amber-400/30 text-gold-400 bg-amber-500/5'
    },
    {
      id: 'asien' as const,
      title: 'Asien',
      icon: '🌿',
      quote: 'Exotisch, ausbalanciert & intensiv.',
      description: 'Die Geschmacksvielfalt des Ostens. Fein abgeschmecktes Thunfisch-Tartar mit rotem Thai-Curry, frische Wakame-Algen, aromatische Miso-Saucen und knuspriges Crispyhuhn.',
      highlights: ['Thunfisch-Tartar mit Mango & Kokos', 'Spitzkohl aus dem Ofen mit Miso', 'Crispyhuhn mit Nam Pla & Sesam'],
      color: 'border-emerald-400/30 text-emerald-400 bg-emerald-500/5'
    }
  ];

  return (
    <section id="konzept" className="py-24 bg-schlei-800 relative border-t border-b border-gold-500/5">
      {/* Background Decorative patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(#d4af37_0.4px,transparent_0.4px)] [background-size:16px_16px] opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-3 block">
            Neu im Schleieck
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">
            „Gesellig & Genießen“
          </h2>
          <p className="font-serif italic text-lg sm:text-xl text-gold-400/90 mb-4">
            Ein Teller ist uns zu wenig. Bei uns geht es ums Erleben.
          </p>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mb-6"></div>
          <p className="text-slate-300 leading-relaxed text-sm sm:text-base font-light">
            Bestellen Sie, worauf Sie Lust haben. Kombinieren und teilen Sie nach Belieben mit Freunden und Familie – und genießen Sie unsere internationale Küche als exklusives <strong>„Tischbuffet“</strong> gemeinsam Stück für Stück.
          </p>
        </div>

        {/* Interactive Cuisines Tabs Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {worlds.map((world) => {
            const isActive = activeWorld === world.id;
            return (
              <button
                key={world.id}
                onClick={() => setActiveWorld(world.id)}
                className={`glass-effect rounded-2xl p-6 text-left border transition-all duration-300 cursor-pointer flex flex-col justify-between h-full group ${
                  isActive 
                    ? 'border-gold-500 bg-schlei-900 ring-2 ring-gold-500/20' 
                    : 'border-gold-500/10 hover:border-gold-500/40'
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-4xl filter drop-shadow-md select-none">{world.icon}</span>
                    <span className={`text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full border ${world.color}`}>
                      Pfeiler
                    </span>
                  </div>
                  
                  <h3 className="font-serif text-2xl font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">
                    {world.title}
                  </h3>
                  
                  <p className="font-serif italic text-gold-400/80 text-sm mb-3">
                    „{world.quote}“
                  </p>
                  
                  <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed mb-4">
                    {world.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 w-full">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-2 font-medium">
                    Kulinarische Beispiele:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {world.highlights.map((h) => (
                      <span key={h} className="text-[10px] bg-schlei-900/60 text-slate-300 px-2.5 py-1 rounded-md border border-white/5">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Sharing Formula Detail Panel */}
        <div className="glass-effect rounded-2xl p-8 border border-gold-500/20">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-gold-400 text-xs font-bold uppercase tracking-widest">
                Die goldene Formel
              </span>
              <h4 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Wie funktioniert das Tischbuffet?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                Unser Speisenkonzept ist darauf ausgelegt, dass Sie nicht nur ein Hauptgericht wählen, sondern mehrere Gerichte auf dem Tisch platzieren. Jedes Gericht wird in einer idealen Sharing-Größe serviert.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="bg-gold-500/10 text-gold-400 rounded-lg p-2 shrink-0 border border-gold-500/20">
                    <span className="text-xs font-bold">2/p</span>
                  </div>
                  <div>
                    <h5 className="font-serif text-sm font-bold text-white">2 Gerichte pro Person</h5>
                    <p className="text-xs text-slate-400 font-light">Entspricht in Sättigung und Vielfalt etwa einem klassischen Hauptgericht.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-gold-500/10 text-gold-400 rounded-lg p-2 shrink-0 border border-gold-500/20">
                    <span className="text-xs font-bold">Mix</span>
                  </div>
                  <div>
                    <h5 className="font-serif text-sm font-bold text-white">Mix & Match</h5>
                    <p className="text-xs text-slate-400 font-light">Wählen Sie zum Beispiel 2x Ostsee, 1x Mittelmeer und 1x Asien für perfekte Vielfalt.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-schlei-900/60 rounded-xl p-6 border border-white/5 flex flex-col justify-between h-full">
              <div className="text-center mb-4">
                <span className="text-3xl">🛎️</span>
                <h5 className="font-serif text-lg font-bold text-white mt-2">Unsere Speisekarte</h5>
                <p className="text-xs text-slate-400 mt-1 font-light">
                  Werfen Sie einen Blick auf unsere ausgewählte Speisekarte weiter unten und stellen Sie Ihr perfektes Tischbuffet ganz nach Ihren Wünschen zusammen!
                </p>
              </div>
              <a 
                href="#speisekarte" 
                className="w-full text-center bg-gold-500/10 hover:bg-gold-500 text-gold-400 hover:text-schlei-900 border border-gold-500/30 font-bold py-3 px-4 rounded-lg text-xs uppercase tracking-wider transition-all"
              >
                Zur Speisekarte
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
