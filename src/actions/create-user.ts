'use server'

import { createUser } from "../lib/createUser";

export async function createUserAction() {
  await createUser();
}
