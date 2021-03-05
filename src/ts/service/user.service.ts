import axios from 'axios';
import { AxiosPromise } from 'axios';
 
class UserService {
 
   private readonly URL = 'https://jsonblob.com/api/jsonBlob/'
 
   constructor() { }
 
   public getUsers(): AxiosPromise {
       return axios.get(this.URL + 'c8fe8dad-7d60-11eb-b747-13b83fd5b196');
   }
 
}
 
export default UserService;