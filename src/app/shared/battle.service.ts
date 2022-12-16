import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Battle } from '../model/Battle';
import { FontEndData, FontEndMoneyData } from '../model/FontEnd';
import { SettlementMoney } from '../model/SettlementMoney';

@Injectable({
  providedIn: 'root'
})
export class BattleService {
  constructor(private http: HttpClient) {}

  url = environment.url;

  getAllBattle(gambleId: number) {
    const connectUrl = this.url + 'Battle/GetBattles';
    const param = {
      GambleId: gambleId,
    };
    return this.http.get<FontEndData[]>(connectUrl, { params: param });
  }

  getAllMoney(gambleId: number){
    const connectUrl = this.url + 'Battle/GetMoneys';
    const param = {
      GambleId: gambleId,
    };
    return this.http.get<FontEndMoneyData[]>(connectUrl, { params: param });
  }

  addAllBattle(allData: Battle[]) {
    const connectUrl = this.url + 'Battle/AddBattle';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(connectUrl, allData, httpOptions);
  }

  getAllSettlementMoney(gambleId: number) {
    const connectUrl = this.url + 'SettlementMoney/GetSettlementMoneys';
    const param = {
      GambleId: gambleId,
    };
    return this.http.get<SettlementMoney[]>(connectUrl, { params: param });
  }

  getPlayerNames(gambleId: number){
    const connectUrl = this.url + 'Battle/GetPlayerNames';
    const param = {
      GambleId: gambleId,
    };
    return this.http.get<string[]>(connectUrl, { params: param });
  }
}
