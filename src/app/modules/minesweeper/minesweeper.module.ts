import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './pages/board/board.component';
import { PuzzleComponent } from './components/puzzle/puzzle.component';
import { MinesweeperRoutingModule } from './minesweeper-routing.module';



@NgModule({
  declarations: [
    BoardComponent,
    PuzzleComponent
  ],
  imports: [
    CommonModule,
    MinesweeperRoutingModule
  ]
})
export class MinesweeperModule { }
