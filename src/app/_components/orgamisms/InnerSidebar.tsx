import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import * as React from 'react';
import { NewDeckForm } from '../molecules/NewDeckForm';
import { DeckList } from '../molecules/DeckDrawer';
import { api } from '~/trpc/react';
import { useDeckId } from '~/deck-building';

interface InnerSidebarProps {
}

export const InnerSidebar: React.FC<InnerSidebarProps> = ({
}) => {
    const params = useParams();

    const {
        status
    } = useSession();

    const { setDeckId } = useDeckId();

    const containsDeckId = !!params.slug;
    const isAuthenticated = status === 'authenticated';
    const isLoading = status === 'loading';
    
    setDeckId?.(
        Array.isArray(params.slug)
            ? parseInt(params?.slug[0] ?? '')
            : parseInt(params?.slug ?? '')
    );

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
            />
        </>
    }

    /**
     * Show the Login Content
     */
    return <>
    </>;
}