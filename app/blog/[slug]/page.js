import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export async function generateStaticParams() {
    // 'blog' dizinindeki tüm dosyaları okuyalım
    const files = await fs.readdir(path.join(process.cwd(), 'blog'));
    
    // Her dosya için slug oluşturuyoruz
    const slugs = files.map((filename) => ({
        slug: filename.replace('.md', ''),
    }));

    // Slugları döndürüyoruz
    return slugs;
}

export async function getStaticProps({ params }) {
    const { slug } = params;
    
    // Slug'a göre ilgili markdown dosyasını okuyalım
    const filePath = path.join(process.cwd(), 'blog', `${slug}.md`);
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { content, data } = matter(fileContent);

    // Markdown içeriğini HTML'e dönüştürelim
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
