import { FolderComponent } from './folder/folder.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard.service';
import { FoldersComponent } from './folders/folders.component';
import { ReceiptComponent } from './receipt/receipt.component';

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
      },
      {
        path: ':folder',
        children: [
          {
            path: '',
            component: FolderComponent,
          },
          {
            path: ':receipt',
            component: ReceiptComponent
          }
        ]
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
