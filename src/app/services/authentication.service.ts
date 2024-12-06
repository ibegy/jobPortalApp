import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    public afAuth: AngularFireAuth,
  ) {}

  register(email: string, password: string, role: 'user' | 'company') {
    return this.afAuth.createUserWithEmailAndPassword(email, password).then((result) => {
      const userData = {
        email,
        role,
        uid: result.user?.uid,
      };

      return this.firestore
        .collection('users')
        .doc(result.user?.uid)
        .set(userData)
        .then(() => {
          this.redirectBasedOnRole();
        });
    });
  }

  async login(email: string, password: string) {
    await this.afAuth
      .signInWithEmailAndPassword(email, password);
    return this.redirectBasedOnRole();
  }
  logout() {
    return this.afAuth.signOut().then(() => this.router.navigate(['/login']));
  }
  getUserType(): Observable<'user' | 'company' | null> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.firestore
            .collection('users')
            .doc(user.uid)
            .valueChanges()
            .pipe(map((data: any) => data?.role || null));  // Retrieve the 'role' field
        } else {
          return of(null);
        }
      })
    );
  }

  private redirectBasedOnRole() {
    this.getUserType().subscribe((role) => {
      if (role === 'user') {
        this.router.navigate(['/user']);
      } else if (role === 'company') {
        this.router.navigate(['/company']);
      }
    });
  }
}
