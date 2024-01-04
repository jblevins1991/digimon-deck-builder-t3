import * as React from 'react';
import { api } from '~/trpc/react';

interface UserDecksTemplateProps {
    userId: string;
}

export const UserDecksTemplate: React.FC<UserDecksTemplateProps> = ({
    userId
}) => {
    const {
        data: usersDecks,
        isLoading,
        isError,
        error
    } = api.deck.getDecksByUserId.useQuery({ id: userId });

    return <></>;
};
