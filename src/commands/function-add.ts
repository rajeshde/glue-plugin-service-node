const prompts = require("prompts");
import { GlueStackPlugin } from "..";
import { PluginInstance } from "../PluginInstance";
import IInstance from "@gluestack/framework/types/plugin/interface/IInstance";

import { join } from "node:path";
import { writeFile } from "../helpers/write-file";
import { createFolder } from "../helpers/create-folder";
import { functionContent } from "../helpers/function-content";
import { replaceRouteName } from "../helpers/replace-special-chars";

export function functionsAdd(program: any, glueStackPlugin: GlueStackPlugin) {
  program
    .command("function:add")
    .description("Adds an express action (handler) to the project")
    .argument(
      '<function-name>',
      'name of the function to be added'
		)
    .action(async (functionName: string) => handler(glueStackPlugin, functionName));
}

export const writeAction = async (pluginInstance: PluginInstance, functionName: string) => {
  const directory: string = join(pluginInstance.getInstallationPath(), 'functions', replaceRouteName(functionName));

  await createFolder(directory);

  await writeFile(
    `${directory}/handler.js`,
    functionContent
  );
};

async function selectInstance(pluginInstances: IInstance[]) {
  const choices = pluginInstances.map((instance: PluginInstance) => {
    return {
      title: instance.getName(),
      description: `Select ${instance.getName()} instance`,
      value: instance,
    };
  });
  const { value } = await prompts({
    type: "select",
    name: "value",
    message: "Select an instance",
    choices: choices,
  });

  return value;
}

export async function handler(glueStackPlugin: GlueStackPlugin, actionName: string) {
  if (glueStackPlugin.getInstances().length) {
    const instance = await selectInstance(glueStackPlugin.getInstances());
    if (instance) {
      await writeAction(instance, actionName);
    }
  } else {
    console.error("No functions.action instances found");
  }
}
