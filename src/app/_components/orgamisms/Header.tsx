"use client";
import * as React from 'react';
import { SessionProvider, useSession } from 'next-auth/react';

import { LoginButtons } from '../molecules/LoginButtons';
import { AuthenticatedMenu } from '../molecules/AuthenticatedMenu';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
    return <SessionProvider>
        <header className='grid grid-cols-[1fr_250px] gap-2 bg-blue-500 w-full h-auto shadow-xl mb-4'>
            <img alt="logo" src="" />

            <LoginButtons />
            <AuthenticatedMenu />
        </header>
    </SessionProvider>;
};
