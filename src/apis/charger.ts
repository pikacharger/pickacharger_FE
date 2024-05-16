import { api } from "./@config";

const chargerApi = {
    async getChargerList(location: string) {
        try {
            const response = await api.get(
                `/chargers?location=${location}`
            );
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    async getChargerDetail(chargerId: number) {
        try {
            const response = await api.get(
                `/chargers/${chargerId}`
            );
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    async deleteCharger(chargerId: number){
        try {
            const response = await api.delete(
                `/chargers/${chargerId}`
            );
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    async getFavoritesCharger() {
        try {
            const response = await api.get(`/favorites`);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    async createFavorite(chargerId : number){
        try {
            const response = await api.post(`/favorites`,{
                "chargerId": chargerId
              });
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    async deleteFavorite(chargerId : number){
        try {
            const response = await api.delete(`/favorites/chargers/${chargerId}`);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
};

export default chargerApi;
