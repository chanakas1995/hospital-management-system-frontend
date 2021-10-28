import httpService from "./http.service";

export default {
  getAll: () => httpService.get("admissions"),
  find: (patientUuid) => httpService.get(`admissions/${patientUuid}`),
  save: (payload) => {
    const data = {
      ...payload,
      branch: { id: payload.branch },
      ward: { id: payload.ward },
      patient: { id: payload.patient },
    };
    return httpService.post("admissions", data);
  },
  update: (patientUuid, payload) => {
    const data = {
      ...payload,
      branch: { id: payload.branch },
      ward: { id: payload.ward },
      patient: { id: payload.patient },
    };
    return httpService.put(`admissions/${patientUuid}`, data);
  },
  delete: (patientUuid) => httpService.delete(`admissions/${patientUuid}`),
};
