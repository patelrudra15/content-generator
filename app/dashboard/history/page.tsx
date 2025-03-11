import React, { useEffect, useState } from 'react';
import Templates from '@/app/(data)/Templates';
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import { currentUser } from '@clerk/nextjs/server';
import { desc, eq } from 'drizzle-orm';
import Image from 'next/image';
import TemplateListSection, { TEMPLATE } from '../_components/TemplateListSection';

export interface HISTORY {
  id: number;
  formData: string;
  aiResponce: string;
  templateSlug: string;
  createdBy: string;
  createdAt: string;
}

async function History() {
  const user = await currentUser();

 
  {/*@ts-ignore */}
  const HistoryList: HISTORY[] = await db
    .select()
    .from(AIOutput)
    .where(eq(AIOutput?.createdBy, user?.primaryEmailAddress?.emailAddress))
    .orderBy(desc(AIOutput.id));


  const GetTemplateName = (slug: string)=> {
    const template:TEMPLATE|any=Templates?.find((item) => item.slug == slug);
    return template;
  }

  return (
    <div className='m-5 p-5 border rounded-lg bg-white'>
      <h2 className='font-bold text-3xl'>History</h2>
      <p className='text-gray-500'>Search your previously generated AI content</p>
      <div className='grid grid-cols-8 font-bold bg-secondary mt-5 py-3 px-3'>
        <h2 className='col-span-2'>ID</h2>
        <h2 className='col-span-2'>TEMPLATE</h2>
        <h2 className='col-span-2 mr-10'>FORM DATA</h2>
        <h2 className='col-span-1 ml-7'>DATE</h2>
        <h2 className='ml-10'>WORDS</h2>
      </div>
      {HistoryList.map((item: HISTORY, index: number) => (
        <div key={index} className='grid grid-cols-7 my-5 py-3'>
          <h2 className='ml-5'>{item.id}</h2>
          <h2 className='col-span-2 flex gap-2 items-center ml-10'>
            <Image src={GetTemplateName(item.templateSlug)?.icon || ''} width={25} height={25} alt={GetTemplateName(item.templateSlug)?.name || 'Template'} />
            {GetTemplateName(item.templateSlug)?.name || 'Unknown Template'}
          </h2>
          <h2 className='col-span-2 line-clamp-3 overflow-hidden text-ellipsis ml-10'>{item?.formData}</h2>
          <h2 className='ml-9'>{item.createdAt}</h2>
          <h2 className='ml-20'>{item.formData?.length}</h2>
        </div>
      ))}

    </div>
  );
}

export default History;