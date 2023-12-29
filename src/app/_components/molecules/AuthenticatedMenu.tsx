import * as React from 'react';
import { signOut, useSession } from 'next-auth/react';

import { api } from '~/trpc/server';
import { ClickAwayListener, Popover } from '@mui/material';
import { ClassNames } from '@emotion/react';

import classNames from 'classnames';

interface AuthenticatedMenuProps {}

export const AuthenticatedMenu: React.FC<AuthenticatedMenuProps> = ({}) => {
    const {
        data: session,
        status
    } = useSession();

    const anchorEl = React.useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = React.useState(false);

    console.log(session)

    const isAuthenticated = status === 'authenticated';
    const isLoading = status === 'loading';

    if (!isAuthenticated || isLoading) return null;

    // const usersDecks = api.deck.getDecksByUserId.useQuery()

    return <div>
        <button className='grid grid-cols-[64px_1fr] gap-2 hover:bg-blue-600 hover:cursor-pointer p-2' onClick={() => setIsOpen(true)}>
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

                            {/* <ul>
                                Loop through decks and display them here.
                            </ul> */}
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
