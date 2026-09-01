import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@geo-emploi.com";
  const password = "changeme123"; // à changer immédiatement après premier login

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log("Admin déjà existant, rien à faire.");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const admin = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: "Admin",
      role: "ADMIN",
    },
  });

  console.log("Admin créé :", admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });