import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com";

export const fetchApi = async url => {
  // const key = process.env.NEXT_PUBLIC_RAPID_API_KEY;
  const { data } = await axios.get(url, {
    headers: {
      "x-rapidapi-host": "bayut.p.rapidapi.com",
      "x-rapidapi-key": "bb8db35a0emsh01404db27409763p1879e2jsnf0a8c451f0e8",
    },
  });

  return data;
};
