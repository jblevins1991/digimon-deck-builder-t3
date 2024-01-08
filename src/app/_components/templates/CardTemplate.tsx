"use client";
import * as React from 'react';
import { useParams } from 'next/navigation';

import { api } from '~/trpc/react';

export const CardTemplate = () => {
    const params = useParams();
    const cardId = !!params.slug
        ? params.slug as string
        : "";

    const {
        data: card,
        isLoading,
        isError
    } = api.card.getCardById.useQuery({ id: parseInt(cardId) });

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

    console.log('card', card)

    return <div className='grid grid-cols-2 gap-8'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {card?.[0]?.image && card?.[0]?.imageAlt && <img
            className='w-full'
            src={card?.[0]?.image}
            alt={card?.[0]?.imageAlt}
        />}

        <div>
            <h1 className='text-sans font-bold text-2xl p-1 mb-2'>
                {card?.[0]?.name}
            </h1>

            <div>
                {card?.[0]?.level && <div className='p-1 mb-2'>
                    <b className='me-2'>Level</b>

                    {card?.[0]?.level}
                </div>}
                {card?.[0]?.attributeId && <div className='p-1 mb-2'>
                    <b className='me-2'>Stage</b>

                    {card?.[0]?.attributeId}
                </div>}
                {card?.[0]?.stageId && <div className='p-1 mb-2'>
                    <b className='me-2'>Stage</b>

                    {card?.[0]?.stageId}
                </div>}
                {card?.[0]?.bp && <div className='p-1 mb-2'>
                    <b className='me-2'>DP</b>

                    {card?.[0]?.bp}
                </div>}
                {card?.[0]?.inheritedEffect && <div className='p-1 mb-2'>
                    <b className='me-2'>Inherited Effect</b>

                    <div>
                        {card?.[0]?.inheritedEffect}
                    </div>
                </div>}
                {card?.[0]?.setId && <div className='p-1 mb-2'>
                    <b className='me-2'>Set</b>

                    {card?.[0]?.setId}
                </div>}
            </div>
        </div>
    </div>;
};
