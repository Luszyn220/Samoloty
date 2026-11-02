document.addEventListener('DOMContentLoaded', () => {
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
  const qResult = document
