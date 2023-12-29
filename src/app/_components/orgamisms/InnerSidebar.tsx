import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import * as React from 'react';
import { NewDeckForm } from '../molecules/NewDeckForm';
import { DeckList } from '../molecules/DeckDrawer';
import { api } from '~/trpc/react';

interface InnerSidebarProps {
}

export const InnerSidebar: React.FC<InnerSidebarProps> = ({
}) => {
    const params = useParams();

    const {
        status
    } = useSession();

    const containsDeckId = !!params.slug;
    const isAuthenticated = status === 'authenticated';
    const isLoading = status === 'loading';

    /**
     * Show the Create New Deck Form
     */
    if (!containsDeckId && isAuthenticated) {
        return <>
            <NewDeckForm />
        </>
    }

    /**
     * Show the Deck List
     */
    if (containsDeckId && isAuthenticated) {
        return <>
            <DeckList
                deckId={(params.slug as string)}
            />
        </>
    }

    /**
     * Show the Login Content
     */
    return <>
    </>;
}