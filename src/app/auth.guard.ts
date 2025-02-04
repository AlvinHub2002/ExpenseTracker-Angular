import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { take, map, tap, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      filter(user => user !== null), // Ensure user data is not null
      take(1),
      map(user => !!user), // Check if user is authenticated
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          console.log('Access denied, redirecting to login...');
          this.router.navigate(['/login']); // Redirect to landing page if not authenticated
        }
      })
    );
  }
}
