import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MemberDataService } from './services/member-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'prop-mng';
  addPropertyModal: boolean = false;
  deletePropertyModal: boolean = false;
  currProperties: any;
  currPage: number = 1;
  id: any;
  status: string = 'LOADING...';
  searchText: string = '';
  selectAll: boolean = false;

  properties: any;

  totalPages:any;

  constructor(private memberDataService: MemberDataService) {
  }

  async initData(){
    this.status = 'LOADING...';
    (await this.memberDataService.getData()).subscribe((data: any) => {
      data.forEach((member: any) => {
        member.isSelected = false;
      });
      this.properties = data;
      console.log(this.properties);
      this.totalPages = Math.ceil(this.properties.length/10);
      if(this.currPage>this.totalPages) {
        this.currPage = this.totalPages;
      }
      this.currProperties = this.properties.slice((this.currPage * 10)-10, (this.currPage * 10));
      this.id = this.properties[this.properties.length-1].Id;
      this.status = '';
    });
  }

  async ngOnInit() {
    await this.initData();
  }


  async deleteProperty(id: number) {
    this.status = 'DELETING...';
  }

  openModel(modal: string) {
    if(modal === 'addProperty') {
      this.addPropertyModal = true;
    } else if(modal === 'deleteProperty') {
      this.deletePropertyModal = true;
    }
  }

  gotoPage(page: number) {
    if(page>0 && page<=this.totalPages) {
    this.currProperties = this.properties.slice((page * 10)-10, (page * 10));
    console.log(this.currProperties);
    this.currPage = page;
  }
  if(this.properties?.length==0){
    console.log('no properties');
    this.currProperties = [];
  }
  }

  closeModal(){
    this.addPropertyModal = false;
    this.deletePropertyModal = false;
  }

  sortProp(){
    let sortedProps = this.properties;

    sortedProps.sort((a: any, b: any)=>{

      console.log(a.size>b.size);
      return a.size-b.size;
    }
    );
    console.log(sortedProps);
    this.currProperties = sortedProps.slice((this.currPage * 10)-10, (this.currPage * 10)-1);
  }

  getCounter(pages: Number){
    // let counter = [];
    // for(let i=1; i<=pages; i++){
    //   counter.push(i);
    // }
    // return counter;
    return new Array(pages);
  }

  filterSearch(){
    if(this.searchText==''){
      this.currProperties = this.properties.slice((this.currPage * 10)-10, (this.currPage * 10));
    }else{
      let filteredProps = this.properties.filter((prop: any)=>{
        return prop.name.toLowerCase().includes(this.searchText.toLowerCase())||
        prop.email.toLowerCase().includes(this.searchText.toLowerCase())||
        prop.role.toLowerCase().includes(this.searchText.toLowerCase());
      }
      );
      this.currProperties = filteredProps.slice((this.currPage * 10)-10, (this.currPage * 10));
  }
  }
}
