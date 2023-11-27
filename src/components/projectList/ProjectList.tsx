//styles
import "./ProjectList.scss"
//ts
import { ProjectDocument } from "../../interfaces/Collections"


export default function ProjectList({ projects }: { projects: ProjectDocument[] }) {
    return (
        <div>
            {projects.length === 0 && <p>No projects</p>}
            {projects.map((project) => (
                <div key={project.id}>
                    {project.name}
                </div>
            ))}
        </div>
    )
}

