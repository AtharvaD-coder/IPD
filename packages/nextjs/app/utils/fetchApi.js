import axios from 'axios';





export const baseUrl = 'https://bayut.p.rapidapi.com';

export const fetchApi = async (url) => {

  // const key = process.env.NEXT_PUBLIC_RAPID_API_KEY;
  const { data } = await axios.get((url), {
    headers: {
      'x-rapidapi-host': 'bayut.p.rapidapi.com',
      'x-rapidapi-key': '875b42d1a1msh44d222730697bc8p1f1be8jsn2dd81069c7d1' ,
    },
  });
    
  return data;
}
