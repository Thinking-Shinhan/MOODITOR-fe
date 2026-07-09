const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!apiBaseUrl) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL이 없습니다');
}

export const env = {
  apiBaseUrl: apiBaseUrl.replace(/\/$/, ''),
};
