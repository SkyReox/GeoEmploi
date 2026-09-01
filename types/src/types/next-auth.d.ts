import type { Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      name: string;
      email: string;
    };
  }
  interface User {
    role: Role;
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    role: Role;
  }
}