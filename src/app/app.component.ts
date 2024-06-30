import { Component, OnInit } from '@angular/core';
import { CountriesService } from './services/countries.service';
import { StatesService } from './services/states.service';
import { CitiesService } from './services/cities.service';
import { UsersService } from './services/users.service';
import { UsersListResponse } from './types/users-list-response';
import { retry, take } from 'rxjs';
import { IUser } from './interfaces/user/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { IDialogConfirmationData } from './interfaces/dialog-confirmation-data.interface';
import { UpdateUserService } from './services/update-user.service';
import { UserFormRawValueService } from './services/user-form-raw-value.service';
import { convertUserFormToUser } from './utils/convert-user-form-to-user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public isInEditMode: boolean = false;
  public enableSaveButton: boolean = false;
  public userFormUpdated: boolean = false;

  public userSelectedIndex!: number | undefined;
  public userSelected: IUser = {} as IUser;
  public usersList: UsersListResponse = [];

  constructor(
    private readonly _usersService: UsersService,
    private readonly _updateUserService: UpdateUserService,
    private readonly _userFormRawValueService: UserFormRawValueService,
    private readonly _matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  onSaveButton(): void {
    const data: IDialogConfirmationData = {
      title: 'Confirmar alteração de dados',
      message: 'Deseja realmente salvar os valores alterados?',
    };

    this.openConfirmationDialog(data, (value: boolean) => {
      if (!value) return;

      this.saveUserInfos();

      this.isInEditMode = false;
      this.userFormUpdated = false;
    })
  }

  onEditButton(): void {
    this.isInEditMode = true;
  }

  onFormStatusChange(formStatus: boolean) {
    setTimeout(() => (this.enableSaveButton = formStatus), 0);
  }

  onUserFormFirstChange(): void {
    this.userFormUpdated = true;
  }

  onCancelButton(): void {
    if (this.userFormUpdated) {
      const data: IDialogConfirmationData = {
        title: 'O Formulário foi alterado',
        message:
          'Deseja realmente cancelar as alterações feitas no formulário?',
      };

      this.openConfirmationDialog(data, (value: boolean) => {
        if (!value) return;

        this.userFormUpdated = false;
        this.isInEditMode = false;
      });
    } else {
      this.isInEditMode = false;
    }
  }

  onUserSelected(userIndex: number): void {
    const userFound = this.usersList[userIndex];

    if (userFound) {
      this.userSelectedIndex = userIndex;
      this.userSelected = structuredClone(userFound);
    }
  }

  getUsers(): void {
    this._usersService
      .getUsers()
      .pipe(take(1))
      .subscribe({
        next: (users: UsersListResponse) => {
          this.usersList = users;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  private openConfirmationDialog(
    data: IDialogConfirmationData,
    callback: (value: boolean) => void
  ): void {
    const dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
      data
    });

    dialogRef.afterClosed().subscribe(callback);
  }

  private saveUserInfos(): void {
    const newUser: IUser = this.convertUserFormToUser()

    this._updateUserService.updateUser(newUser).subscribe((newUserResponse: IUser) => {
      if (this.userSelectedIndex === undefined) return;

      this.usersList [this.userSelectedIndex] = newUserResponse;
    })
  }

  private convertUserFormToUser(): IUser {
    console.log(this._userFormRawValueService.userFormRawValue);

    console.log(convertUserFormToUser(this._userFormRawValueService.userFormRawValue))

    return {} as IUser;
  }
}
