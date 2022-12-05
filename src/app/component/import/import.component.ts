import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {
  @Input() settlementMoney:any[] = [];
  @Input() players:any[] = [];
  importMoney:any[] = [];
  constructor(private dialogRef:NbDialogRef<ImportComponent>) { }

  ngOnInit(): void {
    console.log(this.settlementMoney)
    for(let i = 0 ;i<this.settlementMoney.length;i++){
      this.importMoney.push(0)
    }
  }

  import(){
    for(let i = 0 ; i<this.settlementMoney.length;i++){
      this.settlementMoney[i] = this.settlementMoney[i] + parseInt(this.importMoney[i]);
    }
    let res = {
      settlementMoney:this.settlementMoney,
      success:true,
      importMoney:this.importMoney
    }
    this.dialogRef.close(res);
  }
}
