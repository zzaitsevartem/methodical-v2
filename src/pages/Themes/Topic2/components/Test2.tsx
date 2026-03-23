import React, { useEffect } from 'react';
import styles from '../../Themes.module.scss';
import Swal from 'sweetalert2';

interface Test2Props {
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

const Test2: React.FC<Test2Props> = ({ onComplete, setTestAnswers, testAnswers }) => {
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
      question: 'Почему семантические теги HTML5 (<header>, <nav> и т.д.) важны для доступности (accessibility)?',
      options: [
        'Скринридеры используют их как "landmarks", озвучивая "основная навигация" или "шапка сайта", помогая слабовидящим ориентироваться',
        'Они ускоряют загрузку страницы',
        'Они обязательны для валидности HTML',
        'Они влияют только на внешний вид',
      ],
      correctAnswer: 'Скринридеры используют их как "landmarks", озвучивая "основная навигация" или "шапка сайта", помогая слабовидящим ориентироваться',
    },
    {
      id: 2,
      question: 'В чём преимущество использования тега <nav> именно для основного меню сайта?',
      options: [
        'Он предназначен исключительно для основных навигационных блоков, что улучшает SEO и доступность, в отличие от простых ссылок в <div>',
        'Он автоматически добавляет стили',
        'Он обязателен для всех ссылок',
        'Он работает только на мобильных',
      ],
      correctAnswer: 'Он предназначен исключительно для основных навигационных блоков, что улучшает SEO и доступность, в отличие от простых ссылок в <div>',
    },
    {
      id: 3,
      question: 'Почему для функциональной иконки (например, корзины) атрибут alt должен быть описательным, а не пустым?',
      options: [
        'Чтобы скринридеры озвучили её назначение ("Корзина покупок"), а не просто "изображение", помогая понять контекст',
        'Для SEO-оптимизации',
        'Чтобы изображение загружалось быстрее',
        'Это требование браузеров',
      ],
      correctAnswer: 'Чтобы скринридеры озвучили её назначение ("Корзина покупок"), а не просто "изображение", помогая понять контекст',
    },
    {
      id: 4,
      question: 'Почему в шапке используется комбинация <div class="burger-menu"> с тремя <span>, а не готовое изображение бургера?',
      options: [
        'Это чистый CSS-подход: три линии легко анимировать в крестик при открытии меню с помощью transform и transition',
        'Изображение не поддерживается на мобильных',
        'Это быстрее загружается',
        'Бургер-меню всегда должно быть текстом',
      ],
      correctAnswer: 'Это чистый CSS-подход: три линии легко анимировать в крестик при открытии меню с помощью transform и transition',
    },
    {
      id: 5,
      question: 'Почему атрибут class используется для группировки элементов под стилизацию, а не id?',
      options: [
        'class позволяет применять одни стили к нескольким элементам и легко комбинировать, в отличие от id, который уникален для одного элемента',
        'id быстрее работает',
        'class устарел',
        'id обязателен для всех элементов',
      ],
      correctAnswer: 'class позволяет применять одни стили к нескольким элементам и легко комбинировать, в отличие от id, который уникален для одного элемента',
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

export default Test2;