import * as React from 'react';
import { signOut, useSession } from 'next-auth/react';

import { api } from '~/trpc/react';
import { ClickAwayListener, Popover } from '@mui/material';
import { ClassNames } from '@emotion/react';

import classNames from 'classnames';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AuthenticatedMenuProps {
}

export const AuthenticatedMenu: React.FC<AuthenticatedMenuProps> = ({}) => {
    const {
        data: session,
        status
    } = useSession();

    const anchorEl = React.useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = React.useState(false);

    console.log(session)

    const isAuthenticated = status === 'authenticated';

    const {
        data: decks,
        isError,
        isLoading
    } = api.deck.getDecksByUserId.useQuery({
        id: session?.user.id.toString() ?? ""
    });

    if (!isAuthenticated || isLoading) return null;

    const onDeckClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.stopPropagation();
    }

    return <div>
        <button className='grid grid-cols-[64px_1fr] gap-2 hover:bg-blue-600 hover:cursor-pointer p-2' onClick={() => setIsOpen(true)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className='w-16 h-16 rounded-[50%]' alt={`${session?.user.name}'s Discord User Avatar.`} src={session?.user.image ?? ""} />

            <p className='my-auto'>
                Welcome Logged <b>{session?.user.name}</b>
            </p>
        </button>

        {/* <ClickAwayListener onClickAway={() => setIsOpen(false)}> */}
            {/* <Popover open={isOpen}> */}
                <nav className={classNames({
                    'hidden': !isOpen,
                    'block': isOpen
                })}>
                    <ul>
                        <li className='text-lg text-gray-200 bg-blue-500 hover:text-white hover:cursor-pointer hover:bg-blue-600 font-bold font-sans w-full p-2'>
                            <button>
                                Account
                            </button>
                        </li>
                        <li className='text-lg text-gray-200 bg-blue-500 hover:text-white hover:cursor-pointer hover:bg-blue-600 font-bold font-sans w-full p-2'>
                            Decks

                            <ul>
                                {decks?.map(({
                                    id,
                                    name
                                }) => {
                                    return <li key={name}>
                                        <a href={`/${id}`} onClick={onDeckClick}>
                                            {name}
                                        </a>
                                    </li>
                                })}
                            </ul>
                        </li>
                        <li className='text-lg text-gray-200 bg-blue-500 hover:text-white hover:cursor-pointer hover:bg-blue-600 font-bold font-sans w-full p-2'>
                            <button onClick={() => signOut()}>
                                Log Out
                            </button>
                        </li>
                    </ul>
                </nav>
            {/* </Popover> */}
        {/* </ClickAwayListener> */}
    </div>;
};
