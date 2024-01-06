"use client";

import * as React from 'react';
import { Typography } from '@mui/material';

import { CardBlade } from '../atom/CardBlade';

import { useDeckId } from '~/deck-building';
import { api } from '~/trpc/react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DeckListProps {
}

export const DeckList: React.FC<DeckListProps> = () => {
    const {
        deckId
    } = useDeckId();

    const {
        data: deckCards,
        isLoading,
        isError,
        error
    } = api.deck.getDeckById.useQuery({
        id: deckId ?? 0
    });
    
    const deckName: string = (deckCards?.[0]?.deckName as string);
    const deckStrategy: string = (deckCards?.[0]?.deckStrategy as string);

    console.log('deck', deckCards)

    const digitama = deckCards?.filter(({ cardCardTypeName }) => {
        return cardCardTypeName === "Digitama";
    });
    const digimon = deckCards?.filter(({ cardCardTypeName }) => {
        return cardCardTypeName === "Digimon";
    });
    const options = deckCards?.filter(({ cardCardTypeName }) => {
        return cardCardTypeName === "Option";
    });
    const tamers = deckCards?.filter(({ cardCardTypeName }) => {
        return cardCardTypeName === "Tamer";
    });

    if (isLoading) {
        return <p>
            Loading...
        </p>;
    }

    if (isError) {
        console.log('deck error', error);

        return <p>
            We could not find that deck.
        </p>;
    }

    return <div className="min-h-max w-full grow-0 shadow-xl ml-4">
        <Typography className="text-sans font-bold text-4xl p-4 pb-4" variant="h2">
            {deckName}
        </Typography>

        {!!deckStrategy && <Typography className='text-sans font-regular text-xl p-4 py-2'>
            <b>Strategy:</b> {deckStrategy}
        </Typography>}

        <div className='w-full overflow-y-auto pb-8'>
            <Typography className="text-sans font-bold text-3xl p-4" variant="h3">
                Digitama
            </Typography>

            {
                digitama?.length &&
                digitama?.length > 0 
                    ? digitama.map(({
                        cardId,
                        cardName,
                        cardImage,
                        cardImageAlt,
                        quantity,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    }) => {
                        return <CardBlade
                            key={cardId as string}
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            alt={cardImageAlt as string}
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            cardId={cardId as string}
                            color={"white"}
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            name={cardName as string}
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            src={cardImage as string}
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            quantity={quantity ?? 0}
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
                digimon?.length &&
                digimon.length > 0 
                    ? digimon.map(({
                        cardId,
                        cardName,
                        cardImage,
                        cardImageAlt,
                        quantity,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    }: any) => {
                        return <CardBlade
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            alt={cardImageAlt ?? ""}
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            cardId={cardId}
                            color={"white"}
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            name={cardName ?? ""}
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            src={cardImage ?? ""}
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            quantity={quantity ?? 0}
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
                options?.length &&
                options.length > 0 
                    ? options.map(({
                        cardId,
                        cardName,
                        cardImage,
                        cardImageAlt,
                        quantity,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    }: any) => {
                        return <CardBlade
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            alt={cardImageAlt ?? ""}
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            cardId={cardId}
                            color={"white"}
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            name={cardName ?? ""}
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            src={cardImage ?? ""}
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            quantity={quantity ?? 0}
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
                tamers?.length &&
                tamers.length > 0 
                    ? tamers.map(({
                        cardId,
                        cardName,
                        cardImage,
                        cardImageAlt,
                        quantity,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    }: any) => {
                        return <CardBlade
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            alt={cardImageAlt ?? ""}
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            cardId={cardId}
                            color={"white"}
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            name={cardName ?? ""}
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            src={cardImage ?? ""}
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            quantity={quantity ?? 0}
                        />;
                    })
                    : <span className='text-sans font-regular text-lg p-4 pb-6'>
                        There are no Tamers cards in your deck.
                    </span>
            }
        </div>
    </div>;
}