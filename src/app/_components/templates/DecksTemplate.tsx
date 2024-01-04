import * as React from 'react';
import { api } from '~/trpc/react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DecksTemplateProps {
}

export const DecksTemplate: React.FC<DecksTemplateProps> = ({}) => {
    const {
        data: decks,
        isLoading,
        isError,
        error
    } = api.deck.getDecksByPage.useQuery({
        limit: 1,
        offset: 1
    });

    return <></>;
};
