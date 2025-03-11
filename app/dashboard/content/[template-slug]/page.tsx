"use client"
import React, { useState, useEffect } from 'react'
import FormSection from '../_components/FormSection'
import OutputSection from '../_components/OutputSection'
import { TEMPLATE } from '../../_components/TemplateListSection'
import Templates from '@/app/(data)/Templates'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { chatSession } from '@/utils/AiModel'
import { db } from '@/utils/db'
import { AIOutput } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'

interface PROPS{
    params: Promise<{ 'template-slug': string }>
}

function CreateNewContent(props:PROPS) {
    const [selectedTemplate, setSelectedTemplate] = useState<TEMPLATE | undefined>();
    const [loading, setLoading] = useState(false);
    const [aiOutput, setAiOutput] = useState<string>('');
    const { user } = useUser();

    useEffect(() => {
        async function fetchParams() {
            const params = await props.params;
            const template = Templates?.find(item => item.slug === params['template-slug']);
            setSelectedTemplate(template);
        }

        fetchParams();
    }, [props.params]);

    const GenerateAIContent = async (formData:any) => {
        setLoading(true);
        const SelectedPrompt = selectedTemplate?.aiPrompt || '';

        const FinalAIPrompt = JSON.stringify(formData) + ", " + SelectedPrompt;

        const result = await chatSession.sendMessage(FinalAIPrompt);

        console.log(result.response.text());
        setAiOutput(result?.response.text());
        await SaveInDb(JSON.stringify(formData), selectedTemplate?.slug || '', result?.response.text() || '');
        setLoading(false);
    }

    const SaveInDb = async (formData:string, slug:string, aiResp:string) => {
       const result = await db.insert(AIOutput).values({
        formData: formData,
        templateSlug: slug,
        aiResponse: aiResp,
        createdBy: user?.primaryEmailAddress?.emailAddress || 'Unknown',
        createdAt: moment().format('DD/MM/yyyy'),
       });

       console.log(result);
    }

    return (
      <div className='p-10'> 
        <Link href={"/dashboard"}>
          <Button><ArrowLeft/> Back</Button> 
        </Link>    
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5 py-5'>
          {/* FormSection */}
          <FormSection 
            selectedTemplate={selectedTemplate}
            userFormInput={(v:any)=>GenerateAIContent(v)}
            loading={loading} 
          />
          {/* OutputSection */}
          <div className='col-span-2'>
            <OutputSection aiOutput={aiOutput}/>
          </div>
        </div>
      </div>   
    )
}

export default CreateNewContent
