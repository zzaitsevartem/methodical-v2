import React, { useEffect } from 'react';
import styles from '../../Themes.module.scss';
import Swal from 'sweetalert2';

interface Test3Props {
  onComplete: () => void;
  setTestAnswers: React.Dispatch<React.SetStateAction<{ [key: number]: string }>>;
  testAnswers: { [key: number]: string };
}

interface Question {
  id: number,
  question: string;
  options: string[];
  correctAnswer: string;
}

const Test3: React.FC<Test3Props> = ({ onComplete, setTestAnswers, testAnswers }) => {
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
      question: 'Почему для фиксированной шапки используется z-index: 1000?',
      options: [
        'Чтобы шапка всегда перекрывала другие элементы при прокрутке, так как position: fixed вырывает её из потока',
        'Для ускорения рендеринга',
        'Это стандартное значение для всех элементов',
        'Чтобы шапка была под контентом',
      ],
      correctAnswer: 'Чтобы шапка всегда перекрывала другие элементы при прокрутке, так как position: fixed вырывает её из потока',
    },
    {
      id: 2,
      question: 'Почему justify-content: space-between в .header-container автоматически центрирует логотип между бургером и корзиной?',
      options: [
        'Крайние элементы прижимаются к краям, а свободное пространство равномерно распределяется — центральный элемент оказывается посередине',
        'Потому что логотип имеет больший вес',
        'Это работает только с тремя элементами',
        'Нужно добавлять flex: 1 к логотипу',
      ],
      correctAnswer: 'Крайние элементы прижимаются к краям, а свободное пространство равномерно распределяется — центральный элемент оказывается посередине',
    },
    {
      id: 3,
      question: 'Почему для изменения цвета PNG-иконки корзины используются CSS-фильтры (grayscale + sepia + hue-rotate)?',
      options: [
        'Потому что это быстрый способ перекрасить растровую иконку без создания новой версии файла или использования SVG',
        'Фильтры работают быстрее, чем fill в SVG',
        'Это единственный способ изменить цвет',
        'Для совместимости с IE',
      ],
      correctAnswer: 'Потому что это быстрый способ перекрасить растровую иконку без создания новой версии файла или использования SVG',
    },
    {
      id: 4,
      question: 'Что делает box-sizing: border-box в глобальном сбросе стилей?',
      options: [
        'Включает padding и border в общую ширину/высоту элемента, предотвращая неожиданные "скачки" макета при добавлении отступов',
        'Убирает все отступы',
        'Делает все элементы блочными',
        'Ускоряет загрузку страницы',
      ],
      correctAnswer: 'Включает padding и border в общую ширину/высоту элемента, предотвращая неожиданные "скачки" макета при добавлении отступов',
    },
    {
      id: 5,
      question: 'Почему бургер-меню скрывается через display: none на десктопе?',
      options: [
        'Чтобы элемент полностью исчез из потока документа и не влиял на распределение space-between во Flexbox-контейнере',
        'Потому что visibility: hidden оставляет место',
        'Для экономии трафика',
        'Это обязательное правило',
      ],
      correctAnswer: 'Чтобы элемент полностью исчез из потока документа и не влиял на распределение space-between во Flexbox-контейнере',
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

export default Test3;