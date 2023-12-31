function jogodacobrinha() {
  window.location.href = 'Cobrinha/cobrinha.html';
}

function tetris() {
  window.location.href = 'Tetris/tetris.html';
}

function pong() {
  window.location.href = 'Pong/pong.html';
}

document.addEventListener('DOMContentLoaded', function() {
  var button = document.querySelector('.menu-contato');
  var menuContent = document.querySelector('.conteudo-contato');
  var closeButton = document.querySelector('.fechar-menu');
  var links = menuContent.querySelectorAll('a');

  button.addEventListener('click', function() {
    menuContent.classList.toggle('aberto');
  });

  closeButton.addEventListener('click', function() {
    menuContent.classList.remove('aberto');
  });

  links.forEach(function(link) {
    link.addEventListener('click', function() {
      menuContent.classList.remove('aberto');
    });
  });

  document.addEventListener('click', function(event) {
    var target = event.target;
    if (!menuContent.contains(target) && !button.contains(target)) {
      menuContent.classList.remove('aberto');
    }
  });
});

const botaozinjogue = document.querySelectorAll('.desc a[href^="#"]');

function getDistanceFromTheTop(element) {
  const id = element.getAttribute("href");
  return document.querySelector(id).offsetTop;
}

function scrollToSection(event) {
  event.preventDefault();
  const distanceFromTheTop = getDistanceFromTheTop(event.target) - 90;
  smoothScrollTo(0, distanceFromTheTop);
}

botaozinjogue.forEach((link) => {
  link.addEventListener("click", scrollToSection);
});

function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== "undefined" ? duration : 400;

  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1)
      return (distance / 2) * time * time * time * time + from;
    return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60);
}