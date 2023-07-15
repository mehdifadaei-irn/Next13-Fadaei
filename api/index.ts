const axios = require("axios");

export interface FilterProps {
  manufacturer?: string;
  year?: number;
  model?: string;
  limit?: number;
  fuel?: string;
}

export async function getCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;
  const options = {
    method: "GET",
    url: "https://cars-by-api-ninjas.p.rapidapi.com/v1/cars",
    params: {
      make: manufacturer,
      year: year,
      model: model,
      limit: limit,
      fuel_type: fuel,
    },
    headers: {
      "X-RapidAPI-Key": "aac03a1827msh5a73f582ad18820p19f84ajsn43dfaa7f197c",
      "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
    },
  };
  try {
    // console.log('helo')
    const response = await axios.request(options);
    return response;
  } catch (error) {
    console.error(error);
  }
}
