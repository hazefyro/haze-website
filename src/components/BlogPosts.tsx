import { XMLParser } from "fast-xml-parser";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "./spinner.tsx";
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
            zero: "Substack articles comming soon... ",
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
    console.log(posts);

    if (isPending) {
        return (
            <div>
                <Spinner />
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
        <div className="flex flex-col gap-2">
            {posts.map((post, i) => (
                <span
                    key={i}
                    className="flex w-full flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"
                >
                    <a
                        href={post.link}
                        target="_blank"
                        className="text-foreground font-medium"
                    >
                        {post.title}
                    </a>
                    <p className="text-muted">
                        {new Date(post.pubDate).toLocaleDateString(locale)}
                    </p>
                </span>
            ))}
        </div>
    );
};
