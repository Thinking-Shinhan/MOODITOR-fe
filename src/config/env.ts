export const env = {
  apiBaseUrl:
    process.env.NEXT_PUBLIC_API_URL ??
    (() => {
      throw new Error('NEXT_PUBLIC_API_URL이 없습니다');
    })(),
};
