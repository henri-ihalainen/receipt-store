import { ReceiptsComponent } from './receipts/receipts.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard.service';

export const routes = [
  {
    path: '',
    component: ReceiptsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
