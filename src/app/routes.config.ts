import { FolderComponent } from './folder/folder.component';
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
    component: FolderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'folders',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: FoldersComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':id',
        component: FolderComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
