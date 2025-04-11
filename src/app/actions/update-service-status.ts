'use server';

import { db } from '../../lib/db';
import { revalidatePath } from 'next/cache';

export async function updateServiceStatus(formData: FormData) {
  const serviceId = formData.get('serviceId') as string;
  const status = formData.get('status') as string;

  if (!serviceId || !status) {
    throw new Error('Missing data');
  }

  await db.service.update({
    where: { id: serviceId },
    data: { status },
  });

  revalidatePath('/dashboard');
}
