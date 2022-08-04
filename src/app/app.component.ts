import { Component } from '@angular/core';
import { MemberDataService } from './services/member-data.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  addPropertyModal: boolean = false;
  deletePropertyModal: boolean = false;
  currUsers: any;
  currPage: number = 1;
  id: any;
  searchText: string = '';
  selectAll: boolean = false;
  faTrash = faTrash;
  users: any;

  totalPages:any;
  currSort: string = '';
  sortOrder: string = '';

  constructor(private memberDataService: MemberDataService) {
  }

  async initData(){
    (await this.memberDataService.getData()).subscribe((data: any) => {
      data.forEach((member: any) => {
        member.isSelected = false;
      });
      this.users = data;
      this.totalPages = Math.ceil(this.users.length/10);
      if(this.currPage>this.totalPages) {
        this.currPage = this.totalPages;
      }
      this.currUsers = this.users.slice((this.currPage * 10)-10, (this.currPage * 10));
      this.id = this.users[this.users.length-1].Id;
    });
  }

  async ngOnInit() {
    await this.initData();
  }


  async deleteProperty(id: number) {
    this.users = this.users.filter((prop: any) => {
      return prop.id != id;
    })
    this.totalPages = Math.ceil(this.users.length/10);
    if(this.currPage>this.totalPages) {
      this.currPage = this.totalPages;
    }
    this.currUsers = this.users.slice((this.currPage * 10)-10, (this.currPage * 10));
  }


  gotoPage(page: number) {
    if(page>0 && page<=this.totalPages) {
    this.currUsers = this.users.slice((page * 10)-10, (page * 10));
    console.log(this.currUsers);
    this.currPage = page;
  }
  if(this.users?.length==0){
    console.log('no properties');
    this.currUsers = [];
  }
  }


  sortUsers(sortProp: string){
    if(this.currSort==sortProp){
      this.sortOrder = this.sortOrder=='asc'?'desc':'asc';
    }else{
      this.sortOrder = 'asc';
    }
    this.currSort = sortProp;
    this.users.sort((a: any, b: any) => {
      if(a[sortProp] < b[sortProp]){
        return this.sortOrder == 'asc' ? -1 : 1;
      }else if(a[sortProp] > b[sortProp]){
        return this.sortOrder == 'asc' ? 1 : -1;
      }else{
        return 0;
      }
    }
    );
    this.currUsers = this.users.slice((this.currPage * 10)-10, (this.currPage * 10));
  }

  getCounter(pages: Number){
    return new Array(pages);
  }

  filterSearch(){
    if(this.searchText==''){
      this.currUsers = this.users.slice((this.currPage * 10)-10, (this.currPage * 10));
    }else{
      let filteredProps = this.users.filter((prop: any)=>{
        return prop.name.toLowerCase().includes(this.searchText.toLowerCase())||
        prop.email.toLowerCase().includes(this.searchText.toLowerCase())||
        prop.role.toLowerCase().includes(this.searchText.toLowerCase());
      }
      );
      this.currUsers = filteredProps.slice((this.currPage * 10)-10, (this.currPage * 10));
  }
  }

  deleteMultiple(){
    this.selectAll = false;
    let delIds:any = [];
    console.log(this.users);
    console.log(this.currUsers);

    this.currUsers.map((prop: any)=>{
      if(prop.isSelected){
        delIds.push(Number(prop.id));
      }
    });

    this.users = this.users.filter((prop: any)=>{
      return !(delIds.includes(Number(prop.id)));
    });

    this.totalPages = Math.ceil(this.users.length/10);
    if(this.currPage>this.totalPages) {
      this.currPage = this.totalPages;
    }
    this.currUsers = this.users.slice((this.currPage * 10)-10, (this.currPage * 10));

  }

  selectAllUsers(){
    this.selectAll = !this.selectAll;
    this.currUsers.map((prop: any)=>{
      prop.isSelected = this.selectAll;
    }
    );
  }
}
