import axios from "axios";

const backend = 'https://73bvkwko2e.execute-api.us-east-1.amazonaws.com/PawFinderBeta';


const helpers = {
    getPetFeed: async () => {
        const response = await axios.get(`${backend}/petfeed`);
        return response.data.body;
    },
    reportLostPet: async (obj) => {
        const response = await axios.post(`${backend}/report`, obj);
        return response.data.statusCode;
    },
    findLostPets: async (obj) => {
        const response = await axios.post(`${backend}/findLostPets`, obj);
        return response.data.body;
    },
    reportSighting: async (obj) => {
        const response = await axios.post(`${backend}/sighting`, obj);
        return response.data;
    },
    confirmIdentity: async (obj) => {
        const response = await axios.post(`${backend}/retrieveposts`, obj);
        return response.data;
    },
    disablePost: async (obj) => {
        const response = await axios.post(`${backend}/disablepost`, obj);
        return response.data;
    },
    reportFoundPet: async (obj) => {
        const response = await axios.post(`${backend}/found-pet-form`, obj);
        return response.data;
    },
    getFoundPets: async (obj) => {
        const response = await axios.get(`${backend}/get-found-pets`);
        return response.data;
    }
}

export default helpers;