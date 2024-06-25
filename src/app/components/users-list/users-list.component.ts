import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsersListResponse } from '../../types/users-list-response';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  @Input({ required: true }) usersList: UsersListResponse = [];
  @Input({ required: true }) isInEditMode: boolean = false;

  @Output('onUserSelected') onUserSelectedEmitt = new EventEmitter<number>();

  public userSelectedIndex!: number | undefined;

  onUserSelected(userIndex: number) {
    if (this.isInEditMode) return;

    this.userSelectedIndex = userIndex;
    this.onUserSelectedEmitt.emit(userIndex);
  }

}
