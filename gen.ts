import * as fs from "fs";

import { CodeGenerator } from "@himenon/openapi-typescript-code-generator";
import * as Templates from "@himenon/openapi-typescript-code-generator/dist/templates";
import type * as Types from "@himenon/openapi-typescript-code-generator/dist/types";
import * as yaml from "js-yaml";

const main = async () => {
  // const oasDoc: Types.OpenApi.Document = await fetch("https://raw.githubusercontent.com/cloudflare/api-schemas/main/openapi.yaml").then(async v => {
  //   return yaml.load(await v.text()) as Types.OpenApi.Document
  // })

  const oasDoc = './openapi.yaml'
  const codeGenerator = new CodeGenerator(oasDoc);

  const apiClientGeneratorTemplate: Types.CodeGenerator.CustomGenerator<Templates.FunctionalApiClient.Option> = {
    generator: Templates.CurryingFunctionalApiClient.generator,
    option: {},
  };

  const code = codeGenerator.generateTypeDefinition([
    codeGenerator.getAdditionalTypeDefinitionCustomCodeGenerator(),
    apiClientGeneratorTemplate,
  ]);

  fs.writeFileSync("src/client.ts", code, { encoding: "utf-8" });
};

main();
