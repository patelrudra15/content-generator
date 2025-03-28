"use client"
import React, { ReactNode, useEffect } from 'react';
import Header from './custom/Header';
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/db';
import { Users } from '@/utils/schema';
import { eq } from 'drizzle-orm';

interface ProviderProps {
  children: ReactNode;
}

function Provider({ children }: ProviderProps) {

  const {user}=useUser();

  useEffect(()=>{
    user&&isNewUser();
  },[user]);

  const isNewUser = async () => {
    if (!user || !user.primaryEmailAddress?.emailAddress) return; // Ensure user and email exist
  
    const userEmail = user.primaryEmailAddress.emailAddress;
  
    const result = await db.select().from(Users).where(eq(Users.email, userEmail));
  
    console.log(result);
    
    if (!result.length) { // Check if user already exists
      await db.insert(Users).values({
        name: user.fullName || "", // Ensure non-null values
        email: userEmail,
        imageUrl: user.imageUrl || "", // Provide fallback values if necessary
      });
    }
  };
  
  return (
    <div>
      <Header/>
      <div className='px-10 lg:px-32 xl:px-20 2xl:px-56'>
         {children}
      </div>
    </div>
  );
}

export default Provider;
