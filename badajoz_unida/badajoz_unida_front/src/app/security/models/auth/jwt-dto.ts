export class JwtDto {
  token: string;


  constructor(token: string | null) {
    this.token = token;
  }
}
