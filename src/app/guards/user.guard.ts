import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, take } from 'rxjs/operators';
import {AuthenticationService} from "../services/authentication.service";

export const userGuard: CanActivateFn = () => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  return authService.getUserType().pipe(
    take(1),
    map(userType => {
      if (userType === 'user') {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
