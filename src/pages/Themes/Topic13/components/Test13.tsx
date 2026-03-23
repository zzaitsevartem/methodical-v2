import React, { useEffect } from 'react';
import styles from '../../Themes.module.scss';
import Swal from 'sweetalert2';

interface Test13Props {
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

const Test13: React.FC<Test13Props> = ({ onComplete, setTestAnswers, testAnswers }) => {
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
            question: "Какое событие нужно слушать для корректной обработки отправки формы?",
            options: [
                "click (на кнопке)",
                "submit (на форме)",
                "send (на форме)",
                "post (на сервере)",
            ],
            correctAnswer: "submit (на форме)",
        },
        {
            id: 2,
            question: "Как получить текст, который пользователь ввел в поле input?",
            options: [
                "input.text",
                "input.content",
                "input.value",
                "input.innerHTML",
            ],
            correctAnswer: "input.value",
        },
        {
            id: 3,
            question: "Зачем нужен атрибут required в HTML?",
            options: [
                "Для красоты",
                "Он делает поле обязательным для заполнения (браузер не даст отправить пустую форму)",
                "Он отправляет данные на сервер без нажатия кнопки",
                "Он скрывает поле",
            ],
            correctAnswer: "Он делает поле обязательным для заполнения (браузер не даст отправить пустую форму)",
        },
        {
            id: 4,
            question: "Что произойдет, если в обработчике формы НЕ вызвать event.preventDefault()?",
            options: [
                "Форма очистится",
                "Страница перезагрузится, и данные отправятся на сервер (или в URL)",
                "Компьютер зависнет",
                "Ничего не произойдет",
            ],
            correctAnswer: "Страница перезагрузится, и данные отправятся на сервер (или в URL)",
        },
        {
            id: 5,
            question: "Что такое Регулярные выражения (Regex)?",
            options: [
                "Это ошибки в коде",
                "Это мощный язык шаблонов для поиска и проверки текста (например, email)",
                "Это новый CSS-фреймворк",
                "Это способ стилизации форм",
            ],
            correctAnswer: "Это мощный язык шаблонов для поиска и проверки текста (например, email)",
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

export default Test13;