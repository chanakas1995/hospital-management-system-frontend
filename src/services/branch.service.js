import httpService from "./http.service";

export default {
  getOptions: () => httpService.get("branches/options"),
};
