import React, { useEffect } from 'react';
import styles from '../../Themes.module.scss';
import Swal from 'sweetalert2';

interface Test6Props {
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

const Test6: React.FC<Test6Props> = ({ onComplete, setTestAnswers, testAnswers }) => {
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
      question: 'Какой подход используется для создания двухколоночного макета в секции About?',
      options: [
        'Flexbox с justify-content: space-between',
        'CSS Grid с grid-template-columns: 1fr 1fr',
        'Float: left и float: right',
        'Position: absolute',
      ],
      correctAnswer: 'Flexbox с justify-content: space-between',
    },
    {
      id: 2,
      question: 'Как сделать так, чтобы третье изображение в галерее занимало две строки?',
      options: [
        'grid-row: 1 / 3',
        'height: 100%',
        'grid-column: span 2',
        'row-span: 2',
      ],
      correctAnswer: 'grid-row: 1 / 3',
    },
    {
      id: 3,
      question: 'Какой object-fit используется для изображений в галерее About и почему?',
      options: [
        'cover — чтобы заполнить область с обрезкой краёв',
        'contain — чтобы показать всё изображение',
        'fill — чтобы растянуть по размеру',
        'none — чтобы сохранить оригинальный размер',
      ],
      correctAnswer: 'cover — чтобы заполнить область с обрезкой краёв',
    },
    {
      id: 4,
      question: 'Как меняется макет на мобильных устройствах?',
      options: [
        'flex-direction: column-reverse — галерея сверху, текст снизу',
        'grid-template-columns: 1fr — одна колонка',
        'display: block — блочная верстка',
        'width: 100% — полная ширина',
      ],
      correctAnswer: 'flex-direction: column-reverse — галерея сверху, текст снизу',
    },
    {
      id: 5,
      question: 'Какой шрифт используется для заголовка "About"?',
      options: [
        'Ballet, cursive',
        'Imperial Script, cursive',
        'Lexend, sans-serif',
        'Arial, sans-serif',
      ],
      correctAnswer: 'Ballet, cursive',
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

export default Test6;