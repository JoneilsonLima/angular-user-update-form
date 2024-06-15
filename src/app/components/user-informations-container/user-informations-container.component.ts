import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IUser } from '../../interfaces/user/user.interface';
import { UserFormController } from './user-form-controller';

@Component({
  selector: 'app-user-informations-container',
  templateUrl: './user-informations-container.component.html',
  styleUrl: './user-informations-container.component.scss'
})
export class UserInformationsContainerComponent extends UserFormController implements OnChanges {
  @Input({ required: true }) userSelected: IUser | undefined = {} as IUser;
  @Input({ required: true }) isInEditMode: boolean = false;

  public currentTabIndex: number = 0;

  ngOnChanges(_: SimpleChanges): void {
    this.currentTabIndex = 0;

    if (this.userSelected) {
      this.fulfillUserForm(this.userSelected);
    }
  }
}
