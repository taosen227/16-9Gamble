import { Component, OnInit } from '@angular/core';
import {
  NbDialogService,
  NbTreeGridHeaderCellDefDirective,
} from '@nebular/theme';
import { EnterNameComponent } from '../component/enter-name/enter-name.component';
import { HowComponent } from '../component/how/how.component';
import { ReferenceComponent } from '../component/reference/reference.component';
import { LV100Battles } from '../model/LV100';
import { player } from '../model/player';

@Component({
  selector: 'app-lv100',
  templateUrl: './lv100.component.html',
  styleUrls: ['./lv100.component.scss'],
})
export class LV100Component implements OnInit {
  Battles = LV100Battles;
  players: player[] = [];
  allMoney: any[] = [];
  allData: any[] = [];
  settlementMoney:any[] = [];
  constructor(private dialogService: NbDialogService) {}

  ngOnInit(): void {
    // this.players = [
    //   {
    //     name:"123",
    //     id:1
    //   },
    //   {
    //     name:"123",
    //     id:2
    //   },
    //   {
    //     name:"123",
    //     id:3
    //   },
    //   {
    //     name:"123",
    //     id:4
    //   },
    // ];
    // this.generateAllData();
    this.dialogService.open(EnterNameComponent).onClose.subscribe(res => {
      this.players = res;
      this.generateAllData();
    })
  }

  generateAllData() {
    this.Battles.forEach((Battle) => {
      let playerInfos: any[] = [];
      let moneyInfos: any[] = [];
      this.players.forEach((player) => {
        let playerInfo = {
          playerName: player.name,
          sessions: [
            {
              session: 1,
              money: 0,
            },
            {
              session: 2,
              money: 0,
            },
          ],
        };
        playerInfos.push(playerInfo);

        let moneyInfo = {
          playerName: player.name,
          totalMoney: 0,
        };
        moneyInfos.push(moneyInfo);
      });
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
    this.players.forEach(x => {
      let settlement = 0;
      this.settlementMoney.push(settlement);
    });
  }

  Calc() {
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
            if (i === player) {
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
        }
      }
    }
    for(let i = 0;i<this.settlementMoney.length;i++){
      let settlement = 0;
      this.allMoney.forEach((Battle) => {
        settlement += Battle.moneyInfos[i].totalMoney
      });
      this.settlementMoney[i] = settlement;
    }
  }
  
  openHow(){
    this.dialogService.open(HowComponent)
  }
  
  openReference(){
    this.dialogService.open(ReferenceComponent)
  }
}
