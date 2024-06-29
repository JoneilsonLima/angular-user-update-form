import { Injectable } from "@angular/core";
import { IUser } from "../interfaces/user/user.interface";
import { Observable, map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UpdateUserService {

  updateUser(newUser: IUser): Observable<IUser> {
    return new Observable<{ status: number; body: IUser; }>((oberver) => {
      setTimeout(() => {
        oberver.next({
          status: 200,
          body: structuredClone(newUser)
        });
        oberver.complete();
      }, 500)
    }).pipe(
      map((updateUserResponse) => updateUserResponse.body)
    );
  }
}
