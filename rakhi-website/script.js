document.addEventListener("DOMContentLoaded", () => {
  /* === NAVIGATION === */
  const screens = document.querySelectorAll('.screen');
  let currentScreen = 0;

  function goToScreen(index) {
    if (index >= 0 && index < screens.length) {
      screens[currentScreen].classList.remove('active');
      currentScreen = index;
      screens[currentScreen].classList.add('active');
    }
  }

  const continueBtns = document.querySelectorAll('.continue-btn');
  continueBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      goToScreen(currentScreen + 1);
    });
  });

  /* === QUIZ LOGIC === */
  const questions = document.querySelectorAll('.quiz-question');
  let currentQuestion = 0;

  function checkAnswer(button, isCorrect) {
    if (isCorrect) {
      document.body.classList.add('flash-green');
      setTimeout(() => {
        document.body.classList.remove('flash-green');
        nextQuestion();
      }, 800);
    } else {
      document.body.classList.add('flash-red');
      setTimeout(() => {
        document.body.classList.remove('flash-red');
      }, 500);
    }
  }

  function nextQuestion() {
    questions[currentQuestion].classList.remove('active');
    currentQuestion++;
    if (currentQuestion < questions.length) {
      questions[currentQuestion].classList.add('active');
    } else {
      // Quiz finished, go to next screen
      goToScreen(currentScreen + 1);
    }
  }

  // Attach listeners to quiz options
  document.querySelectorAll('.quiz-option').forEach(option => {
    option.addEventListener('click', function() {
      const isCorrect = this.dataset.correct === 'true';
      checkAnswer(this, isCorrect);
    });
  });

  /* === MEMORY REVEALS === */
  document.querySelectorAll('.memory-section').forEach(section => {
    const reveals = section.querySelectorAll('.reveal-btn');
    const wrappers = section.querySelectorAll('.memory-wrapper');
    const pageNote = section.querySelector('.page-note');
    let revealedCount = 0;

    reveals.forEach((btn, index) => {
      btn.addEventListener('click', function() {
        // Reveal photo
        const card = this.closest('.photo-card');
        card.classList.add('revealed');
        revealedCount++;

        // Show next memory wrapper if it exists
        if (index + 1 < wrappers.length) {
          setTimeout(() => {
            wrappers[index + 1].classList.add('active');
            // Scroll to next memory slightly
            wrappers[index + 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 1500);
        } else if (pageNote) {
          // If all memories revealed on this page, show final note
          setTimeout(() => {
            pageNote.classList.add('show');
          }, 1500);
        }
      });
    });
  });
});
