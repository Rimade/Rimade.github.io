// Инициализация AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    offset: 100,
    duration: 800,
    easing: 'ease',
    once: false
  });

  // Плавная прокрутка к секциям
  document.querySelectorAll('nav a, .footer-links a, .scroll-down a, .back-to-top a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    });
  });

  // Подсветка активного пункта меню при скролле
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // Мобильное меню
  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.querySelector('nav');

  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    nav.classList.toggle('active');
  });

  // Закрытие мобильного меню при клике на ссылку
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('open');
      nav.classList.remove('active');
    });
  });

  // Анимация текста typing-text
  const typingText = document.querySelector('.typing-text');
  const texts = ['Frontend-разработчик', 'Веб-разработчик', 'React-разработчик', 'Fullstack-разработчик', 'JavaScript-энтузиаст'];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typingText.innerHTML = `<span>${currentText.substring(0, charIndex)}</span>`;
      charIndex--;

      if (charIndex < 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        // Пауза перед началом печати нового текста
        setTimeout(type, 500);
        return;
      }
    } else {
      typingText.innerHTML = `<span>${currentText.substring(0, charIndex)}</span>`;
      charIndex++;

      if (charIndex > currentText.length) {
        isDeleting = true;
        // Пауза перед началом удаления
        setTimeout(type, 1000);
        return;
      }
    }

    // Скорость печати/удаления
    const typingSpeed = isDeleting ? 50 : 150;
    setTimeout(type, typingSpeed);
  }

  // Запуск анимации печатающегося текста
  setTimeout(type, 1000);

  // Обработка отправки формы и перенаправления
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      // Отправляем форму асинхронно
      fetch(this.action, {
        method: this.method,
        body: new FormData(this),
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          // Перенаправляем на страницу благодарности
          window.location.href = 'thanks.html';
          return false;
        } else {
          throw new Error('Ошибка отправки формы');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });

      // Предотвращаем стандартную отправку формы
      e.preventDefault();
    });
  }

  // Отображение кнопки возврата наверх при прокрутке
  const backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  // Показывать/скрывать стрелку прокрутки в зависимости от секции
  const scrollDown = document.querySelector('.scroll-down');

  window.addEventListener('scroll', () => {
    // Получаем текущую активную секцию
    let currentSectionId = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 200) {
        currentSectionId = section.getAttribute('id');
      }
    });

    // Показываем стрелку только на секции home
    if (currentSectionId === 'home') {
      scrollDown.style.display = 'block';
    } else {
      scrollDown.style.display = 'none';
    }
  });
});