import { Clock, Phone, MapPin, AlertTriangle, Compass } from 'lucide-react';
import { motion } from 'motion/react';

export default function OpeningHours() {
  return (
    <section id="oeffnungszeiten" className="py-24 bg-schlei-900 relative border-t border-white/5">
      
      {/* Decorative radial gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(#d4af37_0.3px,transparent_0.3px)] [background-size:24px_24px] opacity-[0.02] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-3 block">
            Planen Sie Ihren Abend
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">
            Öffnungszeiten & Kontakt
          </h2>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto"></div>
        </div>

        {/* Schedule grid layout */}
        <div className="glass-effect rounded-3xl p-6 sm:p-10 border border-gold-500/20 shadow-2xl relative overflow-hidden bg-schlei-800/40">
          
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            
            {/* Hours card */}
            <div className="space-y-6 flex flex-col justify-between">
              
              <div className="space-y-4">
                <div className="flex gap-3 items-start">
                  <div className="p-2 bg-gold-500/10 rounded-lg text-gold-400 shrink-0 mt-0.5 border border-gold-500/20">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-white">Dienstag, Donnerstag, Freitag & Samstag</h4>
                    <p className="text-gold-400 font-semibold text-sm mt-0.5">17:00 – 22:00 Uhr</p>
                    <p className="text-xs text-slate-400 mt-1 font-light">
                      Unsere warme Küche bereitet die Speisen frisch von <strong>17:00 – 20:30 Uhr</strong> für Sie zu.
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 flex gap-3 items-start">
                  <div className="p-2 bg-gold-500/10 rounded-lg text-gold-400 shrink-0 mt-0.5 border border-gold-500/20">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-white">Sonn- & Feiertage</h4>
                    <p className="text-gold-400 font-semibold text-sm mt-0.5">17:00 – 22:00 Uhr</p>
                    <p className="text-xs text-slate-400 mt-1 font-light">
                      Unsere warme Küche bereitet die Speisen von <strong>17:00 – 20:00 Uhr</strong> für Sie zu.
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 flex gap-3 items-start">
                  <div className="p-2 bg-white/5 rounded-lg text-slate-400 shrink-0 mt-0.5 border border-white/10">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-slate-400">Ruhetage</h4>
                    <p className="text-slate-400 text-xs font-light mt-0.5">
                      Montag und Mittwoch laden wir unsere Batterien auf.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Address & Quick Info card */}
            <div className="bg-schlei-900 rounded-2xl p-6 border border-white/5 flex flex-col justify-between">
              <div>
                <h4 className="font-serif text-xl font-bold text-white mb-4">
                  📍 Hier finden Sie uns
                </h4>
                
                <div className="space-y-4 text-xs font-light">
                  <div className="flex gap-2.5 items-start">
                    <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block font-medium">Adresse:</span>
                      <strong className="text-white block mt-0.5">Schleieck 1, 24376 Maasholm an der Schlei</strong>
                    </div>
                  </div>

                  <div className="flex gap-2.5 items-start">
                    <Phone className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block font-medium">Telefonische Auskunft:</span>
                      <a href="tel:046426016" className="text-gold-400 font-bold hover:underline block mt-0.5">
                        04642 - 6016
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terraces caution message from original design */}
              <div className="bg-gold-500/5 border border-gold-500/20 rounded-xl p-4 mt-6">
                <div className="flex gap-2 items-start text-xs">
                  <AlertTriangle className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white font-serif block">Terrassen-Plätze:</strong>
                    <p className="text-[11px] text-slate-400 font-light mt-0.5">
                      Für unsere wunderschöne Außenterrasse nehmen wir keine Reservierungen entgegen. Kommen Sie einfach spontan vorbei!
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
