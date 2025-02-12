"use client"
import React, { useEffect, useState } from 'react';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const BlogPost = ({ params }) => {
    const { slug } = params;
    const [contentHtml, setContentHtml] = useState('');
    const [frontMatter, setFrontMatter] = useState({});

    useEffect(() => {
        const fetchPost = async () => {
            const filePath = path.join(process.cwd(), 'posts', `${slug}.md`);
            const fileContent = await fs.readFile(filePath, 'utf8');
            const { data, content } = matter(fileContent);

            const processedContent = await remark().use(html).process(content);
            setContentHtml(processedContent.toString());
            setFrontMatter(data);
        };

        fetchPost();
    }, [slug]);

    return (
        <section className="py-16">
            <div className="container mx-auto px-6 md:px-64">
                <h1 className="text-3xl font-bold mb-4">{frontMatter.title}</h1>
                <p className="text-gray-600 mb-8">{frontMatter.date}</p>
                <div className="prose" dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </div>
        </section>
    );
};

export default BlogPost;
