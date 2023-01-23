const prompts = require("prompts");
import { GlueStackPlugin } from "..";
import { PluginInstance } from "../PluginInstance";
import IInstance from "@gluestack/framework/types/plugin/interface/IInstance";

import { relative, join } from "node:path";
import { reWriteFile } from "../helpers/rewrite-file";
import { replaceSpecialChars } from "../helpers/replace-special-chars";
import { copyToTarget } from "../helpers/copy-to-target";
import { getDirectories } from "../helpers/get-directories";
import { fileExists } from "../helpers/file-exists";

export const functionsAttachAction = (program: any, glueStackPlugin: GlueStackPlugin) => {
  program
    .command("function:attach-action")
    .description("Adds a graphql action against the function")
    .action(async () => handler(glueStackPlugin));
};

const selectInstance = async (pluginInstances: IInstance[]) => {
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
};

const selectFunction = async (functions: string[]) => {
  const choices = functions.map((_function: string) => {
    return {
      title: _function,
      value: _function
    };
  });

  const { value } = await prompts({
    type: "select",
    name: "value",
    message: "Select a function",
    choices: choices,
  });

  return value;
};

const writeAction = async (pluginInstance: PluginInstance) => {
  const functionsPath: string = join(
    process.cwd(),
    pluginInstance.getInstallationPath(),
    'functions'
  );

  if (!await fileExists(functionsPath)) {
    console.error(`No functions found in ${relative('.', functionsPath)}. Please add one and try again!`);
    return;
  }

  const directories: string[] = await getDirectories(functionsPath);
  if (!directories.length) {
    console.error(`No functions found in ${relative('.', functionsPath)}. Please add one and try again!`);
    return;
  }

  const functionName: string = await selectFunction(directories);
  const functionPath: string = join(functionsPath, functionName);
  if (!await fileExists(functionPath + '/handler.js')) {
    console.error(`Missing "handler.js" file in "${relative('.', functionPath)}". Please add one and try again!`);
    return;
  }

  await copyToTarget(
    pluginInstance.callerPlugin.getActionTemplateFolderPath(),
    functionPath
  );

  const actionGQLfile = `${functionPath}/action.graphql`;
  await reWriteFile(actionGQLfile, replaceSpecialChars(functionName), 'actionName');
};

export async function handler(glueStackPlugin: GlueStackPlugin) {
  if (glueStackPlugin.getInstances().length) {
    const instance = await selectInstance(glueStackPlugin.getInstances());
    if (instance) {
      await writeAction(instance);
    }
  } else {
    console.error("No service instances found");
  }
}
