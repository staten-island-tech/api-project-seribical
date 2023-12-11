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
      DOMSelectors.box.insertAdjacentHTML(
        "beforeend",
        `
        <div id="footer">
          <button id="prev"><</button>
          <input type="text" id="page" value="1">
          <button id="next">></button>
        </div>
        `
      )
  }
  catch{
    console.log("caught")
  }
}

DOMSelectors.button.addEventListener("click", function(event){
  event.preventDefault;
  const info = document.querySelectorAll("#content")
  const footer = document.querySelector("#footer")
  footer.remove()
  info.forEach((i)=>i.remove())
  if (DOMSelectors.search.value===""){
    console.log('nad id win')
  }
  else{
    data(DOMSelectors.search.value, 1)
  }
  

})

async function data(name,page){
  try{
    let anime = await fetch(`https://api.jikan.moe/v4/anime?q=${name}&page=${page}`);
    let list = await anime.json();
    let reverse = list.data.reverse();
    console.log(reverse)
    if(list.data.length==0){
      console.log('search better kid')
      DOMSelectors.box.insertAdjacentHTML(
        "afterbegin",
        `
        <p id="content">no results for ${name}</p>
        <div id="footer">
          </div>
        `
      )
    }
  else{
    reverse.forEach((i)=>{
      DOMSelectors.box.insertAdjacentHTML(
        "afterbegin",
        `
        <div id=content>
          <p>${i.title}</p>
          <p>${i.rating}</p>
        </div>
        `)
      })
      DOMSelectors.box.insertAdjacentHTML(
        "beforeend",
        `
        <div id="footer">
          <button class="pageselector" id="prev"><</button>
          <input type="text" id="page" value="${page}">
          <button class="pageselector" id="next">></button>
        </div>
        `)

        function pageselect(){
        const selectors = document.querySelectorAll(".pageselector")
        selectors.forEach((i)=>{i.addEventListener("click",function(event){
          event.preventDefault
          const info = document.querySelectorAll("#content")
          const footer = document.querySelector("#footer")
          footer.remove()
          info.forEach((i)=>i.remove())
          if(i.textContent==">"){
            const number = page+1
            data(name,number)
          }
          if(i.textContent=="<"){
            const number = page-1
            data(name,number)
          }

          })
        })}
        pageselect();
      }
    }
  catch{
    console.log("caught")
  }
}

initial();

