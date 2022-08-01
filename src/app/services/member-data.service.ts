import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MemberDataService {

  constructor(private http: HttpClient) { }

  async getData()
  {
    let URL = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';
    return this.http.get(URL);
  }

  // async deleteProperty(id: number) {
  //   let URL = '/data/v1/action/deleteOne';
  //   let payload = {
  //     database: 'db',
  //     dataSource: 'Cluster0',
  //     collection: 'properties',
  //     filter: {Id: id}
  //   }

  //   return this.http.post(URL, payload);
  // }

  // async addProperty(id: number, name: string, desc: string, size: string) {
  //   let URL = '/data/v1/action/insertOne';
  //   let payload = {
  //     database: 'db',
  //     dataSource: 'Cluster0',
  //     collection: 'properties',
  //     document: {
  //       Id: id,
  //       Name: name,
  //       desc: desc,
  //       size: size
  //     }
  //   }

  //   return this.http.post(URL, payload);

  // }
}
