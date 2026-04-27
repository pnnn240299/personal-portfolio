import SEO from '../../../src/frontend/components/SEO';
import { RevealLinks } from '../../../src/frontend/components/common/RevealLinks';
import { projectsService, type Project } from '../../../src/services';
import ProjectsCarousel from './ProjectsCarousel';

export const metadata = {
  title: 'Projects',
  description: 'Explore my portfolio of innovative web development projects.',
};

export default async function ProjectsPage() {
  let projects: Project[] = [];
  let error: string | null = null;

  try {
    projects = await projectsService.getAllProjects();
  } catch (err) {
    error = `Failed to load projects: ${err}`;
    console.error(error);
  }

  return (
    <>
      <SEO
        title="Projects"
        description="Welcome to my portfolio website. I'm a Full Stack Developer specializing in modern web technologies."
        path="/projects"
      />
      <section className="relative grid min-h-screen w-full place-content-center overflow-hidden">
        <h2 className="relative z-0 text-[14vw] font-black text-neutral-800 md:text-[200px]">
          PROJECTS<span className="text-orange-500">.</span>
        </h2>
      </section>

      {error ? (
        <section className="py-20 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <p className="text-gray-600">Please try again later.</p>
          </div>
        </section>
      ) : (
        <ProjectsCarousel initialProjects={projects} />
      )}

      <RevealLinks />
    </>
  );
}