import Credential from "../entities/Credential";

export interface createUserDto {
  name: string;
  email: string;
  birthday: string;
  nDni: string;
  credentialId: Credential;
}
