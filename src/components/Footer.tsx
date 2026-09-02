import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, FileText, X } from 'lucide-react';

interface FooterProps {
  onAdminToggle?: () => void;
  isAdminVisible?: boolean;
}

export default function Footer({ onAdminToggle, isAdminVisible }: FooterProps) {
  const [modalContent, setModalContent] = useState<'impressum' | 'datenschutz' | null>(null);

  return (
    <footer className="bg-schlei-900 border-t border-white/5 py-12 text-slate-400 text-xs relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <span className="font-serif text-white font-bold tracking-widest text-sm">AM SCHLEIECK</span>
          <span className="text-slate-600 font-light">|</span>
          <span className="text-slate-400 font-light">Maasholm an der Schlei</span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-6 font-medium text-slate-300">
          <button 
            onClick={() => setModalContent('impressum')}
            className="hover:text-gold-400 transition cursor-pointer"
          >
            Impressum
          </button>
          <button 
            onClick={() => setModalContent('datenschutz')}
            className="hover:text-gold-400 transition cursor-pointer"
          >
            Datenschutz
          </button>
          <a href="#speisekarte" className="hover:text-gold-400 transition">
            Speisekarte
          </a>
          <a href="#konzept" className="hover:text-gold-400 transition">
            Konzept
          </a>
          {onAdminToggle && (
            <button 
              onClick={onAdminToggle}
              className="hover:text-gold-400 text-slate-500 transition cursor-pointer text-[10px]"
            >
              {isAdminVisible ? 'Gast-Ansicht' : 'Mitarbeiterbereich'}
            </button>
          )}
        </div>

        {/* Copyright */}
        <div className="text-[10px] text-slate-500 font-light">
          © 2026 Restaurant Am Schleieck. Alle Rechte vorbehalten.
        </div>

      </div>

      {/* POPUP MODALS FOR COMPLIANCE */}
      <AnimatePresence>
        {modalContent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalContent(null)}
              className="absolute inset-0 bg-schlei-900/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-schlei-800 border border-gold-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 overflow-y-auto max-h-[85vh]"
            >
              <button 
                onClick={() => setModalContent(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition"
                title="Schließen"
              >
                <X className="w-5 h-5" />
              </button>

              {modalContent === 'impressum' ? (
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-gold-400" />
                    Impressum
                  </h3>
                  <div className="w-12 h-0.5 bg-gold-500"></div>
                  
                  <div className="space-y-3 text-xs text-slate-300 font-light leading-relaxed">
                    <p><strong>Angaben gemäß § 5 TMG:</strong></p>
                    <p>
                      Restaurant Am Schleieck<br />
                      Schleieck 1<br />
                      24376 Maasholm
                    </p>
                    <p>
                      <strong>Vertreten durch:</strong><br />
                      Inhaber Amichai Shaul
                    </p>
                    <p>
                      <strong>Kontakt:</strong><br />
                      Telefon: 04642-6016<br />
                      E-Mail: info@am-schleieck-maasholm.de
                    </p>
                    <p>
                      <strong>Aufsichtsbehörde:</strong><br />
                      Amt Geltinger Bucht, Gewerbeamt
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-gold-400" />
                    Datenschutz
                  </h3>
                  <div className="w-12 h-0.5 bg-gold-500"></div>

                  <div className="space-y-3 text-xs text-slate-300 font-light leading-relaxed">
                    <p><strong>1. Datenschutz auf einen Blick</strong></p>
                    <p>
                      Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften (DSGVO).
                    </p>
                    <p><strong>2. Datenerfassung bei Reservierungen</strong></p>
                    <p>
                      Die von Ihnen im Reservierungsformular eingegebenen Daten (Name, E-Mail, Telefonnummer, Datum, Uhrzeit, Personenanzahl) werden ausschließlich für die Organisation und Durchführung Ihres Restaurantbesuchs verarbeitet.
                    </p>
                    <p>
                      Eine Weitergabe dieser Daten an unbefugte Dritte findet zu keinem Zeitpunkt statt.
                    </p>
                    <p><strong>3. Ihre Rechte</strong></p>
                    <p>
                      Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger sowie den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung oder Löschung dieser Daten.
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-8 pt-4 border-t border-white/5 text-right">
                <button
                  onClick={() => setModalContent(null)}
                  className="bg-gold-500 text-schlei-900 font-bold px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  Verstanden
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
