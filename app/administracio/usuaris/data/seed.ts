import fs from "fs";
import path from "path";
import { fakerES as faker } from "@faker-js/faker";
import { Access, Rol } from "./data";

function generateRandomDNI(): string {
  const dniLetters = "TRWAGMYFPDXBNJZSQVHLCKE";
  const randomNumber = Math.floor(Math.random() * 90000000) + 10000000;
  const letterIndex = randomNumber % 23;
  const letter = dniLetters[letterIndex];
  return `${randomNumber}${letter}`;
}

const users = Array.from({ length: 100 }, () => {
  const id = faker.string.uuid();
  const nif = generateRandomDNI();
  const nom = faker.person.fullName();
  const avatar = faker.image.avatar();
  const email = faker.internet.email();
  const rol = faker.helpers.enumValue(Rol);
  const empresa =
    rol !== Rol.Estudiant && rol !== Rol.Admin && rol !== Rol.Tecnic
      ? faker.company.name()
      : null;
  const access = faker.helpers.enumValue(Access);
  return {
    id,
    nif,
    avatar,
    nom,
    email,
    rol,
    empresa,
    access,
  };
});

fs.writeFileSync(
  path.join(__dirname, "users.json"),
  JSON.stringify(users, null, 2)
);

console.log("✅ Users data generated.");
