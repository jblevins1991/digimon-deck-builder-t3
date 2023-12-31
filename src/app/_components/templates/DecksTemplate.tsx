"use client";

import * as React from 'react';
import { SessionProvider } from 'next-auth/react';

import { DecksList } from '../orgamisms/DecksList';

interface DecksTemplateProps {}

export const DecksTemplate: React.FC<DecksTemplateProps> = () => {
    return <SessionProvider>
        <DecksList />
    </SessionProvider>;
}