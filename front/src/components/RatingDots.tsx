const RatingDots = ({ score }: { score: number }) => {
    const getFilledCount = (value: number) => {
        if (value <= 0.7) return 1;
        if (value <= 0.85) return 2;
        return 3;
    };

    const filledCount = getFilledCount(score);

    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    className={`
                        rounded-full aspect-square h-2 outline-1 outline-neutral-400
                        ${i <= filledCount ? 'bg-neutral-400' : 'bg-white'}
                    `}
                />
            ))}
        </div>
    );
};

export {RatingDots}