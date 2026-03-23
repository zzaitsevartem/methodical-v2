import React, { useEffect } from 'react';
import styles from '../../Themes.module.scss';
import Swal from 'sweetalert2';

interface Test15Props {
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

const Test15: React.FC<Test15Props> = ({ onComplete, setTestAnswers, testAnswers }) => {
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
            question: "Какая команда создает новый репозиторий Git в папке с вашим проектом?",
            options: [
                "git new",
                "git init",
                "git start",
                "git create",
            ],
            correctAnswer: "git init",
        },
        {
            id: 2,
            question: "Что делает команда git commit?",
            options: [
                "Отправляет всё в интернет",
                "Удаляет проект",
                "Создает 'снимок' (сохраняет) состояние файлов в истории",
                "Проверяет проект на ошибки",
            ],
            correctAnswer: "Создает 'снимок' (сохраняет) состояние файлов в истории",
        },
        {
            id: 3,
            question: "Для чего нужен .gitignore?",
            options: [
                "Это список друзей",
                "Чтобы перечислить файлы, которые Git НЕ должен отслеживать (мусор)",
                "Чтобы игнорировать ошибки",
                "Это пароль от репозитория",
            ],
            correctAnswer: "Чтобы перечислить файлы, которые Git НЕ должен отслеживать (мусор)",
        },
        {
            id: 4,
            question: "Что делает команда git push?",
            options: [
                "Толкает (отправляет) ваши изменения на удаленный сервер (GitHub)",
                "Тянет (скачивает) изменения",
                "Удаляет ветку",
                "Сливает ветки",
            ],
            correctAnswer: "Толкает (отправляет) ваши изменения на удаленный сервер (GitHub)",
        },
        {
            id: 5,
            question: "Что такое GitHub Pages?",
            options: [
                "Платная подписка",
                "Книга о Git",
                "Бесплатный хостинг для статических сайтов из вашего репозитория",
                "Социальная сеть",
            ],
            correctAnswer: "Бесплатный хостинг для статических сайтов из вашего репозитория",
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

export default Test15;