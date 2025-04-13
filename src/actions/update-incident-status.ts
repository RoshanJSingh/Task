// src/actions/update-incident-status.ts
'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function updateIncidentStatusFromForm(formData: FormData) {
  const incidentId = formData.get('incidentId')?.toString();
  const status = formData.get('status')?.toString();

  if (!incidentId || !status) {
    throw new Error('Missing incidentId or status');
  }

  const validStatuses = ['open', 'monitoring', 'resolved'];
  if (!validStatuses.includes(status)) {
    throw new Error(`Invalid status: ${status}`);
  }

  await db.incident.update({
    where: { id: incidentId },
    data: { status },
  });

  revalidatePath('/dashboard'); // Add this line
}