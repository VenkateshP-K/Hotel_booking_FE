import BookedRooms from "../Components/BookedRooms";
import { instance, protectedInstance } from "./instance";

const userServices = {

    getMe: async () => {
        return await protectedInstance.get("/users/me");
    },
    register : async (username, email, password, location) => {
            return await instance.post("/users",
                 { username, email, password, location });
    },
    login : async (email, password) => {
        return await instance.post("/users/login", { email, password });
    },
    logout: async () => {
        return await instance.post("/users/logout");
    },
    bookedRooms : async () => {
        return await protectedInstance.get("/users/bookedRooms");
    },
    updateMe: async (userId, profile) => {
        return await protectedInstance.put(`/users/update/${userId}`, profile);
    }
}

export default userServices;