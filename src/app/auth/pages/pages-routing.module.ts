import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesPage } from './pages.page';

const routes: Routes = [
  {
    path: '',
    component: PagesPage
  },  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then( m => m.SettingPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesPageRoutingModule {}
