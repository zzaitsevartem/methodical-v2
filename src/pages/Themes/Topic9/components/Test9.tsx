import React, { useEffect } from 'react';
import styles from '../../Themes.module.scss';
import Swal from 'sweetalert2';

interface Test9Props {
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

const Test9: React.FC<Test9Props> = ({ onComplete, setTestAnswers, testAnswers }) => {
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
      question: "В чём ключевое различие между 'let' и 'const' в современном JavaScript?",
      options: [
        "'let' создаёт переменную, которую можно менять, а 'const' — константу, которую нельзя переприсвоить. Рекомендуется использовать 'const' по умолчанию.",
        "'const' работает быстрее, чем 'let', но занимает больше памяти.",
        "'let' можно использовать только внутри функций, а 'const' — везде.",
        "Никакой разницы нет, это просто синтаксический сахар для 'var'.",
      ],
      correctAnswer: "'let' создаёт переменную, которую можно менять, а 'const' — константу, которую нельзя переприсвоить. Рекомендуется использовать 'const' по умолчанию.",
    },
    {
      id: 2,
      question: "Что вернёт оператор typeof, если применить его к значению null (typeof null)?",
      options: [
        "\"null\"",
        "\"undefined\"",
        "\"object\"",
        "\"number\"",
      ],
      correctAnswer: "\"object\"",
    },
    {
      id: 3,
      question: "Какой результат мы получим при сложении числа и строки: 10 + \"5\"?",
      options: [
        "15 (число)",
        "\"105\" (строка)",
        "NaN (Not a Number)",
        "Ошибка выполнения (TypeError)",
      ],
      correctAnswer: "\"105\" (строка)",
    },
    {
      id: 4,
      question: "Какой тип данных всегда возвращает функция prompt(), даже если пользователь ввел число?",
      options: [
        "Number",
        "String",
        "Boolean",
        "Object",
      ],
      correctAnswer: "String",
    },
    {
      id: 5,
      question: "Почему использование шаблонных строк (`...`) лучше, чем обычная конкатенация (+)?",
      options: [
        "Они позволяют встраивать переменные через ${...} и поддерживают многострочный текст, что делает код чище и читаемее.",
        "Они работают быстрее на старых компьютерах.",
        "Они автоматически переводят любой текст на язык пользователя.",
        "Они позволяют использовать смайлики, а обычные строки — нет.",
      ],
      correctAnswer: "Они позволяют встраивать переменные через ${...} и поддерживают многострочный текст, что делает код чище и читаемее.",
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

export default Test9;