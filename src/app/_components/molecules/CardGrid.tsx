"use client";
import * as React from 'react';
import { Modal, Skeleton } from '@mui/material';

import { useCardFilters } from '~/card-filtering';
import { api } from '~/trpc/react';
import { useDeckId } from '~/deck-building';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CardGridProps {
}

/**
 * The CardGrid component is responsible for fetching the cards from the API with the set filters. 
 */
export const CardGrid: React.FC<CardGridProps> = () => {
    const {
        deckId
    } = useDeckId();

    const [selectedCard, setSelectedCard] = React.useState<typeof cards | undefined>(undefined);

    // @TODO: create CardFiltersContext and CardFiltersProvider
    const {
        cardFilters
    } = useCardFilters();

    // const addToDeck = (quantity: number) => api.deck.
    // const removeFromDeck = (quantity: number) => api.deck.
    // const changeQuantityInDeck = (quantity: number) => api.deck.

    const {
        data: cards,
        error,
        isLoading,
        isError
    } = api.card.getCardsByPage.useQuery({
        offset: 1,
        limit: 10
    });

    const {
        mutate: addToDeck
    } = api.deck.addToDeck.useMutation({
        onSuccess: () => {
            // invalidate the getDeckById query
        }
    });

    console.log(cards);

    function openCardModal(card: typeof cards) {
        setSelectedCard(card);
    }

    function closeAndResetModal() {
        setSelectedCard(undefined);
    }

    function rightClickOnCard(card: typeof cards) {
        if (card?.[0] && typeof deckId !== 'undefined') {
            addToDeck({
                quantity: 4,
                cardId: card[0].id,
                deckId
            });
        }
    }

    if (isLoading) {
        return <div className='grid grid-cols-5 gap-4 w-full h-max pl-6'>
            <Skeleton className='w-full h-40 shadow-xl' variant='rectangular' />
            <Skeleton className='w-full h-40 shadow-xl' variant='rectangular' />
            <Skeleton className='w-full h-40 shadow-xl' variant='rectangular' />
            <Skeleton className='w-full h-40 shadow-xl' variant='rectangular' />
            <Skeleton className='w-full h-40 shadow-xl' variant='rectangular' />
            <Skeleton className='w-full h-40 shadow-xl' variant='rectangular' />
        </div>;
    }

    if (isError) {
        // @TODO: error state
        return <p className='text-red-500 text-lg font-semibold px-6'>
            {error.message}
        </p>;
    }

    if (cards.length <= 0) {
        return <p className='text-red-500 text-lg font-semibold px-6'>
            We could not retrieve any cards at this time.    
        </p>;
    }

    return <>
        <div className='grid grid-cols-5 gap-4 w-full h-max overflow-y-auto px-6'>
            {cards?.map((digimonCardData) => {
                    const {
                        name,
                        imageAlt,
                        image
                    } = digimonCardData;

                    return <button
                        className='shadow-xl'
                        key={name}
                        onClick={() => openCardModal([digimonCardData])}
                        onContextMenu={(event: React.MouseEvent<HTMLButtonElement>) => {
                            event.preventDefault();
                            rightClickOnCard([digimonCardData])
                        }}
                    >
                        <img
                            alt={imageAlt ?? "This alt text is missing. Please report which card by the card set identifier is missing this alt text to administrators via our discord."}
                            src={image}
                        />
                    </button>;
                })}
        </div>

        {selectedCard && <Modal
            onClose={closeAndResetModal}
            open={!!selectedCard.length}
        >
            {/* card details ui */}
            <div className='absolute top-1/2 left-1/2 grid grid-cols-2 gap-4 bg-white w-fit h-fit -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg'>
                <div>
                    <img
                        alt={selectedCard[0]?.imageAlt ?? "This alt text is missing. Please report which card by the card set identifier is missing this alt text to administrators via our discord."}
                        src={selectedCard[0]?.image}
                    />
                </div>

                <div>
                    <h2 className='text-2xl font-bold mb-4'>
                        {selectedCard[0]?.name}
                    </h2>

                    {!!selectedCard[0]?.cardTypeName && <p className='text-lg mb-4'>
                        <b>Card Type: </b> {(selectedCard[0].cardTypeName as string)}
                    </p>}

                    {!!selectedCard[0]?.level && <p className='text-lg mb-4'>
                        <b>Level: </b> {selectedCard[0].level}    
                    </p>}

                    {!!selectedCard[0]?.stageName && <p className='text-lg mb-4'>
                        <b>Stage: </b> {(selectedCard[0].stageName as string)}
                    </p>}

                    {!!selectedCard[0]?.cardTypeName && <p className='text-lg mb-4'>
                        <b>Set: </b> {(selectedCard[0].setName as string)}
                    </p>}

                    {!!selectedCard[0]?.bp && <p className='text-lg mb-4'>
                        <b>Battle Power:</b> {selectedCard[0].bp}
                    </p>}

                    {!!selectedCard[0]?.effect && <p className='text-lg mb-4'>
                        <b>Effect:</b> {selectedCard[0].effect}
                    </p>}

                    {!!selectedCard[0]?.inheritedEffect && <p className='text-lg mb-4'>
                        <b>Inherited Effect:</b> {selectedCard[0].inheritedEffect}
                    </p>}
                </div>
            </div>
        </Modal>}
    </>;
}