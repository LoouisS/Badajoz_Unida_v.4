import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyEventsRoutingModule } from './my-events-routing.module';
import { MyEventsComponent } from './my-events/my-events.component';
import {SharedModule} from "../../shared/shared.module";
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    MyEventsComponent
  ],
  imports: [
    CommonModule,
    ToastModule,
    MyEventsRoutingModule,
    SharedModule
  ]
})
export class MyEventsModule { }
