import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../Themes.module.scss';
import { motion } from 'framer-motion';
import BackButton from '../../components/BackButton/BackButton';
import BackProgress from '../../components/BackProgress/BackProgress';
import Test8 from './components/Test8';
import { useTopicProgress } from '../../../hooks/useTopicProgress';

interface Topic8Props {
  testPassed: boolean;
  setTestPassed: (value: boolean) => void;
}

const Topic8: React.FC<Topic8Props> = ({ testPassed: propTestPassed, setTestPassed: propSetTestPassed }) => {
  const { testPassed: cachedTestPassed, setTestPassed: setCachedTestPassed, testAnswers, setTestAnswers, resetProgress } = useTopicProgress('8');

  useEffect(() => {
    if (cachedTestPassed && !propTestPassed) {
      propSetTestPassed(true);
    }
  }, [cachedTestPassed, propTestPassed, propSetTestPassed]);

  const handleTestComplete = () => {
    setCachedTestPassed(true);
    propSetTestPassed(true);
  };

  const handleResetProgress = () => {
    if (window.confirm('Вы уверены, что хотите сбросить прогресс темы? 🧐        Тест придётся проходить заново 🙁')) {
      resetProgress();
      propSetTestPassed(false);
    }
  };

  const isTestPassed = propTestPassed;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.topic}>
      <BackButton hasUnsavedProgress={Object.keys(testAnswers).length > 0 && !isTestPassed} />
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.title}>Тема 8: Адаптивный дизайн и анимации</h1>
        <p className={styles.subtitle}>Медиазапросы для отзывчивого дизайна и CSS-анимации появления элементов</p>
      </motion.div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Теория</h2>

          <h3 className={styles.subSectionTitle}>1. История адаптивности: от жёстких макетов к миру тысячи экранов</h3>
          <p className={styles.text}>
            Представьте <strong>2005 год</strong>: большинство пользователей сидят за десктопами с разрешением <strong>1024×768</strong>. Сайты верстают под это разрешение — фиксированная ширина <strong>960px</strong>, всё ровно, красиво. Но потом приходят смартфоны. <strong>iPhone 2007 года</strong> — экран <strong>320×480</strong>. Сайт, сделанный под десктоп, на нём выглядит как микроскопический текст с <strong>горизонтальной прокруткой</strong>. Пользователь злится и уходит. Так родилась <strong>проблема адаптивности</strong>.
          </p>
          <p className={styles.text}>
            <strong>Separate mobile version</strong> (2007–2012): компании делают два сайта — основной и мобильный (<strong>m.site.com</strong>). Плюс: мобильная версия лёгкая, быстрая. Минус: <strong>дублирование контента</strong>, проблемы с <strong>SEO</strong> (Google видит два сайта), пользователи иногда попадают не на ту версию.
          </p>
          <p className={styles.text}>
            <strong>Fluid/резиновый дизайн</strong> (2008–2011): всё в процентах (<strong>%</strong>). Сайт растягивается. Плюс: подходит под разные ширины. Минус: на маленьких экранах текст <strong>нечитаемый</strong>, изображения искажаются, на больших — пустое пространство.
          </p>
          <p className={styles.text}>
            <strong>Responsive Web Design</strong> (2010 — настоящее время): Итан Маркотт в статье A List Apart вводит термин. <strong>Три столпа</strong>:
          </p>
          <ul>
            <li>Гибкие сетки (<strong>Flexbox</strong>, <strong>Grid</strong>).</li>
            <li>Адаптивные изображения (<strong>max-width: 100%</strong>).</li>
            <li>Медиазапросы (<strong>@media</strong>).</li>
          </ul>
          <p className={styles.text}>
            <strong>Google в 2015</strong> делает мобильную адаптивность фактором ранжирования. С 2019 — <strong>mobile-first индексация</strong> (сначала смотрит мобильную версию).
          </p>
          <p className={styles.text}>
            <strong>Mobile-first</strong> (2012+): Люк Вроблевски предлагает начинать с мобильных. Почему? В 2024 году <strong>58% трафика</strong> — мобильные (Statista). Плюс: заставляет фокусироваться на <strong>главном контенте</strong>, сайт быстрее на мобильных.
          </p>

          <div className={styles.screenshotPlaceholder}>
            <img src="./images/Topic8/screen-1.webp" alt="screen-1" className={styles.screenshotImage} />
            <p className={styles.screenshotText}>Рис.1 — Эволюция: от фиксированного к responsive и mobile-first</p>
          </div>

          <h3 className={styles.subSectionTitle}>2. Психология адаптивности: почему плохой мобильный дизайн убивает конверсию</h3>
          <p className={styles.text}>
            Человеческий мозг ненавидит <strong>неудобство</strong>. <strong>Исследование Google (2017)</strong>: если сайт не адаптирован под мобильные, <strong>53% пользователей</strong> уходят через 3 секунды. Почему?
          </p>
          <ul>
            <li><strong>Когнитивная нагрузка</strong>: мелкий текст, зум, горизонтальная прокрутка — мозг тратит силы на "борьбу" с сайтом, а не на контент.</li>
            <li><strong>Эмоция раздражения</strong>: миндалевидное тело активируется, пользователь ассоциирует <strong>негатив с брендом</strong>.</li>
            <li><strong>F-паттерн чтения</strong>: на мобильных пользователь сканирует вертикально. Если контент не адаптирован — теряет интерес.</li>
          </ul>
          <p className={styles.text}>
            Адаптивный сайт — это <strong>уважение к пользователю</strong>. Он чувствует: "Этот бренд думает обо мне". Конверсия растёт на <strong>20–40%</strong> (данные Adobe).
          </p>

          <h3 className={styles.subSectionTitle}>3. CTA (Call to Action) в адаптивном дизайне: как кнопки становятся умными</h3>
          <p className={styles.text}>
            CTA — кнопка действия ("Купить", "Заказать", "Узнать больше"). На десктопе она может быть слева, справа, с текстом и иконкой. На мобильном — <strong>совсем другая история</strong>.
          </p>
          <p className={styles.text}>
            <strong>Правило большого пальца</strong> (Thumb Zone Theory): <strong>75% пользователей</strong> держат смартфон одной рукой. Зона комфортного касания — <strong>нижняя часть экрана</strong>. Поэтому CTA на мобильных должно быть:
          </p>
          <ul>
            <li>Достаточно большим (минимум <strong>44×44px</strong> по рекомендациям Apple).</li>
            <li>Расположенным в нижней части экрана, но не в самом низу (чтобы не перекрывать навигационную панель iOS/Android).</li>
            <li>Иметь достаточный отступ от других элементов (чтобы не было <strong>случайных нажатий</strong>).</li>
          </ul>
          <p className={styles.text}>
            <strong>Адаптивный текст CTA</strong>: на десктопе "Добавить в корзину и продолжить покупки", на мобильном — просто "В корзину". Короче, конкретнее, без лишних слов.
          </p>
          <p className={styles.text}>
            <strong>Визуальная иерархия</strong>: на мобильных CTA должен быть <strong>самым заметным элементом</strong>. Контрастный цвет, достаточно белого пространства вокруг, никаких конкурентов рядом.
          </p>
          <p className={styles.text}>
            <strong>Интересный факт</strong>: тестирование Amazon показало, что увеличение CTA на 10% на мобильных версиях увеличило конверсию на <strong>1.5%</strong>. Кажется, немного? При их обороте — это миллионы долларов.
          </p>

          <div className={styles.screenshotPlaceholder}>
            <img src="./images/Topic8/screen-2.webp" alt="screen-2" className={styles.screenshotImage} />
            <p className={styles.screenshotText}>Рис.2 — Адаптация CTA: от мобильного к десктопу (размеры, расположение, текст)</p>
          </div>

          <h3 className={styles.subSectionTitle}>4. Медиазапросы: как CSS "чувствует" устройство</h3>
          <p className={styles.text}>
            Медиазапрос — <strong>условие</strong>. Если истинно — стили внутри применяются.
          </p>
          <pre className={styles.code}>
            {`@media (max-width: 768px) { /* ≤768px — мобильные */ }
@media (min-width: 769px) { /* ≥769px — планшеты и десктоп */ }
@media (orientation: landscape) { /* Альбомная ориентация */ }`}
          </pre>
          <p className={styles.text}>
            <strong>Mobile-first подход</strong>: базовые стили — для мобильных (без @media). Затем:
          </p>
          <pre className={styles.code}>
            {`@media (min-width: 768px) { /* Улучшения для планшетов */ }
@media (min-width: 1024px) { /* Десктоп */ }`}
          </pre>
          <p className={styles.text}>
            Почему не <strong>desktop-first</strong> (max-width)? Mobile-first логичнее: от простого к сложному, меньше кода для мобильных (быстрее загрузка).
          </p>
          <p className={styles.text}>
            <strong>Брейкпоинты</strong>: нет "волшебных" чисел. <strong>768px</strong> — потому что iPad в портрете. Выбирайте по контенту: когда сетка ломается — добавляйте медиазапрос.
          </p>
          <p className={styles.text}>
            <strong>Современные медиа-функции</strong>:
          </p>
          <pre className={styles.code}>
            {`@media (hover: hover) { /* Устройство с поддержкой hover */ }
@media (prefers-color-scheme: dark) { /* Тёмная тема */ }
@media (prefers-reduced-motion: reduce) { /* Отключение анимаций */ }`}
          </pre>
          <p className={styles.text}>
            <strong>Последнее особенно важно</strong> — до <strong>20% пользователей</strong> предпочитают reduced motion из-за вестибулярных расстройств или просто комфорта.
          </p>

          <h3 className={styles.subSectionTitle}>5. Организация стилей: от одного файла к структуре</h3>
          <p className={styles.text}>
            Когда сайт большой, один <strong>style.css</strong> — хаос. <strong>Разделяем</strong>:
          </p>
          <ul>
            <li><strong>style.css</strong> — базовые стили, сброс, типографика, основные секции.</li>
            <li><strong>media.css</strong> — только медиазапросы. Легче находить и править адаптивность.</li>
          </ul>
          <p className={styles.text}>
            <strong>Плюс</strong>: команда работает параллельно, меньше конфликтов, проще дебажить.
          </p>
          <p className={styles.text}>
            <strong>Продвинутая организация</strong>:
          </p>
          <pre className={styles.code}>
            {`styles/
├── base/           # Сбросы, переменные
├── components/     # Стили компонентов
├── layouts/        # Макеты страниц
├── utilities/      # Утилитарные классы
├── themes/         # Темы (светлая/тёмная)
└── media/          # Медиазапросы по компонентам`}
          </pre>

          <h3 className={styles.subSectionTitle}>6. CSS-анимации: магия движения без JavaScript</h3>
          <p className={styles.text}>
            Анимации — <strong>не декор</strong>. Они направляют внимание, создают эмоцию, повышают вовлечённость. <strong>Исследование Baymard Institute</strong>: плавные анимации увеличивают perceived quality сайта на <strong>30%</strong>.
          </p>
          <p className={styles.text}>
            <strong>Два инструмента</strong>:
          </p>
          <ul>
            <li><strong>transition</strong> — плавное изменение при событии (hover). Простые эффекты.</li>
            <li><strong>animation</strong> — сложные, с @keyframes. Автоматический запуск, задержка, повтор.</li>
          </ul>
          <p className={styles.text}>
            Мы используем <strong>animation</strong> — для появления элементов при загрузке (без скролла и JS).
          </p>

          <h3 className={styles.subSectionTitle}>7. Transition: простые эффекты</h3>
          <pre className={styles.code}>
            {`.button {
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.button:hover {
  background-color: #F5E8E4;
  transform: scale(1.05);
}`}
          </pre>
          <p className={styles.text}>
            <strong>Свойства, которые можно анимировать</strong>: opacity, transform, color, background-color, width, height, margin, padding, border, box-shadow, filter. <strong>Всего более 150 свойств!</strong>
          </p>

          <h3 className={styles.subSectionTitle}>8. Animation и @keyframes: сложные последовательности</h3>
          <p className={styles.text}>
            <strong>@keyframes</strong> — "кадры" анимации:
          </p>
          <pre className={styles.code}>
            {`@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`}
          </pre>
          <p className={styles.text}>
            <strong>Проценты для промежуточных</strong>:
          </p>
          <pre className={styles.code}>
            {`@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}`}
          </pre>

          <h3 className={styles.subSectionTitle}>9. Свойства animation</h3>
          <ul>
            <li><strong>duration</strong> — время (1s).</li>
            <li><strong>timing-function</strong> — easing (ease-out — быстро-замедленно).</li>
            <li><strong>delay</strong> — задержка.</li>
            <li><strong>iteration-count</strong> — повтор (infinite).</li>
            <li><strong>fill-mode</strong> — forwards (остаётся в конце).</li>
          </ul>
          <pre className={styles.code}>
            {`.element {
  opacity: 0;
  animation: fadeInUp 1s ease-out forwards;
  animation-delay: 0.4s;
}`}
          </pre>
          <p className={styles.text}>
            <strong>Последовательность</strong> — разные delay.
          </p>

          <h3 className={styles.subSectionTitle}>10. Easing-функции: почему ease-out лучше linear</h3>
          <p className={styles.text}>
            <strong>Easing</strong> — скорость изменения. Linear — равномерно (роботично). Ease-out — быстро в начале, медленно в конце (натурально, как в физике).
          </p>
          <p className={styles.text}>
            <strong>cubic-bezier.com</strong> — инструмент для кастомных easing.
          </p>
          <p className={styles.text}>
            <strong>Популярные кривые</strong>:
          </p>
          <ul>
            <li><code>cubic-bezier(0.4, 0.0, 0.2, 1)</code> — Material Design (естественно)</li>
            <li><code>cubic-bezier(0.68, -0.55, 0.265, 1.55)</code> — "bounce" эффект</li>
            <li><code>cubic-bezier(0.87, 0, 0.13, 1)</code> — плавное ускорение и замедление</li>
          </ul>

          <h3 className={styles.subSectionTitle}>11. Психология анимаций</h3>
          <p className={styles.text}>
            Анимации <strong>имитируют реальный мир</strong> (инерция, гравитация). Мозг любит предсказуемость — плавное движение снижает <strong>когнитивную нагрузку</strong>. Но перебор — отвлекает.
          </p>
          <p className={styles.text}>
            <strong>Длительность имеет значение</strong>:
          </p>
          <ul>
            <li>0–100мс: мгновенная реакция (клик, hover)</li>
            <li>100–300мс: микроанимации (переход состояний)</li>
            <li>300–500мс: появление элементов (наша fadeInUp)</li>
            <li>500мс+: демонстрационные, привлекающие внимание (лучше избегать)</li>
          </ul>
          <p className={styles.text}>
            <strong>Золотое правило</strong>: анимация должна быть достаточно быстрой, чтобы не задерживать пользователя, но достаточно медленной, чтобы её можно было заметить и воспринять.
          </p>

          <h3 className={styles.subSectionTitle}>12. Бургер-меню на чистом CSS: доступный хак</h3>
          <p className={styles.text}>
            На мобильных меню скрываем, показываем бургер. <strong>Открытие — checkbox-хак</strong>:
          </p>
          <ul>
            <li>Скрытый <strong>input checkbox</strong>.</li>
            <li>Label с линиями — клик меняет состояние.</li>
            <li>:checked — стили для открытого меню.</li>
          </ul>
          <p className={styles.text}>
            <strong>Плюс</strong>: нет JS, доступно (скринридеры понимают checkbox), работает везде.
          </p>
          <p className={styles.text}>
            <strong>ARIA атрибуты для доступности</strong>:
          </p>
          <pre className={styles.code}>
            {`<button aria-label="Меню" aria-expanded="false" aria-controls="navigation">
  <!-- Бургер иконка -->
</button>`}
          </pre>
          <p className={styles.text}>
            Это помогает скринридерам понять, что кнопка управляет меню и каково её текущее состояние.
          </p>
        </section>

        {!isTestPassed && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Тест</h2>
            <p className={styles.text}>Пройдите тест, чтобы открыть практику.</p>
            <Test8 onComplete={handleTestComplete} setTestAnswers={setTestAnswers} testAnswers={testAnswers} />
          </section>
        )}

        {isTestPassed && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Практика</h2>
            <p className={styles.text}>
              Мы сделаем сайт <strong>адаптивным и анимированным</strong>. Организуем стили, добавим медиазапросы и плавные появления элементов.
            </p>

            <h3 className={styles.subSectionTitle}>Шаг 1: Создание папки для CSS</h3>
            <p className={styles.text}>
              1. Откройте проект в <strong>VS Code</strong>.
              <br />
              2. В Explorer правой кнопкой → <strong>New Folder</strong>.
              <br />
              3. Назовите <code>css</code>.
            </p>
            <div className={styles.screenshotPlaceholder}>
              <img src="./images/Topic8/screen-3.webp" alt="screen-3" className={styles.screenshotImage} />
              <p className={styles.screenshotText}>Рис.3 — Папка css создана</p>
            </div>

            <h3 className={styles.subSectionTitle}>Шаг 2: Перенос style.css</h3>
            <p className={styles.text}>
              1. Перетащите <code>style.css</code> в <code>css</code>.
            </p>
            <div className={styles.screenshotPlaceholder}>
              <img src="./images/Topic8/screen-4.webp" alt="screen-4" className={styles.screenshotImage} />
              <p className={styles.screenshotText}>Рис.4 — style.css в папке</p>
            </div>

            <h3 className={styles.subSectionTitle}>Шаг 3: Создание media.css</h3>
            <p className={styles.text}>
              1. Правой кнопкой на <code>css</code> → New File → <code>media.css</code>.
            </p>

            <h3 className={styles.subSectionTitle}>Шаг 4: Стили пропали — это нормально!</h3>
            <p className={styles.text}>
              Обновите браузер. <strong>Стили исчезли!</strong> Не паникуйте — мы изменили путь, браузер не нашёл файл. Это временно. Сейчас добавим адаптивность — сайт оживёт и станет идеальным на всех устройствах.
            </p>
            <div className={styles.screenshotPlaceholder}>
              <img src="./images/Topic8/screen-5.webp" alt="screen-5" className={styles.screenshotImage} />
              <p className={styles.screenshotText}>Рис.5 — Временно без стилей</p>
            </div>

            <h3 className={styles.subSectionTitle}>Шаг 5: Обновление путей в index.html</h3>
            <p className={styles.text}>
              Замените пути к CSS файлам в <code>index.html</code>:
            </p>
            <pre className={styles.code}>
              {`<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="css/media.css">`}
            </pre>

            <h3 className={styles.subSectionTitle}>Шаг 6: Checkbox-хак для бургер-меню</h3>
            <p className={styles.text}>
              В <code>index.html</code> внутри <code>burger-container</code> замените бургер на:
            </p>
            <pre className={styles.code}>
              {`<input type="checkbox" id="burger-checkbox" class="burger-checkbox">
<label for="burger-checkbox" class="burger-menu">
  <span></span>
  <span></span>
  <span></span>
</label>`}
            </pre>

            <h3 className={styles.subSectionTitle}>Шаг 7: Медиазапросы в media.css</h3>
            <p className={styles.text}>
              Добавьте в <code>css/media.css</code> (пропущенные значения):
            </p>
            <pre className={styles.code}>
              {`@media (max-width: 768px) {
  .burger-checkbox {
    display: none;
  }

  .burger-menu {
    display: flex;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    z-index: 1001;
  }

  .burger-menu span {
    width: 30px;
    height: 3px;
    background: #6B4E31;
    transition: all 0.3s ease;
  }

  #burger-checkbox:checked ~ .burger-menu span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 6px);
  }

  #burger-checkbox:checked ~ .burger-menu span:nth-child(2) {
    opacity: 0;
  }

  #burger-checkbox:checked ~ .burger-menu span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -6px);
  }

  nav {
    position: fixed;
    top: 0;
    left: 100%;
    width: 100%;
    height: 100vh;
    background: #FDF6F0;
    flex-direction: column;
    padding: 80px 20px 20px;
    transition: left 0.3s ease;
    z-index: 1000;
  }

  #burger-checkbox:checked ~ nav {
    left: 0;
  }

  .logo {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }

  .hero-img {
    height: 300px;
  }

  .hero-content {
    width: 90%;
    padding: 20px;
    background: rgba(255, 255, 255, 0.9);
  }

  .hero-content h1 {
    font-size: 32px;
  }

  .hero-content p {
    font-size: 16px;
  }

  .assortment-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .assortment-item img {
    height: 250px;
    object-fit: cover;
  }

  .about-content {
    flex-direction: column-reverse;
  }

  .about-images {
    grid-template-columns: 1fr;
  }

  .about-images img {
    height: 200px;
  }

  .about-images img:nth-child(3) {
    height: 200px;
    grid-column: auto;
    grid-row: auto;
  }

  .new-section-img {
    height: 300px;
  }
}

@media (max-width: 480px) {
  .hero-content {
    top: 50%;
  }

  .assortment-item img {
    height: 200px;
  }

  .about-text p {
    font-size: 14px;
  }
}`}
            </pre>

            <h3 className={styles.subSectionTitle}>Шаг 8: CSS-анимации в style.css</h3>
            <p className={styles.text}>
              Добавьте в конец <code>css/style.css</code>:
            </p>
            <pre className={styles.code}>
              {`@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.hero-content > * {
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
}

.hero-content h1 { animation-delay: 0.2s; }
.hero-content p { animation-delay: 0.4s; }
.hero-button { animation-delay: 0.6s; }

.assortment h2 {
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
  animation-delay: 0.2s;
}

.assortment-item {
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
}

.assortment-item:nth-child(1) { animation-delay: 0.2s; }
.assortment-item:nth-child(2) { animation-delay: 0.4s; }
.assortment-item:nth-child(3) { animation-delay: 0.6s; }
.assortment-item:nth-child(4) { animation-delay: 0.8s; }

.about h2 {
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
  animation-delay: 0.2s;
}

.about-text {
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
  animation-delay: 0.4s;
}

.about-images img {
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
}

.about-images img:nth-child(1) { animation-delay: 0.2s; }
.about-images img:nth-child(2) { animation-delay: 0.4s; }
.about-images img:nth-child(3) { animation-delay: 0.6s; }

.new-section-content > * {
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
}

.new-section-content h2 { animation-delay: 0.2s; }
.new-section-content p { animation-delay: 0.4s; }
.new-section-button { animation-delay: 0.6s; }`}
            </pre>

            <h3 className={styles.subSectionTitle}>Шаг 9: Проверка результата</h3>
            <p className={styles.text}>
              Сохраните всё. Откройте в браузере на десктопе и мобильном (<strong>DevTools → мобильный вид</strong>).
              <br />
              - <strong>Бургер</strong> работает только на мобильных.
              - Меню выезжает <strong>плавно</strong>.
              - Элементы появляются заметно снизу с <strong>лёгким увеличением</strong>.
              - На десктопе — <strong>горизонтальное меню</strong>, бургер скрыт.
            </p>
            <div className={styles.screenshotPlaceholder}>
              <img src="./images/Topic8/screen-6.webp" alt="screen-6" className={styles.screenshotImage} />
              <p className={styles.screenshotText}>Рис.6 — Полностью адаптивный сайт Frosted Muse</p>
            </div>
          </section>
        )}

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Итогом работы стало</h2>
          <p className={styles.text}>
            <strong>Полностью адаптивный и анимированный сайт Frosted Muse</strong>! Вы организовали стили профессионально, реализовали отзывчивый дизайн с mobile-first подходом, добавили заметные плавные CSS-анимации появления элементов и доступное бургер-меню без JavaScript. Теперь сайт выглядит идеально на любом устройстве и "оживает" при загрузке.
          </p>
          <p className={styles.text}>
            <strong>Вау-эффект достигнут!</strong> За 8 тем мы прошли огромный путь: от базовых тегов HTML до создания полноценного адаптивного сайта с анимациями. Вы научились верстать секции, работать с Flexbox и Grid, добавлять интерактивность, а теперь ещё и сделали сайт адаптивным для всех устройств!
          </p>
          <p className={styles.text}>
            <strong>Поздравляем! 🎉</strong> На данном этапе с вёрсткой покончено — наш сайт полностью готов! В ходе курса мы ещё будем к нему возвращаться, добавляя JavaScript-функциональность, но фундамент уже заложен прочный и красивый. Вы молодец!
          </p>
          <div className={styles.endImg}>
            <img src='./images/General/general.webp' alt='general-logo'></img>
          </div>
        </section>
      </div>

      <div className={styles.navigation}>
        <NavLink to="/topic9" className={styles.nextButton}>
          К следующей теме
        </NavLink>
        <BackProgress onReset={handleResetProgress} testPassed={isTestPassed} />
      </div>
    </div>
  );
};

export default Topic8;