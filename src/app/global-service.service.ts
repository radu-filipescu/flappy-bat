import {EventEmitter, Injectable, OnInit, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService implements OnInit {
  @Output() keyPress = new EventEmitter<string>();
  @Output() answerPlayerHeight = new EventEmitter<number>();
  @Output() askPlayerHeight = new EventEmitter<void>();
  @Output() incrementScore = new EventEmitter<void>();
  @Output() gameOver = new EventEmitter<void>();
  paused: boolean = false;
  gameovered: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  endGame() {
    this.gameOver.emit();
    this.paused = true;
    this.gameovered = true;
  }

  isPaused() {
    return this.paused;
  }
}
