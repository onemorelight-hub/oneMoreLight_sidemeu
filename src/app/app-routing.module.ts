import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'news/TopNews',
    pathMatch: 'full'
  },  
  {
    path: 'news/TopNews',
    loadChildren: () => import('./news/news.module').then( m => m.NewsPageModule),
    data: { viewOption: 'Top News' }
  },
  {
    path: 'news/Business',
    loadChildren: () => import('./news/news.module').then( m => m.NewsPageModule),
    data: { viewOption: 'Business' }
  },
  {
    path: 'news/Health',
    loadChildren: () => import('./news/news.module').then( m => m.NewsPageModule),
    data: { viewOption: 'Health' }
  },
  {
    path: 'news/Sports',
    loadChildren: () => import('./news/news.module').then( m => m.NewsPageModule),
    data: { viewOption: 'Sports' }
  },
  {
    path: 'news/Science',
    loadChildren: () => import('./news/news.module').then( m => m.NewsPageModule),
    data: { viewOption: 'Science' }
  },
  {
    path: 'news/Technology',
    loadChildren: () => import('./news/news.module').then( m => m.NewsPageModule),
    data: { viewOption: 'Technology' }
  },
  {
    path: 'news/Entertainment',
    loadChildren: () => import('./news/news.module').then( m => m.NewsPageModule),
    data: { viewOption: 'Entertainment' },
  },
  //**    */
  {
    path: 'expl-News',
    loadChildren: () => import('./expl-news/expl-news.module').then( m => m.ExplNewsPageModule),
    data: { viewOption: 'News' }
  },
  {
    path: 'expl-Business',
    loadChildren: () => import('./expl-news/expl-news.module').then( m => m.ExplNewsPageModule),
    data: { viewOption: 'Business News' }
  },
  {
    path: 'expl-Health',
    loadChildren: () => import('./expl-news/expl-news.module').then( m => m.ExplNewsPageModule),
    data: { viewOption: 'Health News' }
  },
  {
    path: 'expl-Science',
    loadChildren: () => import('./expl-news/expl-news.module').then( m => m.ExplNewsPageModule),
    data: { viewOption: 'Science News' }
  },
  {
    path: 'expl-Sports',
    loadChildren: () => import('./expl-news/expl-news.module').then( m => m.ExplNewsPageModule),
    data: { viewOption: 'Sports News' }
  },
  {
    path: 'expl-Technology',
    loadChildren: () => import('./expl-news/expl-news.module').then( m => m.ExplNewsPageModule),
    data: { viewOption: 'Technology News' }
  },
  {
    path: 'expl-Entertainment',
    loadChildren: () => import('./expl-news/expl-news.module').then( m => m.ExplNewsPageModule),
    data: { viewOption: 'Entertainment News' }
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
