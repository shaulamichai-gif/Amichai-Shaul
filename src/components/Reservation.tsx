import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Reservation as ReservationType } from '../types';
import { MENU_ITEMS, TIME_SLOTS } from '../data';
import { 
  Calendar, 
  Check, 
  AlertCircle, 
  Sparkles, 
  Clock, 
  Users, 
  ArrowRight, 
  Mail, 
  MailCheck, 
  Info 
} from 'lucide-react';
import { 
  sendReservationEmail, 
  generateMailtoLink, 
  RESTAURANT_RESERVATION_EMAIL,
  EmailSendResult 
} from '../services/emailService';

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
  const [lastReservation, setLastReservation] = useState<ReservationType | null>(null);
  const [emailResult, setEmailResult] = useState<EmailSendResult | null>(null);

  // Handle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value, 10) : value
    }));
  };

  // Resolve pre-selected dishes names for attachment list
  const attachedDishes = selectedDishes.map(sd => {
    const dish = MENU_ITEMS.find(m => m.id === sd.menuItemId);
    return {
      name: dish ? dish.name : sd.menuItemId,
      quantity: sd.quantity
    };
  });

  // Submit reservation and dispatch email to amichai@gmx.de
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    // Basic Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg('Bitte füllen Sie alle Pflichtfelder (*) aus.');
      setIsSubmitting(false);
      return;
    }

    const reservationId = 'res-' + Date.now();
    const buffetSummaryText = attachedDishes.length > 0
      ? attachedDishes.map(d => `${d.name} (${d.quantity}x)`).join(', ')
      : undefined;

    // Send email to amichai@gmx.de via FormSubmit
    const sendResult = await sendReservationEmail({
      id: reservationId,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: formData.date,
      time: formData.time,
      guests: formData.guests,
      wishes: formData.wishes,
      dishesSummary: buffetSummaryText
    });

    setEmailResult(sendResult);

    const emailStatus = sendResult.needsActivation
      ? 'aktivierung_erforderlich'
      : (sendResult.success ? 'gesendet' : 'fehler');

    // Build reservation payload
    const newReservation: ReservationType = {
      id: reservationId,
      date: formData.date,
      time: formData.time,
      guests: formData.guests,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      wishes: formData.wishes,
      status: 'bestaetigt',
      createdAt: new Date().toISOString(),
      selectedDishes: selectedDishes.length > 0 ? [...selectedDishes] : undefined,
      emailSentTo: RESTAURANT_RESERVATION_EMAIL,
      emailStatus: emailStatus
    };

    try {
      // Retrieve existing from localStorage
      const existingRaw = localStorage.getItem('schleieck_reservations');
      const existing: ReservationType[] = existingRaw ? JSON.parse(existingRaw) : [];
      
      // Save
      existing.unshift(newReservation);
      localStorage.setItem('schleieck_reservations', JSON.stringify(existing));
    } catch (err) {
      console.warn('LocalStorage save warning:', err);
    }

    setLastReservation(newReservation);
    setIsSubmitting(false);
    setIsSuccess(true);
    onReservationAdded();
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
    setLastReservation(null);
    setEmailResult(null);
    clearSelectedDishes();
  };

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
                    Sichern Sie sich Ihren Platz im Restaurant Am Schleieck in Maasholm. Ihre Reservierung wird bei Klick direkt an unser Restaurant-Team ({RESTAURANT_RESERVATION_EMAIL}) übermittelt.
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
                        <option value="8">8+ Personen (Tischbuffet)</option>
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
                          E-Mail an {RESTAURANT_RESERVATION_EMAIL} wird gesendet...
                        </>
                      ) : (
                        <>
                          Tisch verbindlich buchen & E-Mail senden
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    
                    <div className="flex items-center justify-center gap-2 mt-3 text-[11px] text-slate-400 font-light">
                      <Mail className="w-3.5 h-3.5 text-gold-400" />
                      <span>
                        Ihre Reservierungsdaten werden direkt per E-Mail an <strong>{RESTAURANT_RESERVATION_EMAIL}</strong> übermittelt.
                      </span>
                    </div>
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
                <div className="w-16 h-16 bg-emerald-500/15 text-emerald-400 border-2 border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-3xl mb-5 shadow-lg shadow-emerald-500/5">
                  <Check className="w-8 h-8" />
                </div>
                
                <h4 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                  Vielen Dank für Ihre Reservierung!
                </h4>
                <p className="text-gold-400 text-sm font-serif italic mb-6">
                  Wir freuen uns sehr auf Ihren Besuch im Restaurant Am Schleieck.
                </p>

                {/* Email dispatch confirmation badge or activation warning */}
                {emailResult?.needsActivation ? (
                  <div className="bg-amber-500/10 border-2 border-amber-500/40 rounded-2xl p-5 max-w-lg mx-auto mb-6 text-left shadow-xl">
                    <div className="flex items-start gap-3.5">
                      <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl shrink-0 mt-0.5 border border-amber-500/40">
                        <AlertCircle className="w-5 h-5" />
                      </div>
                      <div className="text-xs">
                        <h5 className="font-bold text-amber-300 text-sm mb-1">
                          Einmalige Freischaltung für {RESTAURANT_RESERVATION_EMAIL} erforderlich!
                        </h5>
                        <p className="text-slate-200 font-light leading-relaxed">
                          Der E-Mail-Dienst hat soeben eine Bestätigungs-E-Mail an <strong>{RESTAURANT_RESERVATION_EMAIL}</strong> verschickt. Solange dieser Link nicht geklickt wird, darf der Dienst keine Reservierungen weiterleiten.
                        </p>

                        <div className="bg-[#07181e] p-3.5 rounded-xl border border-amber-500/20 mt-3 text-slate-300 space-y-1.5 text-[11px]">
                          <strong className="text-amber-300 block font-semibold">So schalten Sie den Empfang jetzt frei:</strong>
                          <ol className="list-decimal list-inside space-y-1 text-slate-300">
                            <li>Öffnen Sie Ihr GMX-Postfach (<strong className="text-white">{RESTAURANT_RESERVATION_EMAIL}</strong>).</li>
                            <li>Prüfen Sie unbedingt den Ordner <strong className="text-amber-200">„Spam“ bzw. „Spamverdacht“</strong>!</li>
                            <li>Öffnen Sie die E-Mail von <em>FormSubmit</em> und klicken Sie auf <strong className="text-emerald-400">„Activate Form“</strong>.</li>
                          </ol>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2.5">
                          <a
                            href="https://www.gmx.net"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-schlei-900 font-bold px-4 py-2 rounded-xl text-xs transition"
                          >
                            <span>GMX-Postfach öffnen (gmx.net)</span>
                          </a>

                          {lastReservation && (
                            <a
                              href={generateMailtoLink({
                                id: lastReservation.id,
                                name: lastReservation.name,
                                email: lastReservation.email,
                                phone: lastReservation.phone,
                                date: lastReservation.date,
                                time: lastReservation.time,
                                guests: lastReservation.guests,
                                wishes: lastReservation.wishes,
                                dishesSummary: attachedDishes.map(d => `${d.name} (${d.quantity}x)`).join(', ')
                              })}
                              className="inline-flex items-center gap-1.5 bg-schlei-800 hover:bg-schlei-700 text-slate-200 border border-gold-500/30 px-4 py-2 rounded-xl text-xs transition"
                            >
                              <Mail className="w-3.5 h-3.5 text-gold-400" />
                              <span>Jetzt per Mail-App an {RESTAURANT_RESERVATION_EMAIL} senden</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : emailResult?.success ? (
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 max-w-md mx-auto mb-6 text-left flex items-start gap-3.5">
                    <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl shrink-0 mt-0.5 border border-emerald-500/30">
                      <MailCheck className="w-5 h-5" />
                    </div>
                    <div className="text-xs">
                      <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                        <span>E-Mail erfolgreich versendet</span>
                      </div>
                      <p className="text-slate-300 mt-1 font-light leading-relaxed">
                        Die Daten dieser Reservierung wurden direkt an <strong className="text-gold-400 font-semibold">{RESTAURANT_RESERVATION_EMAIL}</strong> zugestellt.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 max-w-md mx-auto mb-6 text-left flex items-start gap-3.5">
                    <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl shrink-0 mt-0.5 border border-amber-500/30">
                      <Info className="w-5 h-5" />
                    </div>
                    <div className="text-xs">
                      <div className="font-bold text-amber-300">
                        Hinweis zur E-Mail-Übermittlung
                      </div>
                      <p className="text-slate-300 mt-1 font-light leading-relaxed">
                        Die Buchung wurde im System hinterlegt. Sie können die Daten auch direkt mit Ihrem E-Mail-Programm an <strong className="text-gold-400">{RESTAURANT_RESERVATION_EMAIL}</strong> senden.
                      </p>
                    </div>
                  </div>
                )}

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

                  <div className="pt-2 border-t border-white/5 grid grid-cols-2 gap-3 text-[11px] font-light">
                    <div>
                      <span className="text-slate-400 block">E-Mail:</span>
                      <span className="text-slate-200 block truncate">{formData.email}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Telefon:</span>
                      <span className="text-slate-200 block">{formData.phone}</span>
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

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
                    <span>E-Mail-Benachrichtigung:</span>
                    <span className="text-gold-400 font-mono font-medium">{RESTAURANT_RESERVATION_EMAIL}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                  {lastReservation && (
                    <a
                      href={generateMailtoLink({
                        id: lastReservation.id,
                        name: lastReservation.name,
                        email: lastReservation.email,
                        phone: lastReservation.phone,
                        date: lastReservation.date,
                        time: lastReservation.time,
                        guests: lastReservation.guests,
                        wishes: lastReservation.wishes,
                        dishesSummary: attachedDishes.map(d => `${d.name} (${d.quantity}x)`).join(', ')
                      })}
                      className="bg-schlei-800 hover:bg-schlei-700 text-slate-200 hover:text-white border border-gold-500/30 px-5 py-2.5 rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5 text-gold-400" />
                      <span>Kopie in Mail-App öffnen</span>
                    </a>
                  )}

                  <button
                    onClick={resetForm}
                    className="bg-transparent hover:bg-white/5 text-slate-300 hover:text-white border border-slate-700 px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
                  >
                    Neue Reservierung
                  </button>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
