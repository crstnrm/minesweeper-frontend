import { Component, OnInit } from '@angular/core';
import { BoardCell } from 'src/app/shared/interfaces/board-cell';
import { Board } from 'src/app/shared/interfaces/board';
import { PuzzleService } from '../../services/puzzle.service';

@Component({
  selector: 'puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.scss'],
})
export class PuzzleComponent implements OnInit {
  FLAG_VALUE = -1;

  board?: Board;
  boardCell: BoardCell[][] = [];
  gameOver: boolean = false;

  constructor(private _puzzleService: PuzzleService) {}

  ngOnInit(): void {}

  createBoard(height: number, width: number) {
    this._puzzleService.createBoard(height, width).subscribe((board) => {
      this.board = board;
      this.buildBoard();
    });
  }

  getBoard() {
    this._puzzleService.getBoard().subscribe((res) => {});
  }

  buildBoard() {
    if (!this.board) return;

    for (var rowIdx = 0; rowIdx < this.board.height; rowIdx++) {
      let row = [];
      for (var colIdx = 0; colIdx < this.board.width; colIdx++) {
        row[colIdx] = { x: colIdx, y: rowIdx, show: false };
      }
      this.boardCell[rowIdx] = row;
    }
  }

  onInspectCellBoard(boardCell: BoardCell) {
    this._puzzleService
      .inspectCellBoard(this.board!.id, boardCell.x, boardCell.y)
      .subscribe((cellBoards) => {
        cellBoards.forEach((cell: BoardCell) => {
          this.boardCell[cell.y][cell.x].show = cell.show;
          this.boardCell[cell.y][cell.x].value = cell.value;
        });
      });
  }
}
