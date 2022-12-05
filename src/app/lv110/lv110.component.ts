import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ClipboardService } from 'ngx-clipboard';
import { EnterNameComponent } from '../component/enter-name/enter-name.component';
import { HowComponent } from '../component/how/how.component';
import { ImportComponent } from '../component/import/import.component';
import { ReferenceComponent } from '../component/reference/reference.component';
import { LV110Battles } from '../model/LV110';
import { player } from '../model/player';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
@Component({
  selector: 'app-lv110',
  templateUrl: './lv110.component.html',
  styleUrls: ['./lv110.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(500)
      ]),
      transition('* => void', [
        animate(500, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class LV110Component implements OnInit {
  Battles = LV110Battles;
  players: player[] = [];
  allMoney: any[] = [];
  allData: any[] = [];
  settlementMoney:any[] = [];
  crazy:boolean = false;
  crazyNumber:number = 0;
  crazyMoney:number[]=[];
  calcCompeleted:boolean = false;
  importMoney:any[]=[];
  beforeMoney:any[]=[];
  constructor(private dialogService: NbDialogService,private cliboardApi:ClipboardService,
    private toastrService:NbToastrService) {}

  ngOnInit(): void {
    let test = false;
    if(test){
      this.players = [
        {
          name:"123",
          id:1
        },
        {
          name:"123",
          id:2
        },
        {
          name:"123",
          id:3
        },
        {
          name:"123",
          id:4
        },
      ];
      this.generateAllData();
    }
    else{
      this.dialogService.open(EnterNameComponent).onClose.subscribe(res => {
        this.players = res;
        this.generateAllData();
      })
    }
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
            {
              session: 3,
              money: 0,
            }
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
            if(this.allData[battles].playerInfos[player].sessions[session].money < 0){
              this.toastrService.warning("金額不可以輸入負數，請重新輸入");
              break;
            }
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
    this.beforeMoney = [];
    this.importMoney = [];
    this.calcCompeleted = true;
  }
  
  crazyCalc(){
    this.crazyMoney = [];
    this.crazy = true;
    this.settlementMoney.forEach(money => {
      this.crazyMoney.push(money*this.crazyNumber)
    });
  }

  copy(crazy:boolean){
    let copystring:string = "";
    let crazyCopystring:string = "";
    for(let i = 0 ; i < this.players.length;i++){
      let winOrLose = "";
      let money = 0;
      let crazyMoney = 0;
      if(this.settlementMoney[i] < 0){
        winOrLose = "輸了";
        money = (this.settlementMoney[i] - this.settlementMoney[i] - this.settlementMoney[i]);
        if(this.crazy){
          crazyMoney = money * this.crazyNumber;
        }
      }
      else{
        winOrLose = "贏了";
        money = this.settlementMoney[i];
        if(this.crazy){
          crazyMoney = money * this.crazyNumber;
        }
      }
      copystring += this.players[i].name + winOrLose + money.toString() + " ";
      crazyCopystring += this.players[i].name + winOrLose + crazyMoney.toString() + " ";
    }
    if(crazy){
      this.cliboardApi.copyFromContent(crazyCopystring);
      this.toastrService.success("複製倍數後結果成功");
    }
    else{
      this.cliboardApi.copyFromContent(copystring);
      this.toastrService.success("複製成功");
    }
  }

  openHow(){
    this.dialogService.open(HowComponent)
  }
  
  openReference(){
    this.dialogService.open(ReferenceComponent)
  }

  Deactivate(){
    if(this.allData[1]){
      return confirm("是否切換頁面")
    }
    else{
      return true
    }
  }

  import(){
    this.dialogService.open(ImportComponent,{
      context:{
        settlementMoney:this.settlementMoney,
        players:this.players
      }
    }).onClose.subscribe(res => {
      if(res.success){
        this.beforeMoney = this.settlementMoney;
        this.settlementMoney = res.settlementMoney;
        this.importMoney = res.importMoney
      }
    })
  }
}
