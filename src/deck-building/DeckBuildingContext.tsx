import * as React from 'react';

/**
 * 
 */
interface DeckProps {
    name: string;
    strategy?: string;
    cards: Array<any>;
}

/**
 * 
 */
interface DeckBuildingProps {
    deck?: DeckProps;
    setDeck?: React.Dispatch<DeckProps>;
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
    const [deckBuildingProps, setDeckBuildingProps] = React.useState<DeckProps | undefined>(undefined);

    return <DeckBuilderContext.Provider
        value={{
            deck: deckBuildingProps,
            setDeck: setDeckBuildingProps
        }}
    >
        {children}
    </DeckBuilderContext.Provider>;
};

/**
 * 
 */
export const useDeck = () => React.useContext(DeckBuilderContext);
