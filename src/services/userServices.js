import { instance,protectedInstance } from "./instance";

//define the user services
const userServices = {
    //register user
    register : async (username,email,password,location) => {
        return await instance.post("/users",{username,email,password,location});
},

    //login user
    login : async (email,password) => {
        return await instance.post("/users/login",{email,password},
            {withCredentials: true}
        );
    },

    //get the current logged in user
    getCurrentUser : async () => {
        return await protectedInstance.get("/users/me");
    },

    //logout user
    logout : async () => {
        return await protectedInstance.post("/users/logout");
    },

    //update user
    updateUserById : async (userId,userData) => {
        return await protectedInstance.put(`/users/update/${userId}`,userData);
    }
}

//export the user services
export default userServices;