import { MENU_ITEMS } from '../data';

export default function Menu() {
  return (
    <section id="speisekarte" className="py-24 bg-schlei-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-3 block">
            FRISCH & REGIONAL
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">
            Speisekarte
          </h2>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-4"></div>
        </div>

        {/* 2-Column Dish List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {MENU_ITEMS.map((item) => (
            <div
              key={item.id}
              className="border-b border-white/10 pb-5 flex flex-col justify-between group"
            >
              <div className="flex justify-between items-baseline gap-4 mb-1.5">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide group-hover:text-gold-400 transition-colors">
                  {item.name}
                </h3>
                <span className="font-serif text-gold-400 font-bold text-base sm:text-lg shrink-0 whitespace-nowrap">
                  {item.price.toFixed(2)} €
                </span>
              </div>
              <p className="text-sm text-slate-300 font-light leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
