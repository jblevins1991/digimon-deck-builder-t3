import * as React from 'react';

interface CardBladeProps {
    alt: string;
    src: string;
    quantity?: number;
}

export const CardBlade: React.FC<CardBladeProps> = ({
    alt,
    src,
    quantity = 1
}) => {
    return <div className='w-full h-12 py-2 px-4'>
        {/* card color orb */}

        <img
            alt={alt}
            src={src}
        />

        {/* quantity selector */}
    </div>;
}