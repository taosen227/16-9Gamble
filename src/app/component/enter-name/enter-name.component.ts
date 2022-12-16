import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Gamble } from 'src/app/model/Gamble';
import { player } from 'src/app/model/player';
import { EnterNameService } from './enter-name.service';

@Component({
  selector: 'app-enter-name',
  templateUrl: './enter-name.component.html',
  styleUrls: ['./enter-name.component.scss'],
})
export class EnterNameComponent implements OnInit {
  @Input() LV100:boolean = true;
  player: number = 0;
  selectplayer: number = 0;
  players: player[] = [];
  input: boolean = false;
  recorder: string = '';
  options = [
    { value: true, label: '輸入參加者資訊' },
    { value: false, label: '讀取場次資料' },
  ];
  option: boolean = true;
  allGamble: Gamble[] = [];
  gambleSelect: number = 0;
  export:string[] = [];
  constructor(
    private dialogRef: NbDialogRef<EnterNameComponent>,
    private enterNameService: EnterNameService
  ) {}

  ngOnInit(): void {
    this.enterNameService.getAllGamble(this.LV100).subscribe((res) => {
      this.allGamble = res;
    });
  }

  generate() {
    if (this.selectplayer == 99) {
      this.input = true;
      this.selectplayer = 0;
      return;
    } else {
      if (!this.input) {
        this.player = this.selectplayer;
      }
      this.players = [];
      for (let i = 1; i <= this.player; i++) {
        let player = { name: '' };
        this.players.push(player);
      }
    }
  }

  confirm() {
    let index = 0;
      this.players.forEach(player => {
        this.export[index] = player.name;
        index++;
      });
    if(this.option){
      let LV:number = 100;
      if(this.LV100){
        LV = 100;
      }
      else{
        LV = 110;
      }
      let gamble = {
        id: 0,
        gambleDate: new Date(),
        recorder: this.recorder,
        lv:LV
      };
      this.enterNameService.addGamble(gamble).subscribe((res) => {
        console.log(this.export)
        let Out = {
          players: this.export,
          gambleId: res,
        };
        this.dialogRef.close(Out);
      });
    }
    else{
      let GambleId = this.allGamble[this.gambleSelect].id
      this.dialogRef.close(GambleId);
    }
  }
}
