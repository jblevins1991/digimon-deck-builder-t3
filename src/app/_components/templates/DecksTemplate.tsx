"use client";

import { useSession } from 'next-auth/react';
import * as React from 'react';
import { api } from '~/trpc/react';
import { withSessionProvider } from '~/utils';

interface DecksTemplateProps {}

export const DecksTemplateWithoutWrapper: React.FC<DecksTemplateProps> = () => {
    const {
        data: session,
        status
    } = useSession();

    const isAuthenticated = status === 'authenticated';

    if (!isAuthenticated && session === null) {
        return null;
    }

    const {
        data: decks,
        isLoading,
        isError
    } = api.deck.getDecksByUserId.useQuery({
        id: session?.user.id || 0
    });

    return <div className='grid grid-cols-4'>
        {
            decks?.map(deck => {
                return <div>
                    {deck.name}
                </div>;
            })
        }
    </div>;
}

export const DecksTemplate = withSessionProvider({
    children: <DecksTemplateWithoutWrapper />
});