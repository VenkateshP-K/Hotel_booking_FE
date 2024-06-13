import { protecteInstance } from "./instance";

const hotelServices = {
    getAllHotels: async () => {
        const response = await protectedInstance.get("/hotels");
        return response.data;
    },
    getBookedRooms: async () => {
        const response = await protectedInstance.get("/bookedRooms");
        return response.data;
    },
    //updatehotel
    updateHotel : async (hotelId,updateData) => {
        console.log(updateData);
        const response = await protectedInstance.put(`/hotels/${hotelId}`, updateData);
        return response.data;
    },

    //delete hotel
    deleteHotel : async (hotelId) => {
        const response = await protectedInstance.delete(`/hotels/${hotelId}`);
        return response.data;
    }
};
export default hotelServices