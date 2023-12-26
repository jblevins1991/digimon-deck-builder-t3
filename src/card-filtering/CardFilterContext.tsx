import * as React from 'react';

/**
 * 
 */
interface CardFilterProps {
    attributes?: string[];
    bp?: {
        start: number;
        end: number;
    };
    cardTimings?: string[];
    cardTypes?: string[];
    colors?: string[];
    keywords?: string[];
    searchTerm?: string;
    sets?: string[];
    stages?: string[];
}

/**
 * 
 */
interface CardFilterContextProps {
    cardFilters?: CardFilterProps;
    setCardFilters?: React.Dispatch<CardFilterProps>;
}

/**
 * 
 */
const CardFilterContext = React.createContext<CardFilterContextProps>({
    cardFilters: {
        attributes: [],
        bp: {
            start: 0,
            end: 14000,
        },
        cardTimings: [],
        cardTypes: [],
        colors: [],
        keywords: [],
        searchTerm: '',
        sets: [],
        stages: []
    }
});

/**
 * 
 */
interface CardFilterProviderProps {
    children?: React.ReactNode;
}

/**
 * CardFilterProvider
 * 
 * @param props - component props
 * @returns the card filters provider
 */
export const CardFilterProvider: React.FC<CardFilterProviderProps> = ({
    children
}) => {
    const [cardFilters, setCardFilters] = React.useState<CardFilterProps>({});

    React.useEffect(() => {
        console.log(cardFilters);
    }, [cardFilters]);

    return <CardFilterContext.Provider
        value={{
            cardFilters,
            setCardFilters
        }}
    >
        {children}
    </CardFilterContext.Provider>;
};

/**
 * 
 */
export const useCardFilters = () => React.useContext(CardFilterContext);
