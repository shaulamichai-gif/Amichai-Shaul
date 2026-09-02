import { useState, useEffect } from 'react';
import { Reservation, MenuItem } from '../types';
import { MENU_ITEMS, INITIAL_RESERVATIONS } from '../data';
import { Search, Shield, Check, X, Calendar, Users, ShoppingBag, Trash2, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdminPanelProps {
  onRefreshTrigger: number;
}

export default function AdminPanel({ onRefreshTrigger }: AdminPanelProps) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'bestaetigt' | 'storniert'>('all');

  // Load reservations from localStorage
  const loadReservations = () => {
    const stored = localStorage.getItem('schleieck_reservations');
    if (stored) {
      setReservations(JSON.parse(stored));
    } else {
      // Seed with initial mock data
      localStorage.setItem('schleieck_reservations', JSON.stringify(INITIAL_RESERVATIONS));
      setReservations(INITIAL_RESERVATIONS);
    }
  };

  useEffect(() => {
    loadReservations();
  }, [onRefreshTrigger]);

  // Update reservation status in localStorage
  const updateStatus = (id: string, newStatus: 'bestaetigt' | 'storniert') => {
    const updated = reservations.map(res => {
      if (res.id === id) {
        return { ...res, status: newStatus };
      }
      return res;
    });
    setReservations(updated);
    localStorage.setItem('schleieck_reservations', JSON.stringify(updated));
  };

  // Delete booking
  const deleteReservation = (id: string) => {
    const filtered = reservations.filter(res => res.id !== id);
    setReservations(filtered);
    localStorage.setItem('schleieck_reservations', JSON.stringify(filtered));
  };

  // Filter lists
  const filteredReservations = reservations.filter(res => {
    const matchesSearch = res.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          res.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          res.phone.includes(searchTerm);
    const matchesFilter = statusFilter === 'all' || res.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  // Calculate stats
  const totalCovers = filteredReservations
    .filter(r => r.status === 'bestaetigt')
    .reduce((sum, current) => sum + current.guests, 0);

  // Helper to resolve dishes details
  const getDishesSummary = (selectedDishes?: { menuItemId: string; quantity: number }[]) => {
    if (!selectedDishes || selectedDishes.length === 0) return null;
    
    return selectedDishes.map(sd => {
      const item = MENU_ITEMS.find(m => m.id === sd.menuItemId);
      return {
        name: item ? item.name : sd.menuItemId,
        quantity: sd.quantity,
        price: item ? item.price * sd.quantity : 0
      };
    });
  };

  return (
    <section id="admin-panel" className="py-24 bg-schlei-800 relative border-t border-b border-gold-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header alert */}
        <div className="bg-gold-500/10 border border-gold-500/30 rounded-2xl p-5 mb-10 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
          <div className="flex gap-3.5 items-start text-center sm:text-left">
            <div className="bg-gold-500/20 p-2.5 rounded-lg border border-gold-500/30 text-gold-400 shrink-0 mx-auto sm:mx-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-white flex items-center justify-center sm:justify-start gap-1.5">
                Schleieck Reservierungs-Manager
              </h4>
              <p className="text-xs text-slate-400 font-light mt-1 max-w-2xl leading-relaxed">
                Willkommen im digitalen Buchungsbuch. Hier können Mitarbeiter eingehende Tischreservierungen einsehen, Tischbuffets auswerten, nach Gästen suchen und Statusmeldungen verwalten. Die Daten werden in Echtzeit lokal gespeichert.
              </p>
            </div>
          </div>
          <div className="text-center sm:text-right">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-medium">Besaß-Kapazität</span>
            <span className="font-serif text-2xl font-bold text-gold-400 block mt-1">
              {totalCovers} Personen
            </span>
            <span className="text-[9px] text-slate-400 font-light italic block">bestätigt für gefilterte Tage</span>
          </div>
        </div>

        {/* Filter bars */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
          
          {/* Search bar */}
          <div className="relative w-full sm:max-w-md">
            <input 
              type="text"
              placeholder="Gast-Name, E-Mail oder Telefon suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-schlei-900 border border-gold-500/15 rounded-xl py-3 pl-11 pr-4 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-gold-500"
            />
            <Search className="absolute left-4 top-3.5 w-4.5 h-4.5 text-slate-500" />
          </div>

          {/* Status filters */}
          <div className="flex bg-schlei-900 rounded-xl p-1 border border-white/5 w-full sm:w-auto shrink-0 justify-around sm:justify-start">
            <button
              onClick={() => setStatusFilter('all')}
              className={`text-xs px-4 py-2.5 rounded-lg font-medium transition cursor-pointer ${
                statusFilter === 'all' 
                  ? 'bg-gold-500 text-schlei-900 font-bold' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Alle ({reservations.length})
            </button>
            <button
              onClick={() => setStatusFilter('bestaetigt')}
              className={`text-xs px-4 py-2.5 rounded-lg font-medium transition cursor-pointer ${
                statusFilter === 'bestaetigt' 
                  ? 'bg-emerald-600 text-white font-bold' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Bestätigt ({reservations.filter(r => r.status === 'bestaetigt').length})
            </button>
            <button
              onClick={() => setStatusFilter('storniert')}
              className={`text-xs px-4 py-2.5 rounded-lg font-medium transition cursor-pointer ${
                statusFilter === 'storniert' 
                  ? 'bg-red-600 text-white font-bold' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Storniert ({reservations.filter(r => r.status === 'storniert').length})
            </button>
          </div>

        </div>

        {/* Ledger Booking Cards */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredReservations.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-schlei-900/40 rounded-2xl border border-white/5"
              >
                <ShieldAlert className="w-10 h-10 mx-auto text-slate-600 mb-3" />
                <h4 className="font-serif text-lg font-semibold text-slate-400">Keine Buchungen gefunden</h4>
                <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                  Es gibt derzeit keine Reservierungen, die den gewählten Filtern entsprechen.
                </p>
              </motion.div>
            ) : (
              filteredReservations.map((res) => {
                const summary = getDishesSummary(res.selectedDishes);
                const isBestaetigt = res.status === 'bestaetigt';
                
                return (
                  <motion.div 
                    key={res.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`glass-effect rounded-2xl p-5 sm:p-6 border transition-all ${
                      isBestaetigt 
                        ? 'border-emerald-500/20 bg-schlei-900/40' 
                        : 'border-red-500/20 bg-red-950/5'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row justify-between gap-6">
                      
                      {/* Guest contact and metadata */}
                      <div className="flex-1 space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <h4 className="font-serif text-xl font-bold text-white">
                            {res.name}
                          </h4>
                          
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                            isBestaetigt 
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                              : 'bg-red-500/10 text-red-400 border-red-500/20'
                          }`}>
                            {isBestaetigt ? 'Bestätigt' : 'Storniert'}
                          </span>
                        </div>

                        {/* Guest specs: date, phone, wishes, email */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-light">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gold-400 shrink-0" />
                            <div>
                              <span className="text-slate-500 block text-[9px] uppercase tracking-wider font-medium">Termin</span>
                              <strong className="text-white block mt-0.5">
                                {new Date(res.date).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })} • {res.time}
                              </strong>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gold-400 shrink-0" />
                            <div>
                              <span className="text-slate-500 block text-[9px] uppercase tracking-wider font-medium">Gäste</span>
                              <strong className="text-white block mt-0.5">
                                {res.guests} Personen
                              </strong>
                            </div>
                          </div>

                          <div>
                            <span className="text-slate-500 block text-[9px] uppercase tracking-wider font-medium">E-Mail</span>
                            <a href={`mailto:${res.email}`} className="text-slate-300 hover:text-gold-400 block truncate mt-0.5 underline">
                              {res.email}
                            </a>
                          </div>

                          <div>
                            <span className="text-slate-500 block text-[9px] uppercase tracking-wider font-medium">Telefon</span>
                            <a href={`tel:${res.phone}`} className="text-slate-300 hover:text-gold-400 block truncate mt-0.5">
                              {res.phone}
                            </a>
                          </div>
                        </div>

                        {/* Wishes notes */}
                        {res.wishes && (
                          <div className="bg-schlei-900/60 rounded-xl p-3 border border-white/5">
                            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">Besondere Gästewünsche:</span>
                            <p className="text-xs text-slate-300 mt-1 italic font-light font-serif">
                              "{res.wishes}"
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Attached Table Buffet detail / Actions */}
                      <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-white/5 pt-5 lg:pt-0 lg:pl-6 flex flex-col justify-between shrink-0">
                        <div>
                          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                            <ShoppingBag className="w-4 h-4 text-gold-400" />
                            <span>Vorausgewähltes Buffet</span>
                          </div>

                          {summary ? (
                            <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
                              {summary.map((sumItem, idx) => (
                                <div key={idx} className="flex justify-between text-[11px] font-light text-slate-300 bg-schlei-900/50 p-2 rounded-lg border border-white/5">
                                  <span>{sumItem.name} <strong>x{sumItem.quantity}</strong></span>
                                  <span className="text-gold-400 font-serif font-bold">{sumItem.price.toFixed(2)} €</span>
                                </div>
                              ))}
                              {/* Summary footer calculation */}
                              <div className="flex justify-between text-xs font-semibold text-white pt-2">
                                <span>Summe Speisen:</span>
                                <span className="font-serif text-gold-400 font-bold">
                                  {summary.reduce((acc, c) => acc + c.price, 0).toFixed(2)} €
                                </span>
                              </div>
                            </div>
                          ) : (
                            <p className="text-xs text-slate-500 italic font-light py-2">
                              Keine Vorbestellung. Gäste bestellen direkt vor Ort à la carte.
                            </p>
                          )}
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-2.5 pt-4 border-t border-white/5 mt-4 justify-end">
                          <button 
                            onClick={() => deleteReservation(res.id)}
                            className="bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white p-2.5 rounded-xl border border-red-500/20 hover:border-red-600 transition duration-300 cursor-pointer"
                            title="Buchung endgültig löschen"
                          >
                            <Trash2 className="w-4.5 h-4.5" />
                          </button>

                          {isBestaetigt ? (
                            <button
                              onClick={() => updateStatus(res.id, 'storniert')}
                              className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs px-4 py-2.5 rounded-xl border border-amber-500/20 transition cursor-pointer"
                            >
                              Stornieren
                            </button>
                          ) : (
                            <button
                              onClick={() => updateStatus(res.id, 'bestaetigt')}
                              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-4 py-2.5 rounded-xl font-bold transition cursor-pointer"
                            >
                              Bestätigen
                            </button>
                          )}
                        </div>

                      </div>

                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
