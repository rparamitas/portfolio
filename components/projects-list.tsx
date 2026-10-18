import Image from "next/image";
import Link from "next/link";

import { Projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Shared list of project case studies. The home page shows a featured subset
// (limit) while /projects lists everything with the same alternating layout.
const ProjectsList = ({ limit }: { limit?: number }) => {
  const items = limit ? Projects.slice(0, limit) : Projects;

  return (
    <div className="flex flex-col gap-y-8">
      {items.map((project) => (
        <div
          key={project.id}
          className={cn(
            "my-6 flex w-full flex-row items-center justify-center gap-x-8 gap-y-6 md:my-0 md:gap-y-0",
            project.id % 2 === 0
              ? "flex-col md:flex-row"
              : "flex-col md:flex-row-reverse",
          )}
        >
          <div className="w-[400px] flex-1">
            {project.image &&
              (Array.isArray(project.image) ? (
                <Image src={project.image[0]} alt={project.title} />
              ) : (
                <Image src={project.image} alt={project.title} />
              ))}
          </div>
          <div className="flex flex-1 flex-col gap-y-4 text-center md:text-start">
            <p className="text-3xl font-bold">{project.title}</p>
            <div className="flex flex-row justify-center gap-x-2 md:justify-start">
              {project.category?.map((item) => (
                <Badge key={item} variant={"default"}>
                  {item}
                </Badge>
              ))}
            </div>
            <p className="mx-8 text-pretty md:mx-0">{project.description}</p>
            {project.link && (
              <Button
                className="w-fit self-center md:self-start"
                variant="secondary"
              >
                <Link href={project.link}>Go to view</Link>
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsList;
