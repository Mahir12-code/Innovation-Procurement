import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import fullBanner from '../../assets/sarkar-setu-hero-banner.png';
import {
  LogIn,
  UserPlus,
  Building,
  Rocket,
  Award,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Mail,
  KeyRound,
  Sparkles,
  Zap,
  Check
} from 'lucide-react';

export function HeroLoginBanner() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [selectedRole, setSelectedRole] = useState('government'); // 'government' | 'startup' | 'expert'
  
  // Form State
  const [email, setEmail] = useState('sharma.p@maharashtra.gov.in');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    if (role === 'government') {
      setEmail('sharma.p@maharashtra.gov.in');
    } else if (role === 'startup') {
      setEmail('founder@agrivision-tech.in');
    } else {
      setEmail('prof.kulkarni@iitb.ac.in');
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(`Welcome back! Logging into ${selectedRole.toUpperCase()} portal...`);
      setTimeout(() => {
        if (selectedRole === 'government') navigate('/government/dashboard');
        else if (selectedRole === 'startup') navigate('/startup/dashboard');
        else navigate('/expert/dashboard');
      }, 600);
    }, 500);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage('Registration submitted! Redirecting to verification desk...');
      setTimeout(() => {
        if (selectedRole === 'government') navigate('/government/dashboard');
        else navigate('/startup/dashboard');
      }, 700);
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* 1. FULL UNCROPPED BANNER (No Zoom, Full Aspect Ratio) */}
      <div className="overflow-hidden rounded-3xl border border-zinc-200/90 bg-white shadow-xl shadow-black/5 hover:shadow-2xl transition-all duration-300">
        <img
          src={fullBanner}
          alt="Sarkar Setu — Pilot • Evaluate • Scale | Government of Maharashtra"
          className="w-full h-auto block object-contain"
        />
      </div>

      {/* 2. INTERACTIVE LOGIN & REGISTER ACCESS BAR */}
      <div className="rounded-3xl border border-zinc-200/90 bg-white p-6 sm:p-8 shadow-card">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Info & Quick Access Title (5 cols) */}
          <div className="lg:col-span-5 space-y-4 border-b lg:border-b-0 lg:border-r border-zinc-100 pb-6 lg:pb-0 lg:pr-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-black text-orange-700">
              <Sparkles className="w-3.5 h-3.5 text-orange-600 animate-spin" style={{ animationDuration: '4s' }} />
              <span>Single Sign-On (SSO) Gateway</span>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight">
                Access Sarkar Setu Portal
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 font-medium leading-relaxed">
                Direct role-based authentication for Government Nodal Officers, DPIIT Startups, and Independent Technical Jury Members.
              </p>
            </div>

            {/* Quick Benefits / Trust Badges */}
            <div className="space-y-2 pt-2 text-xs text-zinc-600 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Encrypted Gov-SSO & PFMS Escrow Integration</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Instant DPIIT Verification & Pilot Zone Approvals</span>
              </div>
            </div>
          </div>

          {/* Right Interactive Form Area (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Top Switcher: Sign In vs New Registration */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center p-1 bg-zinc-100 rounded-2xl border border-zinc-200 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('login');
                    setSuccessMessage('');
                  }}
                  className={`px-4 py-2 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'login'
                      ? 'bg-orange-600 text-white shadow-sm shadow-orange-600/30'
                      : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Portal Sign In</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('register');
                    setSuccessMessage('');
                  }}
                  className={`px-4 py-2 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'register'
                      ? 'bg-orange-600 text-white shadow-sm shadow-orange-600/30'
                      : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>New Registration</span>
                </button>
              </div>

              {/* Role Selection Pills */}
              <div className="hidden sm:flex items-center gap-1.5">
                {[
                  { id: 'government', label: 'Officer', icon: Building },
                  { id: 'startup', label: 'Startup', icon: Rocket },
                  { id: 'expert', label: 'Jury', icon: Award },
                ].map((r) => {
                  const Icon = r.icon;
                  const isSelected = selectedRole === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => handleRoleChange(r.id)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-zinc-950 text-white border-black shadow-xs'
                          : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-orange-400' : 'text-zinc-500'}`} />
                      <span className="text-[11px] font-black">{r.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Role Buttons */}
            <div className="grid grid-cols-3 gap-1.5 sm:hidden">
              {[
                { id: 'government', label: 'Govt Officer', icon: Building },
                { id: 'startup', label: 'Startup', icon: Rocket },
                { id: 'expert', label: 'Jury Panel', icon: Award },
              ].map((r) => {
                const Icon = r.icon;
                const isSelected = selectedRole === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => handleRoleChange(r.id)}
                    className={`p-2 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${
                      isSelected
                        ? 'bg-zinc-950 text-white border-black'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-700'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-orange-400' : 'text-zinc-500'}`} />
                    <span className="text-[10px] font-black truncate">{r.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Success Notification */}
            {successMessage && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* LOGIN FORM */}
            {activeTab === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    label="Official Email ID"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    leftIcon={<Mail className="w-4 h-4 text-zinc-400" />}
                    placeholder="user@domain.in"
                    required
                  />

                  <Input
                    label="Password / OTP"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    leftIcon={<KeyRound className="w-4 h-4 text-zinc-400" />}
                    placeholder="Enter security password"
                    required
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <span className="text-zinc-500 text-[11px]">
                    Selected Role: <strong className="text-orange-600 uppercase font-black">{selectedRole}</strong>
                  </span>

                  <div className="flex items-center gap-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      isLoading={isLoading}
                      className="w-full sm:w-auto font-black px-6"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      Sign In to {selectedRole.toUpperCase()} Portal
                    </Button>
                  </div>
                </div>
              </form>
            ) : (
              /* REGISTER FORM */
              <form onSubmit={handleRegisterSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    label={selectedRole === 'government' ? 'Department Division' : 'Startup Name'}
                    type="text"
                    placeholder={selectedRole === 'government' ? 'e.g. Water Resources' : 'e.g. AgriVision AI'}
                    required
                  />
                  <Input
                    label={selectedRole === 'government' ? 'Nodal Officer ID' : 'DPIIT Registration No.'}
                    type="text"
                    placeholder={selectedRole === 'government' ? 'NODAL-MH-2026' : 'DIPP84920'}
                    required
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <span className="text-zinc-500 text-[11px]">
                    Fast-Track DPIIT / Government Verification
                  </span>

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    isLoading={isLoading}
                    className="w-full sm:w-auto font-black px-6"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Complete {selectedRole.toUpperCase()} Registration
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
