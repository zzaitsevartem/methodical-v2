import React, { useEffect } from 'react';
import styles from '../../Themes.module.scss';
import Swal from 'sweetalert2';

interface Test14Props {
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

const Test14: React.FC<Test14Props> = ({ onComplete, setTestAnswers, testAnswers }) => {
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
            question: "Где физически хранятся данные LocalStorage?",
            options: [
                "На сервере сайта",
                "В браузере пользователя (на его компьютере)",
                "В облаке Google",
                "В оперативной памяти (исчезают при закрытии)",
            ],
            correctAnswer: "В браузере пользователя (на его компьютере)",
        },
        {
            id: 2,
            question: "Какой метод сохраняет данные?",
            options: [
                "localStorage.save('key', 'value')",
                "localStorage.setItem('key', 'value')",
                "localStorage.add('key', 'value')",
                "localStorage.write('key', 'value')",
            ],
            correctAnswer: "localStorage.setItem('key', 'value')",
        },
        {
            id: 3,
            question: "Какой тип данных можно хранить в LocalStorage?",
            options: [
                "Только Строки (Strings)",
                "Объекты и массивы напрямую",
                "Функции",
                "Картинки в бинарном формате",
            ],
            correctAnswer: "Только Строки (Strings)",
        },
        {
            id: 4,
            question: "Что делает JSON.stringify()?",
            options: [
                "Превращает строку в объект",
                "Превращает объект в строку (сериализует)",
                "Удаляет данные",
                "Шифрует пароли",
            ],
            correctAnswer: "Превращает объект в строку (сериализует)",
        },
        {
            id: 5,
            question: "Как получить данные обратно?",
            options: [
                "localStorage.getItem('key')",
                "localStorage.fetch('key')",
                "localStorage.read('key')",
                "localStorage.take('key')",
            ],
            correctAnswer: "localStorage.getItem('key')",
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

export default Test14;