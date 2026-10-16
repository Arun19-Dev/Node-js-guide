/* ============================================
   Quiz System – MCQ with instant feedback
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initQuizzes();
});

function initQuizzes() {
    document.querySelectorAll('.quiz-container').forEach(quiz => {
        const submitBtn = quiz.querySelector('.quiz-submit-btn');
        if (!submitBtn) return;

        submitBtn.addEventListener('click', () => {
            const correctAnswer = quiz.dataset.answer;
            const options = quiz.querySelectorAll('.quiz-option');
            const selected = quiz.querySelector('input[type="radio"]:checked');
            const feedback = quiz.querySelector('.quiz-feedback');

            if (!selected) {
                if (feedback) {
                    feedback.className = 'quiz-feedback incorrect';
                    feedback.textContent = 'Please select an answer before submitting.';
                    feedback.style.display = 'block';
                }
                return;
            }

            const userAnswer = selected.value;

            // Reset all
            options.forEach(opt => {
                opt.classList.remove('correct', 'incorrect');
            });

            if (userAnswer === correctAnswer) {
                selected.closest('.quiz-option').classList.add('correct');
                if (feedback) {
                    feedback.className = 'quiz-feedback correct';
                    feedback.innerHTML = '<i class="bi bi-check-circle-fill"></i> Correct! ' + (quiz.dataset.explanation || '');
                    feedback.style.display = 'block';
                }
            } else {
                selected.closest('.quiz-option').classList.add('incorrect');
                // Highlight the correct one
                options.forEach(opt => {
                    const radio = opt.querySelector('input[type="radio"]');
                    if (radio && radio.value === correctAnswer) {
                        opt.classList.add('correct');
                    }
                });
                if (feedback) {
                    feedback.className = 'quiz-feedback incorrect';
                    feedback.innerHTML = '<i class="bi bi-x-circle-fill"></i> Incorrect. The correct answer is highlighted. ' + (quiz.dataset.explanation || '');
                    feedback.style.display = 'block';
                }
            }

            // Disable further changes
            options.forEach(opt => {
                const radio = opt.querySelector('input[type="radio"]');
                if (radio) radio.disabled = true;
                opt.style.cursor = 'default';
            });
            submitBtn.disabled = true;
            submitBtn.textContent = 'Answered';
            submitBtn.style.opacity = '0.6';
        });
    });
}
