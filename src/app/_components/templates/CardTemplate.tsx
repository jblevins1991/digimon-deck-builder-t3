import * as React from 'react';
import { api } from '~/trpc/react';

interface CardTemplateProps {
    cardId: number;
}

export const CardTemplate: React.FC<CardTemplateProps> = ({
    cardId
}) => {
    const {
        data: card,
        isLoading,
        isError,
        error
    } = api.card.getCardById.useQuery({ id: cardId });

    return <></>;
};
