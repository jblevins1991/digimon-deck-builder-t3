import * as React from 'react';

interface StrategyTextareaProps extends Omit<React.HTMLAttributes<HTMLTextAreaElement>, 'defaultValue'> {
    defaultValue?: string;
    id: string;
    name: string;
    max?: number;
    value?: string;
}

export const StrategyTextarea = React.forwardRef<
    HTMLTextAreaElement,
    StrategyTextareaProps
>(({
    className,
    defaultValue,
    id,
    max,
    name,
    value
}, ref) => {
    const [count, setCount] = React.useState<number>(defaultValue?.length ?? 0);

    return <div>
        <textarea
            className={className}
            id={id}
            value={value}
            name={name}
            ref={ref}
        />

        {max && <div>
            {/* circle that fills up and goes red when word count is over */}
            {count} / {max}
        </div>}
    </div>
})