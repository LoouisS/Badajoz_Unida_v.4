import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {RouterLink} from "@angular/router";
import { FooterComponent } from './footer/footer.component';
import { CardsComponent } from './cards/cards.component';
import { CarouselComponent } from './carousel/carousel.component';
import {PipesModule} from "../pipes/pipes.module";



@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    CardsComponent,
    CarouselComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    PipesModule
  ],
  exports: [
    NavBarComponent,
    FooterComponent,
    CardsComponent,
    CarouselComponent
  ]
})
export class SharedModule { }
