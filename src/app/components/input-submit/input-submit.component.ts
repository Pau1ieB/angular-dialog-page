import { Component,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-submit',
  templateUrl: './input-submit.component.html',
  styleUrls: ['./input-submit.component.css']
})

export class InputSubmitComponent {
  @Output()submitForm=new EventEmitter();

  onSubmit(e:Event){
    this.submitForm.emit(e);
  }
}
