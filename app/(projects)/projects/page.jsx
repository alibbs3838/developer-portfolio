"use client"
import React, { useEffect, useState } from 'react';
import BackgroundEffects from '@/components/ui/background-effects';
import SectionTitle from './components/SectionTitle';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';  // Link bileşenini içe aktar

const ProjectsPage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const postsDirectory = path.join(process.cwd(), 'posts');
            const filenames = await fs.readdir(postsDirectory);

            const postsData = await Promise.all(
                filenames.map(async (filename) => {
                    const filePath = path.join(postsDirectory, filename);
                    const fileContent = await fs.readFile(filePath, 'utf8');
                    const { data } = matter(fileContent);

                    return {
                        frontMatter: data,
                        slug: filename.replace('.md', ''),
                    };
                })
            );

            setPosts(postsData);
        };

        fetchPosts();
    }, []);

    return (
        <section className="py-16" id="projects">
            <div className="container mx-auto px-6 md:px-64">
                <BackgroundEffects
                    variant="diagonal"
                    colors={{ first: "secondary", second: "secondary" }}
                    intensity="10"
                    blurAmount="3xl"
                />

                <div className="relative">
                    <SectionTitle title="Blog" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {posts.map((post) => (
                            <div key={post.slug} className="border p-4 rounded-lg shadow-lg">
                                <h2 className="text-xl font-bold">{post.frontMatter.title}</h2>
                                <p className="text-gray-600">{post.frontMatter.date}</p>
                                <p className="mt-2">{post.frontMatter.excerpt}</p>
                                {/* Link bileşeni ile yönlendirme */}
                                <Link href={`/blog/${post.slug}`}>
                                    <a className="text-blue-500 hover:underline">
                                        Devamını Oku →
                                    </a>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectsPage;
