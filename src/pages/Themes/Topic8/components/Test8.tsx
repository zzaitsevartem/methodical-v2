import React, { useEffect } from 'react';
import styles from '../../Themes.module.scss';
import Swal from 'sweetalert2';

interface Test8Props {
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

const Test8: React.FC<Test8Props> = ({ onComplete, setTestAnswers, testAnswers }) => {
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
      question: "Что означает подход 'Mobile-first' в веб-разработке и почему он стал стандартом?",
      options: [
        "Это когда сайт сначала верстается для десктопа, а потом сжимается для мобильных, чтобы не потерять контент.",
        "Это разработка отдельного мобильного приложения вместо сайта, так как приложения работают быстрее.",
        "Это подход, при котором стили сначала пишутся для мобильных устройств (без media), а затем расширяются для больших экранов (min-width). Это фокусирует на главном и ускоряет загрузку.",
        "Это правило Google, требующее, чтобы на сайте не было картинок тяжелее 100кб, иначе он не будет индексироваться.",
      ],
      correctAnswer: "Это подход, при котором стили сначала пишутся для мобильных устройств (без media), а затем расширяются для больших экранов (min-width). Это фокусирует на главном и ускоряет загрузку.",
    },
    {
      id: 2,
      question: "Какой медиазапрос (media query) написан корректно для применения стилей только на планшетах и десктопах (шириной от 768px)?",
      options: [
        "@media (min-width: 768px) { ... }",
        "@media (max-width: 768px) { ... }",
        "@media (device-width: 768px) { ... }",
        "@media query (desktop: true) { ... }",
      ],
      correctAnswer: "@media (min-width: 768px) { ... }",
    },
    {
      id: 3,
      question: "Зачем нужен мета-тег <meta name='viewport' content='width=device-width, initial-scale=1.0'>?",
      options: [
        "Он подгружает специальные шрифты, оптимизированные для экранов Retina.",
        "Он сообщает браузеру, что ширина области просмотра должна соответствовать ширине устройства, и запрещает изначальное масштабирование (зум), чтобы сайт не выглядел как 'отдаленный' десктоп.",
        "Он автоматически включает тёмную тему на устройствах Apple и Android.",
        "Это устаревший тег для Internet Explorer, в современных браузерах он не нужен.",
      ],
      correctAnswer: "Он сообщает браузеру, что ширина области просмотра должна соответствовать ширине устройства, и запрещает изначальное масштабирование (зум), чтобы сайт не выглядел как 'отдаленный' десктоп.",
    },
    {
      id: 4,
      question: "В чем ключевое отличие CSS-свойства 'transition' от 'animation'?",
      options: [
        "Нет отличий, это просто синонимы в разных версиях CSS.",
        "Transition работает только при наведении, а Animation — только при клике.",
        "Transition — это простой переход между двумя состояниями (например, hover), требующий триггера. Animation (с @keyframes) позволяет создавать сложные сценарии, зацикливать их и запускать автоматически без взаимодействия.",
        "Transition нагружает процессор, а Animation работает на видеокарте, поэтому Animation всегда лучше.",
      ],
      correctAnswer: "Transition — это простой переход между двумя состояниями (например, hover), требующий триггера. Animation (с @keyframes) позволяет создавать сложные сценарии, зацикливать их и запускать автоматически без взаимодействия.",
    },
    {
      id: 5,
      question: "Как работает 'Checkbox Hack' для создания бургер-меню без JavaScript?",
      options: [
        "Мы используем скрытый <input type='checkbox'>. Когда пользователь кликает на связанный <label> (иконку бургера), чекбокс переключается (checked). А в CSS мы используем селектор :checked ~ nav для показа меню.",
        "Браузер сам понимает, что это меню, если добавить класс .burger-menu, и автоматически скрывает его.",
        "Мы используем псевдоэлемент ::before и ::after, которые при наведении (hover) раскрывают меню. Клик не нужен.",
        "Это невозможно без JavaScript. Checkbox Hack — это миф.",
      ],
      correctAnswer: "Мы используем скрытый <input type='checkbox'>. Когда пользователь кликает на связанный <label> (иконку бургера), чекбокс переключается (checked). А в CSS мы используем селектор :checked ~ nav для показа меню.",
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

export default Test8;