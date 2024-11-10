import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  register(email: string, password: string, userType: 'user' | 'company') {
    return this.afAuth.createUserWithEmailAndPassword(email, password).then((result) => {
      return this.firestore.collection('users').doc(result.user?.uid).set({
        email,
        userType,
        uid: result.user?.uid,
      });
    });
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
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
            .pipe(map((data: any) => data.userType));
        } else {
          return [null];
        }
      })
    );
  }
}
