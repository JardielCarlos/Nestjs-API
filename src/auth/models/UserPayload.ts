export interface UserPayload {
  sub: number;
  email: String;
  name: String;
  iat?: number;
  exp?: number;
}