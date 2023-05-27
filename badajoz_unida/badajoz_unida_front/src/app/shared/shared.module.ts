import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {RouterLink} from "@angular/router";
import { FooterComponent } from './footer/footer.component';
import { CardsComponent } from './cards/cards.component';
import { CarouselComponent } from './carousel/carousel.component';
import {PipesModule} from "../pipes/pipes.module";
import {DirectivesModule} from "../directives/directives.module";
import { LoadingComponent } from './loading/loading.component';



@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    CardsComponent,
    CarouselComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    PipesModule,
    DirectivesModule
  ],
  exports: [
    NavBarComponent,
    FooterComponent,
    CardsComponent,
    CarouselComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
