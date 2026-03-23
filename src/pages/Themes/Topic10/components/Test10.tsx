import React, { useEffect } from 'react';
import styles from '../../Themes.module.scss';
import Swal from 'sweetalert2';

interface Test10Props {
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

const Test10: React.FC<Test10Props> = ({ onComplete, setTestAnswers, testAnswers }) => {
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
      question: "Что выведет этот код? console.log(2 + 2 * 2);",
      options: [
        "8",
        "6",
        "4",
        "NaN",
      ],
      correctAnswer: "6",
    },
    {
      id: 2,
      question: "В чём подвох при работе с методом toFixed()?",
      options: [
        "Он не работает с отрицательными числами",
        "Он округляет всегда в меньшую сторону",
        "Он возвращает строку, а не число",
        "Он доступен только в современных браузерах",
      ],
      correctAnswer: "Он возвращает строку, а не число",
    },
    {
      id: 3,
      question: "Какой результат выполнения кода? let word = 'Привет'; console.log(word[2]);",
      options: [
        "и",
        "р",
        "undefined",
        "ошибка",
      ],
      correctAnswer: "и",
    },
    {
      id: 4,
      question: "Что произойдёт при попытке изменить строку: let str = 'hello'; str[0] = 'H';?",
      options: [
        "Строка станет 'Hello'",
        "Строка не изменится",
        "Будет ошибка TypeError",
        "Строка станет undefined",
      ],
      correctAnswer: "Строка не изменится",
    },
    {
      id: 5,
      question: "Для чего используется оператор %?",
      options: [
        "Для получения процента от числа",
        "Для деления с остатком",
        "Для форматирования строк",
        "Для объявления переменной",
      ],
      correctAnswer: "Для деления с остатком",
    },
    {
      id: 6,
      question: "Что выведет этот код? console.log(Math.floor(4.9));",
      options: [
        "5",
        "4",
        "4.9",
        "undefined",
      ],
      correctAnswer: "4",
    },
    {
      id: 7,
      question: "Какой метод строки лучше всего подходит для удаления лишних пробелов, которые мог ввести пользователь?",
      options: [
        "slice()",
        "trim()",
        "replace()",
        "toLowerCase()",
      ],
      correctAnswer: "trim()",
    },
    {
      id: 8,
      question: "Что вернёт выражение Number('Петя')?",
      options: [
        "0",
        "Петя",
        "NaN",
        "undefined",
      ],
      correctAnswer: "NaN",
    },
    {
      id: 9,
      question: "Как правильно вставить переменную в строку с использованием шаблонных строк?",
      options: [
        "'Привет, ' + name",
        "\"Привет, ${name}\"",
        "`Привет, ${name}`",
        "'Привет, %name%'",
      ],
      correctAnswer: "`Привет, ${name}`",
    },
    {
      id: 10,
      question: "Какой месяц вернёт метод getMonth() в JavaScript для января?",
      options: [
        "1",
        "0",
        "Январь",
        "undefined",
      ],
      correctAnswer: "0",
    },
    {
      id: 11,
      question: "Что выведет этот код? console.log(10 + '20');",
      options: [
        "30",
        "1020",
        "NaN",
        "Ошибка",
      ],
      correctAnswer: "1020",
    },
    {
      id: 12,
      question: "Какой результат у выражения: 10 % 3?",
      options: [
        "3",
        "1",
        "3.33",
        "0",
      ],
      correctAnswer: "1",
    },
    {
      id: 13,
      question: "Что выведет этот код? let x = 12.345; console.log(x.toFixed(2));",
      options: [
        "12.34",
        "12.35",
        "12.345",
        "12.3",
      ],
      correctAnswer: "12.35",
    },
    {
      id: 14,
      question: "Как проверить, что значение является NaN?",
      options: [
        "value === NaN",
        "value == NaN",
        "isNaN(value)",
        "value.isNaN()",
      ],
      correctAnswer: "isNaN(value)",
    },
    {
      id: 15,
      question: "Что вернёт выражение: Math.max(10, 20, 5)?",
      options: [
        "5",
        "10",
        "20",
        "NaN",
      ],
      correctAnswer: "20",
    },
  ].sort(() => Math.random() - 0.5); // Перемешиваем вопросы

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

export default Test10;