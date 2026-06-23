import { readFile, writeFile } from "fs/promises";
import path from "path";

const usersDatabasePath = path.join(process.cwd(), "src", "lib", "users-db.json");

export async function getUsers() {
  const usersFile = await readFile(usersDatabasePath, "utf8");

  return JSON.parse(usersFile);
}

export async function saveUsers(users) {
  await writeFile(usersDatabasePath, `${JSON.stringify(users, null, 2)}\n`, "utf8");
}

export async function findUserByUsername(username) {
  const users = await getUsers();

  return users.find((user) => user.username === username);
}
