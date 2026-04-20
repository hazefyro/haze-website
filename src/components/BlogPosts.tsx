import { XMLParser } from "fast-xml-parser";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";

type BlogPost = {
    title: string;
    link: string;
    pubDate: Date;
};

type BlogPostsProps = {
    locale: string;
};

type BlogUI = {
    zero: string;
    error: string;
};

const loadPosts = async () => {
    const res = await fetch("/api/feed");
    const xml = await res.text();

    const parser = new XMLParser();
    const json = parser.parse(xml);

    const rawItems = json.rss.channel.item;
    const items = Array.isArray(rawItems) ? rawItems : [rawItems];

    const posts: BlogPost[] = items.map((item: any) => ({
        title: item.title,
        link: item.link,
        pubDate: new Date(item.pubDate),
    }));

    return posts;
};

export const BlogPosts = ({ locale }: BlogPostsProps) => {
    let ui: BlogUI;
    if (locale === "pl") {
        ui = {
            zero: "Artykuły ze substacka wkrótce...",
            error: "Nie udało się wczytać artykułów...",
        };
    } else {
        ui = {
            zero: "Substack articles coming soon... ",
            error: "Failed to load articles...",
        };
    }

    const {
        data: posts = [],
        isPending,
        isError,
    } = useQuery({
        queryKey: ["blog-posts"],
        queryFn: loadPosts,
    });

    if (isPending) {
        return (
            <div className="flex flex-col gap-2">
                {[0, 1, 2].map((row) => (
                    <motion.div
                        key={row}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: row * 0.08 }}
                        className="flex flex-row justify-between"
                    >
                        <motion.div
                            className="bg-foreground/10 h-5 w-1/2 rounded-2xl"
                            animate={{ opacity: [0.35, 0.7, 0.35] }}
                            transition={{
                                duration: 1.6,
                                ease: "easeInOut",
                                repeat: Infinity,
                            }}
                        />
                        <motion.div
                            className="bg-foreground/10 h-5 w-1/4 rounded-2xl"
                            animate={{ opacity: [0.35, 0.7, 0.35] }}
                            transition={{
                                duration: 1.6,
                                ease: "easeInOut",
                                repeat: Infinity,
                                delay: 0.15,
                            }}
                        />
                    </motion.div>
                ))}
            </div>
        );
    }

    if (posts.length <= 0) {
        return <div>{ui.zero}</div>;
    }

    if (isError) {
        return <div>{ui.error}</div>;
    }

    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={{
                hidden: {},
                show: {
                    transition: {
                        staggerChildren: 0.06,
                    },
                },
            }}
            className="flex flex-col gap-2"
        >
            {posts.map((post, i) => (
                <motion.span
                    key={i}
                    variants={{
                        hidden: { opacity: 0, y: 8 },
                        show: { opacity: 1, y: 0 },
                    }}
                    className="flex w-full flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"
                >
                    <a
                        href={post.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-foreground font-medium"
                    >
                        {post.title}
                    </a>
                    <p className="text-muted">
                        {new Date(post.pubDate).toLocaleDateString(locale)}
                    </p>
                </motion.span>
            ))}
        </motion.div>
    );
};
