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
const modalCon = document.querySelector('.modal__content')
const openModalButton = document.querySelector('.open-modal')
const closeModalButton = document.querySelector('.modal__close')

function trapFocus(element) {
  var focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
  var firstFocusableEl = focusableEls[0];
  var lastFocusableEl = focusableEls[focusableEls.length - 1];
  var KEYCODE_TAB = 9;
  focusableEls[1].focus();

  element.addEventListener('keydown', function(e) {
    var isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);


    if (!isTabPressed) {
      return;
    }

    if ( e.shiftKey ) /* shift + tab */ {
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus();
          e.preventDefault();
        }
      } else /* tab */ {
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus();
          e.preventDefault();
        }
      }
  });
}

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
  trapFocus(modal)

  if(existVerticalScroll()) {
    body.classList.add('body-lock')
    body.style.top = `-${body.dataset.scrollY}px`
  }
})

const closeModal = (evt) => {
  evt.preventDefault()
  modal.classList.remove('modal-open')
  body.classList.remove('body-lock')
  window.scrollTo(0,body.dataset.scrollY)
};

closeModalButton.addEventListener('click', closeModal);

const closeModalEsc = (keydownEvt) => {
  if (keydownEvt.keyCode === 27) {
    modal.classList.remove('modal-open')
    body.classList.remove('body-lock')
    window.scrollTo(0,body.dataset.scrollY)
  }
};

document.addEventListener('keydown', closeModalEsc);

body.addEventListener('click', function(e) {
  if (e.target !== openModalButton && e.target.closest('.modal__content') === null) {
    modal.classList.remove('modal-open')
    body.classList.remove('body-lock')
  }
  return
});


let allElems = document.querySelectorAll('.page-footer .page-footer__button-wrapper');
let allButton = document.querySelectorAll('.page-footer .open-accordion');
let closeNoJs = document.querySelectorAll('.page-footer__accordeon-item');

closeNoJs.forEach((element) => {
  element.classList.remove('no-js')
})

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

const input = document.querySelectorAll(".tel");

const prefixNumber = (str) => {
  if (str === "7") {
    return "7 (";
  }
  if (str === "8") {
    return "8 (";
  }
  if (str === "9") {
    return "7 (9";
  }
  return "7 (";
};

// ======================================

input.forEach((elem) => {
  elem.addEventListener("input", (e) => {
    const value = elem.value.replace(/\D+/g, "");
    const numberLength = 11;

    let result;
    if (elem.value.includes("+8") || elem.value[0] === "8") {
      result = "";
    } else {
      result = "+";
    }

  //
    for (let i = 0; i < value.length && i < numberLength; i++) {
      switch (i) {
        case 0:
          result += prefixNumber(value[i]);
          continue;
        case 4:
          result += ") ";
          break;
        case 7:
          result += "-";
          break;
        case 9:
          result += "-";
          break;
        default:
          break;
      }
      result += value[i];
    }
  //
    elem.value = result;
  });
});

var elemTextMobile = document.querySelector(".about-us__open-mobile");
var elemTextDesktop = document.querySelectorAll(".about-us__open-desktop");
var buttonOpen = document.querySelector(".about-us__button-mobile");

const textInvis = () => {
  elemTextDesktop.forEach ((element) =>{
    if(element.classList.contains('about-us__open-desktop')) {
      element.classList.remove('about-us__open-desktop')
      elemTextMobile.classList.add('about-us__mobile-invis')
      buttonOpen.innerHTML = "Свернуть";
  }
  else {
    element.classList.add('about-us__open-desktop')
    elemTextMobile.classList.remove('about-us__mobile-invis')
    buttonOpen.innerHTML = "Подробнее";
  }
  })
}

buttonOpen.addEventListener("click", textInvis);
