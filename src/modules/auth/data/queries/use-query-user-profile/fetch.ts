
import { FetcherResponse } from "interfaces/fetcher";
import axiosInstance from "utils/fetcher";
import { getAuth } from "helpers/auth";

import { GetAdminUserProfileResponseData } from "./interfaces";

const getUserProfile = async (): Promise<
  FetcherResponse<GetAdminUserProfileResponseData>> => {
  const { data: responseData } = await axiosInstance.get<
    FetcherResponse<GetAdminUserProfileResponseData>
  >('/auth/v1/user')

  return responseData
}

export default getUserProfile
