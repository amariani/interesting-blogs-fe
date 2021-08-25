import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async ({ title, author, url }) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.post(baseUrl, { title, author, url }, config);
  return response.data;
};

const like = async (blogInfo) => {
  const { id, user, likes, author, title, url } = blogInfo;

  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.put(
    `${baseUrl}/${id}`,
    {
      user: user.id,
      likes: likes + 1,
      author,
      title,
      url,
    },
    config
  );

  return response.data;
};

const deleteEntry = async (blogInfo) => {
  const { id } = blogInfo;
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

export default { getAll, create, like, deleteEntry, setToken };
