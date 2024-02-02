let API_URL = 'http://localhost:8080/api/vehiculos';

const obtenerVehiculosPaginadas = async (page, size) => {
   const params = {
        page: page,
        size: size
   };

   try {
      const response = await axios.get(`${API_URL}/page`, { params });
      return response.data;
   } catch (error) {
      throw error;
   }
};

postVehiculos = async (vehiculo) => {
   try {
      const response = await axios.post(API_URL, vehiculo);
      console.log(response.data);
   } catch (error) {
      console.error(error);
   }
}
