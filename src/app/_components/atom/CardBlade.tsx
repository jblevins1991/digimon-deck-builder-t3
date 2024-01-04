import classNames from 'classnames';
import * as React from 'react';
import { useDeckId } from '~/deck-building';
import { api } from '~/trpc/react';

interface CardBladeProps {
    alt: string;
    cardId: string;
    color: 'red' | 'purple' | 'blue' | 'yellow' | 'green' | 'black' | 'white';
    name: string;
    src: string;
    quantity?: number;
}

export const CardBlade: React.FC<CardBladeProps> = ({
    alt,
    cardId,
    color,
    name,
    src,
    quantity = 1
}) => {
    const { deckId } = useDeckId();
    const utils = api.useUtils();
    const {
        mutate: removeFromDeck
    } = api.deck.removeFromDeck.useMutation({
        async onSuccess() {
            // invalidate the getDeckById query
            await utils.deck.getDeckCardsByDeckId.invalidate();
        }
    });

    const {
        mutate: updateQuantityOfCardInDeck
    } = api.deck.updateQuantityOfCardInDeck.useMutation({
        async onSuccess() {
            // invalidate the getDeckById query
            await utils.deck.getDeckCardsByDeckId.invalidate();
        }
    });

    const onDelete = React.useCallback(() => {
        if (cardId && deckId) {
            removeFromDeck({
                cardId: parseInt(cardId),
                deckId
            });
        }
    }, [cardId, deckId]);

    const onDecrement = React.useCallback(() => {
        if (deckId && cardId) {
            console.log(quantity);
            if (quantity <= 1) {
                removeFromDeck({
                    cardId: parseInt(cardId),
                    deckId
                });
            } else {
                updateQuantityOfCardInDeck({
                    cardId: parseInt(cardId),
                    deckId,
                    quantity: quantity - 1
                });
            }
        }
    }, [cardId, deckId, quantity]);

    const onQuantityUpdate = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (!!deckId && cardId) {
            if (quantity === 1 && parseInt(event.currentTarget.value) === 0) {
                removeFromDeck({
                    cardId: parseInt(cardId),
                    deckId
                });
            } else {
                updateQuantityOfCardInDeck({
                    cardId: parseInt(cardId),
                    deckId,
                    quantity: parseInt(event.currentTarget.value)
                });
            }
        }
    }, [cardId, deckId, quantity]);

    const onIncrement = React.useCallback(() => {
        if (deckId && cardId) {
            updateQuantityOfCardInDeck({
                cardId: parseInt(cardId),
                deckId,
                quantity: quantity + 1
            });
        }
    }, [cardId, deckId, quantity]);

    const bgClassName = `bg-card_${color}`;

    return <div className='relative flex items-center  w-full h-12'>
        {/* card color orb */}

        <h3 className='absolute bottom-0 h-full flex items-center z-20 text-xl text-white font-bold box-shadow-xl ml-4'>
            <div
                className={classNames('inline-block w-8 h-8 rounded-[50%] mr-2', bgClassName)}
            ></div>
            {name}
        </h3>

        <img
            alt={alt}
            className='absolute brightness-50 object-cover object-center w-full h-12 overflow-y-hidden'
            src={src}
        />

        {/* quantity selector */}
        <div className='flex items-center absolute bottom-0 right-0 h-full mr-3'>
            <button onClick={onDecrement}>
                -
            </button>

            <input
                className='bg-transparent text-xl text-white font-bold box-shadow-lg w-12'
                onChange={onQuantityUpdate}
                type="number"
                value={quantity}
            />

            <button onClick={onIncrement}>
                +
            </button>
        </div>
    </div>;
}