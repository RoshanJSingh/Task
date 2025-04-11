'use client';

import { useEffect } from "react";
import { createUserAction } from "../actions/create-user";

export function useOnCreate() {
  useEffect(() => {
    createUserAction();
  }, []);
}
