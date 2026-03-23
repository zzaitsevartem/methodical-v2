import React, { useEffect } from 'react';
import styles from '../../Themes.module.scss';
import Swal from 'sweetalert2';

interface Test1Props {
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

const Test1: React.FC<Test1Props> = ({ onComplete, setTestAnswers, testAnswers }) => {
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
      question: 'Почему веб-разработку в теории сравнивают с созданием современного умного города?',
      options: [
        'Потому что она включает планирование (дизайн), инфраструктуру (backend), фасады (frontend) и постоянную эксплуатацию (DevOps)',
        'Потому что веб-сайты такие же большие, как города',
        'Это просто красивая метафора без глубокого смысла',
        'Веб-разработка работает только в больших компаниях',
      ],
      correctAnswer: 'Потому что она включает планирование (дизайн), инфраструктуру (backend), фасады (frontend) и постоянную эксплуатацию (DevOps)',
    },
    {
      id: 2,
      question: 'Что из перечисленного относится к зоне ответственности frontend-разработчика?',
      options: [
        'Создание серверной логики и баз данных',
        'Оживление дизайна: верстка (HTML/CSS) и интерактивность (JavaScript)',
        'Настройка серверов и API',
        'Обеспечение безопасности приложения',
      ],
      correctAnswer: 'Оживление дизайна: верстка (HTML/CSS) и интерактивность (JavaScript)',
    },
    {
      id: 3,
      question: 'Почему HTML называют языком разметки, а не языком программирования?',
      options: [
        'Потому что он описывает структуру и семантику контента, а не содержит логику выполнения команд',
        'Потому что он устарел',
        'Потому что в нём нет циклов и условий',
        'Потому что он работает только в браузере',
      ],
      correctAnswer: 'Потому что он описывает структуру и семантику контента, а не содержит логику выполнения команд',
    },
    {
      id: 4,
      question: 'Какой тег в базовой структуре HTML-документа содержит метаданные и не отображается пользователю?',
      options: [
        '<body>',
        '<html>',
        '<head>',
        '<title>',
      ],
      correctAnswer: '<head>',
    },
    {
      id: 5,
      question: 'Почему в проекте Frosted Muse с самого начала создают отдельные файлы index.html, style.css и script.js?',
      options: [
        'Чтобы сразу разделить структуру (HTML), представление (CSS) и поведение (JS) — это основа чистого и поддерживаемого кода',
        'Потому что браузер не поддерживает встроенные стили',
        'Для ускорения загрузки страницы',
        'Это требование VS Code',
      ],
      correctAnswer: 'Чтобы сразу разделить структуру (HTML), представление (CSS) и поведение (JS) — это основа чистого и поддерживаемого кода',
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

export default Test1;