import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Reservation as ReservationType } from '../types';
import { MENU_ITEMS, TIME_SLOTS } from '../data';
import { Calendar, Check, AlertCircle, Sparkles, Clock, Users, ArrowRight } from 'lucide-react';

interface ReservationProps {
  selectedDishes: { menuItemId: string; quantity: number }[];
  onReservationAdded: () => void;
  clearSelectedDishes: () => void;
}

export default function Reservation({ 
  selectedDishes, 
  onReservationAdded, 
  clearSelectedDishes 
}: ReservationProps) {
  
  const [formData, setFormData] = useState({
    date: '2026-09-01',
    time: '18:00',
    guests: 4,
    name: '',
    email: '',
    phone: '',
    wishes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value, 10) : value
    }));
  };

  // Submit reservation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    // Basic Validation
    if (!formData.name || !formData.email || !formData.phone) {
      setErrorMsg('Bitte füllen Sie alle Pflichtfelder (*) aus.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Build reservation payload
      const newReservation: ReservationType = {
        id: 'res-' + Date.now(),
        date: formData.date,
        time: formData.time,
        guests: formData.guests,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        wishes: formData.wishes,
        status: 'bestaetigt', // Auto-confirm for instant user feedback
        createdAt: new Date().toISOString(),
        selectedDishes: selectedDishes.length > 0 ? [...selectedDishes] : undefined
      };

      // Retrieve existing from localStorage
      const existingRaw = localStorage.getItem('schleieck_reservations');
      const existing: ReservationType[] = existingRaw ? JSON.parse(existingRaw) : [];
      
      // Save
      existing.push(newReservation);
      localStorage.setItem('schleieck_reservations', JSON.stringify(existing));

      // Trigger state updates
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        onReservationAdded(); // notify parent component
      }, 800);

    } catch (err) {
      setErrorMsg('Fehler beim Speichern der Reservierung. Bitte versuchen Sie es erneut.');
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      date: '2026-09-01',
      time: '18:00',
      guests: 4,
      name: '',
      email: '',
      phone: '',
      wishes: ''
    });
    setIsSuccess(false);
    clearSelectedDishes();
  };

  // Resolve pre-selected dishes names for attachment list
  const attachedDishes = selectedDishes.map(sd => {
    const dish = MENU_ITEMS.find(m => m.id === sd.menuItemId);
    return {
      name: dish ? dish.name : sd.menuItemId,
      quantity: sd.quantity
    };
  });

  return (
    <section id="reservierung" className="py-24 bg-schlei-900 relative border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0f2931]/70 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-gold-500/30 relative overflow-hidden shadow-2xl">
          
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <span className="text-gold-400 text-xs font-bold uppercase tracking-widest block mb-2">
                    Geselligkeit Erleben
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">
                    Tisch Reservieren
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm font-light">
                    Sichern Sie sich Ihren Platz im Restaurant Am Schleieck in Maasholm. Für spontane Besuche halten wir immer ein kleines Kontingent an Tischen auf der Terrasse bereit.
                  </p>
                </div>

                {errorMsg && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6 flex items-start gap-3 text-xs sm:text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Row 1: Date, Time, Guests */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-300 mb-2 font-medium">
                        Datum *
                      </label>
                      <input 
                        type="date" 
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        min="2026-08-31"
                        required 
                        className="w-full bg-[#07181e] border border-gold-500/20 hover:border-gold-500/40 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-300 mb-2 font-medium">
                        Uhrzeit *
                      </label>
                      <select 
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required 
                        className="w-full bg-[#07181e] border border-gold-500/20 hover:border-gold-500/40 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors"
                      >
                        {TIME_SLOTS.map(slot => (
                          <option key={slot} value={slot}>{slot} Uhr</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-300 mb-2 font-medium">
                        Personenzahl *
                      </label>
                      <select 
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        required 
                        className="w-full bg-[#07181e] border border-gold-500/20 hover:border-gold-500/40 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors"
                      >
                        <option value="1">1 Person</option>
                        <option value="2">2 Personen</option>
                        <option value="3">3 Personen</option>
                        <option value="4">4 Personen (Ideal für Sharing!)</option>
                        <option value="5">5 Personen</option>
                        <option value="6">6 Personen</option>
                        <option value="7">7 Personen</option>
                        <option value="8">8+ Personen</option>
                      </select>
                    </div>
                  </div>

                  {/* Attachment Show: Preset Dishes */}
                  {attachedDishes.length > 0 && (
                    <motion.div 
                      initial={{ scale: 0.98, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-gold-500/5 border border-gold-500/20 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-gold-400 uppercase tracking-wider">
                          <Sparkles className="w-4 h-4 text-gold-400" />
                          <span>Ihr Tischbuffet wird angehängt</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {attachedDishes.map((ad, i) => (
                            <span key={i} className="text-[10px] bg-[#07181e] text-slate-200 border border-white/5 px-2.5 py-1 rounded-md">
                              {ad.name} <strong className="text-gold-400">x{ad.quantity}</strong>
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={clearSelectedDishes}
                        className="text-xs text-slate-400 hover:text-red-400 font-medium shrink-0 self-start sm:self-center cursor-pointer transition-colors"
                      >
                        Buffet entfernen
                      </button>
                    </motion.div>
                  )}

                  {/* Row 2: Name, Email */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-300 mb-2 font-medium">
                        Name *
                      </label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Vor- und Nachname" 
                        required 
                        className="w-full bg-[#07181e] border border-gold-500/20 hover:border-gold-500/40 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-300 mb-2 font-medium">
                        E-Mail *
                      </label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="beispiel@domain.de" 
                        required 
                        className="w-full bg-[#07181e] border border-gold-500/20 hover:border-gold-500/40 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-300 mb-2 font-medium">
                      Telefonnummer *
                    </label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+49 170 1234567" 
                      required 
                      className="w-full bg-[#07181e] border border-gold-500/20 hover:border-gold-500/40 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>

                  {/* Wishes */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-300 mb-2 font-medium">
                      Anmerkungen & Wünsche
                    </label>
                    <textarea 
                      name="wishes"
                      value={formData.wishes}
                      onChange={handleChange}
                      rows={3} 
                      placeholder="Sonderwünsche, Unverträglichkeiten oder Hinweise zum Sharing-Tisch..." 
                      className="w-full bg-[#07181e] border border-gold-500/20 hover:border-gold-500/40 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors"
                    ></textarea>
                  </div>

                  {/* Submission and notes */}
                  <div className="text-center pt-2">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full sm:w-auto bg-gold-500 hover:bg-gold-400 disabled:bg-slate-700 text-schlei-900 font-bold px-10 py-4 rounded-xl text-xs uppercase tracking-widest transition shadow-xl hover:shadow-gold-500/10 active:scale-95 flex items-center justify-center gap-2 mx-auto cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-schlei-900 border-t-transparent rounded-full animate-spin"></div>
                          Verarbeite...
                        </>
                      ) : (
                        <>
                          Tisch verbindlich buchen
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-slate-400 mt-3 font-light">
                      * Mit dem Klick auf "Tisch verbindlich buchen" erhalten Sie eine sofortige Bestätigung im Browser.
                    </p>
                  </div>

                </form>
              </motion.div>
            ) : (
              /* High Fidelity Success View */
              <motion.div
                key="success-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-emerald-500/15 text-emerald-400 border-2 border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-3xl mb-6 shadow-lg shadow-emerald-500/5">
                  <Check className="w-8 h-8" />
                </div>
                
                <h4 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                  Vielen Dank für Ihre Reservierung!
                </h4>
                <p className="text-gold-400 text-sm font-serif italic mb-6">
                  Wir freuen uns sehr auf Ihren Besuch im Schleieck.
                </p>

                {/* Booking details summarizing slip */}
                <div className="bg-[#07181e]/80 border border-white/5 rounded-2xl p-6 text-left max-w-md mx-auto mb-8 text-xs space-y-3.5 shadow-inner">
                  <div className="flex justify-between items-center pb-2 border-b border-white/5 text-[10px] uppercase text-slate-400 tracking-wider">
                    <span>Buchungs-Beleg</span>
                    <span className="text-emerald-400 font-bold">Status: Bestätigt</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 font-light">
                    <div>
                      <span className="text-slate-400 block">Name:</span>
                      <strong className="text-white text-sm block mt-0.5">{formData.name}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Personen:</span>
                      <strong className="text-white text-sm block mt-0.5">{formData.guests} Gäste</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Datum:</span>
                      <strong className="text-white text-sm block mt-0.5 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gold-400" />
                        {formData.date.split('-').reverse().join('.')}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Uhrzeit:</span>
                      <strong className="text-white text-sm block mt-0.5 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gold-400" />
                        {formData.time} Uhr
                      </strong>
                    </div>
                  </div>

                  {attachedDishes.length > 0 && (
                    <div className="pt-2 border-t border-white/5">
                      <span className="text-slate-400 block mb-1.5">Angehängtes Tischbuffet:</span>
                      <div className="flex flex-col gap-1">
                        {attachedDishes.map((ad, i) => (
                          <div key={i} className="flex justify-between text-slate-300 font-light text-[11px]">
                            <span>{ad.name}</span>
                            <span className="text-gold-400 font-medium">x{ad.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {formData.wishes && (
                    <div className="pt-2 border-t border-white/5">
                      <span className="text-slate-400 block">Ihre Anmerkungen:</span>
                      <p className="text-slate-300 italic font-light mt-0.5 break-words">
                        "{formData.wishes}"
                      </p>
                    </div>
                  )}
                </div>

                <button
                  onClick={resetForm}
                  className="bg-transparent hover:bg-white/5 text-slate-300 hover:text-white border border-slate-700 px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Neue Reservierung vornehmen
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
