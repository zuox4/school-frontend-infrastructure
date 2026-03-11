import { createContext } from "react";
import type { UserState } from "../types/services";

export const UserContext = createContext<UserState | null>(null);
