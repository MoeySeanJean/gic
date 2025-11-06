const baseURL = import.meta.env.DATA_URL || "http://localhost:3000";

export const getLogo = (logoUrl: string) => {
  return `${baseURL}${logoUrl}`;
}