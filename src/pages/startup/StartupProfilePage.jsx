import React, { useState } from 'react';
import {
  Building2,
  ShieldCheck,
  Award,
  Save,
  Globe,
  Mail,
  Phone,
  MapPin,
  Users,
  Cpu,
  FileCheck,
  CheckCircle2
} from 'lucide-react';
import { useStartupPortal } from '../../context/StartupPortalContext';

export function StartupProfilePage() {
  const { profile, updateProfile, showToast } = useStartupPortal();

  const [formData, setFormData] = useState({ ...profile });
  const [isEditing, setIsEditing] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header Banner */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 px-2.5 py-0.5 rounded border border-orange-200 dark:border-orange-800/60">
              {formData.id}
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              DPIIT Recognized Startup
            </span>
          </div>
          <h1 className="text-2xl font-black text-zinc-950 dark:text-white tracking-tight">
            {formData.name}
          </h1>
          <p className="text-xs text-zinc-500">
            {formData.tagline}
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Save className="w-4 h-4" /> Save Profile Changes
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Statutory & Recognition Credentials */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h2 className="text-sm font-bold text-zinc-950 dark:text-white">Statutory & Legal Identity</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">DPIIT Recognition Number</label>
              <input
                type="text"
                name="dpiitNumber"
                disabled
                value={formData.dpiitNumber}
                className="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl font-mono text-zinc-700 dark:text-zinc-300 font-bold"
              />
              <span className="text-[10px] text-zinc-400 mt-0.5 block">Locked to DPIIT registry</span>
            </div>

            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">Corporate CIN</label>
              <input
                type="text"
                name="cinNumber"
                disabled
                value={formData.cinNumber}
                className="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl font-mono text-zinc-700 dark:text-zinc-300 font-bold"
              />
              <span className="text-[10px] text-zinc-400 mt-0.5 block">MCA verified</span>
            </div>

            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">GSTIN</label>
              <input
                type="text"
                name="gstin"
                disabled
                value={formData.gstin}
                className="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl font-mono text-zinc-700 dark:text-zinc-300 font-bold"
              />
              <span className="text-[10px] text-zinc-400 mt-0.5 block">GSTN portal linked</span>
            </div>

            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">Year of Incorporation</label>
              <input
                type="number"
                name="incorporationYear"
                value={formData.incorporationYear}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white font-bold"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Contact & Key Personnel */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <Users className="w-5 h-5 text-orange-600" />
            <h2 className="text-sm font-bold text-zinc-950 dark:text-white">Founder & Authorized Nodal Officer</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">Founder / CEO Name</label>
              <input
                type="text"
                name="founderName"
                value={formData.founderName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">Designation</label>
              <input
                type="text"
                name="founderRole"
                value={formData.founderRole}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">Official Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">Mobile / WhatsApp</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">Headquarters City</label>
              <input
                type="text"
                name="headquarters"
                value={formData.headquarters}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">Official Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white"
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">Registered Maharashtra Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Technology, Traction & Capacity */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <Cpu className="w-5 h-5 text-indigo-600" />
            <h2 className="text-sm font-bold text-zinc-950 dark:text-white">Technology Stack & Field Capabilities</h2>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">Core Proprietary Technology</label>
              <input
                type="text"
                name="technology"
                value={formData.technology}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">Existing Deployments & Commercial Traction</label>
              <textarea
                rows={2}
                name="deployments"
                value={formData.deployments}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">Team Size</label>
                <input
                  type="text"
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">Patents Granted / Filed</label>
                <input
                  type="number"
                  name="patentsCount"
                  value={formData.patentsCount}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">Annual Turnover</label>
                <input
                  type="text"
                  name="turnoverAnnual"
                  value={formData.turnoverAnnual}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white font-medium"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Button Footer */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" /> Save Updated Company Profile
          </button>
        </div>
      </form>
    </div>
  );
}
