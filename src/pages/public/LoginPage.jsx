import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import sarkarLogo from '../../assets/sarkar-setu-logo.jpg';
import {
  Building,
  Rocket,
  ArrowRight,
  Lock,
  Mail,
  CheckCircle2,
} from 'lucide-react';

const ROLES = [
  {
    id: 'government',
    label: 'Govt Official',
    icon: Building,
    desc: 'Department Officers & Procurement Leads',
    badge: 'Maharashtra Gov',
    defaultEmail: 'rajesh.sharma@maharashtra.gov.in',
    redirectPath: '/government/dashboard',
  },
  {
    id: 'startup',
    label: 'Startup Founder',
    icon: Rocket,
    desc: 'DPIIT Registered Innovators & Founders',
    badge: 'DPIIT Verified',
    defaultEmail: 'founder@agrivision.ai',
    redirectPath: '/startup/dashboard',
  },
];

export function LoginPage() {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') || 'government';

  const [selectedRole, setSelectedRole] = useState(
    ROLES.find((r) => r.id === initialRole) ? initialRole : 'government'
  );
  const [email, setEmail] = useState('rajesh.sharma@maharashtra.gov.in');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const navigate = useNavigate();
  const currentRoleObj = ROLES.find((r) => r.id === selectedRole) || ROLES[0];

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    const targetRole = ROLES.find((r) => r.id === roleId);
    if (targetRole) {
      setEmail(targetRole.defaultEmail);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMsg('');

    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg(`Welcome back! Authenticated as ${currentRoleObj.label}. Redirecting...`);
      setTimeout(() => {
        navigate(currentRoleObj.redirectPath);
      }, 700);
    }, 600);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: Brand & Role Selector */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img
                src={sarkarLogo}
                alt="Sarkar Setu"
                className="w-12 h-12 object-contain rounded-full shadow-md ring-2 ring-orange-500"
              />
              <div>
                <h1 className="text-2xl font-black tracking-tight text-zinc-950 dark:text-white">
                  Sarkar <span className="text-orange-600 dark:text-orange-500">Setu</span>
                </h1>
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                  Unified Single Sign-On (SSO)
                </p>
              </div>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
              Select your role below to access your dedicated Maharashtra Innovation Sandbox and Procurement workspace.
            </p>
          </div>

          {/* Role Switcher Cards (Only Govt Official & Startup Founder) */}
          <div className="space-y-2.5">
            <span className="text-[10px] uppercase font-black tracking-wider text-zinc-400 dark:text-zinc-500 block">
              Choose Portal Role
            </span>

            {ROLES.map((role) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.id;

              return (
                <div
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-orange-50 dark:bg-orange-950/40 border-orange-500 dark:border-orange-600 shadow-sm ring-1 ring-orange-500/40'
                      : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold ${
                        isSelected
                          ? 'bg-orange-600 text-white shadow-xs'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-black text-zinc-950 dark:text-white">
                          {role.label}
                        </h4>
                        <span
                          className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${
                            isSelected
                              ? 'bg-orange-100 dark:bg-orange-900/60 text-orange-800 dark:text-orange-200 border-orange-200 dark:border-orange-800'
                              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700'
                          }`}
                        >
                          {role.badge}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">
                        {role.desc}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <input
                      type="radio"
                      name="role_radio"
                      checked={isSelected}
                      onChange={() => handleRoleSelect(role.id)}
                      className="w-4 h-4 text-orange-600 accent-orange-600 cursor-pointer"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Interactive Login Form */}
        <div className="lg:col-span-7">
          <Card className="border-zinc-200/90 dark:border-zinc-800 shadow-card">
            <CardContent className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
                <div>
                  <h3 className="text-lg font-black text-zinc-950 dark:text-white">
                    Sign In to {currentRoleObj.label} Portal
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 font-medium">
                    Secure authentication for Government of Maharashtra Innovation Gateway.
                  </p>
                </div>
                <Badge variant="primary" size="sm">
                  {currentRoleObj.badge}
                </Badge>
              </div>

              {successMsg && (
                <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  label="Official Email ID / Username"
                  type="email"
                  required
                  placeholder={currentRoleObj.defaultEmail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  leftIcon={<Mail className="w-4 h-4" />}
                  helperText={
                    selectedRole === 'government'
                      ? 'Use your authorized @maharashtra.gov.in, @gov.in, or @nic.in ID'
                      : 'Use your registered startup founder email'
                  }
                />

                <Input
                  label="Password / Parichay Token"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  leftIcon={<Lock className="w-4 h-4" />}
                />

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-zinc-600 dark:text-zinc-400 font-medium">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded text-orange-600 accent-orange-600 cursor-pointer"
                    />
                    <span>Remember credentials</span>
                  </label>

                  <a
                    href="#forgot"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Password reset link sent to official email.');
                    }}
                    className="text-orange-600 dark:text-orange-400 font-bold hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>

                <div className="pt-3">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isLoading}
                    className="w-full font-black shadow-md shadow-orange-600/30"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Sign In to {currentRoleObj.label} Portal
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
