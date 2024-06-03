import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userguardGuard: CanActivateFn = (route, state) => {
  let router = inject(Router)
    if(sessionStorage.getItem("user_type") != "User"){
      alert("unauthenticated user.!")
      sessionStorage.clear()
      router.navigate(['/login'])
      return false;
    }
  return true;
};
