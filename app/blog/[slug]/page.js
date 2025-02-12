import { use } from 'react';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export async function generateStaticParams() {
    const files = await fs.readdir(path.join(process.cwd(), 'blog'));
    const slugs = files.map((filename) => ({
        slug: filename.replace('.md', ''),
    }));

    return slugs;
}

export default function BlogPage({ params }) {
    const { slug } = params;
    
    // Asynchronous operation (React Suspense)
    const post = use(async () => {
        const filePath = path.join(process.cwd(), 'blog', `${slug}.md`);
        const fileContent = await fs.readFile(filePath, 'utf8');
        const { content, data } = matter(fileContent);

        const processedContent = await remark().use(html).process(content);
        const contentHtml = processedContent.toString();

        return { contentHtml, ...data };
    });

    return (
        <div>
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </div>
    );
}
