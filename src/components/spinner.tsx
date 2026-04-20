export const Spinner = () => {
    return (
        <div className="flex items-center justify-center gap-1.5 overflow-visible">
            <span className="bg-foreground size-1.25 animate-bounce rounded-full [animation-delay:-0.3s]"></span>
            <span className="bg-foreground size-1.25 animate-bounce rounded-full [animation-delay:-0.15s]"></span>
            <span className="bg-foreground size-1.25 animate-bounce rounded-full"></span>
        </div>
    );
};
