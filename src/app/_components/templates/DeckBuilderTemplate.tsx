"use client";
import * as React from 'react';

import { CardFilterProvider } from '~/card-filtering';
import { DeckBuilderProvider } from '~/deck-building';

import { CardFilters } from '../molecules/CardFilters';
import { CardGrid } from '../molecules/CardGrid';
import { DeckList } from '../molecules/DeckDrawer';
import { ActiveFilters } from '../molecules/ActiveFilters';
import { DeckBuilderSidebar } from '../orgamisms/DeckBuilderSidebar';
import { InnerSidebar } from '../orgamisms/InnerSidebar';

export interface DeckBuilderTemplateProps {
    //
};

export const DeckBuilderTemplate: React.FC<DeckBuilderTemplateProps> = ({
    //
}) => {
    return <>
        <DeckBuilderProvider>
            <div className="grid grid-cols-[450px_1fr] gap-4 w-full">
                <DeckBuilderSidebar>
                    <InnerSidebar />
                </DeckBuilderSidebar>

                <div className='box-border'>
                    <CardFilterProvider>
                        <CardFilters />

                        <ActiveFilters />

                        <CardGrid />
                    </CardFilterProvider>
                </div>
            </div>
        </DeckBuilderProvider>
    </>;
};
