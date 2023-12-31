"use client";

import { Accordion, AccordionSummary, Paper, Typography } from '@mui/material';
import * as React from 'react';
import { CardBlade } from '../atom/CardBlade';
import { api } from '~/trpc/react';
import { NewDeckForm } from './NewDeckForm';
import { SessionProvider } from 'next-auth/react';
import { useDeckId } from '~/deck-building';

interface DeckListProps {
}

export const DeckList: React.FC<DeckListProps> = () => {
    const {
        deckId
    } = useDeckId();

    const {
        data: deck,
        isLoading,
        isError
    } = api.deck.getDeckById.useQuery({ id: deckId ?? 0 });

    const {
        mutate: removeFromDeck
    } = api.deck.removeFromDeck.useMutation({
        onSuccess: () => {
            // invalidate the getDeckById query
        }
    });

    const {
        mutate: updateQuantityOfCardInDeck
    } = api.deck.updateQuantityOfCardInDeck.useMutation({
        onSuccess: () => {
            // invalidate the getDeckById query
        }
    });

    console.log('deck', deck?.[0])

    const digitama: Array<any> = [];
    const digimon: Array<any> = [];
    const options: Array<any> = [];
    const tamers: Array<any> = [];

    if (isLoading) {
        return <p>
            Loading...
        </p>;
    }

    if (!deck?.[0]?.deck.name || isError) {
        return <p>
            We could not find that deck.
        </p>;
    }

    return <div className="min-h-max w-full grow-0 shadow-xl ml-4">
        <Typography className="text-sans font-bold text-4xl p-4 pb-4" variant="h2">
            {deck?.[0]?.deck.name}
        </Typography>

        {deck?.[0]?.deck.strategy && <Typography className='text-sans font-regular text-xl p-4 py-2'>
            <b>Strategy:</b> {deck?.[0]?.deck.strategy}
        </Typography>}

        <div className='w-full overflow-y-auto pb-8'>
            <Typography className="text-sans font-bold text-3xl p-4" variant="h3">
                Digitama
            </Typography>

            {
                digitama.length > 0 
                    ? digitama.map(digitamaData => {
                        return <CardBlade
                            alt={''}
                            src={''}
                        />;
                    })
                    : <span className='text-sans font-regular text-lg p-4 pb-6'>
                        There are no Digitama cards in your deck.
                    </span>
            }

            <Typography className="text-sans font-bold text-3xl p-4" variant="h3">
                Digimon
            </Typography>

            {
                digimon.length > 0 
                    ? digimon.map(digimonData => {
                        return <CardBlade
                            alt=''
                            src=''
                        />;
                    })
                    : <span className='text-sans font-regular text-lg p-4 pb-6'>
                        There are no Digimon cards in your deck.
                    </span>
            }

            <Typography className="text-sans font-bold text-3xl p-4" variant="h3">
                Options
            </Typography>

            {
                options.length > 0 
                    ? options.map(optionsData => {
                        return <CardBlade
                            alt=''
                            src=''
                        />;
                    })
                    : <span className='text-sans font-regular text-lg p-4 pb-6'>
                        There are no Options cards in your deck.
                    </span>
            }

            <Typography className="text-sans font-bold text-3xl p-4" variant="h3">
                Tamers
            </Typography>

            {
                tamers.length > 0 
                    ? tamers.map(tamersData => {
                        return <CardBlade
                            alt=''
                            src=''
                        />;
                    })
                    : <span className='text-sans font-regular text-lg p-4 pb-6'>
                        There are no Tamers cards in your deck.
                    </span>
            }
        </div>
    </div>;
}