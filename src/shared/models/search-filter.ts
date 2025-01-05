export class SearchFilter{
  constructor(
    public fromStationId: number,
    public toStationId: string,
    public date: string,
    public time: string,
    public isArrivalTime: boolean,
    public maxConnections: number,
  ) {
  }
}
