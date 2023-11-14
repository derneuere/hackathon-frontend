import {
  generateSchemaTypes,
  generateReactQueryComponents,
} from "@openapi-codegen/typescript";
import { defineConfig } from "@openapi-codegen/cli";
export default defineConfig({
  datenbrauerei: {
    from: {
      relativePath: "./src/assets/datenbrauerei-api.json",
      source: "file",
    },
    outputDir: "./src/client",
    to: async (context) => {
      const filenamePrefix = "datenbrauerei";
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix,
      });
      await generateReactQueryComponents(context, {
        filenamePrefix,
        schemasFiles,
      });
    },
  },
});
