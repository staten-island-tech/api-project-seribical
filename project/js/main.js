import '../styles/style.css'
import { DOMSelectors } from './DOMSelectors';

DOMSelectors.box.innerHTML = `

`

async function initial(){
  try{
    const random = Math.floor(Math.random() * 1034) + 1;
    console.log(random)
    let anime= await fetch(`https://api.jikan.moe/v4/anime?page=${random}`);
    let list= await anime.json();
    list.data.forEach((i)=>{
      DOMSelectors.box.insertAdjacentHTML(
        "afterbegin",
        `
        <div id=content>
        <p>${i.title}</p>
        <p>${i.rating}</p>
        </div>
        `)
      })
  }
  catch{
    console.log("caught")
  }
}



DOMSelectors.button.addEventListener("click", function(event){
  event.preventDefault;
  const info = document.querySelectorAll("#content")
  info.forEach((i)=>i.remove())
  if (DOMSelectors.search.value===""){
    console.log('nad id win')
  }
  else{
    data(DOMSelectors.search.value)
  }
  

})

async function data(name){
  try{
    let anime= await fetch(`https://api.jikan.moe/v4/anime?q=${name}`);
    let list=await anime.json();
    console.log(list)
    if(list.data.length==0){
      console.log('search better kid')
    }
    else{
      list.data.forEach((i)=>{
        DOMSelectors.box.insertAdjacentHTML(
          "afterbegin",
          `
          <div id=content>
          <p>${i.title}</p>
          <p>${i.rating}</p>
          </div>
          `)
        })}
    }
  catch{
    console.log("caught")
  }
}

initial();

