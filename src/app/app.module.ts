import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { InputBoxComponent } from './components/input-box/input-box.component';
import { InputSubmitComponent } from './components/input-submit/input-submit.component';
import { CcInputBoxComponent } from './components/cc-input-box/cc-input-box.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    InputBoxComponent,
    InputSubmitComponent,
    CcInputBoxComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
