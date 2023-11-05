import { Component,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.css']
})
export class InputBoxComponent {
  valid="";
  @Input() type?:string;
  @Input() name?:string;
  @Input() value?:string;
  @Input() place?:string;
  @Input() pattern?:string;
  @Input() errorName?:string;
  @Input() errorText?:string;
  @Input() errorAlert?:string;
  @Output() inputChange = new EventEmitter();
  
  ngAfterViewInit(){
    if(this.pattern != null && this.pattern.length>0 && this.name!=undefined){
      const elem = document.getElementById(this.name);
      if(elem!=null)
        elem.setAttribute("pattern",this.pattern);
    }

    if(this.errorAlert != null && this.errorAlert.length>0 && this.errorName!=undefined){
      const elem = document.getElementById(this.errorName);
      if(elem!=null)
        elem.setAttribute("role","alert");
    }
  }

  onChange(e:Event){
    this.inputChange.emit(e);
  }
}
