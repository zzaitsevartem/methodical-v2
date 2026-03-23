import React, { useEffect } from 'react';
import styles from '../../Themes.module.scss';
import Swal from 'sweetalert2';

interface Test12Props {
    onComplete: () => void;
    setTestAnswers: React.Dispatch<React.SetStateAction<{ [key: number]: string }>>;
    testAnswers: { [key: number]: string };
}

interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: string;
}

const Test12: React.FC<Test12Props> = ({ onComplete, setTestAnswers, testAnswers }) => {
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (Object.keys(testAnswers).length > 0) {
                e.preventDefault();
                e.returnValue = 'Вы не завершили тест. Если уйдёте, прогресс будет потерян. Продолжить?';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [testAnswers]);

    const questions: Question[] = [
        {
            id: 1,
            question: "Какой современный метод используется для добавления обработчика событий?",
            options: [
                "element.onclick = func",
                "element.addEventListener('click', func)",
                "element.attachEvent('onclick', func)",
                "element.handle('click', func)",
            ],
            correctAnswer: "element.addEventListener('click', func)",
        },
        {
            id: 2,
            question: "Что хранится в объекте event (или e), который передаётся в функцию?",
            options: [
                "Ссылка на HTML-файл",
                "Глобальные переменные",
                "Детали произошедшего события (координаты, нажатые клавиши, целевой элемент)",
                "Только время клика",
            ],
            correctAnswer: "Детали произошедшего события (координаты, нажатые клавиши, целевой элемент)",
        },
        {
            id: 3,
            question: "Зачем нужен метод event.preventDefault()?",
            options: [
                "Чтобы удалить элемент со страницы",
                "Чтобы остановить выполнение скрипта",
                "Чтобы отменить стандартное действие браузера (например, переход по ссылке)",
                "Чтобы закрыть окно браузера",
            ],
            correctAnswer: "Чтобы отменить стандартное действие браузера (например, переход по ссылке)",
        },
        {
            id: 4,
            question: "Что такое 'Всплытие событий' (Event Bubbling)?",
            options: [
                "Когда событие срабатывает сначала на самом вложенном элементе, а потом на его родителях",
                "Когда событие срабатывает только на window",
                "Когда элементы плавают по экрану",
                "Такого понятия нет в JS",
            ],
            correctAnswer: "Когда событие срабатывает сначала на самом вложенном элементе, а потом на его родителях",
        },
        {
            id: 5,
            question: "Почему важно удалять ненужные обработчики событий?",
            options: [
                "Это не обязательно",
                "Чтобы избежать утечек памяти (Memory Leaks)",
                "Чтобы CSS лучше работал",
                "Чтобы очистить историю браузера",
            ],
            correctAnswer: "Чтобы избежать утечек памяти (Memory Leaks)",
        },
    ];

    const handleAnswer = (questionId: number, answer: string) => {
        setTestAnswers((prev) => ({ ...prev, [questionId]: answer }));
    };

    const checkTest = () => {
        if (Object.keys(testAnswers).length !== questions.length) {
            Swal.fire({
                title: 'Ошибка',
                text: 'Ответьте на все вопросы!',
                icon: 'error',
                confirmButtonColor: '#F59E0B',
            });
            return;
        }

        const allCorrect = questions.every((q) => testAnswers[q.id] === q.correctAnswer);
        if (allCorrect) {
            onComplete();
            Swal.fire({
                title: 'Успех',
                text: 'Тест пройден! Доступ к практике открыт.',
                icon: 'success',
                confirmButtonColor: '#F59E0B',
            });
        } else {
            Swal.fire({
                title: 'Ошибка',
                text: 'Есть неверные ответы. Попробуйте снова!',
                icon: 'error',
                confirmButtonColor: '#F59E0B',
            });
        }
    };

    return (
        <div className={styles.test}>
            {questions.map((q) => (
                <div key={q.id} className={styles.question}>
                    <p className={styles.questionText}>{q.question}</p>
                    {q.options.map((option) => (
                        <label key={option} className={styles.option}>
                            <input
                                type="radio"
                                name={`question-${q.id}`}
                                value={option}
                                checked={testAnswers[q.id] === option}
                                onChange={() => handleAnswer(q.id, option)}
                            />
                            {option}
                        </label>
                    ))}
                </div>
            ))}
            <button
                className={styles.submitButton}
                onClick={checkTest}
                disabled={Object.keys(testAnswers).length !== questions.length}
            >
                Проверить
            </button>
        </div>
    );
};

export default Test12;