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

  const isNewUser=async()=>{
    const result=await db.select().from(Users)
    .where(eq(Users.email,user?.primaryEmailAddress?.emailAddress));

    console.log(result);
    if(!result[0])
    {
      await db.insert(Users).values({
        name:user.fullName,
        email:user?.primaryEmailAddress?.emailAddress,
        imageUrl:user?.imageUrl
      })
    }
  }
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
