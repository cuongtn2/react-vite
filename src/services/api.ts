import axios from "services/axios.customize";

export const registerApi = ({
  fullName,
  email,
  password,
  phone,
}: {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}) => {
  const urlBackend = "/api/v1/user/register";
  return axios.post<IBackendRes<IRegister>>(urlBackend, {
    fullName,
    email,
    password,
    phone,
  });
};

export const loginApi = (username: string, password: string) => {
  const urlBackend = "/api/v1/auth/login";
  return axios.post<IBackendRes<ILogin>>(urlBackend, { username, password });
};
