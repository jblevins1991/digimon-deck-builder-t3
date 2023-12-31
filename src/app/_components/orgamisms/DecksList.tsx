import * as React from 'react';
import { useSession } from 'next-auth/react';

import { api } from '~/trpc/react';

interface DecksListProps {}

export const DecksList: React.FC<DecksListProps> = ({}) => {
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
        isError,
        error
    } = api.deck.getDecksByUserId.useQuery({
        id: session?.user.id || '0'
    });

    console.log({
        decks,
        session
    });

    if (isLoading) {
        return <p>
            Loading...
        </p>;
    }

    if (isError) {
        return <p>
            {error.message}
        </p>
    }

    return <div>
        <h1 className='text-3xl font-bold mb-4'>{session?.user.name}'s Decks</h1>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5'>
            {
                decks?.map(deck => {
                    return <a className='border-border border-[1px] p-2 rounded-lg' href={`/${deck.id}`}>
                        {deck.name}
                    </a>;
                })
            }
        </div>
    </div>;
};