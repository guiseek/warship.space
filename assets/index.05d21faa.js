var f=Object.defineProperty;var g=(o,A,t)=>A in o?f(o,A,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[A]=t;var i=(o,A,t)=>(g(o,typeof A!="symbol"?A+"":A,t),t);const m=function(){const A=document.createElement("link").relList;if(A&&A.supports&&A.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const e of s)if(e.type==="childList")for(const n of e.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function t(s){const e={};return s.integrity&&(e.integrity=s.integrity),s.referrerpolicy&&(e.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?e.credentials="include":s.crossorigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function a(s){if(s.ep)return;s.ep=!0;const e=t(s);fetch(s.href,e)}};m();var w="data:audio/mpeg;base64,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";const c=["#01f77c","#01e3f7","#f72a01","#f78001","#8c01f7","#f7f701"];function y(){return c[Math.floor(Math.random()*c.length)]}const l=class{constructor(A,t){i(this,"position");i(this,"front");i(this,"velocity");i(this,"color",y());if(this.position=Object.create(A),this.front=Object.create(A),l.inc++%5===0){const s=new Audio(w);s.inputMode="gamepad",s.volume=.1,s.play()}const a=10;this.velocity={x:Math.cos(t)*a,y:Math.sin(t)*a},this.position.x+=this.velocity.x*16,this.position.y+=this.velocity.y*16,this.front.x+=this.velocity.x*5,this.front.y+=this.velocity.y*5}update(A){this.position.x+=this.velocity.x,this.position.y+=this.velocity.y,this.front.x+=this.velocity.x,this.front.y+=this.velocity.y,A.beginPath(),A.moveTo(this.position.x,this.position.y),A.lineTo(this.front.x,this.front.y),A.strokeStyle=this.color,A.stroke(),A.closePath()}};let r=l;i(r,"inc",0);class u{constructor(A){i(this,"width");i(this,"height");i(this,"ctx");i(this,"position");i(this,"radians");i(this,"size");i(this,"control",{left:!1,right:!1,forward:!1,shoot:!1});i(this,"vel",{x:0,y:0});i(this,"radVel",0);i(this,"bullets",[]);i(this,"lastBullet",0);i(this,"bulletTime",1);i(this,"init",this._animate());this.canvas=A,this.width=A.width=window.innerWidth,this.height=A.height=window.innerHeight,this.ctx=A.getContext("2d"),this.radians=1;const t={x:this.width/2,y:this.height/2};this.position=Object.create(t),this.size={x:16,y:32},this.ctx.strokeStyle="rgb(0, 200, 200)",this._listenControls()}_listenControls(){addEventListener("keydown",A=>{let t=!0;switch(A.key){case"ArrowLeft":this.control.left=!0;break;case"ArrowUp":this.control.forward=!0;break;case"ArrowRight":this.control.right=!0;break;case" ":this.control.shoot=!0;break;default:t=!1}t&&A.preventDefault()}),addEventListener("keyup",A=>{let t=!0;switch(A.key){case"ArrowLeft":this.control.left=!1;break;case"ArrowUp":this.control.forward=!1;break;case"ArrowRight":this.control.right=!1;break;case" ":this.control.shoot=!1;break;default:t=!1}t&&A.preventDefault()})}_animate(){return()=>{window.requestAnimationFrame(this._animate()),this.ctx.fillRect(0,0,this.width,this.height),this._drawThing(this.ctx),this._drawBG(this.ctx,this.canvas.height),this.control.left&&(this.radVel-=this.control.forward?.002:.005),this.control.right&&(this.radVel+=this.control.forward?.002:.005),this.radians+=this.radVel*=.9,this.control.forward&&(this.vel.x+=Math.cos(this.radians)/15,this.vel.y+=Math.sin(this.radians)/15),this.position.x+=this.vel.x*=.995,this.position.y+=this.vel.y*=.995,this.position.x>this.width+2*this.size.x&&(this.position.x=-2*this.size.x),this.position.y>this.height+2*this.size.x&&(this.position.y=-2*this.size.x),this.position.x<-2*this.size.x&&(this.position.x=this.width+2*this.size.x),this.position.y<-2*this.size.x&&(this.position.y=this.height+2*this.size.x),++this.lastBullet,this.control.shoot&&this.lastBullet>this.bulletTime&&(this.bullets.push(new r(this.position,this.radians)),this.lastBullet=0);for(let A=0;A<this.bullets.length;++A){let t=this.bullets[A];t.update(this.ctx),(t.front.x>this.width||t.front.x<0||t.front.y>this.height||t.front.y<0)&&(this.bullets.splice(A,1),--A)}}}_drawThing(A){A.strokeStyle="rgb(200, 200, 200)",A.fillStyle="rgba(200, 200, 200, .1)",A.lineWidth=2,A.beginPath(),A.moveTo(this.position.x+Math.cos(this.radians)*this.size.y,this.position.y+Math.sin(this.radians)*this.size.y),A.lineTo(this.position.x+Math.cos(this.radians+2*Math.PI/3)*this.size.x,this.position.y+Math.sin(this.radians+2*Math.PI/3)*this.size.x),A.lineTo(this.position.x+Math.cos(this.radians-2*Math.PI/3)*this.size.x,this.position.y+Math.sin(this.radians-2*Math.PI/3)*this.size.x),A.closePath(),A.stroke(),A.fill()}_drawBG(A,t){const a=A.createLinearGradient(0,0,0,t);a.addColorStop(0,"#000000"),a.addColorStop(1,"#010101"),this.ctx.fillStyle=a}}var V="/assets/sun.c2662c8e.png",C="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACoSURBVHjaHIw7DoMwEETXNj8BJRV3QUqXK7jkTjQpKX0P3yNI9BQQLNsS2Bmz0mi0+2aHTdNEeZ6PVVVJxvngrNX3fStozoQQY9M0n77vy7qu6bss799xvGKMlKBs27bsuo4SNMbQse9lCEFyzACRc46u63oclYRP3IXQCaaPdV0fZ4wRRvMYgsLii6Igay2hLgEPqQxV87Zt5LyX5jwHBDQCCnD+CzAANN1cVtHy2w4AAAAASUVORK5CYII=",p="data:image/png;base64,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";const h={sun:new Image,moon:new Image,earth:new Image};class v{constructor(A){i(this,"draw",this._draw());this.canvas=A}init(){h.sun.src=V,h.moon.src=C,h.earth.src=p,this.draw()}_draw(){return()=>{const A=this.canvas.getContext("2d");A.globalCompositeOperation="destination-over",A.clearRect(0,0,300,300),A.fillStyle="rgba(0, 0, 0, 0.4)",A.strokeStyle="rgba(0, 153, 255, 0.4)",A.save(),A.translate(150,150);const t=new Date;A.rotate(2*Math.PI/60*t.getSeconds()+2*Math.PI/6e4*t.getMilliseconds()),A.translate(105,0),A.fillRect(0,-12,40,24),A.drawImage(h.earth,-12,-12),A.save(),A.rotate(2*Math.PI/6*t.getSeconds()+2*Math.PI/6e3*t.getMilliseconds()),A.translate(0,28.5),A.drawImage(h.moon,-3.5,-3.5),A.restore(),A.restore(),A.beginPath(),A.arc(150,150,105,0,Math.PI*2,!1),A.strokeStyle="#ffffff11",A.stroke(),A.drawImage(h.sun,0,0,300,300),requestAnimationFrame(this._draw())}}}const d=o=>document.querySelector(o),B=d("canvas"),Q=new u(B),k=d("#ss"),E=new v(k);E.init();Q.init();
