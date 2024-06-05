import { protectedInstance } from "./instance";

const adminServices  = {
   //create hotel
   createHotel: async (hotelData) => {
      const response = await protectedInstance.post("/hotels",hotelData)
      return response
   },
   //update hotel
   updateHotel: async (hotelId) => {
      const response = await protectedInstance.put(`/hotels/${hotelId}`)
      return response
   },
   //delete hotel
   deleteHotel: async (hotelId) => {
      const response = await protectedInstance.delete(`/hotels/${hotelId}`)
      return response
   },

   //create room
   createRoom: async () => {
      const response = await protectedInstance.post("/rooms")
      return response
   },
   //update room
   updateRoom: async (roomId) => {
      const response = await protectedInstance.put(`/rooms/${roomId}`)
      return response
   },
   //delete room
   deleteRoom: async (roomId) => {
      const response = await protectedInstance.delete(`/rooms/${roomId}`)
      return response
   },

   //delete user
   deleteUser: async (userId) => {
      const response = await protectedInstance.delete(`/user/${userId}`)
      return response
}
}
export default adminServices;