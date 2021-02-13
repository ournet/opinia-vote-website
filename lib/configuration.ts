import { readFileSync } from "fs";
import * as path from "path";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

export interface Configuration {
  /** main */
  port: number;
  host: string;
  database_url: string;
  redis_url: string;
  environment: string;
  isProduction: boolean;
  isDevelopment: boolean;
  isTest: boolean;
  isLocal: boolean;

  /** test */
  ci: boolean;
  env_config_test: string;

  /** dev */

  /** social */
  facebook_id: string;
  facebook_secret: string;
}

let configuration: Configuration;

const envsToInclude: (keyof Configuration)[] = [
  "ci",
  "database_url",
  "env_config_test",
  "redis_url",
  "port",
  "facebook_id",
  "facebook_secret",
];

function readJson(readPath: string) {
  try {
    const data = readFileSync(readPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    if (
      error.code !== "ENOENT" ||
      (error.errno !== -4058 && error.errno !== -2)
    ) {
      throw error;
    }
  }
  return {};
}

function read(file: string): Configuration {
  const filePath = path.resolve(__dirname, "..", "config", `${file}.json`);
  return readJson(filePath);
}

function assignEnv(config: Configuration): Configuration {
  const newConfig: Configuration = config;
  envsToInclude.forEach((key) => {
    const lc = key.toLowerCase() as keyof Configuration;
    const uc = key.toUpperCase();
    (newConfig[lc] as unknown) = process.env[uc] ?? config[lc];
  });
  return newConfig;
}

function loadEnvironmentSpecific(config: Configuration, environment: string) {
  let newConfig = config;
  if (environment) {
    const conf = read(environment);
    if (conf) {
      newConfig = {
        ...newConfig,
        ...conf,
      };
    }
  }
  return newConfig;
}

// const isTrue = (value: string | boolean | number) =>
//   [true, "true", "1", "True", "yes", "Yes", 1].indexOf(value) > -1;

// const ensureInteger = (
//   fields: (keyof Configuration)[],
//   config: Configuration
// ) =>
//   fields.forEach((field) => {
//     const value = config[field];
//     if (typeof value === "string") {
//       config[field] = parseInt(value, 10) as never;
//     }
//   });

function load() {
  const nodeEnv = process.env.NODE_ENV || "";

  // load default config
  let config = read("default");

  // load local config
  config = loadEnvironmentSpecific(config, "local");

  // load environment specific config
  config = loadEnvironmentSpecific(config, nodeEnv);

  // load config from env variables
  config = assignEnv(config);

  config.environment = nodeEnv || "local";
  config.isProduction = nodeEnv === "production";
  config.isDevelopment = nodeEnv === "development";
  config.isTest = nodeEnv === "test";
  config.isLocal = !nodeEnv;

  config.ci = !!(config.ci || process.env.CIRCLECI);

  return config;
}

export function get() {
  if (!configuration) {
    configuration = load();
  }
  return configuration;
}

configuration = load();

export default configuration;
