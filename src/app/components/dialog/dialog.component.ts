import { Component } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  currentCard={
    id:-1,
    type:["img-amex","img-visa","img-mcard","img-discover"]
  }

  validate(e:Event):void{
    if(e!=null && e.target!=null){
      const target = (e.target as HTMLInputElement);
      if(target.value.length==0)
          this.setFieldValidity(target,"zero",["bg-invalid","bg-valid"],[],`error-${target.name}`,true);
      else if(target.validity.valid && (target.dataset['valid']==="false" || target.dataset['valid']==="zero"))
          this.setFieldValidity(target,"true",["bg-invalid"],["bg-valid"],`error-${target.name}`,true);
      else if(!target.validity.valid && (target.dataset['valid']==="true" || target.dataset['valid']==="zero"))
          this.setFieldValidity(target,"false",["bg-valid"],["bg-invalid"],`error-${target.name}`,false);
    }
  }

  validateCard(e:Event){
    this.validate(e);
    if(e!=null && e.target!=null){
      const target = (e.target as HTMLInputElement);
      const cardType = (document.querySelector('#card-type') as HTMLElement);
      const cardImage = (document.querySelector('#card-image') as HTMLElement);
      if(cardImage!=null && cardType!=null){
        let ident = parseInt(target.value[0]);
        ident = (Number.isNaN(ident) || ident < 3 || ident > 6)?-1:ident-3
        if(this.currentCard.id>-1 && ((!target.validity.valid || target.value.length==0) || this.currentCard.id!==ident)){
            cardImage.classList.remove(this.currentCard.type[this.currentCard.id]);
            this.currentCard.id=-1;
        }
        if(target.validity.valid && target.value.length>0){
          if((ident==0 || ident==1  || ident==2  || ident==3)){
              if(this.currentCard.id==-1){
                  this.currentCard.id=ident;
                  if(cardType.dataset['show']==="false"){
                      cardType.dataset['show']="true";
                      cardType.classList.remove("hidden");
                      cardType.classList.add("valid-card");
                  }
                  cardImage.classList.add(this.currentCard.type[this.currentCard.id]);
              }
              if(this.currentCard.id==0 && target.value.length==16)target.value=target.value.substring(0,target.value.length-1);
              const cardLength = (document.querySelector('#card-length') as HTMLElement);
              if(cardLength!=null)
                cardLength.textContent = `${target.value.length}/${(this.currentCard.id==0)?15:16}`;
              return;
          }
        }
        if(cardType.dataset['show']==="true"){
          cardType.dataset['show']="false";
          cardType.classList.add("hidden");
          cardType.classList.remove("valid-card");
        }
      }
    }
  }

  setFieldValidity(elem:any,data:any,remove:any,add:any,id:any,hidden:any){
    elem.dataset['valid']=data;
    remove.forEach((e:any) => elem.classList.remove(e));
    add.forEach((e:any) => elem.classList.add(e));
    (hidden)?document.querySelector(`#${id}`)?.classList.add('hidden'):document.querySelector(`#${id}`)?.classList.remove('hidden');
  }

  LUHN(card:string){
    const arr = card.split("").reverse().map((x) => parseInt(x));
    const lastDigit = arr.shift();
    const sum = arr.reduce((acc, val, i) => acc + ((i % 2 !== 0)? val : (val > 4 ? val*2 -9 : val*2)), 0);
    return (10 - (sum % 10)) % 10 === lastDigit;
  }

  errorsOnForm(message:string){
    const elem = (document.querySelector("#error-form") as HTMLElement);
    elem.textContent=message;
    elem.classList.remove('hidden');
    elem.blur();
    elem.focus();
    setInterval(()=>{
        elem.textContent="";
        elem.classList.add("hidden");
    },3000);
  }

  onSubmit(e:Event){
    e.preventDefault();
    const name = (document.querySelector('input[name="name"]') as HTMLInputElement);
    const email = (document.querySelector('input[name="email"]') as HTMLInputElement);
    const card = (document.querySelector('input[name="card"]') as HTMLInputElement);
    if(name!=null && email!=null && card!=null){
      if(name.value.length==0 || email.value.length==0 || card.value.length==0){
        this.errorsOnForm("You need to enter values for each field");
        return;
      }
      if(!name.validity.valid){
        this.errorsOnForm("You need to correct errors on the name field");
        return;
      }

      if(!email.validity.valid){
        this.errorsOnForm("You need to correct errors on the email field");
        return;
      }
    
      if(!card.validity.valid){
        this.errorsOnForm("You need to correct errors on the card number field");
        return;
      }  

      if(this.currentCard.id==-1 || (this.currentCard.id==0 && card.value.length!=15)  || (this.currentCard.id>0 && card.value.length!=16) || !this.LUHN(card.value)){
        this.errorsOnForm("You need to add a valid card");
        return;      
      }

      const args=`name=${name.value};email=${email.value};card=${card.value}`;
//      window.location.href = `mailto:test@dn-uk.com?body='${args}'`;
      window.location.href = `mailto:git.Pradeep.B@gmail.com?body='${args}'`;

      if(confirm("The email has been sent. Do you want to clear all the fields?")){
        [name,email,card].forEach(elem=>{
          elem.value='';
          elem.dataset['valid']='zero';
          elem.classList.remove("bg-valid");
        })
        this.currentCard.id=-1;
        const cardType = (document.querySelector('#card-type') as HTMLElement);
        if(card!=null){
          cardType.dataset['show']="false";
          cardType.classList.add("hidden");
          cardType.classList.remove("valid-card");
        }
      }
    }
    else
      this.errorsOnForm("There is a problem with this form");
  }
}
