import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Static parametreler için (slug'lar)
export async function generateStaticParams() {
    const files = await fs.readdir(path.join(process.cwd(), 'blog'));
    const slugs = files.map((filename) => ({
        slug: filename.replace('.md', ''),
    }));

    return slugs.map(({ slug }) => ({
        slug: [slug],
    }));
}

// Static veri (markdown içeriklerini alalım)
export async function generateStaticProps({ params }) {
    const { slug } = params;
    const filePath = path.join(process.cwd(), 'blog', `${slug}.md`);
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { content, data } = matter(fileContent);

    // Markdown içeriğini HTML'e çevir
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
        props: {
            contentHtml,
            ...data,
        },
    };
}

export default function BlogPage({ contentHtml, title, date }) {
    return (
        <div>
            <h1>{title}</h1>
            <p>{date}</p>
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
    );
}
