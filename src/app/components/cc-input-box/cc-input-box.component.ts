import { Component,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cc-input-box',
  templateUrl: './cc-input-box.component.html',
  styleUrls: ['../input-box/input-box.component.css','./cc-input-box.component.css']
})

export class CcInputBoxComponent {
  valid="";
  @Input() type?:string;
  @Input() name?:string;
  @Input() value?:string;
  @Input() place?:string;
  @Input() pattern?:string;
  @Input() errorName?:string;
  @Input() errorText?:string;
  @Output() inputChange = new EventEmitter();
  
  ngAfterViewInit(){
    if(this.pattern != null && this.pattern.length>0 && this.name!=undefined){
      const elem = document.getElementById(this.name);
      if(elem!=null)
        elem.setAttribute("pattern",this.pattern);
    }
  }

  onChange(e:Event){
    this.inputChange.emit(e);
  }
}
