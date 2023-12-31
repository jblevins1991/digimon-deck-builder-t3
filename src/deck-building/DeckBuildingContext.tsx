import * as React from 'react';

/**
 * 
 */
interface DeckBuildingProps {
    deckId?: number;
    setDeckId?: React.Dispatch<number>;
}

/**
 * 
 */
const DeckBuilderContext = React.createContext<DeckBuildingProps>({});

/**
 * 
 */
interface DeckBuildingProviderProps {
    children?: React.ReactNode;
}

/**
 * CardFilterProvider
 * 
 * @param props - component props
 * @returns the card filters provider
 */
export const DeckBuilderProvider: React.FC<DeckBuildingProviderProps> = ({
    children
}) => {
    const [deckId, setDeckId] = React.useState<number | undefined>(undefined);

    return <DeckBuilderContext.Provider
        value={{
            deckId,
            setDeckId
        }}
    >
        {children}
    </DeckBuilderContext.Provider>;
};

/**
 * 
 */
export const useDeckId = () => React.useContext(DeckBuilderContext);
