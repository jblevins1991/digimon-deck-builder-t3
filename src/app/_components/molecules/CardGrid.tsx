"use client";
import * as React from 'react';
import { Modal, Skeleton } from '@mui/material';

import { useCardFilters } from '~/card-filtering';
import { api } from '~/trpc/react';

export interface CardGridProps {
}

/**
 * The CardGrid component is responsible for fetching the cards from the API with the set filters. 
 */
export const CardGrid: React.FC<CardGridProps> = () => {
    const [selectedCard, setSelectedCard] = React.useState<typeof data | undefined>(undefined);

    // @TODO: create CardFiltersContext and CardFiltersProvider
    const {
        cardFilters
    } = useCardFilters();

    const {
        data,
        error,
        isLoading,
        isError
    } = api.card.getCardsByPage.useQuery({
        offset: 1,
        limit: 10
    })

    function openCardModal(card: typeof data) {
        setSelectedCard(card);
    }

    function closeAndResetModal() {
        setSelectedCard(undefined);
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

    return <>
        <div className='grid grid-cols-5 gap-4 w-full h-max overflow-y-auto'>
            {data?.map((digimonCardData) => {
                const {
                    name,
                    imageAlt,
                    image
                } = digimonCardData;

                return <button key={name} onClick={() => openCardModal([digimonCardData])}>
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
            <div className='grid grid-cols-2'>
                <div>
                    <img
                        alt={selectedCard[0]?.imageAlt ?? "This alt text is missing. Please report which card by the card set identifier is missing this alt text to administrators via our discord."}
                        src={selectedCard[0]?.image}
                    />
                </div>

                <div>
                    <h2>{selectedCard[0]?.name}</h2>

                    {!!selectedCard[0]?.level && <p>
                        <b>Level: </b> {selectedCard[0].level}    
                    </p>}

                    {!!selectedCard[0]?.effect && <p>
                        <b>Effect:</b> {selectedCard[0].effect}
                    </p>}

                    {!!selectedCard[0]?.inheritedEffect && <p>
                        <b>Inherited Effect:</b> {selectedCard[0].effect}
                    </p>}
                </div>
            </div>
        </Modal>}
    </>;
}