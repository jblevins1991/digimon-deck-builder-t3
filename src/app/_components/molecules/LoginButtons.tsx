import { signIn, useSession } from 'next-auth/react';
import * as React from 'react';

interface LoginButtonsProps {}

export const LoginButtons: React.FC<LoginButtonsProps> = ({}) => {
    const {
        status
    } = useSession();

    const isAuthenticated = status === 'authenticated';
    const isLoading = status === 'loading';

    if (isAuthenticated || isLoading) return null;

    // const handleLogin = (values) => {
    //     const { email } = values;

    //     return signIn('email', { email });
    // };

    return <div className='m-2'>
        <button className='inline-block w-full p-2 bg-white' onClick={() => signIn("discord", { redirect: true })}>
            Login with Discord
        </button>
    </div>;
};
