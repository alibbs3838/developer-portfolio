"use client"
import React from 'react';
import { useRouter } from 'next/router';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const BlogPost = ({ post }) => {
    const { title, date, contentHtml } = post;

    return (
        <section className="py-16">
            <div className="container mx-auto px-6 md:px-64">
                <h1 className="text-3xl font-bold mb-4">{title}</h1>
                <p className="text-gray-600 mb-8">{date}</p>
                <div className="prose" dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </div>
        </section>
    );
};

// Bu fonksiyon, statik sayfalar için hangi slug'ların oluşturulacağını belirler.
export async function getStaticPaths() {
    const fs = require('fs/promises');
    const path = require('path');

    const postsDirectory = path.join(process.cwd(), 'posts');
    const filenames = await fs.readdir(postsDirectory);

    // Tüm markdown dosyalarının yollarını alıyoruz.
    const paths = filenames.map((filename) => ({
        params: {
            slug: filename.replace('.md', ''),
        },
    }));

    return {
        paths, // Tüm slug'ları içeren yolları döndürüyoruz
        fallback: false, // Tüm yolların statik olarak önceden oluşturulması gerektiğini belirtiyoruz.
    };
}

// Bu fonksiyon, her bir sayfa için gerekli veriyi alır.
export async function getStaticProps({ params }) {
    const fs = require('fs/promises');
    const path = require('path');
    const matter = require('gray-matter');
    const { remark } = require('remark');
    const html = require('remark-html');

    const { slug } = params;
    const filePath = path.join(process.cwd(), 'posts', `${slug}.md`);
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    const processedContent = await remark().use(html).process(content);

    return {
        props: {
            post: {
                title: data.title,
                date: data.date,
                contentHtml: processedContent.toString(),
            },
        },
    };
}

export default BlogPost;
