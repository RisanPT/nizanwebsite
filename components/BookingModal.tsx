'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Phone, Mail, User, CheckCircle2, ArrowRight } from 'lucide-react';

type Step = 'DATE' | 'DETAILS' | 'SUCCESS';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState<Step>('DATE');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Premium Bridal Makeup',
  });

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setStep('DATE');
      setSelectedDate(null);
    }
  }, [isOpen]);

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('SUCCESS');
  };

  // Calendar Logic
  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));

  const monthName = currentMonth.toLocaleString('default', { month: 'long' });
  const year = currentMonth.getFullYear();

  const handleDateClick = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(date);
    setTimeout(() => setStep('DETAILS'), 300); // Smooth transition
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8"
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-navy/80 backdrop-blur-xl"
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-[1000px] bg-cream overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.5)] border border-white/10"
          style={{ minHeight: '550px' }}
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-10 text-navy/40 hover:text-navy transition-colors"
          >
            <X size={24} />
          </button>

          <div className="flex flex-col lg:flex-row h-full overflow-y-auto max-h-[90vh]">
            {/* Left Sidebar - Design Aesthetic */}
            {step !== 'SUCCESS' && (
              <div className="hidden lg:flex w-1/3 bg-navy p-12 flex-col justify-between relative overflow-hidden">
                <div className="relative z-10">
                  <span className="text-gold text-[10px] font-bold tracking-[0.3em] uppercase block mb-4">
                    Exclusive Experience
                  </span>
                  <h2 className="font-display text-4xl text-white font-light leading-tight mb-6">
                    Book Your <br />
                    <span className="italic text-gold">Makeover</span>
                  </h2>
                  <p className="text-white/50 text-sm leading-relaxed font-light">
                    Join hundreds of brides who trusted Nizan for their most cherished moments. 
                  </p>
                </div>
                
                <div className="relative z-10 space-y-6 pt-12 border-t border-white/10">
                  <div className="flex items-center gap-4 text-white/60">
                    <CheckCircle2 size={18} className="text-gold" />
                    <span className="text-xs tracking-wide">Professional Artistry</span>
                  </div>
                  <div className="flex items-center gap-4 text-white/60">
                    <CheckCircle2 size={18} className="text-gold" />
                    <span className="text-xs tracking-wide">Premium Cosmetics</span>
                  </div>
                  <div className="flex items-center gap-4 text-white/60">
                    <CheckCircle2 size={18} className="text-gold" />
                    <span className="text-xs tracking-wide">Sanitized Private Studio</span>
                  </div>
                </div>

                {/* Decorative background element */}
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gold/5 rounded-full blur-[80px]" />
              </div>
            )}

            {/* Main Content Area */}
            <div className={`flex-1 p-8 lg:p-14 bg-white ${step === 'SUCCESS' ? 'lg:p-20' : ''}`}>
              <AnimatePresence mode="wait">
                {step === 'DATE' && (
                  <motion.div
                    key="step-date"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="mb-8">
                      <h3 className="font-display text-2xl text-navy mb-2">1. Select Date</h3>
                      <p className="text-navy/50 text-sm">Choose your preferred makeover date to view availability.</p>
                    </div>

                    {/* Calendar UI */}
                    <div className="max-w-md mx-auto lg:mx-0">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-navy font-semibold tracking-wide">
                          {monthName} {year}
                        </h4>
                        <div className="flex gap-2">
                          <button onClick={prevMonth} className="p-2 hover:bg-gold/10 rounded-full transition-colors text-gold">
                            <ChevronLeft size={20} />
                          </button>
                          <button onClick={nextMonth} className="p-2 hover:bg-gold/10 rounded-full transition-colors text-gold">
                            <ChevronRight size={20} />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-7 gap-1 text-center mb-2">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                          <div key={d} className="text-[10px] font-bold text-navy/30 uppercase tracking-[0.1em] py-2">
                            {d}
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: firstDayOfMonth(currentMonth) }).map((_, i) => (
                          <div key={`empty-${i}`} className="aspect-square" />
                        ))}
                        {Array.from({ length: daysInMonth(currentMonth) }).map((_, i) => {
                          const day = i + 1;
                          const isSelected = selectedDate?.getDate() === day && selectedDate?.getMonth() === currentMonth.getMonth();
                          const isToday = new Date().getDate() === day && new Date().getMonth() === currentMonth.getMonth();
                          
                          return (
                            <button
                              key={day}
                              onClick={() => handleDateClick(day)}
                              className={`aspect-square flex items-center justify-center text-sm transition-all duration-300 relative group
                                ${isSelected ? 'bg-navy text-white' : 'hover:bg-gold/10 text-navy'}
                                ${isToday && !isSelected ? 'text-gold font-bold' : ''}
                              `}
                            >
                              {day}
                              {isToday && !isSelected && (
                                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold rounded-full" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 'DETAILS' && (
                  <motion.div
                    key="step-details"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="mb-10 flex items-center justify-between">
                      <div>
                        <h3 className="font-display text-2xl text-navy mb-2">2. Guest Details</h3>
                        <p className="text-navy/50 text-sm">
                          Booking for: <span className="text-gold font-medium">{selectedDate?.toLocaleDateString('default', { dateStyle: 'long' })}</span>
                        </p>
                      </div>
                      <button 
                        onClick={() => setStep('DATE')}
                        className="text-[10px] uppercase tracking-widest text-gold font-bold border-b border-gold/40 hover:border-gold transition-all"
                      >
                        Change Date
                      </button>
                    </div>

                    <form onSubmit={handleConfirmBooking} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-navy/50 font-bold">Full Name</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" size={16} />
                            <input 
                              required
                              type="text" 
                              placeholder="e.g. Sarah Johnson"
                              className="w-full bg-white border border-navy/10 pl-11 pr-4 py-3.5 text-sm text-navy focus:outline-none focus:border-gold transition-colors"
                              value={formData.name}
                              onChange={e => setFormData({...formData, name: e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-navy/50 font-bold">Phone Number</label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" size={16} />
                            <input 
                              required
                              type="tel" 
                              placeholder="+1 (555) 000-0000"
                              className="w-full bg-white border border-navy/10 pl-11 pr-4 py-3.5 text-sm text-navy focus:outline-none focus:border-gold transition-colors"
                              value={formData.phone}
                              onChange={e => setFormData({...formData, phone: e.target.value})}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-navy/50 font-bold">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" size={16} />
                          <input 
                            required
                            type="email" 
                            placeholder="sarah@example.com"
                            className="w-full bg-white border border-navy/10 pl-11 pr-4 py-3.5 text-sm text-navy focus:outline-none focus:border-gold transition-colors"
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-navy/50 font-bold">Select Service</label>
                        <select 
                          className="w-full bg-white border border-navy/10 px-4 py-3.5 text-sm text-navy focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer"
                          value={formData.service}
                          onChange={e => setFormData({...formData, service: e.target.value})}
                        >
                          <option>Premium Bridal Makeup</option>
                          <option>Event Glamour</option>
                          <option>Editorial & Fashion</option>
                          <option>Skin Preparation</option>
                        </select>
                      </div>

                      <button 
                        type="submit"
                        className="w-full bg-navy text-white py-5 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-gold hover:text-navy transition-all duration-500 flex items-center justify-center gap-3 mt-4 group"
                      >
                        Confirm Booking
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </form>
                  </motion.div>
                )}

                {step === 'SUCCESS' && (
                  <motion.div
                    key="step-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-6"
                  >
                    <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mb-8 relative">
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                      >
                        <CheckCircle2 size={48} className="text-gold" />
                      </motion.div>
                      <div className="absolute inset-0 border border-gold/20 rounded-full animate-ping opacity-20" />
                    </div>

                    <h2 className="font-display text-4xl text-navy mb-4">Payment Successful!</h2>
                    <p className="text-navy/50 text-sm max-w-sm mb-12">
                      Your appointment has been confirmed. A receipt has been sent to <span className="text-navy font-medium">{formData.email}</span>.
                    </p>

                    <div className="w-full max-w-md bg-navy/[0.02] border border-navy/5 p-8 space-y-6 mb-12">
                      <div className="flex justify-between items-center text-sm border-b border-navy/5 pb-4">
                        <span className="text-navy/40 font-medium">Service</span>
                        <span className="text-navy font-semibold">{formData.service}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm border-b border-navy/5 pb-4">
                        <span className="text-navy/40 font-medium">Date & Time</span>
                        <span className="text-navy font-semibold">{selectedDate?.toLocaleDateString('default', { dateStyle: 'medium' })} at 10:00 AM</span>
                      </div>
                      <div className="flex justify-between items-center text-sm border-b border-navy/5 pb-4">
                        <span className="text-navy/40 font-medium">Location</span>
                        <span className="text-navy font-semibold">Nizan Studio, NY</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-navy/40 font-medium">Booking ID</span>
                        <span className="text-navy font-semibold text-gold">#NIZ-847291</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                      <button className="px-10 py-4 bg-white border border-navy/10 text-navy text-[10px] font-bold tracking-widest uppercase hover:bg-navy/5 transition-colors">
                        View Orders
                      </button>
                      <button 
                        onClick={onClose}
                        className="px-10 py-4 bg-gold text-navy text-[10px] font-bold tracking-widest uppercase hover:bg-gold-light transition-colors"
                      >
                        Back to Home
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
