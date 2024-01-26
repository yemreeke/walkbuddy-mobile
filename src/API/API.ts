import { IApiResponse, ILoginResponse, IUserDto } from 'interfaces/API';
import API from './Instance';


export const API_Login = async (params: { email: string, password: string }) => {
  const response = await API.POST<IApiResponse<ILoginResponse>>("user/login", params);
  return response;
}

export const API_Register = async (params: { name: string, surname: string, email: string, password: string }) => {
  const response = await API.POST<IApiResponse<ILoginResponse>>("user/register", params);
  return response;
}
export const API_GetUserInfo = async () => {
  const response = await API.GET<IApiResponse<IUserDto>>("user/self");
  return response;
}

export const API_UpdateProfile = async (params: {
  name: string,
  surname: string,
  email: string,
  iban_no: string,
}) => {
  const response = await API.PUT<IApiResponse<IUserDto>>("user/update", params);
  return response;
}

export const API_ChangePassword = async (params: {
  current_password: string,
  new_password: string,
}) => {
  const response = await API.PUT<IApiResponse<null>>("user/changePassword", params);
  return response;
}


export const API_AccountDelete = async (params: {
  current_password: string,
}) => {
  const response = await API.DELETE<IApiResponse<null>>("user/delete", params);
  return response;
}

