import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import BackgroundEffects from 'components/ui/background-effects'; // Corrected quotes
import SectionTitle from './components/SectionTitle.jsx';

export const metadata = {
  title: 'Projeler',
  description: 'Tüm projelerim burada listeleniyor.',
};

// Markdown dosyalarını okuyup veriyi alalım
async function getProjectsData() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  const postsData = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);

    return {
      frontMatter: data,
      slug: filename.replace('.md', ''),
    };
  });

  return postsData;
}

// Static Params
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => ({
    slug: filename.replace('.md', ''),
  }));
}

// Projeler Sayfası
const ProjectsPage = async () => {
  const postsData = await getProjectsData();

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
          <SectionTitle title="Projelerim" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {postsData.map((post) => (
              <div key={post.slug} className="border p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold">{post.frontMatter.title}</h2>
                <p className="text-gray-600">{post.frontMatter.date}</p>
                <p className="mt-2">{post.frontMatter.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="text-blue-500 hover:underline">
                  Devamını Oku →
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
