import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { PipesModule } from '../../pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalsModule } from '../../components/modals/modals.module';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    PipesModule,
    ReactiveFormsModule,
    ModalsModule,
    ToastModule,
    ConfirmDialogModule,
    TooltipModule,
  ],
})
export class ProfileModule { }
