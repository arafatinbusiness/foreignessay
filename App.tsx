
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LaneSelector from './components/LaneSelector';
import BookingGrid from './components/BookingGrid';
import Dashboard from './components/Dashboard';
import AuthForm from './components/AuthForm';
import AdminPanel from './components/AdminPanel';
import Membership from './components/Membership';
import Gear from './components/Gear';
import { User, Booking, LaneId, BookingView } from './types';

const AppContent: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState<BookingView>(BookingView.INDIVIDUAL);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('utl_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    const today = new Date().toISOString().split('T')[0];
    const mockBookings: Booking[] = [
      { id: '1', userId: 'ai', userName: 'Gemini Pro', laneId: 1, startTime: '10:00', date: today, duration: 60, type: 'rental' },
      { id: '2', userId: 'ai-2', userName: 'Admin', laneId: 3, startTime: '08:30', date: today, duration: 30, type: 'maintenance' },
    ];
    setBookings(mockBookings);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('utl_user', JSON.stringify(userData));
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('utl_user');
    navigate('/');
  };

  const toggleBooking = (laneId: LaneId, startTime: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    const existing = bookings.find(b => 
      b.userId === user.id && 
      b.laneId === laneId && 
      b.startTime === startTime && 
      b.date === selectedDate
    );

    if (existing) {
      setBookings(prev => prev.filter(b => b.id !== existing.id));
    } else {
      const newBooking: Booking = {
        id: Math.random().toString(36).substr(2, 9),
        userId: user.id,
        userName: user.name,
        laneId,
        startTime,
        date: selectedDate,
        duration: 30,
        type: 'rental',
      };
      setBookings(prev => [...prev, newBooking]);
    }
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(prev => prev.filter(b => b.id !== bookingId));
  };

  const blockLane = (laneId: LaneId, startTime: string) => {
    if (!user?.isAdmin) return;
    const block: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      userName: 'Maintenance',
      laneId,
      startTime,
      date: selectedDate,
      duration: 30,
      type: 'maintenance',
    };
    setBookings(prev => [...prev, block]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-navy selection:bg-neon selection:text-navy">
      <Navbar user={user} onLogout={handleLogout} />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route 
            path="/book" 
            element={
              <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-8 md:space-y-12">
                <section className="text-center space-y-4">
                  <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight uppercase">Reserve Your Cage</h2>
                  <p className="text-gray-400 text-sm md:text-lg">Real-time scheduling for the dedicated player.</p>
                </section>
                
                <LaneSelector viewMode={viewMode} setViewMode={setViewMode} bookings={bookings} selectedDate={selectedDate} />
                
                <BookingGrid 
                  user={user}
                  bookings={bookings} 
                  selectedDate={selectedDate} 
                  setSelectedDate={setSelectedDate}
                  viewMode={viewMode}
                  onSlotToggle={toggleBooking}
                  onBlockSlot={blockLane}
                />
              </div>
            } 
          />
          <Route path="/membership" element={<Membership />} />
          <Route path="/gear" element={<Gear />} />
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard user={user} bookings={bookings} onCancel={cancelBooking} /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/admin" 
            element={user?.isAdmin ? <AdminPanel bookings={bookings} onCancel={cancelBooking} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/auth" 
            element={!user ? <AuthForm onLogin={handleLogin} /> : <Navigate to="/dashboard" />} 
          />
        </Routes>
      </main>

      <footer className="bg-black/50 border-t border-white/5 py-8 text-center text-gray-500 text-[10px] md:text-xs">
        <p>© {new Date().getFullYear()} Foreign Essay Batting Cages. All Rights Reserved.</p>
        <p className="mt-1 font-bold uppercase tracking-widest text-neon">No Benchwarmers Allowed.</p>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
