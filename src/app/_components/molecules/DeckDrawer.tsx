import { Accordion, AccordionSummary, Paper, Typography } from '@mui/material';
import * as React from 'react';
import { CardBlade } from '../atom/CardBlade';

interface DeckDrawerProps {
    name: string;
    description: string;
}

export const DeckDrawer: React.FC<DeckDrawerProps> = ({
    name,
    description
}) => {
    const digitama: Array<any> = [];
    const digimon: Array<any> = [];
    const options: Array<any> = [];
    const tamers: Array<any> = [];

    return <div className="min-h-max w-full grow-0 shadow-xl ml-4">
        <Typography className="text-sans font-bold text-4xl p-4 pb-4" variant="h2">
            {name}
        </Typography>

        <Typography className='text-sans font-regular text-xl p-4 py-2'>
            {description}
        </Typography>

        <div className='w-full overflow-y-auto pb-8'>
            <Typography className="text-sans font-bold text-3xl p-4" variant="h3">
                Digitama
            </Typography>

            {
                digitama.length > 0 
                    ? digitama.map(digitamaData => {
                        return <CardBlade
                            alt=''
                            src=''
                        />;
                    })
                    : <span className='text-sans font-regular text-lg p-4 pb-6'>
                        There are no Digitama cards in your deck.
                    </span>
            }

            <Typography className="text-sans font-bold text-3xl p-4" variant="h3">
                Digimon
            </Typography>

            {
                digimon.length > 0 
                    ? digimon.map(digimonData => {
                        return <CardBlade
                            alt=''
                            src=''
                        />;
                    })
                    : <span className='text-sans font-regular text-lg p-4 pb-6'>
                        There are no Digimon cards in your deck.
                    </span>
            }

            <Typography className="text-sans font-bold text-3xl p-4" variant="h3">
                Options
            </Typography>

            {
                options.length > 0 
                    ? options.map(optionsData => {
                        return <CardBlade
                            alt=''
                            src=''
                        />;
                    })
                    : <span className='text-sans font-regular text-lg p-4 pb-6'>
                        There are no Options cards in your deck.
                    </span>
            }

            <Typography className="text-sans font-bold text-3xl p-4" variant="h3">
                Tamers
            </Typography>

            {
                tamers.length > 0 
                    ? tamers.map(tamersData => {
                        return <CardBlade
                            alt=''
                            src=''
                        />;
                    })
                    : <span className='text-sans font-regular text-lg p-4 pb-6'>
                        There are no Tamers cards in your deck.
                    </span>
            }
        </div>
    </div>;
}