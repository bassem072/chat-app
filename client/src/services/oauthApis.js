import axios from "axios";

export const googleApi = async (access_token) => {
  return await axios
    .get("https://www.googleapis.com/oauth2/v3/userinfo?alt:json", {
      headers: { Authorization: `Bearer ${access_token}` },
    })
    .then((res) => res.data);
};
