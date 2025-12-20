import { useEffect, useState } from "react";
import api from "../../lib/axios";
import EditProjectModal from "./EditProjectModal";
import CreateProjectModal from "./CreateProjectModal";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [editing, setEditing] = useState(null);
const [creating, setCreating] = useState(false);

  const fetchProjects = async () => {
    const res = await api.get("/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProjects();
  }, []);

  const deleteProject = async (id) => {
    await api.delete(`/projects/${id}`);
    fetchProjects();
  };

  return (
    <div>
<div className="flex justify-between items-center mb-6">
  <h2 className="text-2xl font-bold">Projects Dashboard</h2>

  <button
    onClick={() => setCreating(true)}
    className="px-4 py-2 bg-black text-white rounded"
  >
    + Create Project
  </button>
</div>

      <div className="grid grid-cols-2 text-black gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white p-4 rounded shadow space-y-2"
          >
            <h3 className="font-semibold">{project.title}</h3>

            <p className="text-sm text-gray-600 line-clamp-2">
              {project.description?.[0]}
            </p>

            <div className="flex gap-2 pt-2">
              <button
                className="text-blue-600"
                onClick={() => setEditing(project)}
              >
                Edit
              </button>

              <button
                className="text-red-600"
                onClick={() => deleteProject(project._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <EditProjectModal
          project={editing}
          onClose={() => setEditing(null)}
          onSaved={fetchProjects}
        />
      )}
      {creating && (
  <CreateProjectModal
    onClose={() => setCreating(false)}
    onSaved={fetchProjects}
  />
)}

    </div>
  );
};

export default ProjectsPage;
