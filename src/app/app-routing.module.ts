import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'security'
  },
  {
    path: 'minesweeper',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/minesweeper/minesweeper.module').then(
        (m) => m.MinesweeperModule
      ),
  },
  {
    path: 'security',
    loadChildren: () =>
      import('src/app/modules/security/security.module').then(
        (m) => m.SecurityModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
