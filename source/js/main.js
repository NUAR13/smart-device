import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';


// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  iosVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)

const body = document.querySelector('body')
const modal = document.querySelector('.modal')
const openModalButton = document.querySelector('.open-modal')
const closeModalButton = document.querySelector('.modal__close')

function existVerticalScroll() {
   return document.body.offsetHeight > window.innerHeight
}

function getBodyScrollTop() {
    return self.pageYOffset || (document.documentElement && document.documentElement.ScrollTop) || (document.body && document.body.scrollTop);
  }

openModalButton.addEventListener('click', e => {
  e.preventDefault()

  body.dataset.scrollY = getBodyScrollTop()


  modal.classList.add('modal-open')

  if(existVerticalScroll()) {
     body.classList.add('body-lock')
     body.style.top = `-${body.dataset.scrollY}px`
   }
})

closeModalButton.addEventListener('click', e => {
  e.preventDefault()

  modal.classList.remove('modal-open')
  body.classList.remove('body-lock')
  window.scrollTo(0,body.dataset.scrollY)
})

let allElems = document.querySelectorAll('.page-footer .page-footer__button-wrapper');
let allButton = document.querySelectorAll('.page-footer .page-footer__button-accordion');

allElems.forEach((elem)=>{
    elem.addEventListener('click', function(evt){
        /*находим все активные элементы*/
        let descActive = document.querySelectorAll('.page-footer .page-footer__accordeon-list.page-footer__accordeon-show');
        /*прогоняем через цикл и удаляем класс active*/
        descActive.forEach((elem)=>{
          elem.classList.remove('page-footer__accordeon-show');
          console.log("1")
        })

        allButton.forEach((elem)=>{
          elem.classList.remove('active');
        })

        let parentElem = this.parentNode;

        let contentBlock = parentElem.querySelector('.page-footer__accordeon-list');

        if(contentBlock.classList.contains("page-footer__accordeon-show")) {
          contentBlock.classList.remove('page-footer__accordeon-show');
        }
        else {
          contentBlock.classList.add('page-footer__accordeon-show');
          evt.target.classList.add("active");
        }
    })
})

window.addEventListener("DOMContentLoaded", function() {
  [].forEach.call( document.getElementsByName('phone'), function(input) {
  var keyCode;
  function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___ ____",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          new_value = matrix.replace(/[_\d]/g, function(a) {
              return i < val.length ? val.charAt(i++) || def.charAt(i) : a
          });
      i = new_value.indexOf("_");
      if (i != -1) {
          i < 5 && (i = 3);
          new_value = new_value.slice(0, i)
      }
      var reg = matrix.substr(0, this.value.length).replace(/_+/g,
          function(a) {
              return "\\d{1," + a.length + "}"
          }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5)  this.value = ""
  }

  input.addEventListener("input", mask, false);
  input.addEventListener("focus", mask, false);
  input.addEventListener("blur", mask, false);
  input.addEventListener("keydown", mask, false)

});

});

var elemText = document.querySelector(".about-us__open-mobile");
var buttonOpen = document.querySelector(".about-us__button");

buttonOpen.addEventListener("click" , function() {
  if(elemText.style.display == "block") {
    elemText.style.display = "none";
    buttonOpen.innerHTML = "Подробнее";
  }
  else {
    elemText.style.display = "block";
    buttonOpen.innerHTML = "Скрыть";
  }
})
