import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, take } from 'rxjs/operators';
import {AuthenticationService} from "../services/authentication.service";

export const companyGuard: CanActivateFn = () => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  return authService.getUserType().pipe(
    take(1),
    map(userType => {
      if (userType === 'company') {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
