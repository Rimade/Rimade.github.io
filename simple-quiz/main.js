// Элементы страницы
const startScreen = document.getElementById('start-screen');
const levelScreen = document.getElementById('level-screen');
const quizScreen = document.getElementById('quiz');
const header = document.getElementById('header');
const list = document.getElementById('list');
const submitButton = document.getElementById('submit');
const progressBarFill = document.querySelector('.progress-bar-fill');

document.body.classList.toggle('dark-mode');
// Параметры уровней
const levels = {
	easy: { questions: 7, time: 30 },
	medium: { questions: 10, time: 20 },
	hard: { questions: 14, time: 18 },
};

// Глобальные переменные
let selectedLevel = null;
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timerInterval;

// Перемешивание массива
function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

// Переход на экран выбора уровня
document.getElementById('start-btn').addEventListener('click', () => {
	startScreen.classList.add('hidden');
	levelScreen.classList.remove('hidden');
});

// Выбор уровня
levelScreen.addEventListener('click', (e) => {
	if (e.target.dataset.level) {
		selectedLevel = levels[e.target.dataset.level];
		startQuiz();
	}
});

// Старт викторины
function startQuiz() {
	levelScreen.classList.add('hidden');
	quizScreen.classList.remove('hidden');

	// Загружаем вопросы и перемешиваем
	loadQuestions()
		.then(() => {
			questions = questions.slice(0, selectedLevel.questions); // Обрезаем по лимиту
			shuffle(questions);
			showQuestion();
			startTimer();
		})
		.catch((error) => {
			alert('Ошибка загрузки вопросов. Проверьте соединение с сервером.');
			console.error(error);
		});
}

// Таймер
function startTimer() {
	const timerDisplay = document.createElement('div');
	timerDisplay.className = 'timer';
	timerDisplay.textContent = `Осталось: ${selectedLevel.time} сек.`;
	quizScreen.prepend(timerDisplay);

	let timeLeft = selectedLevel.time;
	timerInterval = setInterval(() => {
		timeLeft--;
		timerDisplay.textContent = `Осталось: ${timeLeft} сек.`;

		if (timeLeft <= 0) {
			clearInterval(timerInterval);
			showResults(); // Завершаем игру
		}
	}, 1000);
}

// Загрузка вопросов
async function loadQuestions() {
	try {
		const response = await fetch('https://09e7808c9eb3fa79.mokky.dev/questions'); // Замените на ваш API
		if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
		const data = await response.json();
		if (!Array.isArray(data)) throw new Error('Неверный формат данных');
		questions = data; // Предполагается, что API возвращает массив вопросов
	} catch (error) {
		throw error;
	}
}

// Показ вопроса
function showQuestion() {
	if (currentQuestionIndex >= questions.length) {
		showResults();
		return;
	}

	const currentQuestion = questions[currentQuestionIndex];
	header.innerHTML = `<h2 class="title">${currentQuestion.text}</h2>`;
	list.innerHTML = currentQuestion.answers
		.map(
			(answer, index) =>
				`<li>
                    <label>
                        <input type="radio" name="answer" value="${index}" />
                        ${answer.text}
                    </label>
                </li>`
		)
		.join('');

	// Показываем кнопку "Ответить", если выбрали вариант
	list.addEventListener('change', () => {
		submitButton.classList.remove('hidden');
	});
}

// Проверка ответа
function checkAnswer() {
	const selected = list.querySelector("input[name='answer']:checked");

	if (!selected) {
		list.classList.add('shake');
		setTimeout(() => list.classList.remove('shake'), 500);
		return;
	}

	const answerIndex = parseInt(selected.value, 10);
	const correctAnswer = questions[currentQuestionIndex].answers.find(
		(answer) => answer.isCorrect
	);

	if (questions[currentQuestionIndex].answers[answerIndex] === correctAnswer) {
		score++;
	}

	currentQuestionIndex++;
	updateProgressBar();
	submitButton.classList.add('hidden'); // Скрываем кнопку после ответа
	showQuestion();
}

// Обновление прогресс-бара
function updateProgressBar() {
	const progress = ((currentQuestionIndex / questions.length) * 100).toFixed(2);
	progressBarFill.style.width = `${progress}%`;
}

// Завершение викторины
function showResults() {
	clearInterval(timerInterval); // Останавливаем таймер
	header.innerHTML = `<h2 class="title">Ваш результат</h2>
        <p class="summary">Вы ответили правильно на ${score} из ${questions.length} вопросов.</p>`;
	list.innerHTML = '';
	progressBarFill.style.width = '100%';
	submitButton.style.display = 'none';

	// Создаём кнопку "Начать заново"
	const restartButton = document.createElement('button');
	restartButton.textContent = 'Начать заново';
	restartButton.classList.add('quiz-restart');
	restartButton.addEventListener('click', () => {
		location.reload(); // Перезагрузка страницы
	});
	header.appendChild(restartButton);
}

// Обработчик нажатия на кнопку "Ответить"
submitButton.addEventListener('click', checkAnswer);
