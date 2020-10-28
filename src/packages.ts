#!/usr/bin/env node

import { readFileSync } from "fs";
import program from "commander";
import { Validator } from "jsonschema";

const cwd: string = process.cwd();
const schemaFilename: string = `${cwd}/package.schema.json`;
const filename: string = `${cwd}/package.json`;
let fileSchema: string | null = null;
let file: string | null = null;

/**
 * Try opening package.json
 */
try {
  file = readFileSync(filename, "utf-8");
  fileSchema = readFileSync(schemaFilename, "utf-8");
} catch (err) {
  console.error(err);
  process.exit();
}

// Convert the file contents to a JSON object
const data = JSON.parse(file);
program.version(data.version);

const v = new Validator();
const schema = JSON.parse(fileSchema);
console.log(v.validate(data, schema));

/**
 * Show deps
 */
console.table(data.dependencies, ["Name", "Version"]);
console.info("dependencies");
console.table(data.dependencies);

console.info("devDependencies");
console.table(data.devDependencies);
