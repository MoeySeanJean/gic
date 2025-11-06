import axiosClient from "./axiosClient";

export const getCafes = (location?: string) =>
  axiosClient.get(`/cafes`, { params: { location } });

export const createCafe = (data: FormData) =>
  axiosClient.post(`/cafes`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateCafe = (id: string, data: FormData) =>
  axiosClient.put(`/cafes/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteCafe = (id: string) =>
  axiosClient.delete(`/cafes/${id}`);
