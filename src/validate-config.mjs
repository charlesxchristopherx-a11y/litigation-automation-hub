import { readFile } from "node:fs/promises";

const configPath = process.argv[2] ?? "config/tracking.example.json";
const raw = await readFile(configPath, "utf8");
const config = JSON.parse(raw);

const requiredTopLevel = [
  "version",
  "timezone",
  "spreadsheetIdEnv",
  "requiredSheets",
  "automations",
  "forbiddenDependencies"
];

const problems = [];
for (const key of requiredTopLevel) {
  if (!(key in config)) problems.push(`Missing top-level key: ${key}`);
}

const requiredSheets = [
  "DASHBOARD",
  "CASES",
  "UPCOMING DEADLINES",
  "DOCKET HISTORY",
  "ALERTS GENERATED",
  "CASE INVENTORY",
  "EXCEPTIONS",
  "SYNC LOG",
  "FILING MAILING WATCH",
  "SOURCE MAPPINGS",
  "Leads",
  "Contacts",
  "Follow-Ups",
  "Activity Log",
  "Intake Records",
  "Lists & Rules"
];

for (const sheet of requiredSheets) {
  if (!config.requiredSheets?.includes(sheet)) {
    problems.push(`Missing required sheet: ${sheet}`);
  }
}

for (const automation of config.automations ?? []) {
  if (automation.owner !== "ChatGPT") {
    problems.push(`Automation ${automation.key ?? "(unnamed)"} is not ChatGPT-owned`);
  }
}

const normalized = raw.toLowerCase();
for (const hostname of config.forbiddenDependencies ?? []) {
  const count = normalized.split(String(hostname).toLowerCase()).length - 1;
  if (count > 1) {
    problems.push(`Operational configuration still references forbidden hostname: ${hostname}`);
  }
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

console.log(`Validated ${config.requiredSheets.length} required sheets and ${config.automations.length} ChatGPT-owned automations.`);
