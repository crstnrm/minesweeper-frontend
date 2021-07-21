import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'minesweeper'
  },
  {
    path: 'minesweeper',
    loadChildren: () =>
      import('src/app/modules/minesweeper/minesweeper.module').then(
        (m) => m.MinesweeperModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
