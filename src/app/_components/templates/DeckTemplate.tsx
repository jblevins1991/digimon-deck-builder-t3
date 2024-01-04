import * as React from 'react';
import { api } from '~/trpc/react';

interface DeckTemplateProps {
    deckId: number;
}

export const DeckTemplate: React.FC<DeckTemplateProps> = ({
    deckId
}) => {
    const {
        data: deck,
        isLoading: isDeckLoading,
        isError: isDeckError,
        error: deckError
    } = api.deck.getDeckById.useQuery({ id: deckId });

    const {
        data: deckCards,
        isLoading: isDeckCardsLoading,
        isError: isDeckCardsError,
        error: deckCardsError
    } = api.deck.getDeckCardsByDeckId.useQuery({ id: deckId });

    return <></>;
};
