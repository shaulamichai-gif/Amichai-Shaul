import { motion } from 'motion/react';
import { Calendar, Clock, Utensils, Info, HelpCircle } from 'lucide-react';

export default function Hero() {
  // Dishes to feature matching user request perfectly
  const featuredDishes = [
    {
      name: 'Würziges Crispyhuhn',
      price: '13,50 €',
      description: 'Nam Pla* / Mango / Limette / Rote Chili / Sesam',
      imageUrl: 'https://lh3.googleusercontent.com/d/13bAVhVpkUhQfvtDLeT6BUKiwB-0ch_y1',
      fallbackUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Gerösteter Fetakäse',
      price: '13,50 €',
      description: 'Filoteig / Harissa* / Kirschtomate / Blattspinat / Olive / Zitrone',
      imageUrl: 'https://images.unsplash.com/photo-1511018556340-d16986a1c194?auto=format&fit=crop&w=600&q=80',
      fallbackUrl: 'https://images.unsplash.com/photo-1511018556340-d16986a1c194?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Sardinen',
      price: '12,50 €',
      description: 'Kräuteröl / Meersalz / Zitrone / Knoblauch',
      imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&q=80',
      fallbackUrl: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <section 
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center pt-28 pb-16 overflow-hidden"
    >
      {/* Background Image with Dark Overlays */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 transition-all duration-700"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(7, 24, 30, 0.70) 0%, rgba(7, 24, 30, 0.88) 60%, rgba(7, 24, 30, 0.98) 100%), url('https://lh3.googleusercontent.com/d/1DBMsHd1nf9UqN_QUQsXT4sz039MqZyN4')`,
          backgroundAttachment: 'fixed'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 text-center z-10 w-full flex flex-col items-center my-auto">
        
        {/* Main Motto Line */}
        <motion.h1 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 leading-tight max-w-5xl"
        >
          Von der Ostsee über’s Mittelmeer bis nach Asien.
        </motion.h1>

        {/* Subtitle Line */}
        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-serif text-xl sm:text-3xl md:text-4xl font-normal italic text-gold-400 mb-4"
        >
          Weil Teilen glücklich macht.
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-serif text-lg sm:text-2xl font-light text-slate-100 mb-6 tracking-wide"
        >
          Drei Welten. Ein Geschmackserlebnis.
        </motion.p>

        {/* User Description Text */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-slate-300 text-sm sm:text-base md:text-lg max-w-4xl mx-auto mb-6 leading-relaxed font-light"
        >
          Ein Teller ist uns zu wenig. Bei uns geht es um's Erleben – kleine Gerichte, große Vielfalt. Bestellen Sie, worauf Sie Lust haben. Kombinieren und teilen Sie nach Belieben mit Freunden und Familie – und genießen Sie unsere internationale Küche als „Tischbuffet“ gemeinsam Stück für Stück.
        </motion.p>

        {/* Info Badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="inline-flex items-center gap-2 bg-schlei-900/80 border border-gold-500/30 rounded-full px-5 py-2 text-xs sm:text-sm text-gold-400 mb-12 tracking-wide shadow-lg"
        >
          <Info className="w-4 h-4 text-gold-400 shrink-0" />
          <span>Ab 10 Personen benötigen wir eine Vorbestellung.</span>
        </motion.div>

        {/* Three Featured Dishes Showcase */}
        <div className="grid sm:grid-cols-3 gap-6 max-w-6xl w-full mx-auto text-left mb-12">
          {featuredDishes.map((dish, idx) => (
            <motion.div 
              key={dish.name}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + idx * 0.15 }}
              className="glass-effect rounded-2xl overflow-hidden border border-gold-500/20 group hover:border-gold-400 transition-all duration-500 shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="h-60 sm:h-64 overflow-hidden relative bg-schlei-900">
                  <img 
                    src={dish.imageUrl} 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = dish.fallbackUrl;
                    }}
                    referrerPolicy="no-referrer"
                    alt={dish.name} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-schlei-900/90 via-transparent to-transparent opacity-60"></div>
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-gold-400 transition-colors">
                      {dish.name}
                    </h3>
                    <span className="font-serif text-gold-400 font-bold text-base whitespace-nowrap ml-2">
                      {dish.price}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                    {dish.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap justify-center items-center gap-4 w-full max-w-3xl"
        >
          <a 
            href="#reservierung" 
            className="bg-gold-500 hover:bg-gold-400 text-schlei-900 font-bold px-7 py-4 rounded-xl text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 transition-all shadow-xl hover:shadow-gold-500/10 active:scale-95"
          >
            <Calendar className="w-4 h-4" /> 
            Tisch Reservieren
          </a>
          
          <a 
            href="#oeffnungszeiten" 
            className="glass-button glass-button-hover text-white font-bold px-7 py-4 rounded-xl text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-xl"
          >
            <Clock className="w-4 h-4 text-gold-400" /> 
            Öffnungszeiten
          </a>

          <a 
            href="#speisekarte" 
            className="glass-button glass-button-hover text-white font-bold px-7 py-4 rounded-xl text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-xl cursor-pointer"
          >
            <Utensils className="w-4 h-4 text-gold-400" /> 
            Speisekarte
          </a>
        </motion.div>

      </div>
    </section>
  );
}
