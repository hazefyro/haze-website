export const item = {
    hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
    show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.4,
            ease: "easeOut" as const,
        },
    },
};
