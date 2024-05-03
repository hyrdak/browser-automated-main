
export interface RequestUpdatePasswordBody {
  email: string
  password: string
  token: string
  data?:{
    [x:string]:string
  }
}

export interface RequestUpdatePasswordData {

}
