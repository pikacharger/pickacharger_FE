import { api } from "./@config";

const mypageApi = {
    async logout() {
        try {
            const response = await api.post(`/user/logout`);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    async editUserInfo(newUserInfo: FormData) {
        console.log(newUserInfo);
        try {
            const response = await api.patch(`/user/updateUser`, newUserInfo, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    async deleteUser() {
        try {
            const response = await api.delete("/user");
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
};

export default mypageApi;
