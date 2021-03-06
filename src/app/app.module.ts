import { firebaseConfig, firebaseAuthConfig } from './firebase.config';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { LoginComponent } from './login/login.component';
import { FolderComponent } from './folder/folder.component';
import { routes } from './routes.config';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { FoldersComponent } from './folders/folders.component';
import { ReceiptComponent } from './receipt/receipt.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FolderComponent,
    FoldersComponent,
    ReceiptComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    RouterModule.forRoot(routes)
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
