import { Component, OnInit } from '@angular/core';
import {GlobalServiceService} from "../global-service.service";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  playerHeight: number = 50;
  moveDistance: number = 20;
  decayDistance: number = 1.2;

  constructor(private globalService: GlobalServiceService) { }

  ngOnInit(): void {
    this.globalService.askPlayerHeight.subscribe( () => {
      this.globalService.answerPlayerHeight.emit(this.playerHeight);
    })

    setInterval( () => {
      if(!this.globalService.paused)
        this.playerHeight -= this.decayDistance;
        if(this.playerHeight < -12)
          this.globalService.endGame();
    }, 30);

    this.globalService.keyPress.subscribe(
      data => {
        if(!this.globalService.paused) {
          if (data == "w" && this.playerHeight < 80) {
            this.playerHeight += this.moveDistance;
          }
          if (data == "s") {
            this.playerHeight -= this.moveDistance;
          }
          if (data == "p") {
            this.globalService.paused = true;
          }
        }
        else {
          if(data == "p" && !this.globalService.gameovered)
            this.globalService.paused = false;
        }
      }
    )
  }

}
