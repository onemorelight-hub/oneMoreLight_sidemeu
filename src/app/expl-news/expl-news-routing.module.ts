import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExplNewsPage } from './expl-news.page';

const routes: Routes = [
  {
    path: '',
    component: ExplNewsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExplNewsPageRoutingModule {}
