'use client';

import React from 'react';

interface FormFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  required?: boolean;
}

export default function FormField({ label, type, value, onChange, placeholder, required = false }: FormFieldProps) {
  return (
    <div>
      <label className="block text-[8px] font-bold text-muted uppercase tracking-widest mb-1.5 font-mono">
        {label}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-3 py-2 bg-surface/50 border border-border text-zinc-300 rounded focus:outline-none focus:border-accent text-xs ${type === 'password' ? 'font-sans' : ''}`}
      />
    </div>
  );
}
