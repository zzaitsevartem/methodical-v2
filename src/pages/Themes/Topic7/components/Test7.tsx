import React, { useEffect } from 'react';
import styles from '../../Themes.module.scss';
import Swal from 'sweetalert2';

interface Test7Props {
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

const Test7: React.FC<Test7Props> = ({ onComplete, setTestAnswers, testAnswers }) => {
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
      question: 'Почему финальный баннер в Frosted Muse размещается ПОСЛЕ секций Assortment и About, а не в начале?',
      options: [
        'Это стратегически верно: пользователь уже "разогрет" просмотром ассортимента и философии бренда, теперь ему проще решиться на действие',
        'Потому что он самый красивый и должен быть в конце',
        'Так требует семантика HTML',
        'Это случайность в дизайне',
      ],
      correctAnswer: 'Это стратегически верно: пользователь уже "разогрет" просмотром ассортимента и философии бренда, теперь ему проще решиться на действие',
    },
    {
      id: 2,
      question: 'Какой CSS-фильтр используется в финальном баннере для затемнения фонового изображения и почему именно он?',
      options: [
        'filter: brightness(0.7) — умножает значения RGB каждого пикселя на 0.7, создавая идеальный контраст для белого текста (~8:1)',
        'filter: opacity(0.7) — делает изображение полупрозрачным, но не затемняет его',
        'background-color: rgba(0,0,0,0.3) — добавляет тёмный полупрозрачный слой поверх',
        'box-shadow: inset 0 0 100px black — создаёт эффект виньетирования',
      ],
      correctAnswer: 'filter: brightness(0.7) — умножает значения RGB каждого пикселя на 0.7, создавая идеальный контраст для белого текста (~8:1)',
    },
    {
      id: 3,
      question: 'Почему в финальном баннере используется комбинация top: 50%; left: 50%; transform: translate(-50%, -50%) для центрирования текста?',
      options: [
        'Это классический метод абсолютного центрирования, который работает для любого размера блока и не зависит от его ширины/высоты',
        'Потому что Flexbox не работает с position: absolute',
        'Это самый современный способ центрирования',
        'Для совместимости со старыми браузерами',
      ],
      correctAnswer: 'Это классический метод абсолютного центрирования, который работает для любого размера блока и не зависит от его ширины/высоты',
    },
    {
      id: 4,
      question: 'Почему в футере Frosted Muse используется минималистичный дизайн (только копирайт) вместо типичных ссылок на соцсети, контакты и политики?',
      options: [
        'Это осознанный дизайн-выбор: для лендинга кондитерской важнее сфокусировать внимание на продукте, а лаконичность транслирует уверенность в бренде',
        'Потому что у кондитерской нет соцсетей',
        'Это ошибка дизайнера',
        'Для экономии места на мобильных',
      ],
      correctAnswer: 'Это осознанный дизайн-выбор: для лендинга кондитерской важнее сфокусировать внимание на продукте, а лаконичность транслирует уверенность в бренде',
    },
    {
      id: 5,
      question: 'Какая типографическая техника используется для заголовка "Indulge in Sweet Bliss" для улучшения читаемости на затемнённом фоне?',
      options: [
        'text-shadow: 2px 2px 4px rgba(0,0,0,0.3) — создаёт контурный эффект, отделяя буквы от фона (техника "выворотки")',
        'font-weight: 900 — делает текст жирнее',
        'color: #ffffff — просто белый цвет',
        'letter-spacing: 2px — увеличивает расстояние между буквами',
      ],
      correctAnswer: 'text-shadow: 2px 2px 4px rgba(0,0,0,0.3) — создаёт контурный эффект, отделяя буквы от фона (техника "выворотки")',
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

export default Test7;