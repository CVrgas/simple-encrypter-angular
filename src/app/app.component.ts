import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'simple-encrypter-angular';
  ngOnInit(): void {
    document.getElementById("in_type").addEventListener('change', (event) => {
      this.change_selection("in_type")
      this.encript = !this.encript;
    });
    document.getElementById("out_type").addEventListener('change', (event) => {
      this.change_selection("out_type")
      this.encript = !this.encript;
    });
  }
  text = '';
  
  encript: boolean = true;

  clickboard(){
    const text = document.getElementById('out') as HTMLTextAreaElement
    navigator.clipboard.writeText(text.value);
  }
  change_selection(string: string){
    const changed = document.getElementById(string) as HTMLSelectElement;
    let to_change : any

    if(string == "in_type"){
      to_change = document.getElementById("out_type") as HTMLSelectElement;
    }else{
      to_change = document.getElementById("in_type") as HTMLSelectElement;
    }
    if(changed.selectedIndex == 1){
      to_change.selectedIndex = 0
    }else{
      to_change.selectedIndex = 1
    }
  }

  switch(){
    const from = document.getElementById("in_type") as HTMLSelectElement;
    const to = document.getElementById("out_type") as HTMLSelectElement;
    
    if(this.encript){
      from.selectedIndex = 1
      to.selectedIndex = 0
    }
    else{
      from.selectedIndex = 0
      to.selectedIndex = 1
    }
    this.encript = !this.encript;
  }

  Submit(){
    const text_in = document.getElementById("in") as HTMLTextAreaElement;
    const text_out = document.getElementById("out") as HTMLTextAreaElement;
    if(!this.encript){
      text_out.value = this.decrypt(text_in.value)
      return
    }
    const validation = this.validate(text_in.value)
    if(validation.length < 1){
      text_out.value = this.encrypt(text_in.value);
      text_out.style.color = "black"
      text_out.style.textAlign ="start"
    }else{
      console.error(`Invalid Input: ${validation.join(", ")}`)
      text_out.value = `texto no valido: ${validation.join(", ")}`
      
    }
  }
  decrypt(text: string){
    return text.replaceAll('enter', 'e').replaceAll("imes", "i").replaceAll("ai", "a").replaceAll("ober", "o").replaceAll("ufat" , "u")
  }
  encrypt(text: string){
    return text.replaceAll('e','enter').replaceAll("i", "imes").replaceAll("a", "ai").replaceAll("o", "ober").replaceAll("u", "ufat")
  }
  validate(text: string){
    const spReg = /[a-z \n]/
    const split = text.split(spReg).filter(x =>  x != '')
    return split
  }
}
