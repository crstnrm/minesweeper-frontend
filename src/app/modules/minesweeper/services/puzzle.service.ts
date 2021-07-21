import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PuzzleService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private _http: HttpClient) {}

  createBoard(height: number, width: number): Observable<any> {
    return this._http.post<any>(
      `${apiUrl}/board/`,
      { height, width },
      this.httpOptions
    );
  }

  getBoard(): Observable<any> {
    return this._http.get<any>(`${apiUrl}/board/`);
  }

  inspectCellBoard(
    boardId: number,
    cellBoardX: number,
    cellBoardY: number
  ): Observable<any> {
    return this._http.patch<any>(
      `${apiUrl}/board/${boardId}/inspect/`,
      { x: cellBoardX, y: cellBoardY},
      this.httpOptions
    );
  }
}
