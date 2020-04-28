import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  {
    path: 'news/India',
    loadChildren: () => import('./news/news.module').then( m => m.NewsPageModule),
    canActivate: [AuthGuardService],
    data: { location: 'India' }
  },
  {
    path: 'news/USA',
    loadChildren: () => import('./news/news.module').then( m => m.NewsPageModule),
    canActivate: [AuthGuardService],
    data: { location: 'USA' }
  },
  {
    path: 'news/UK',
    loadChildren: () => import('./news/news.module').then( m => m.NewsPageModule),
    canActivate: [AuthGuardService],
    data: { location: 'UK' }
  },
  {
    path: 'news/Australia',
    loadChildren: () => import('./news/news.module').then( m => m.NewsPageModule),
    canActivate: [AuthGuardService],
    data: { location: 'Australia' }
  },
  {
    path: 'news/Canada',
    loadChildren: () => import('./news/news.module').then( m => m.NewsPageModule),
    canActivate: [AuthGuardService],
    data: { location: 'Canada' }
  },
  {
    path: 'news/Ireland',
    loadChildren: () => import('./news/news.module').then( m => m.NewsPageModule),
    canActivate: [AuthGuardService],
    data: { location: 'Ireland' }
  },
  {
    path: 'news/Malaysia',
    loadChildren: () => import('./news/news.module').then( m => m.NewsPageModule),
    canActivate: [AuthGuardService],
    data: { location: 'Malaysia' }
  },
  {
    path: 'news/NewZealand',
    loadChildren: () => import('./news/news.module').then( m => m.NewsPageModule),
    canActivate: [AuthGuardService],
    data: { location: 'New Zealand' },
  },
  {
    path: 'news/SaudiArabia',
    loadChildren: () => import('./news/news.module').then( m => m.NewsPageModule),
    canActivate: [AuthGuardService],
    data: { location: 'Saudi Arabia' },
  },
  {
    path: 'news/SouthAfrica',
    loadChildren: () => import('./news/news.module').then( m => m.NewsPageModule),
    canActivate: [AuthGuardService],
    data: { location: 'South Africa' },
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
