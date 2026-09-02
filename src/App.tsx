import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Concept from './components/Concept';
import Menu from './components/Menu';
import Reservation from './components/Reservation';
import AdminPanel from './components/AdminPanel';
import OpeningHours from './components/OpeningHours';
import Footer from './components/Footer';

export default function App() {
  const [selectedDishes, setSelectedDishes] = useState<{ menuItemId: string; quantity: number }[]>([]);
  const [isAdminVisible, setIsAdminVisible] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Notify Admin Ledger that a new reservation has been booked locally
  const handleReservationAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const clearSelectedDishes = () => {
    setSelectedDishes([]);
  };

  const toggleAdmin = () => {
    setIsAdminVisible(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-[#07181e] text-slate-100 flex flex-col justify-between selection:bg-gold-500 selection:text-schlei-900">
      
      {/* Sticky Top Header */}
      <Header 
        onAdminToggle={toggleAdmin} 
        isAdminVisible={isAdminVisible} 
      />

      <main className="flex-1">
        
        {/* Toggleable Admin Reservation Manager */}
        {isAdminVisible && (
          <div className="pt-20">
            <AdminPanel onRefreshTrigger={refreshTrigger} />
          </div>
        )}

        {/* Hero Cover Header */}
        <Hero />

        {/* Restaurant Sharing Concept */}
        <Concept />

        {/* Interactive Speisekarte & Tisch-Kalkulator */}
        <Menu />

        {/* Guest Reservation Form */}
        <Reservation 
          selectedDishes={selectedDishes}
          onReservationAdded={handleReservationAdded}
          clearSelectedDishes={clearSelectedDishes}
        />

        {/* Times & Location Contact details */}
        <OpeningHours />

      </main>

      {/* Compliance Footer */}
      <Footer 
        onAdminToggle={toggleAdmin}
        isAdminVisible={isAdminVisible}
      />

    </div>
  );
}
