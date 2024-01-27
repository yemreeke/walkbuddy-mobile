import { IApiResponse, ILoginResponse, IUserDto } from 'interfaces/API';
import API from './Instance';
import { IOrderBuyResponse, IPastOrderItem, IProduct } from 'interfaces/Market';
import { ILastStepItem } from 'interfaces/Steps';
import { ILastIbanTransfer } from 'interfaces/Wallet';


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

export const API_GetProducts = async () => {
  const response = await API.GET<IApiResponse<IProduct[]>>("products/list");
  return response;
}
export const API_GetCurrentStep = async () => {
  const response = await API.GET<IApiResponse<{ step_count: number, coin_count: number }>>("steps/getCurrentStep");
  return response;
}


export const API_EnterStep = async (step: string | number) => {
  const response = await API.POST<IApiResponse<null>>("steps/incUserSteps", { step });
  return response;
}

export const API_GetSevenDayStatistic = async () => {
  const response = await API.GET<IApiResponse<{ dayOfWeek: string, count: number }[]>>("steps/lastSevenDayList");
  return response;
}

export const API_GetLastDaySteps = async () => {
  const response = await API.GET<IApiResponse<ILastStepItem[]>>("steps/allUserSteps");
  return response;
}


export const API_IBANTransfer = async (coin: number) => {
  const response = await API.POST<IApiResponse<null>>("iban/transfer", { coin });
  return response;
}
export const API_GetIbanTransfers = async () => {
  const response = await API.GET<IApiResponse<ILastIbanTransfer[]>>("iban/listTransfers");
  return response;
}

export const API_CreateOrder = async (product_id: number) => {
  const response = await API.POST<IApiResponse<IOrderBuyResponse>>("orders/create", { product_id });
  return response;
}


export const API_GetMarketOrders = async () => {
  const response = await API.GET<IApiResponse<IPastOrderItem[]>>("orders/list");
  return response;
}

