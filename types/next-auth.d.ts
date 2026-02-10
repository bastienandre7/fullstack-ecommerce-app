import { UserRole } from "@prisma/client";
import { type DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole; // Ici il peut être obligatoire car on l'injecte nous-mêmes
    } & DefaultSession["user"];
  }

  // C'est ici qu'il faut être prudent
  interface User {
    role?: UserRole; // Rends-le optionnel avec le '?' pour ne pas casser l'adaptateur
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: UserRole;
    id?: string;
  }
}
