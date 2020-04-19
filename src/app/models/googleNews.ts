export interface GoogleNews{
    totalResults: number;
    articles: Article[];
}

interface Article{
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: Date;
    content: string;
}