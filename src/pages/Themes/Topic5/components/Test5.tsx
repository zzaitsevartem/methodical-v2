import React, { useEffect } from 'react';
import styles from '../../Themes.module.scss';
import Swal from 'sweetalert2';

interface Test5Props {
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

const Test5: React.FC<Test5Props> = ({ onComplete, setTestAnswers, testAnswers }) => {
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
      question: 'Какое свойство CSS включает режим сетки?',
      options: [
        'display: grid',
        'display: flex',
        'grid: true',
        'layout: grid',
      ],
      correctAnswer: 'display: grid',
    },
    {
      id: 2,
      question: 'Как создать 4 колонки одинаковой ширины в CSS Grid?',
      options: [
        'grid-template-columns: repeat(4, 1fr)',
        'grid-columns: 4',
        'grid-template: 4 columns',
        'columns: 4',
      ],
      correctAnswer: 'grid-template-columns: repeat(4, 1fr)',
    },
    {
      id: 3,
      question: 'Какое значение object-fit сохраняет пропорции изображения без обрезки?',
      options: [
        'contain',
        'cover',
        'fill',
        'none',
      ],
      correctAnswer: 'contain',
    },
    {
      id: 4,
      question: 'Какой медиазапрос для мобильных устройств?',
      options: [
        '@media (max-width: 768px)',
        '@media (mobile)',
        '@media (width < 768)',
        '@media screen and (phone)',
      ],
      correctAnswer: '@media (max-width: 768px)',
    },
    {
      id: 5,
      question: 'Какое свойство задает расстояние между элементами в Grid?',
      options: [
        'gap',
        'margin',
        'spacing',
        'grid-gap',
      ],
      correctAnswer: 'gap',
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

export default Test5;