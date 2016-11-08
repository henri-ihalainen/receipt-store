import { ReceiptsComponent } from './receipts/receipts.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard.service';
import { FoldersComponent } from './folders/folders.component';

export const routes = [
  {
    path: '',
    redirectTo: 'folders',
    pathMatch: 'full'
  },
  {
    path: 'receipts',
    component: ReceiptsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'folders',
    component: FoldersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
