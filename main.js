(()=>{"use strict";var t="https://nomoreparties.co/v1/wff-cohort-18",e="d14c7ee8-cf05-401c-830b-ff888d4e1b25",n=document.querySelector("#card-template").content;function o(o,r,c,u,i,a,s,l,p){var d=n.cloneNode(!0),_=d.querySelector(".card__image"),f=d.querySelector(".card__title"),m=d.querySelector(".card__like-button-number");f.textContent=o,_.src=r,_.alt=o,m.textContent=c.length;var v=d.querySelector(".card__delete-button");v.addEventListener("click",(function(n){(function(n){return fetch(t+"/cards/".concat(n),{method:"DELETE",headers:{authorization:e,"Content-Type":"application/json"}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))})(l).catch((function(t){console.log(t)})),u(n)})),s||v.remove();var y=d.querySelector(".card__like-button");return p&&y.classList.add("card__like-button_is-active"),y.addEventListener("click",(function(){if(a(y),console.log(y),y.classList.contains("card__like-button_is-active")){(function(n){return fetch(t+"/cards/likes/".concat(n),{method:"PUT",headers:{authorization:e,"Content-Type":"application/json"}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))})(l).catch((function(t){console.log(t)}));var n=Number(m.textContent);n+=1,m.textContent=n}else{(function(n){return fetch(t+"/cards/likes/".concat(n),{method:"DELETE",headers:{authorization:e,"Content-Type":"application/json"}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))})(l).catch((function(t){console.log(t)}));var o=Number(m.textContent);o-=1,m.textContent=o}})),_.addEventListener("click",i),d}function r(t){t.target.closest(".card").remove()}function c(t){t.classList.toggle("card__like-button_is-active")}var u=null;function i(t){t.classList.add("popup_is-opened"),u=t,window.addEventListener("keydown",s)}function a(t){t.classList.remove("popup_is-opened"),u=null,window.removeEventListener("keydown",s)}function s(t){"Escape"===t.key&&a(u)}var l=function(t,e){e.validity.patternMismatch?e.setCustomValidity(e.dataset.errorMessage):e.setCustomValidity(""),e.validity.valid?function(t,e){var n=t.querySelector(".".concat(e.id,"-error"));e.classList.remove("popup__input-error_visible"),n.classList.remove("popup__input_type_error"),n.textContent=""}(t,e):function(t,e,n){var o=t.querySelector(".".concat(e.id,"-error"));e.classList.add("popup__input-error_visible"),o.textContent=n,o.classList.add("popup__input_type_error")}(t,e,e.validationMessage)},p=function(t,e){!function(t){return t.some((function(t){return!t.validity.valid}))}(t)?(e.disabled=!1,e.classList.remove("popup__button_disabled")):(e.disabled=!0,e.classList.add("popup__button_disabled"))},d=function(t,e){var n=Array.from(t.querySelectorAll(e.inputClass)),o=t.querySelector(".popup__button");n.forEach((function(r){e.runIsValid&&l(t,r),e.runToggleButton&&p(n,o)}))},_=document.querySelector(".places__list"),f=document.querySelector(".profile__edit-button"),m=document.querySelector(".profile__add-button"),v=document.querySelector(".profile__image-button"),y=document.querySelectorAll(".popup"),h=document.querySelector(".popup_type_edit"),S=document.querySelector(".popup_type_new-card"),q=document.querySelector(".popup_type_avatar"),b=document.querySelector(".popup_type_image"),g=document.querySelectorAll(".popup__content"),C=document.querySelectorAll(".popup__close"),k=document.forms["new-place"],E=k.querySelector(".popup__input_type_card-name"),L=k.querySelector(".popup__input_type_url"),j=document.querySelector(".profile__title"),x=document.querySelector(".profile__description"),T=document.querySelector(".popup__input_type_name"),P=document.querySelector(".popup__input_type_description"),A=document.forms["edit-profile"],w=b.querySelector(".popup__image"),z=b.querySelector(".popup__caption"),D=document.querySelector(".profile__image"),N=document.forms["edit-avatar"],V=N.querySelector(".popup__input_type_avatar"),B=N.querySelector(".button"),I=A.querySelector(".button"),O=k.querySelector(".button");function J(t){w.src=t.target.src,w.alt=t.target.alt,z.textContent=t.target.alt,i(b,t.target.src,t.target.alt)}Array.from(document.querySelectorAll(".popup__form")).forEach((function(t){t.addEventListener("submit",(function(t){t.preventDefault()})),function(t){var e=Array.from(t.querySelectorAll(".popup__input")),n=t.querySelector(".popup__button");e.forEach((function(o){o.addEventListener("input",(function(){l(t,o),p(e,n)}))}))}(t)})),f.addEventListener("click",(function(){I.textContent="Сохранить",i(h),T.value=j.textContent,P.value=x.textContent,d(h,{inputClass:".popup__input",runToggleButton:!0,runIsValid:!0})})),m.addEventListener("click",(function(){O.textContent="Создать",i(S),d(S,{inputClass:".popup__input",runToggleButton:!0,runIsValid:!1})})),v.addEventListener("click",(function(){B.textContent="Сохранить",i(q),d(q,{inputClass:".popup__input",runToggleButton:!0,runIsValid:!1})})),A.addEventListener("submit",(function(n){var o,r;n.preventDefault(),I.textContent="Сохранение...",(o=T.value,r=P.value,fetch(t+"/users/me",{method:"PATCH",headers:{authorization:e,"Content-Type":"application/json"},body:JSON.stringify({name:o,about:r})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))).then((function(){j.textContent=T.value,x.textContent=P.value,a(h)})).catch((function(t){console.log(t)}))})),k.addEventListener("submit",(function(n){n.preventDefault();var u,i,s=o(E.value,L.value,[],r,J,c,!0,null,!1);O.textContent="Сохранение...",(u=E.value,i=L.value,fetch(t+"/cards",{method:"POST",headers:{authorization:e,"Content-Type":"application/json"},body:JSON.stringify({name:u,link:i})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))).then((function(){_.prepend(s),a(S),E.value="",L.value=""})).catch((function(t){console.log(t)}))})),N.addEventListener("submit",(function(n){var o;n.preventDefault(),D.src=V.value,B.textContent="Сохранение...",(o=D.src,fetch(t+"users/me/avatar",{method:"PATCH",headers:{authorization:e,"Content-Type":"application/json"},body:JSON.stringify({avatar:o})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))).then((function(){a(q),V.value=""})).catch((function(t){console.log(t)}))})),C.forEach((function(t){t.addEventListener("click",(function(){a(t.closest(".popup"))}))})),y.forEach((function(t){t.addEventListener("click",(function(){a(t)}))})),g.forEach((function(t){t.addEventListener("click",(function(t){t.stopPropagation()}))})),Promise.all([fetch(t+"/users/me",{method:"GET",headers:{authorization:e}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})),fetch(t+"/cards",{headers:{authorization:e}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))]).then((function(t){j.textContent=t[0].name,x.textContent=t[0].about,D.src=t[0].avatar,t[1].forEach((function(e){var n=e.owner._id===t[0]._id,u=e.likes.find((function(e){return e._id===t[0]._id})),i=o(e.name,e.link,e.likes,r,J,c,n,e._id,u);_.append(i)}))})).catch((function(t){console.log(t)}))})();