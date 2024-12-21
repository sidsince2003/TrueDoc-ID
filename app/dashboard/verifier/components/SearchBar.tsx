// src/app/dashboard/verifier/components/SearchBar.tsx
'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-lg">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onSearch(e.target.value); // Real-time search
        }}
        placeholder="Search documents..."
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
    </form>
  );
}