import axiosClient from "./axiosClient";

export const getEmployees = (cafe?: string) =>
  axiosClient.get(`/employees`, { params: { cafe } });

export const createEmployee = (data: any) =>
  axiosClient.post(`/employees`, data);

export const updateEmployee = (id: string, data: any) =>
  axiosClient.put(`/employees/${id}`, data);

export const deleteEmployee = (id: string) =>
  axiosClient.delete(`/employees/${id}`);
