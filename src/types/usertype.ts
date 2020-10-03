export interface User{
  uno: number             
  name: String  
  password: String
  email: String
  roles: String
  createdAt: Date
  updatedAt: Date
}

export interface Token{
  email: String
  sub: String
}

export interface SignupInput{
  name: String
  email: String
  password: String
}

export interface LoginInput{
  email: String
  password: String
}
