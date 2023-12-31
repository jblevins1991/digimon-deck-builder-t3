"use client";
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { api } from '~/trpc/react';

interface NewDeckFormProps {}

export const NewDeckForm: React.FC<NewDeckFormProps> = () => {
    const {
        data: session,
        status
    } = useSession();

    const isAuthenticated = status === "authenticated";

    const {
        mutate: createDeck,
        isError,
        error
    } = api.deck.createDeck.useMutation();

    React.useEffect(() => {
        if (isError) {
            console.error(error.message);
        }
    }, [isError, error])

    const handleOnSubmit: SubmitHandler<{ name: string; strategy?: string; }> = (values) => {
        const { name, strategy } = values;

        console.log('values: ', {
            name, strategy
        })
        
        if (isAuthenticated && session?.user) {
            createDeck({
                name,
                userId: session.user.id,
                strategy
            });

            // redirect(`/${deck.id}`);
        }
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: {
            errors
        }
    } = useForm<{
        name: string;
        strategy?: string;
    }>();

    return <div>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
            <label className='block'>
                Deck Name
            </label>

            <input
                className='block box-border w-full m-2 p-2 border-[1px] border-border'
                type="text"
                {...register("name", {
                    required: {
                        value: true,
                        message: 'Deck name is required.'
                    },
                    maxLength: {
                        value: 60,
                        message: 'Deck name cannot exceed 60 characters.'
                    }
                })}
            />

            {!!errors.name && <span id='name-error' className=''>
                {errors.name.message}
            </span>}

            <label className='block'>
                Strategy
            </label>

            <textarea
                className='block box-border w-full m-2 p-2 border-[1px] border-border'
                {...register("strategy", {
                    maxLength: {
                        value: 500,
                        message: 'Strategy cannot exceed 500 characters.'
                    }
                })}
            />

            {!!errors?.strategy && <span id='strategy-error' className=''>
                {errors.strategy.message}
            </span>}

            <button type='submit'>
                Create
            </button>
        </form>
    </div>
}