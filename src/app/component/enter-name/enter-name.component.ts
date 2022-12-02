import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { player} from 'src/app/model/player';

@Component({
  selector: 'app-enter-name',
  templateUrl: './enter-name.component.html',
  styleUrls: ['./enter-name.component.scss'],
})
export class EnterNameComponent implements OnInit {
  player: number = 0;
  players: player[] = [];
  constructor(private dialogRef: NbDialogRef<EnterNameComponent>) {}

  ngOnInit(): void {}

  generate() {
    this.players = [];
    for (let i = 1; i <= this.player; i++) {
      let player = { id: i, name: '' };
      this.players.push(player);
    }
  }

  confirm() {
    this.dialogRef.close(this.players);
  }
}
