import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyEventsRoutingModule } from './my-events-routing.module';
import { MyEventsComponent } from './my-events/my-events.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    MyEventsComponent
  ],
  imports: [
    CommonModule,
    MyEventsRoutingModule,
    SharedModule
  ]
})
export class MyEventsModule { }
