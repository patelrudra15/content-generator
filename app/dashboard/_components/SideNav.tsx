"use client";

import { BotIcon, Contact, FileClock, Home, Settings, Star } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import Link from 'next/link';

function SideNav() {
  const MenuList = [
    {
      name: 'Home',
      Icon: Home,
      path: '/dashboard',
    },
    {
      name: 'History',
      Icon: FileClock,
      path: '/dashboard/history',
    },
    {
      name: 'Help',
      Icon: BotIcon,
      path: '/dashboard/help',
    },
    {
      name: 'Settings',
      Icon: Settings,
      path: '/dashboard/settings',
    },
    {
      name: 'Contact',
      Icon: Contact,
      path: '/dashboard/contact',
    },
  ];

  const path = usePathname();
  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className="h-screen p-5 shadow-sm border bg-white">
      <div className="flex justify-center">
        <Image src={'/logo.svg'} alt="logo" width={120} height={100} />
      </div>

      <hr className="my-6 border" />

      <div className="mt-3">
        {MenuList.map((menu, index) => (
          <Link key={index} href={menu.path} passHref>
            <div className={`flex gap-2 mb-2 p-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer items-center
                ${path === menu.path && 'bg-primary text-white'}
                `}>
              <menu.Icon className="h-6 w-6" />
              <h2 className="text-lg">{menu.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SideNav;
