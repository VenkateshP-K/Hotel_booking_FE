import { protectedInstance } from "./instance";

const roomServices = {
    //get all rooms
    getRooms: async () => {
        const response = await protectedInstance.get("/rooms");
        return response.data;
    },

    //create room
    createRoom: async (roomData) => {
        const response = await protectedInstance.post("/rooms",roomData);
        return response.data;
    },
 
     //book a room
     bookRoom: async (roomId) => {
        const response = await protectedInstance.post(`/rooms/book/${roomId}`);
        return response.data;
     },
     //unbookRoom
     unbookRoom: async (roomId) => {
        const response = await protectedInstance.post(`/rooms/unbook/${roomId}`);
        return response.data;
     },

     //update room
     updateRoom: async (roomId, roomData) => {
        const response = await protectedInstance.put(`/rooms/${roomId}`, roomData);
        return response.data;
     },
       
     //delete room
     deleteRoom: async (roomId) => {
        const response = await protectedInstance.delete(`/rooms/${roomId}`);
        return response.data;
     } 
};
export default roomServices;