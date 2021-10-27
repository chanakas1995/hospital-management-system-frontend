import httpService from "./http.service";

export default {
  getAll: () => httpService.get("patients"),
  find: (patientUuid) => httpService.get(`patients/${patientUuid}`),
  save: (payload) => httpService.post("patients", payload),
  update: (patientUuid, payload) =>
    httpService.put(`patients/${patientUuid}`, payload),
  delete: (patientUuid) => httpService.delete(`patients/${patientUuid}`),
};
