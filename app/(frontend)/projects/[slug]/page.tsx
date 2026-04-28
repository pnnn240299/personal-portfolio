import { projectsService } from '@/services';
import type { Project } from '@/services';
import SEO from '@/frontend/components/SEO';
import ProjectDetailClient from './ProjectDetailClient';

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  try {
    const project = await projectsService.getProjectById(params.slug);
    return {
      title: project?.title || project?.name || 'Project',
      description: project?.description || 'View this project',
    };
  } catch {
    return {
      title: 'Project',
      description: 'View this project',
    };
  }
}

export default async function ProjectDetailsPage({ params }: ProjectDetailPageProps) {
  let project: Project | null = null;
  let error = null;

  try {
    project = await projectsService.getProjectById(params.slug);
  } catch (err) {
    error = `Failed to load project: ${err}`;
    console.error(error);
  }

  if (!project) {
    return (
      <>
        <SEO
          title="Project Not Found"
          description="This project could not be found."
          path={`/projects/${params.slug}`}
        />
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
            <p className="text-gray-300">{error || 'The project you are looking for does not exist.'}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title={project.title || project.name || 'Project'}
        description={project.description}
        path={`/projects/${params.slug}`}
      />
      <ProjectDetailClient project={project} />
    </>
  );
}
