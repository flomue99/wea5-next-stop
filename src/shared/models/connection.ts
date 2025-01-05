import {SubConnection} from './subConnection';

export class Connection {
  constructor(
    public subConnections: SubConnection[]
  ) {
  }
}
