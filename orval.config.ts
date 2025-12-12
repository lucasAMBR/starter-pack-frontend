import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: {
      target: "./swagger.json",
    },
    output: {
      mode: "tags-split",
      target: "src/api/generated/endpoints.ts",
      schemas: "src/api/schemas",
      client: "react-query",
      override: {
        mutator: {
          path: "./src/lib/axios-instance.ts",
          name: "customInstance",
        },
      },
    },
    hooks: {
      afterAllFilesWrite: "biome format --write",
    },
  },
  zod: {
    input: {
      target: "./swagger.json",
    },
    output: {
      mode: "tags-split",
      target: "src/api/generated/zod",
      client: "zod",
      fileExtension: ".zod.ts",
    },
  },
});
