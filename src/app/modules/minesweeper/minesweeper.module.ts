import { NgModule } from '@angular/core';
import { BoardComponent } from './pages/board/board.component';
import { PuzzleComponent } from './components/puzzle/puzzle.component';
import { MinesweeperRoutingModule } from './minesweeper-routing.module';
import {
  JwtInterceptorProvider
} from 'src/app/core/interceptors/jwt.interceptor';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    BoardComponent,
    PuzzleComponent
  ],
  imports: [
    SharedModule,
    MinesweeperRoutingModule
  ],
  providers: [
    JwtInterceptorProvider
  ],
})
export class MinesweeperModule { }
