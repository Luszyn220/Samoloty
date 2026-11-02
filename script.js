document.addEventListener('DOMContentLoaded', () => {
  //  1. Obsługa  menu  
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  //  2. Przełącznik trybu ciemnego/jasnego 
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const nextTheme = isDark ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('theme', nextTheme);
      themeToggle.textContent = nextTheme === 'dark' ? '☀️' : '🌙';
    });
  }

  //  3. Przycisk powrotu na górę strony 
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopBtn.style.display = 'flex';
      } else {
        scrollTopBtn.style.display = 'none';
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  //  4.  Quiz wiedzy lotniczej 
  const quizData = [
    {
      question: "Z jaką prędkością przelotową latał Concorde?",
      options: ["Mach 1.15", "Mach 2.04", "Mach 3.0", "880 km/h"],
      correct: 1
    },
    {
      question: "Gdzie zamontowano trzeci silnik w samolocie DC-10?",
      options: [
        "W ogonie (u podstawy statecznika)",
        "Wewnątrz kadłuba z tyłu",
        "W części dziobowej",
        "Na pylonie nad skrzydłem"
      ],
      correct: 0
    },
    {
      question: "W którym roku odbył się pierwszy lot Concorde'a?",
      options: ["1962", "1969", "1976", "1980"],
      correct: 1
    }
  ];

  let currentQuiz = 0;
  let score = 0;

  const qText = document.getElementById('quizQuestion');
  const qOptions = document.getElementById('quizOptions');
  const nextBtn = document.getElementById('quizNextBtn');
  const qResult = document.getElementById('quizResult');

  function renderQuestion() {
    if (!qText || !qOptions) return;
    const item = quizData[currentQuiz];
    qText.textContent = (currentQuiz + 1) + ". " + item.question;
    qOptions.innerHTML = '';
    if (nextBtn) nextBtn.style.display = 'none';

    item.options.forEach((opt, idx) => {
      const b = document.createElement('button');
      b.className = 'quiz-opt-btn';
      b.textContent = opt;
      b.addEventListener('click', () => {
        const allBtns = qOptions.querySelectorAll('.quiz-opt-btn');
        allBtns.forEach((btn) => (btn.disabled = true));

        if (idx === item.correct) {
          b.classList.add('correct');
          score++;
        } else {
          b.classList.add('incorrect');
          allBtns[item.correct].classList.add('correct');
        }
        if (nextBtn) nextBtn.style.display = 'inline-block';
      });
      qOptions.appendChild(b);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentQuiz++;
      if (currentQuiz < quizData.length) {
        renderQuestion();
      } else {
        qText.textContent = 'Quiz ukończony!';
        qOptions.innerHTML = '';
        nextBtn.style.display = 'none';
        qResult.textContent = 'Twój wynik: ' + score + ' z ' + quizData.length + ' punktów.';
        qResult.style.fontWeight = 'bold';
        qResult.style.marginTop = '1rem';
      }
    });
  }

  renderQuestion();

  //  5. Walidacja formularza kontaktowego 
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('nameInput');
  const emailInput = document.getElementById('emailInput');
  const msgInput = document.getElementById('msgInput');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const msgError = document.getElementById('msgError');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      nameError.textContent = '';
      emailError.textContent = '';
      msgError.textContent = '';
      formStatus.textContent = '';

      if (nameInput.value.trim().length < 3) {
        nameError.textContent = 'Imię i nazwisko musi mieć co najmniej 3 znaki.';
        valid = false;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        emailError.textContent = 'Wpisz poprawny adres e-mail.';
        valid = false;
      }

      if (msgInput.value.trim().length < 10) {
        msgError.textContent = 'Wiadomość musi zawierać przynajmniej 10 znaków.';
        valid = false;
      }

      if (valid) {
        formStatus.textContent = 'Dziękujemy! Wiadomość została pomyślnie wysłana.';
        formStatus.style.color = '#16a34a';
        contactForm.reset();
      }
    });
  }
});
