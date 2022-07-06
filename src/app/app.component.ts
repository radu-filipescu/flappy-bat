import {Component, HostListener, OnInit} from '@angular/core';
import {GlobalServiceService} from "./global-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'flappy-bat';

  gameOver: boolean = false;
  score: number = 0;

  constructor(private globalService: GlobalServiceService) {
  }

  ngOnInit() {
    this.globalService.gameOver.subscribe( () => {
      this.gameOver = true;
    })

    this.globalService.incrementScore.subscribe( () => {
      this.score++;
    })
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.globalService.keyPress.emit(event.key);
  }
}
