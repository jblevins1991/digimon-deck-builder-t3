"use client";
import * as React from 'react';
import { useCardFilters } from '~/card-filtering';
import { Card, FormControl, InputLabel, MenuItem, Select, Slider, TextField } from '@mui/material';

import { api } from '~/trpc/react';

export interface CardFiltersProps {}

export const CardFilters: React.FC<CardFiltersProps> = () => {
    const {
        cardFilters,
        setCardFilters,
    } = useCardFilters();
    
    const {
        data,
        error,
        isLoading,
        isError
    } = api.filter.getFilters.useQuery();
    
    function handleAttributeOnChange(event: any) {
        setCardFilters?.({
            ...cardFilters,
            attributes: event.target.value
        });
    }

    function handleBpOnChange(event: any) {
        const [ start, end ] = event.target.value;

        setCardFilters?.({
            ...cardFilters,
            bp: {
                start,
                end
            }
        });
    }

    function handleCardTimingOnChange(event: any) {
        setCardFilters?.({
            ...cardFilters,
            cardTimings: event.target.value
        });
    }

    function handleCardTypeOnChange(event: any) {
        setCardFilters?.({
            ...cardFilters,
            cardTypes: event.target.value
        });
    }

    function handleColorOnChange(event: any) {
        setCardFilters?.({
            ...cardFilters,
            colors: event.target.value
        });
    }

    function handleKeywordOnChange(event: any) {
        setCardFilters?.({
            ...cardFilters,
            keywords: event.target.value
        });
    }

    // function handleSetOnChange() {}

    function handleStagesOnChange(event: any) {
        setCardFilters?.({
            ...cardFilters,
            stages: event.target.value
        });
    }

    if (isLoading) {
        // @TODO: loading state
        return <>
            Loading...
        </>;
    }

    if (isError) {
        // @TODO: error state
        return <>
            {error.message}
        </>;
    }

    return <Card className='box-border w-full h-fit m-4 shadow-xl'>
        <form className='grid grid-cols-4 gap-2 p-4'>
            <FormControl>
                <InputLabel id="attribute-label">
                    Attribute
                </InputLabel>
                
                <Select
                    label="Attribute"
                    labelId="attribute-label"
                    onChange={handleAttributeOnChange}
                    id=""
                    value={cardFilters?.attributes}
                >
                    {data?.attributes.map(attribute => {
                        return <MenuItem key={attribute.id} value={attribute.name}>
                            {attribute.name}
                        </MenuItem>;
                    })}
                </Select>
            </FormControl>

            <FormControl className="p-4">
                <InputLabel id="bp-label">
                    Batle Power
                </InputLabel>

                <Slider
                    max={12000}
                    min={0}
                    onChange={handleBpOnChange}
                    value={[
                        cardFilters?.bp?.start ?? 0,
                        cardFilters?.bp?.end ?? 14000
                    ]}
                />
            </FormControl>

            <FormControl>
                <InputLabel id="card-timing-label">
                    Card Timing
                </InputLabel>

                <Select
                    label="Card Timing"
                    labelId="card-timing-label"
                    onChange={handleCardTimingOnChange}
                    value={cardFilters?.cardTimings ?? []}
                    multiple
                >
                    {data?.cardTimings.map(cardTiming => {
                        return <MenuItem key={cardTiming.id} value={cardTiming.name}>
                            {cardTiming.name}
                        </MenuItem>;
                    })}
                </Select>
            </FormControl>

            <FormControl>
                <InputLabel id="card-type-label">
                    Card Type
                </InputLabel>

                <Select
                    label="Card Type"
                    labelId='card-type-label'
                    onChange={handleCardTypeOnChange}
                    value={cardFilters?.cardTypes ?? []}
                    multiple
                >
                    {data?.cardTypes.map(cardTiming => {
                        return <MenuItem key={cardTiming.id} value={cardTiming.name}>
                            {cardTiming.name}
                        </MenuItem>;
                    })}
                </Select>
            </FormControl>

            <FormControl>
                <InputLabel id="color-label">
                    Color
                </InputLabel>

                <Select
                    label="Color"
                    labelId='color-label'
                    onChange={handleColorOnChange}
                    value={cardFilters?.colors ?? []}
                    multiple
                >
                    {data?.colors.map(cardTiming => {
                        return <MenuItem key={cardTiming.id} value={cardTiming.name}>
                            {cardTiming.name}
                        </MenuItem>;
                    })}
                </Select>
            </FormControl>

            <FormControl>
                <InputLabel id="keyword-label">
                    Keyword
                </InputLabel>

                <Select
                    label="Keyword"
                    labelId="keyword-label"
                    onChange={handleKeywordOnChange}
                    value={cardFilters?.keywords ?? []}
                    multiple
                >
                    {data?.keywords.map(cardTiming => {
                        return <MenuItem key={cardTiming.id} value={cardTiming.name}>
                            {cardTiming.name}
                        </MenuItem>;
                    })}
                </Select>
            </FormControl>

            <FormControl>
                <InputLabel id="stage-label">
                    Stage
                </InputLabel>

                <Select
                    label="Stage"
                    labelId="stage-label"
                    onChange={handleStagesOnChange}
                    value={cardFilters?.stages ?? []}
                    multiple
                >
                    {data?.stages.map(cardTiming => {
                        return <MenuItem key={cardTiming.id} value={cardTiming.name}>
                            {cardTiming.name}
                        </MenuItem>;
                    })}
                </Select>
            </FormControl>

            <FormControl>                
                <TextField
                    label="Search by name..."
                    id=""
                    // value={cardFilters?.searchTerm}
                    variant='outlined'
                />
            </FormControl>
        </form>
    </Card>;
}