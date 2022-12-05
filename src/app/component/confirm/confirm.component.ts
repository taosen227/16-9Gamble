import { Component, OnInit,Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  @Input() content:string = ""
  constructor(private dialogRef:NbDialogRef<ConfirmComponent>) { }

  ngOnInit(): void {
  }
  confirm(){
    this.dialogRef.close(true);
  }
  cancel(){
    this.dialogRef.close(false);
  }
}
