type TUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  gender: string;
  picture: string;
  age: number;
  role: string | null;
  refreshToken: string | null;
};

export default TUser;
