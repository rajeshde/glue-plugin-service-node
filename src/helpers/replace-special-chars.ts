
export const replaceSpecialChars =
  (str: string): string =>
    str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

export const replaceRouteName =
  (str: string): string =>
    str.replace(/[^a-zA-Z0-9\-_]/g, '').toLowerCase();
