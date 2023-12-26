import { useCardFilters } from '~/card-filtering';
import { Chip } from '@mui/material';
import * as React from 'react';

interface ActiveFiltersProps {}

function getChipLabelText(key: string, value: string) {
    switch(key) {
        case 'attribute':
            return `Attr: ${value}`;
        case 'bp':
        case 'cardTiming':
            return `Timing: ${value}`;
        case 'cardType':
            return `Card Type: ${value}`;
        case 'color':
            return `Color: ${value}`;
        case 'keyword':
            return `Keyword: ${value}`;
        case 'stage':
            return `Stage: ${value}`;
        default:
            return value;
    }
}

export const ActiveFilters: React.FC<ActiveFiltersProps> = () => {
    const {
        cardFilters
    } = useCardFilters();

    const fromBp = cardFilters?.bp?.start && cardFilters?.bp?.start > 0
        ? `From ${cardFilters?.bp?.start} BP`
        : undefined;

    const toBp = cardFilters?.bp?.start && cardFilters?.bp?.end < 14000
        ? `From ${cardFilters?.bp?.start} BP`
        : undefined;

    const flatFilters = [
        // cardFilters?.attributes,
        // fromBp,
        // toBp,
        ...cardFilters?.cardTimings ?? [],
        ...cardFilters?.cardTypes ?? [],
        ...cardFilters?.colors ?? [],
        ...cardFilters?.keywords ?? [],
        ...cardFilters?.sets ?? [],
        ...cardFilters?.stages ?? []
    ]

    function removeFromCardFiltersObject(filter: string) {
    }

    return <div className='flex gap-4 py-4 mx-6'>
        {flatFilters.map(flatFilter => {
            return <Chip
                label={flatFilter}
                onDelete={() => removeFromCardFiltersObject((flatFilter as string))}
                variant="outlined"
            />
        })}
    </div>;
}