import { Card } from '@mui/material';
import { SessionProvider } from 'next-auth/react';
import * as React from 'react';

interface DeckBuilderSidebarProps {
    children?: React.ReactNode;
}

export const DeckBuilderSidebar: React.FC<DeckBuilderSidebarProps> = ({ children }) => {
    return <SessionProvider>
        <Card>
            { children }
        </Card>
    </SessionProvider>;
};