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
    getBookedRooms: async () => {
        try {
            const response = await protectedInstance.get("/users/bookedRooms");
            console.log("Raw API response:", response.data);
            return response.data; // Should already be in the format { bookings: [...] }
        } catch (error) {
            console.error("Error in getBookedRooms service:", error);
            throw error;
        }
    },
    updateMe: async (userId, profile) => {
        return await protectedInstance.put(`/users/update/${userId}`, profile);
    },
    
    //get all users
    getAllUsers: async () => {
        const response = await protectedInstance.get("/users");
        return response.data.users;
    },
}

export default userServices;