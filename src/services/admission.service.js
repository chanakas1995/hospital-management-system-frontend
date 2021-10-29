import httpService from "./http.service";

export default {
  getAll: () => httpService.get("admissions"),
  find: (admissionUuid) => httpService.get(`admissions/${admissionUuid}`),
  save: (payload) => {
    const data = {
      ...payload,
      branch: { id: payload.branch },
      ward: { id: payload.ward },
      patient: { id: payload.patient },
    };
    return httpService.post("admissions", data);
  },
  update: (admissionUuid, payload) => {
    const data = {
      ...payload,
      branch: { id: payload.branch },
      ward: { id: payload.ward },
      patient: { id: payload.patient },
    };
    return httpService.put(`admissions/${admissionUuid}`, data);
  },
  delete: (admissionUuid) => httpService.delete(`admissions/${admissionUuid}`),
  discharge: (admissionUuid) =>
    httpService.put(`admissions/discharge/${admissionUuid}`),
  transfer: (admissionUuid, payload) => {
    const data = {
      ward: { id: payload.toWard },
      branch: { id: payload.toBranch },
      patient: { id: payload.patient },
      notes: payload.notes,
    };
    return httpService.post(`admissions/transfer/${admissionUuid}`, data);
  },
};
