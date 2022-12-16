import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gamble } from 'src/app/model/Gamble';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnterNameService {

  constructor(private http:HttpClient) { }

  url = environment.url;

  getAllGamble(LV100:boolean){
    const connectUrl = this.url + "Gamble/GetGambles";
    const param = {
      LV100:LV100
    }
    return this.http.get<Gamble[]>(connectUrl,{params:param});
  }

  addGamble(Gamble:Gamble){
    const connectUrl = this.url + "Gamble/AddGamble";
    return this.http.post<number>(connectUrl,Gamble);
  }
}
