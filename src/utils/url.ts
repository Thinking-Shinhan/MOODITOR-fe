export const getFileNameFromUrl = (url: string) => {
  try {
    const pathname = new URL(url).pathname;
    return pathname.split('/').pop() || url;
  } catch {
    return url;
  }
};
