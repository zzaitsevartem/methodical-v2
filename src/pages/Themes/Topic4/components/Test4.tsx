import React, { useEffect } from 'react';
import styles from '../../Themes.module.scss';
import Swal from 'sweetalert2';

interface Test4Props {
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

const Test4: React.FC<Test4Props> = ({ onComplete, setTestAnswers, testAnswers }) => {
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
      question: 'Почему Hero-секция считается самым важным элементом главной страницы?',
      options: [
        'У пользователя есть всего 3–5 секунд, чтобы решить остаться — Hero должна сразу передать ценность бренда и вызвать эмоцию',
        'Потому что она самая большая',
        'Это требование поисковых систем',
        'Она содержит всю информацию о сайте',
      ],
      correctAnswer: 'У пользователя есть всего 3–5 секунд, чтобы решить остаться — Hero должна сразу передать ценность бренда и вызвать эмоцию',
    },
    {
      id: 2,
      question: 'Почему в Hero-секции используется object-fit: cover для <img>, а не background-image?',
      options: [
        'object-fit сохраняет семантику изображения (alt, lazy loading, SEO), но ведёт себя как background-size: cover',
        'background-image быстрее загружается',
        'object-fit не поддерживается в старых браузерах',
        'background-image позволяет добавлять текст поверх',
      ],
      correctAnswer: 'object-fit сохраняет семантику изображения (alt, lazy loading, SEO), но ведёт себя как background-size: cover',
    },
    {
      id: 3,
      question: 'Почему текстовый блок в Hero центрируется комбинацией top: 50%; left: 50%; transform: translate(-50%, -50%)?',
      options: [
        'Это надёжный способ абсолютного центрирования для любого размера контейнера, не зависящий от высоты/ширины текста',
        'Потому что Flexbox не работает с absolute',
        'Это единственный способ',
        'Для совместимости с IE',
      ],
      correctAnswer: 'Это надёжный способ абсолютного центрирования для любого размера контейнера, не зависящий от высоты/ширины текста',
    },
    {
      id: 4,
      question: 'Почему в Hero-секции добавлен padding-top: 70px к контейнеру?',
      options: [
        'Чтобы компенсировать высоту фиксированной шапки — контент не "залезал" под неё при прокрутке к верху',
        'Для создания отступа от логотипа',
        'Это декоративный отступ',
        'Для мобильной адаптивности',
      ],
      correctAnswer: 'Чтобы компенсировать высоту фиксированной шапки — контент не "залезал" под неё при прокрутке к верху',
    },
    {
      id: 5,
      question: 'Почему кнопка CTA в Hero имеет форму "пилюли" (border-radius: 25px) и инвертирует цвета при hover?',
      options: [
        'Скруглённые углы воспринимаются как дружелюбные, а инверсия даёт чёткий сигнал "я интерактивен" — это повышает кликабельность',
        'Потому что квадратные кнопки устарели',
        'Для экономии места',
        'Это требование дизайнера',
      ],
      correctAnswer: 'Скруглённые углы воспринимаются как дружелюбные, а инверсия даёт чёткий сигнал "я интерактивен" — это повышает кликабельность',
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

export default Test4;