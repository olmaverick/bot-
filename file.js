// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @grant        none
// ==/UserScript==

let yandexInput = document.getElementsByName('text')[0];
let btn=document.getElementsByClassName("button_theme_websearch")[0];//либо кнопка либо undefine
let searchWs=["Гобой","Кларнет","Саксафон","Флейта","Валторна","Фагот","чума"];
//let searchWs=["чума"];
let swd=searchWs[getRandom(0,searchWs.length)];
let i=0;
let links=document.links;

if (btn!=undefined)
{
  let timerId=setInterval(()=>
      {
        yandexInput.value+=swd[i];
        i++;
        if(i==swd.length)
        {
          clearInterval(timerId);
          btn.click();
        }
      },500);
}
else if (location.hostname=="yandex.ru")
{
    let FLAG=true;
for (let i=0;i<links.length; i++)
  {
    if (links[i].href.indexOf('https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/')!=-1)
    {
        FLAG=false;
        links[i].removeAttribute("target");
     //   console.log(a);
        links[i].click();
        break;
    }
   }
    if (FLAG)
    {
        setTimeout(()=>{
            if (document.querySelector('.pager__item_current_yes').innerText<10) document.querySelector('.pager__item_kind_next').click();
            else location.href="https://yandex.ru";
        },3800);
    }
}
else
{
   setInterval(()=>
   {
       if (getRandom(0,100)<30) location.href="https://yandex.ru/";
       let index=getRandom(0,links.length)
       links[index].click();},5000);
   }

function getRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}
