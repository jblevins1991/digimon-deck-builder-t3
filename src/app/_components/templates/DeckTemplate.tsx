"use client";
import { useParams } from 'next/navigation';
import * as React from 'react';
import { api } from '~/trpc/react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DeckTemplateProps {}

export const DeckTemplate: React.FC<DeckTemplateProps> = () => {
    const params = useParams();

    const deckId = !!params.slug
        ? params.slug as string
        : "";

    const {
        data: deck,
        isLoading,
        isError
    } = api.deck.getDeckById.useQuery({ id: parseInt(deckId) });

    console.log({
        params,
        deckId,
        deck
    })

    if (isError) {
        return <h1>
            Error
        </h1>;
    }

    if (isLoading) {
        return <h1>
            Loading
        </h1>;
    }

    console.log('deck', deck)

    return <>

    </>;
};
