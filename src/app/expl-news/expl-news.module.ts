import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExplNewsPageRoutingModule } from './expl-news-routing.module';

import { ExplNewsPage } from './expl-news.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExplNewsPageRoutingModule
  ],
  declarations: [ExplNewsPage]
})
export class ExplNewsPageModule {}
