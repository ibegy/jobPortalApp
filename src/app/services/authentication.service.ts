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

  // Register a new user with email, password, and role
  register(email: string, password: string, role: 'user' | 'company') {
    return this.afAuth.createUserWithEmailAndPassword(email, password).then((result) => {
      return this.firestore.collection('users').doc(result.user?.uid).set({
        email,
        role,
        uid: result.user?.uid,
      });
    });
  }

  // Log in an existing user
  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Log out the current user
  logout() {
    return this.afAuth.signOut().then(() => this.router.navigate(['/login']));
  }

  // Get the user type (role) of the currently logged-in user
  getUserType(): Observable<'user' | 'company' | null> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          // Retrieve the role field from Firestore
          return this.firestore
            .collection('users')
            .doc(user.uid)
            .valueChanges()
            .pipe(map((data: any) => data?.role || null));  // Retrieve the 'role' field
        } else {
          // Return an observable with `null` if no user is logged in
          return of(null);
        }
      })
    );
  }
}
