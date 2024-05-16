import { api } from "./@config";

const myChargerApi = {
  async getMyCharger() {
    return api.get("/chargers/my-charger").then((response) => response.data);
  },
  async postMyCharger(data: FormData) {
    return api.post("/chargers", data).then((response) => response.data);
  },
  async getEditMyCharger(chargerId: string) {
    return api
      .get(`/chargers/${chargerId}/edit-from`)
      .then((response) => response.data);
  },
  async patchMyCharger(data: FormData, chargerId: string) {
    return api
      .patch(`/chargers/${chargerId}`, data)
      .then((response) => response.data);
  },
};

export default myChargerApi;
