"use client";
import * as React from 'react';

import { CardFilterProvider } from '~/card-filtering';
import { CardFilters } from '../molecules/CardFilters';
import { CardGrid } from '../molecules/CardGrid';
import { DeckDrawer } from '../molecules/DeckDrawer';
import { ActiveFilters } from '../molecules/ActiveFilters';

export interface DeckBuilderTemplateProps {
    //
};

export const DeckBuilderTemplate: React.FC<DeckBuilderTemplateProps> = ({
    //
}) => {

    return <>
        <div className="grid grid-cols-[450px_1fr] gap-4 w-full">
            <DeckDrawer name='Deck name' description='My deck is pretty awesome. You can edit the cards within it.' />

            <div className='box-border min-w-max grow shrink mr-8'>
                <CardFilterProvider>
                    <CardFilters />

                    <ActiveFilters />

                    <CardGrid />
                </CardFilterProvider>
            </div>
        </div>
    </>;
};
