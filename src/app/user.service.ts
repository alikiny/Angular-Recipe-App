import { Injectable,EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  info={
    id:'Unknown',
    name:'Unknown'
  }

  changeEvent = new EventEmitter<any>()


 

  constructor() { 
  }
  
  
}
