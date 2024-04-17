import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IUser } from '../../interfaces/user/user.interface';

@Component({
  selector: 'app-user-informations-container',
  templateUrl: './user-informations-container.component.html',
  styleUrl: './user-informations-container.component.scss'
})
export class UserInformationsContainerComponent implements OnChanges {
  @Input({ required: true }) userSelected: IUser | undefined = {} as IUser;
  @Input({ required: true }) isInEditMode: boolean = false;

  public currentTabIndex: number = 0;

  ngOnChanges(_: SimpleChanges): void {
    this.currentTabIndex = 1;
  }
}
