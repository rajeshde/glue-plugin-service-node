import { rename } from 'node:fs/promises';

export const renameDirectory = async (oldPath: string, newPath: string) => {
  await rename(oldPath, newPath);
};
