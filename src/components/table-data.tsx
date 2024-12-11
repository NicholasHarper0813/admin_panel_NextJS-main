"use client";

import { supabase } from '@/libs/supabase-client';
import React, { useEffect, useState } from 'react'

export default function TableData({ data }: {data : any}) {

  const [ content, setContent ] = useState<any>({
    title: data.title,
    description: data.description,
    titleUpdatedAt: data.titleUpdatedAt,
    descriptionUpdatedAt: data.descriptionUpdatedAt,
  })

  useEffect(() => {
    const channels = supabase.channel('content-update-channel')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'content' },
        (payload) => {
          setContent(payload.new)
          console.log('Content updated', payload.new)
        }
      )
      .subscribe()

    console.log('Subscribed to content-update-channel')

    return () => {
      channels.unsubscribe()
    }
  }, []);

  return (
    <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
      <li className="mb-2">Title: {content.title}</li>
      <li>Description: {content.description}</li>
    </ol>
  )
}
