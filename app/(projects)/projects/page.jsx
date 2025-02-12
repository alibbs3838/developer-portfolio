import React from 'react';
import { motion } from 'framer-motion';
import BackgroundEffects from '@/components/ui/background-effects';
import SectionTitle from './components/SectionTitle';
import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Blog Sayfası
const ProjectsPage = ({ postsData }) => {
  return (
    <section className="py-16" id="projects">
      <div className="container mx-auto px-6 md:px-64">
        <BackgroundEffects
          variant="diagonal"
          colors={{ first: 'secondary', second: 'secondary' }}
          intensity="10"
          blurAmount="3xl"
        />
        <div className="relative">
          <SectionTitle title="Blog" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {postsData.map((post) => (
              <div key={post.slug} className="border p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold">{post.frontMatter.title}</h2>
                <p className="text-gray-600">{post.frontMatter.date}</p>
                <p className="mt-2">{post.frontMatter.excerpt}</p>
                <Link href={`/projects/${post.slug}`}>
                  <a className="text-blue-500 hover:underline">Devamını Oku →</a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Dinamik yolları almak için getStaticPaths
export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = await fs.readdir(postsDirectory);

  const paths = filenames.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));

  return { paths, fallback: false };
}

// Sayfa için veriyi getiren getStaticProps
export async function getStaticProps({ params }) {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filePath = path.join(postsDirectory, `${params.slug}.md`);
  const fileContent = await fs.readFile(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  const processedContent = await remark().use(html).process(content);

  return {
    props: {
      postsData: [
        {
          frontMatter: data,
          slug: params.slug,
          contentHtml: processedContent.toString(),
        },
      ],
    },
  };
}

export default ProjectsPage;
