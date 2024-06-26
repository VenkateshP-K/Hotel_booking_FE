import { instance, protectedInstance } from "./instance";

const userServices = {
    getMe: async () => {
        return await protectedInstance.get("/users/me");
    },
    register: async (username, email, password, location) => {
        return await instance.post("/users", { username, email, password, location });
    },
    login: async (email, password) => {
        const response = await instance.post("/users/login", { email, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response;
    },
    logout: async () => {
        try {
          await protectedInstance.post("/users/logout");
          // Clear any local storage items if needed
          localStorage.removeItem('token');
        } catch (error) {
          console.error('Logout error:', error);
          throw error;
        }
      },
    bookedRooms: async () => {
        return await protectedInstance.get("/users/bookedRooms");
    },
    updateMe: async (userId, profile) => {
        return await protectedInstance.put(`/users/update/${userId}`, profile);
    }
}

export default userServices;