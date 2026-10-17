import { createAuth } from "../auth";

// Export a static instance for Better Auth schema generation.
// This file should only contain this export - importing it at runtime
// will throw due to missing environment variables.
export const auth = createAuth({} as any);
