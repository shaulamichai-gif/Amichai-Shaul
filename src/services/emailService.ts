export const RESTAURANT_RESERVATION_EMAIL = 'amichai@gmx.de';

export interface EmailPayloadReservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  wishes?: string;
  dishesSummary?: string;
}

export interface EmailSendResult {
  success: boolean;
  needsActivation?: boolean;
  message: string;
}

/**
 * Sends reservation data directly to amichai@gmx.de via FormSubmit API
 */
export async function sendReservationEmail(
  reservation: EmailPayloadReservation
): Promise<EmailSendResult> {
  const formattedDate = reservation.date.includes('-')
    ? reservation.date.split('-').reverse().join('.')
    : reservation.date;

  const subject = `🍽️ Neue Tischreservierung: ${reservation.name} (${reservation.guests} Gäste am ${formattedDate} um ${reservation.time} Uhr)`;

  const payload = {
    _subject: subject,
    _template: 'table',
    _captcha: 'false',
    _replyto: reservation.email,
    'Ziel-Adresse': RESTAURANT_RESERVATION_EMAIL,
    'Name des Gastes': reservation.name,
    'E-Mail-Adresse': reservation.email,
    'Telefonnummer': reservation.phone,
    'Reservierungs-Datum': formattedDate,
    'Uhrzeit': `${reservation.time} Uhr`,
    'Gästeanzahl': `${reservation.guests} Personen`,
    'Vorausgewähltes Tischbuffet': reservation.dishesSummary || 'Keine Vorbestellung (Gäste bestellen à la carte vor Ort)',
    'Besondere Wünsche / Anmerkungen': reservation.wishes?.trim() || 'Keine besonderen Wünsche angegeben',
    'Buchungs-Referenz': reservation.id,
    'Eingegangen am': new Date().toLocaleString('de-DE')
  };

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${RESTAURANT_RESERVATION_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    const isActivation = Boolean(
      data?.message && typeof data.message === 'string' && data.message.toLowerCase().includes('activation')
    );
    const isSuccess = data?.success === 'true' || data?.success === true;

    return {
      success: isSuccess || isActivation,
      needsActivation: isActivation,
      message: isActivation
        ? 'Aktivierungs-E-Mail wurde an amichai@gmx.de versendet. Bitte einmalig bestätigen.'
        : 'E-Mail wurde erfolgreich an amichai@gmx.de übermittelt.'
    };
  } catch (error) {
    console.warn('E-Mail-Versand an ' + RESTAURANT_RESERVATION_EMAIL + ' nicht abgeschlossen:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Netzwerkfehler beim E-Mail-Versand'
    };
  }
}

/**
 * Sends a test email to amichai@gmx.de to verify the connection
 */
export async function sendTestEmail(): Promise<EmailSendResult> {
  const payload = {
    _subject: '✅ Test-Nachricht: Restaurant Am Schleieck Reservierungssystem',
    _template: 'table',
    _captcha: 'false',
    'Empfänger': RESTAURANT_RESERVATION_EMAIL,
    'Status': 'Erfolgreicher Funktionstest',
    'Mitteilung': 'Das Reservierungssystem ist aktiv und sendet alle Buchungen an diese Adresse.',
    'System-Zeit': new Date().toLocaleString('de-DE')
  };

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${RESTAURANT_RESERVATION_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    const isActivation = Boolean(
      data?.message && typeof data.message === 'string' && data.message.toLowerCase().includes('activation')
    );
    const isSuccess = data?.success === 'true' || data?.success === true;

    return {
      success: isSuccess || isActivation,
      needsActivation: isActivation,
      message: isActivation
        ? 'Aktivierungs-E-Mail wurde an amichai@gmx.de gesendet. Bitte dort einmalig freischalten!'
        : 'Test-E-Mail erfolgreich an amichai@gmx.de gesendet!'
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Netzwerkfehler'
    };
  }
}

/**
 * Generates a pre-filled mailto link for direct sending via desktop/mobile email client
 */
export function generateMailtoLink(reservation: EmailPayloadReservation): string {
  const formattedDate = reservation.date.includes('-')
    ? reservation.date.split('-').reverse().join('.')
    : reservation.date;

  const subject = encodeURIComponent(`Neue Tischreservierung: ${reservation.name} (${formattedDate}, ${reservation.time} Uhr)`);
  
  const bodyText = 
`Hallo Team Schleieck,

hier sind die Daten der Tischreservierung:

• Name: ${reservation.name}
• E-Mail: ${reservation.email}
• Telefon: ${reservation.phone}
• Datum: ${formattedDate}
• Uhrzeit: ${reservation.time} Uhr
• Gäste: ${reservation.guests} Person(en)

• Vorbestelltes Tischbuffet:
${reservation.dishesSummary || 'Keine Vorbestellung (à la carte vor Ort)'}

• Besondere Wünsche / Notizen:
${reservation.wishes || 'Keine besonderen Wünsche'}

Buchungs-ID: ${reservation.id}
Eingegangen: ${new Date().toLocaleString('de-DE')}`;

  return `mailto:${RESTAURANT_RESERVATION_EMAIL}?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
}
