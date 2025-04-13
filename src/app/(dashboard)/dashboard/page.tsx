import * as React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createProject } from "../../../actions/create-project";
import { createService } from "../../../actions/create-service";
import { createIncident } from "../../../actions/create-incident";
import { updateServiceStatus } from "../../actions/update-service-status";
import { getProjects } from "../../../data/get-projects";
import { updateIncidentStatusFromForm } from "@/actions/update-incident-status";
import { createUser } from "@/lib/createUser";


export default async function DashboardPage() {
  const { userId } = await auth();

  // Redirect to sign-in page if the user is not authenticated
  if (!userId) {
    redirect("/sign-in");
  }

  // Sync user to database if not exists
  await createUser();

  // Fetch projects data
  const projects = await getProjects();

  return (
    <div className="p-6 max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold">Welcome to your Dashboard!</h1>
      <p className="text-muted-foreground">
        You are successfully authenticated 🎉
      </p>

      {/* ✅ Project Creation Form */}
      <form action={createProject} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Project Name"
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Create Project
        </button>
      </form>
      {/* ✅ List of Projects */}
      <div className="pt-6 space-y-4">
        <h2 className="font-semibold text-lg">Your Projects</h2>

        {projects.length === 0 ? (
          <p className="text-sm text-muted-foreground">No projects yet.</p>
        ) : (
          <ul className="space-y-6">
            {projects.map((project) => (
              <li key={project.id} className="border p-4 rounded space-y-4">
                <div>
                  <h3 className="font-medium text-xl">{project.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    Created: {new Date(project.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* ✅ Services Section */}
                <div>
                  <h4 className="font-semibold">Services</h4>
                  {project.services.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No services added yet.
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {project.services.map((service) => (
                        <li key={service.id}>
                          <form
                            action={updateServiceStatus}
                            className="flex items-center gap-2"
                          >
                            <input
                              type="hidden"
                              name="serviceId"
                              value={service.id}
                            />
                            <strong>{service.name}</strong> —{" "}
                            <select
                              name="status"
                              defaultValue={service.status}
                              className="border rounded p-1 text-sm"
                            >
                              <option value="operational">Operational</option>
                              <option value="degraded">Degraded</option>
                              <option value="down">Down</option>
                              <option value="maintenance">Maintenance</option>
                            </select>
                            <button
                              type="submit"
                              className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                            >
                              Update
                            </button>
                          </form>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* ✅ Add Service Form */}
                  <form action={createService} className="space-y-2 pt-2">
                    <input type="hidden" name="projectId" value={project.id} />
                    <input
                      type="text"
                      name="name"
                      placeholder="New Service Name"
                      required
                      className="w-full p-2 border rounded text-sm"
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
                    >
                      Add Service
                    </button>
                  </form>
                </div>

                {/* ✅ Incidents Section */}
                <div>
                  <h4 className="font-semibold">Incidents</h4>
                  {project.incidents.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No incidents reported.
                    </p>
                  ) : (
                    <ul className="pl-4 list-disc text-sm">
                      {project.incidents.map((incident) => (
                        <li
                          key={incident.id}
                          className="flex items-center gap-2"
                        >
                          <form
                            action={updateIncidentStatusFromForm}
                            className="flex items-center gap-2"
                          >
                            <input
                              type="hidden"
                              name="incidentId"
                              value={incident.id}
                            />
                            <strong>{incident.title}</strong> —{" "}
                            <select
                              name="status"
                              defaultValue={incident.status}
                              className="border rounded p-1 text-sm"
                            >
                              <option value="open">Open</option>
                              <option value="monitoring">Monitoring</option>
                              <option value="resolved">Resolved</option>
                            </select>
                            <button
                              type="submit"
                              className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 text-sm"
                            >
                              Update
                            </button>
                          </form>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* ✅ Add Incident Form */}
                  <form action={createIncident} className="space-y-2 pt-2">
                    <input type="hidden" name="projectId" value={project.id} />
                    <input
                      type="text"
                      name="title"
                      placeholder="Incident title"
                      required
                      className="w-full p-2 border rounded text-sm"
                    />
                    <textarea
                      name="description"
                      placeholder="Incident description"
                      required
                      className="w-full p-2 border rounded text-sm"
                    />
                    <button
                      type="submit"
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition"
                    >
                      Report Incident
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
