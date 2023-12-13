import '../styles/style.css'
import { DOMSelectors } from './DOMSelectors';

DOMSelectors.box.innerHTML = `

`

async function initial(){
  try{
    const random = Math.floor(Math.random() * 1034) + 1;
    console.log(random)
    let anime= await fetch(`https://api.jikan.moe/v4/anime?status=airing`);
    let list= await anime.json();
    let reverse = list.data.reverse();
    reverse.forEach((i)=>{
      DOMSelectors.box.insertAdjacentHTML(
        "afterbegin",
        `
        <div class="content">
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
  if (DOMSelectors.search.value===""){
    console.log('nad id win')
    alert("search something dipshit");
  }
  else{
    const info = document.querySelectorAll(".content")
    const footer = document.querySelector("#footer")
    footer.remove()
    info.forEach((i)=>i.remove())
    data(DOMSelectors.search.value, 1);
    DOMSelectors.search.value = "";
  }
})

async function data(name,page){
  try{
    let anime = await fetch(`https://api.jikan.moe/v4/anime?q=${name}&page=${page}`);
    let list = await anime.json();
    list.data.reverse();
    console.log(list)
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
    }else{
    list.data.forEach((i)=>{
      DOMSelectors.box.insertAdjacentHTML(
        "afterbegin",
        `
        <div class="content" id="${i.mal_id}">
          <p>${i.title}</p>
          <p>${i.rating}</p>
        </div>
        `
        
        )
      })
      const button = document.querySelectorAll(".content")
      button.forEach((i)=>i.addEventListener("click", function(event){
        event.preventDefault
        const info = document.querySelectorAll(".content")
        const footer = document.querySelector("#footer")
        footer.remove()
        info.forEach((i)=>i.remove())
        var id = i.getAttribute('id')
        pageload(id,name,page)
      }))
      if(page===1){
        if(page===list.pagination.last_visible_page){
          DOMSelectors.box.insertAdjacentHTML(
            "beforeend",
            `
            <div id="footer">
              <div id="pagenum">
                <p>page </p>
                <input type="text" id="page" value="${page}">
                <p> of ${list.pagination.last_visible_page}</p>
              </div>
            </div>
            `
          )
        }else{
          DOMSelectors.box.insertAdjacentHTML(
            "beforeend",
            `
            <div id="footer">
              <div id="pagenum">
                <p>page </p>
                <input type="text" id="page" value="${page}">
                <p> of ${list.pagination.last_visible_page}</p>
              </div>
              <button class="pageselector" id="next">></button>
            </div>
            `)
        }
      }else if(page>1){
        if(page===list.pagination.last_visible_page){
          DOMSelectors.box.insertAdjacentHTML(
            "beforeend",
            `
            <div id="footer">
            <button class="pageselector" id="prev"><</button>
            <div id="pagenum">
                <p>page </p>
                <input type="text" id="page" value="${page}">
                <p> of ${list.pagination.last_visible_page}</p>
              </div>
            </div>
            `
          )
        }else{
          DOMSelectors.box.insertAdjacentHTML(
            "beforeend",
            `
            <div id="footer">
            <button class="pageselector" id="prev"><</button>
            <div id="pagenum">
            <p>page </p>
            <input type="text" id="page" value="${page}">
            <p> of ${list.pagination.last_visible_page}</p>
          </div>
              <button class="pageselector" id="next">></button>
            </div>
            `)
        }
      }

        function pageselect(){
        const selectors = document.querySelectorAll(".pageselector")
        selectors.forEach((i)=>{i.addEventListener("click",function(event){
          event.preventDefault
          const info = document.querySelectorAll(".content")
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

async function pageload(id,oname,opage){
  let anime = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
  let list = await anime.json();
  console.log(list)
    DOMSelectors.box.insertAdjacentHTML(
      "afterbegin",
      `
      <button id="back">back to where you came from </button>
      <div class="content" id="${list.data.mal_id}">
        <p>${list.data.title}</p>
        <p>${list.data.rating}</p>
        <img src="${list.data.images.webp.image_url}">
        
      </div>
      `
      
      )
      const button=document.querySelector("#back")
      button.addEventListener("click",function(event){
        event.preventDefault
        const info = document.querySelectorAll(".content")
        info.forEach((i)=>i.remove())
        button.remove()
        data(oname,opage)
      })
}

initial();

