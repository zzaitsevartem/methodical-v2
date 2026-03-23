import React, { useEffect } from 'react';
import styles from '../../Themes.module.scss';
import Swal from 'sweetalert2';

interface Test11Props {
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

const Test11: React.FC<Test11Props> = ({ onComplete, setTestAnswers, testAnswers }) => {
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
            question: "Что такое DOM (Document Object Model)?",
            options: [
                "Это язык программирования для стилизации",
                "Это объектная модель документа: представление HTML-страницы в виде дерева объектов",
                "Это база данных внутри браузера",
                "Это название нового фреймворка",
            ],
            correctAnswer: "Это объектная модель документа: представление HTML-страницы в виде дерева объектов",
        },
        {
            id: 2,
            question: "Какой метод находит ПЕРВЫЙ элемент по CSS-селектору?",
            options: [
                "document.findAll('.box')",
                "document.getElementById('.box')",
                "document.querySelector('.box')",
                "document.search('.box')",
            ],
            correctAnswer: "document.querySelector('.box')",
        },
        {
            id: 3,
            question: "Как правильно изменить цвет текста элемента на синий через JS?",
            options: [
                "element.style.color = \"blue\"",
                "element.style.font-color = \"blue\"",
                "element.css(\"color\", \"blue\")",
                "element.color = \"blue\"",
            ],
            correctAnswer: "element.style.color = \"blue\"",
        },
        {
            id: 4,
            question: "Зачем нужно свойство classList?",
            options: [
                "Чтобы удалить все стили элемента",
                "Чтобы удобно добавлять, удалять и переключать CSS-классы",
                "Чтобы создать новый HTML-тег",
                "Чтобы получить список всех элементов на странице",
            ],
            correctAnswer: "Чтобы удобно добавлять, удалять и переключать CSS-классы",
        },
        {
            id: 5,
            question: "Какой метод используется для добавления обработчика событий (например, клика)?",
            options: [
                "element.on('click', func)",
                "element.addEventListener('click', func)",
                "element.listen('click', func)",
                "element.click(func)",
            ],
            correctAnswer: "element.addEventListener('click', func)",
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

export default Test11;