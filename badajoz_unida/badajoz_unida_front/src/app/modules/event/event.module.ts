import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './event/event.component';
import {DirectivesModule} from "../../directives/directives.module";


@NgModule({
  declarations: [
    EventComponent
  ],
    imports: [
        CommonModule,
        EventRoutingModule,
        DirectivesModule
    ]
})
export class EventModule { }
