import { readFile, writeFile } from "fs/promises";
import path from "path";

const contentDatabasePath = path.join(process.cwd(), "src", "lib", "content-db.json");

export async function getContent() {
  const contentFile = await readFile(contentDatabasePath, "utf8");

  return JSON.parse(contentFile);
}

export async function saveContent(content) {
  await writeFile(contentDatabasePath, `${JSON.stringify(content, null, 2)}\n`, "utf8");
}

export async function saveContentSection(section, value) {
  const content = await getContent();
  content[section] = value;
  await saveContent(content);

  return content;
}
