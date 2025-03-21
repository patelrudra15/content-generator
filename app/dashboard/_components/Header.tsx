"use client";

import React, { useState } from 'react';
import { UserButton } from '@clerk/nextjs';
import { Search } from 'lucide-react';

const MenuList = [
  {
    name: 'Home',
    path: 'dashboard',
  },
  {
    name: 'History',
    path: 'dashboard/history',
  },
  {
    name: 'Help',
    path: 'dashboard/help',
  },
  {
    name: 'Setting',
    path: 'dashboard/settings',
  },
  {
    name: 'contact',
    path: 'dashboard/contact',
  },
  
];

function Header() {
  const [search, setSearch] = useState('');

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && search.trim()) {
      const menuPath = MenuList.find(menu => menu.path.split('/').pop() === search.trim());
      if (menuPath) {
        window.location.href = `/${menuPath.path}`;
      } else {
        alert('Invalid path. Please search for a valid path name.');
      }
    }
  };

  return (
    <div className='p-5 shadow-sm border-b-2 bg-white flex justify-between items-center'>
      <div className='flex gap-2 items-center p-2 border rounded-md max-w-lg bg-white hover:scale-105 shadow-md'>
        <Search />
        <input
          type='text'
          placeholder='Search...'
          className='outline-none'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>
      <div className='flex gap-5 items-center'>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
