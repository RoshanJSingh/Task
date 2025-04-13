'use client';

import * as React from "react";
import { useState } from "react";

interface CreateProjectFormProps {
  organizations: { id: string; name: string }[];
  onSubmit: (name: string, organizationId: string) => void;
}

export function CreateProjectForm({ organizations, onSubmit }: CreateProjectFormProps) {
  const [name, setName] = useState("");
  const [organizationId, setOrganizationId] = useState(organizations[0]?.id || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, organizationId);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-8">
      <div>
        <label className="block font-medium">Project Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-3 py-2 rounded w-full"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Organization</label>
        <select
          value={organizationId}
          onChange={(e) => setOrganizationId(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        >
          {organizations.map((org) => (
            <option key={org.id} value={org.id}>
              {org.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create Project
      </button>
    </form>
  );
}
