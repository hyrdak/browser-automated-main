import { User } from "interfaces/user"

export interface RequestLoginBody {
  email: string
  password: string
}

export interface RequestLoginResponseData {
  accessToken: string
  refreshToken: string
  user: User

}
