import {inject, Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {SnackBarType} from '../models/snack-bar-type';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
 snackBar = inject(MatSnackBar);

  showSnackBarInfo(message:string, action:string='Close', duration: number=3000) {
   this.showSnackBar(message, SnackBarType.Info, action,duration);
 }

  showSnackBarError(message:string, action:string='Close', duration: number=3000) {
    this.showSnackBar(message, SnackBarType.Error, action, duration);
  }

 private showSnackBar(message: string, type: SnackBarType, action: string, duration: number) {
   const config:MatSnackBarConfig = {
     duration,
     panelClass: [type],
     horizontalPosition: 'center',
     verticalPosition: 'bottom'
   }
   this.snackBar.open(message, action, config);
 }


}

