// src/actions/index.ts
'use server';

// Project Actions
export { createProject } from './create-project';
export { getProjects } from '../data/get-projects';

// Service Actions
export { createService } from './create-service';
export { updateServiceStatus } from './update-service-status';

// Incident Actions
export { createIncident } from './create-incident';
export { updateIncidentStatusFromForm } from './update-incident-status';

// User Actions
export { createUserAction as createUser } from './create-user';