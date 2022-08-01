import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(members: any, searchText: String): any {
    if(members==[] || searchText==""){
      return members;
    }
    return (members.filter((member:any)=>{
      return member.name.toLowerCase().includes(searchText.toLowerCase())||
      member.email.toLowerCase().includes(searchText.toLowerCase())||
      member.role.toLowerCase().includes(searchText.toLowerCase());
    }))
  }

}
