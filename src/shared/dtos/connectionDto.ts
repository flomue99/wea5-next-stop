import {SubConnectionDto} from './subConnectionDto';

export class ConnectionDto {
  constructor(
    public subConnections: SubConnectionDto[]
  ) {
  }
}
