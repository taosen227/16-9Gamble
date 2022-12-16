import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ClipboardService } from 'ngx-clipboard';
import { EnterNameComponent } from '../component/enter-name/enter-name.component';
import { HowComponent } from '../component/how/how.component';
import { ImportComponent } from '../component/import/import.component';
import { ReferenceComponent } from '../component/reference/reference.component';
import { LV100Battles } from '../model/LV100';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { Battle } from '../model/Battle';
import { BattleService } from '../shared/battle.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-lv100',
  templateUrl: './lv100.component.html',
  styleUrls: ['./lv100.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(500),
      ]),
      transition('* => void', [
        animate(500, style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class LV100Component implements OnInit {
  Battles = LV100Battles;
  players: string[] = [];
  allMoney: any[] = [];
  allData: any[] = [];
  settlementMoney: number[] = [];
  crazy: boolean = false;
  crazyNumber: number = 0;
  crazyMoney: number[] = [];
  calcCompeleted: boolean = false;
  importMoney: any[] = [];
  beforeMoney: any[] = [];
  gambleId: number = 2;
  loadData: boolean = false;
  constructor(
    private dialogService: NbDialogService,
    private cliboardApi: ClipboardService,
    private toastrService: NbToastrService,
    private battleService:BattleService,
    private router:Router
  ) {}

  ngOnInit(): void {
    let test = false;
    if (test) {
      this.players = ['123', '456', '789', '000'];
      this.generateAllData();
    } else {
      this.open(false);
    }
  }

  protected open(closeOnBackdropClick: boolean) {
    this.dialogService
      .open(EnterNameComponent,{
        context:{
          LV100:this.router.url == "/LV100"
        },
        closeOnBackdropClick
      }).onClose.subscribe((res) => {
        if (typeof res == 'number') {
          this.loadData = true;
          this.gambleId = res;
          this.battleService.getPlayerNames(this.gambleId).subscribe(
            (result) => {
              this.players = result;

              this.battleService.getAllBattle(res).subscribe((result2) => {
                for (let i = 0; i < this.Battles.length; i++) {
                  for (let index = 0; i < result2.length; index++) {
                    if(result2[index].battleName == this.Battles[i].BattleName){
                      this.allData.push(result2[index]);
                      break;
                    }
                  }
                }
              });

              this.battleService.getAllMoney(res).subscribe((result3) => {
                for (let i = 0; i < this.Battles.length; i++) {
                  for (let index = 0; i < result3.length; index++) {
                    if(result3[index].battleName == this.Battles[i].BattleName){
                      this.allMoney.push(result3[index]);
                      break;
                    }
                  }
                }
              });

              this.battleService.getAllSettlementMoney(res).subscribe(result4 => {
                for(let i = 0; i < this.players.length; i++){
                  this.settlementMoney[i]=0
                }
                result4.forEach(data => { 
                  for(let i = 0; i < this.players.length; i++){
                    if(data.playerName == this.players[i]){
                      this.settlementMoney[i]+=data.currentMoney; 
                    }
                  }
                });
                this.calcCompeleted = true;
              })
            }
          );
        } else {
          this.players = res.players;
          this.gambleId = res.gambleId;
          this.generateAllData();
          this.Calc();
          this.calcCompeleted = false;
        }
      });
  }

  generateAllData() {
    this.Battles.forEach((Battle) => {
      let playerInfos: any[] = [];
      let moneyInfos: any[] = [];
      for (let i = 0; i < this.players.length; i++) {
        let playerInfo = {
          playerName: this.players[i],
          sessions: [
            {
              session: 1,
              money: 0,
            },
            {
              session: 2,
              money: 0,
            },
            {
              session: 3,
              money: 0,
            },
          ],
        };
        playerInfos.push(playerInfo);

        let moneyInfo = {
          playerName: this.players[i],
          totalMoney: 0,
        };
        moneyInfos.push(moneyInfo);
      }
      let data = {
        battleName: Battle.BattleName,
        playerInfos: playerInfos,
      };
      this.allData.push(data);

      let moneyData = {
        battleName: Battle.BattleName,
        moneyInfos: moneyInfos,
      };
      this.allMoney.push(moneyData);
    });
    for (let index = 0; index < this.players.length; index++) {
      let settlement = 0;
      this.settlementMoney.push(settlement);
    }
  }

  Calc() {
    let allBattle: Battle[] = [];
    this.allMoney.forEach((Battle) => {
      Battle.moneyInfos.forEach((moneyInfo: any) => {
        moneyInfo.totalMoney = 0;
      });
    });
    for (let battles = 0; battles < this.allData.length; battles++) {
      for (
        let player = 0;
        player < this.allData[battles].playerInfos.length;
        player++
      ) {
        for (
          let session = 0;
          session < this.allData[battles].playerInfos[player].sessions.length;
          session++
        ) {
          for (let i = 0; i < this.allMoney[battles].moneyInfos.length; i++) {
            if (
              this.allData[battles].playerInfos[player].sessions[session]
                .money < 0
            ) {
              this.toastrService.warning('金額不可以輸入負數，請重新輸入');
              break;
            }
            if (i == player) {
              let currentNumber: number = parseInt(
                this.allMoney[battles].moneyInfos[player].totalMoney
              );
              let Number: number =
                currentNumber +
                parseInt(
                  this.allData[battles].playerInfos[player].sessions[session]
                    .money
                ) *
                  -(this.players.length - 1);
              this.allMoney[battles].moneyInfos[player].totalMoney = Number;
            } else {
              let currentNumber: number = parseInt(
                this.allMoney[battles].moneyInfos[i].totalMoney
              );
              let Number: number =
                currentNumber +
                parseInt(
                  this.allData[battles].playerInfos[player].sessions[session]
                    .money
                );
              this.allMoney[battles].moneyInfos[i].totalMoney = Number;
            }
          }
          let battle: Battle = {
            id: 0,
            gambleId: this.gambleId,
            battleName: this.Battles[battles].BattleName,
            playerName: this.players[player],
            session: session + 1,
            money:
              this.allData[battles].playerInfos[player].sessions[session].money,
          };
          allBattle.push(battle);
        }
      }
    }
    for (let i = 0; i < this.settlementMoney.length; i++) {
      let settlement = 0;
      this.allMoney.forEach((Battle) => {
        settlement += Battle.moneyInfos[i].totalMoney;
      });
      this.settlementMoney[i] = settlement;
    }
    this.beforeMoney = [];
    this.importMoney = [];
    this.calcCompeleted = true;
    this.battleService.addAllBattle(allBattle).subscribe((res) => {
      console.log(res)
    });
  }

  crazyCalc() {
    this.crazyMoney = [];
    this.crazy = true;
    this.settlementMoney.forEach((money) => {
      this.crazyMoney.push(money * this.crazyNumber);
    });
  }

  copy(crazy: boolean) {
    let copystring: string = '';
    let crazyCopystring: string = '';
    for (let i = 0; i < this.players.length; i++) {
      let winOrLose = '';
      let money = 0;
      let crazyMoney = 0;
      if (this.settlementMoney[i] < 0) {
        winOrLose = '輸了';
        money =
          this.settlementMoney[i] -
          this.settlementMoney[i] -
          this.settlementMoney[i];
        if (this.crazy) {
          crazyMoney = money * this.crazyNumber;
        }
      } else {
        winOrLose = '贏了';
        money = this.settlementMoney[i];
        if (this.crazy) {
          crazyMoney = money * this.crazyNumber;
        }
      }
      copystring += this.players[i] + winOrLose + money.toString() + ' ';
      crazyCopystring +=
        this.players[i] + winOrLose + crazyMoney.toString() + ' ';
    }
    if (crazy) {
      this.cliboardApi.copyFromContent(crazyCopystring);
      this.toastrService.success('複製倍數後結果成功');
    } else {
      this.cliboardApi.copyFromContent(copystring);
      this.toastrService.success('複製成功');
    }
  }

  openHow() {
    this.dialogService.open(HowComponent);
  }

  openReference() {
    this.dialogService.open(ReferenceComponent);
  }

  Deactivate() {
    if (this.allData[1]) {
      return confirm('是否切換頁面');
    } else {
      return true;
    }
  }

  import() {
    this.dialogService
      .open(ImportComponent, {
        context: {
          settlementMoney: this.settlementMoney,
          players: this.players,
        },
      })
      .onClose.subscribe((res) => {
        if (res.success) {
          this.beforeMoney = this.settlementMoney;
          this.settlementMoney = res.settlementMoney;
          this.importMoney = res.importMoney;
        }
        console.log(this.importMoney);
      });
  }
}
