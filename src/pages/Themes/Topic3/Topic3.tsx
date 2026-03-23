import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../Themes.module.scss';
import { motion } from 'framer-motion';
import BackButton from '../../components/BackButton/BackButton';
import BackProgress from '../../components/BackProgress/BackProgress';
import Test3 from './components/Test3';
import { useTopicProgress } from '../../../hooks/useTopicProgress';

interface Topic3Props {
  testPassed: boolean;
  setTestPassed: (value: boolean) => void;
}

const Topic3: React.FC<Topic3Props> = ({ testPassed: propTestPassed, setTestPassed: propSetTestPassed }) => {
  const { testPassed: cachedTestPassed, setTestPassed: setCachedTestPassed, testAnswers, setTestAnswers, resetProgress } = useTopicProgress('3');

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
        <h1 className={styles.title}>Тема 3: Оформляем шапку: первые стили CSS</h1>
        <p className={styles.subtitle}>Шрифты, цвета, фон, фиксированное позиционирование.</p>
      </motion.div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Теория</h2>
          <p className={styles.text}>
            <strong>CSS (Cascading Style Sheets)</strong> — это язык стилей, который превращает голый HTML-скелет в визуально привлекательный, дышащий интерфейс. Если HTML — это сценарий пьесы (кто и что говорит), то CSS — это работа режиссёра: освещение, костюмы, декорации и мизансцены. В контексте шапки Frosted Muse CSS — это то, что превращает разрозненные элементы (бургер, логотип, корзину) в единый, элегантный, профессиональный компонент.
          </p>
          
          <h3 className={styles.subSectionTitle}>1. Фиксированное позиционирование: шапка, которая всегда на виду</h3>
          <p className={styles.text}>
            В реальной жизни шапка сайта — как витрина дорогого магазина: она должна быть всегда на виду, независимо от того, насколько глубоко вы зашли в магазин. В веб-разработке это достигается с помощью <strong>фиксированного позиционирования (position: fixed)</strong>.
          </p>
          
          <p className={styles.text}>
            <strong>Свойство position:</strong>
          </p>
          
          <ul>
            <li><strong><code>static</code></strong> (значение по умолчанию) — элемент располагается в нормальном потоке документа.</li>
            <li><strong><code>relative</code></strong> — элемент смещается относительно своего обычного положения.</li>
            <li><strong><code>absolute</code></strong> — элемент вырывается из потока и позиционируется относительно ближайшего родителя с <code>position: relative/absolute/fixed</code>.</li>
            <li><strong><code>fixed</code></strong> — элемент фиксируется относительно окна браузера. Он всегда будет на одном и том же месте, даже при прокрутке.</li>
            <li><strong><code>sticky</code></strong> — гибрид relative и fixed. Элемент ведёт себя как relative, пока не достигнет определённой точки прокрутки, затем становится fixed.</li>
          </ul>
          
          <p className={styles.subtitleScreen}>Ключевые свойства для фиксированной шапки:</p>
          <pre className={styles.code}>
{`header {
  position: fixed;       /* Фиксируем элемент */
  top: 0;                /* Прижимаем к верхнему краю */
  left: 0;               /* Прижимаем к левому краю */
  width: 100%;           /* Растягиваем на всю ширину */
  z-index: 1000;         /* Поднимаем над другими элементами */
  background-color: #f7f5f1; /* Цвет фона */
}`}
          </pre>
          
          <p className={styles.text}>
            <strong>Что делает </strong><code>z-index: 1000</code>? Это свойство контролирует "высоту" элемента по оси Z (глубину). Элементы с большим <code>z-index</code> перекрывают элементы с меньшим. Мы ставим большое значение, чтобы шапка всегда была поверх других элементов при прокрутке.
          </p>
          
          <h3 className={styles.subSectionTitle}>2. Flexbox: выравниваем элементы по горизонтали</h3>
          <p className={styles.text}>
            Flexbox (Flexible Box Layout) — это современная CSS-технология для создания гибких, адаптивных макетов. В нашей шапке мы используем Flexbox для выравнивания трёх элементов: бургер-меню (слева), логотипа (по центру) и иконки корзины (справа).
          </p>
          
          <p className={styles.text}>
            <strong>Основные свойства Flexbox:</strong>
          </p>
          
          <ul>
            <li><strong><code>display: flex</code></strong> — включает режим flex для контейнера.</li>
            <li><strong><code>justify-content</code></strong> — выравнивает элементы по главной оси (по умолчанию — горизонтальной).</li>
            <li><strong><code>align-items</code></strong> — выравнивает элементы по поперечной оси (по умолчанию — вертикальной).</li>
            <li><strong><code>flex-direction</code></strong> — определяет направление главной оси.</li>
          </ul>
          
          <p className={styles.subtitleScreen}>Пример Flexbox в шапке Frosted Muse:</p>
          <pre className={styles.code}>
{`.header-container {
  display: flex;                 /* Включаем Flexbox */
  justify-content: space-between; /* Равномерно распределяем пространство */
  align-items: center;           /* Выравниваем по центру по вертикали */
  width: 100%;                   /* Растягиваем на всю доступную ширину */
  max-width: 1200px;            /* Но не шире 1200px */
}

/* Логотип будет по центру, бургер слева, корзина справа */
.burger-menu {
  /* Слева, но будет скрыт на десктопе */
}

.logo {
  /* По центру */
}

.cart-icon {
  /* Справа */
}`}
          </pre>
          
          <p className={styles.text}>
            <strong>Почему </strong><code>justify-content: space-between</code> <strong>работает?</strong> Это свойство распределяет свободное пространство между элементами. Так как у нас три элемента, и крайние (бургер и корзина) занимают минимальную ширину, логотип автоматически оказывается в центре.
          </p>
          
          <h3 className={styles.subSectionTitle}>3. Цветовая палитра: создаём атмосферу кондитерской</h3>
          <p className={styles.text}>
            Цвет — это не просто украшение. Это мощный психологический инструмент. Для кондитерской Frosted Muse мы выбрали тёплую, натуральную палитру, которая вызывает ассоциации с кофе, шоколадом и карамелью.
          </p>
          
          <p className={styles.subtitleScreen}>Основные цвета шапки:</p>
          <pre className={styles.code}>
{`/* Основные цвета шапки Frosted Muse */
:root {
  --primary-brown: #6B4E31;     /* Основной коричневый (шоколад) */
  --background-cream: #f7f5f1;  /* Кремовый фон (сливки) */
  --hover-beige: #F5E8E4;       /* Бежевый при наведении (карамель) */
  --text-dark: #333;            /* Тёмный текст */
}

header {
  background-color: var(--background-cream);
}

.logo p {
  color: var(--primary-brown);
}

nav a {
  color: var(--primary-brown);
}

nav a:hover {
  color: var(--hover-beige);
}`}
          </pre>
          
          <p className={styles.text}>
            <strong>CSS-переменные (Custom Properties)</strong>: Мы используем переменные (<code>--primary-brown</code>, <code>--background-cream</code> и т.д.), чтобы легко изменять цвета во всём проекте. Если завтра мы захотим изменить оттенок коричневого, нам нужно будет поменять его только в одном месте.
          </p>
          
          <h3 className={styles.subSectionTitle}>4. Шрифты: создаём уникальную атмосферу бренда</h3>
          <p className={styles.text}>
            Шрифты — это голос бренда. Для Frosted Muse мы используем два контрастных шрифта:
          </p>
          
          <ul>
            <li><strong>"Imperial Script"</strong> — каллиграфический шрифт для логотипа. Он создаёт ощущение элегантности, ручной работы и премиальности.</li>
            <li><strong>"Lexend"</strong> — чистый, современный sans-serif шрифт для навигации. Он обеспечивает читаемость и контрастирует с декоративным логотипом.</li>
          </ul>
          
          <p className={styles.subtitleScreen}>Подключение и применение шрифтов:</p>
          <pre className={styles.code}>
{`/* Подключаем шрифты в HTML (уже есть в теме 2) */
<link href="https://fonts.googleapis.com/css2?family=Imperial+Script&family=Lexend:wght@100..900&display=swap" rel="stylesheet">

/* Применяем шрифты в CSS */
.logo p {
  font-family: 'Imperial Script', cursive;
  font-size: 36px;
}

nav a {
  font-family: 'Lexend', sans-serif;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
}`}
          </pre>
          
          <p className={styles.text}>
            <strong>Свойство </strong> <code>text-transform: uppercase</code> автоматически преобразует текст в верхний регистр. Это создаёт более формальный, структурированный вид навигации.
          </p> 
          
          <h3 className={styles.subSectionTitle}>5. Тени и эффекты: добавляем глубину и интерактивность</h3>
          <p className={styles.text}>
            Тени (box-shadow) — это мощный инструмент для создания иллюзии глубины и отделения элементов от фона.
          </p>
          
          <p className={styles.subtitleScreen}>Тень шапки Frosted Muse:</p>
          <pre className={styles.code}>
{`header {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

/* Разберём значение:
   0     — смещение по горизонтали (нет смещения)
   2px   — смещение по вертикали (вниз)
   10px  — радиус размытия
   rgba(0, 0, 0, 0.05) — цвет с прозрачностью 5%
*/`}
          </pre>
          
          <p className={styles.text}>
            <strong>Эффекты при наведении (hover):</strong>
          </p>
          <pre className={styles.code}>
{`nav a {
  transition: color 0.3s ease;
}

nav a:hover {
  color: var(--hover-beige);
}

/* Свойство transition создаёт плавный переход цвета за 0.3 секунды */`}
          </pre>
          
          <h3 className={styles.subSectionTitle}>6. Адаптивность: скрываем и показываем элементы</h3>
          <p className={styles.text}>
            На десктопной версии (широкие экраны) мы видим полное горизонтальное меню. Но на мобильных устройствах места мало, поэтому мы:
          </p>
          
          <ol>
            <li>Скрываем горизонтальное меню (<code>nav</code>)</li>
            <li>Показываем бургер-меню (<code>.burger-menu</code>)</li>
            <li>Создаём выезжающее меню при клике на бургер (будет в JavaScript)</li>
          </ol>
          
          <p className={styles.subtitleScreen}>CSS для адаптивности шапки:</p>
          <pre className={styles.code}>
{`/* На десктопе (по умолчанию) */
.burger-menu {
  display: none; /* Скрываем бургер на широких экранах */
}

nav {
  display: flex; /* Показываем горизонтальное меню */
}

/* На мобильных (ширина экрана меньше 768px) */
@media (max-width: 768px) {
  .burger-menu {
    display: block; /* Показываем бургер */
  }
  
  nav {
    display: none; /* Скрываем горизонтальное меню */
    /* Позже мы сделаем его выезжающим */
  }
}`}
          </pre>
          
          <p className={styles.text}>
            <strong>Медиазапросы (Media Queries)</strong> — это условия в CSS, которые применяют стили только при определённых условиях (чаще всего — при определённой ширине экрана). <code>@media (max-width: 768px)</code> означает "применить эти стили, когда ширина окна браузера 768px или меньше".
          </p>
          
          <h3 className={styles.subSectionTitle}>7. Иконка корзины: фильтры CSS для изменения цвета</h3>
          <p className={styles.text}>
            На сайте Frosted Muse иконка корзины изначально чёрная, но мы делаем её коричневой с помощью CSS-фильтров.
          </p>
          
          <pre className={styles.code}>
{`.cart-icon img {
  height: 20px;
  filter: grayscale(100%) sepia(100%) hue-rotate(10deg) saturate(200%);
}

/* Как работают фильтры:
   grayscale(100%) — делает иконку чёрно-белой
   sepia(100%) — добавляет сепийный оттенок (коричневый)
   hue-rotate(10deg) — слегка сдвигает цветовой тон
   saturate(200%) — увеличивает насыщенность
*/`}
          </pre>
          
          <p className={styles.text}>
            <strong>Альтернатива:</strong> Вместо фильтров можно было бы использовать SVG-иконку с нужным цветом или создать собственную иконку. Фильтры — это быстрый способ изменить цвет существующей иконки без замены файла.
          </p>
          
          <h3 className={styles.subSectionTitle}>8. Общие принципы CSS для шапки</h3>
          <p className={styles.text}>
            <strong>1. Блочная модель (Box Model):</strong> Каждый элемент в CSS — это прямоугольник с содержимым (content), внутренними отступами (padding), границами (border) и внешними отступами (margin).
          </p>
          
          <p className={styles.text}>
            <strong>2. Наследование (Inheritance):</strong> Некоторые CSS-свойства (цвет, шрифт) наследуются детьми от родителей. Это позволяет задать <code>font-family</code> для <code>body</code>, и все текстовые элементы внутри унаследуют его.
          </p>
          
          <p className={styles.text}>
            <strong>3. Каскадность (Cascading):</strong> CSS означает "каскадные таблицы стилей". Когда несколько правил применяются к одному элементу, побеждает правило с большей специфичностью (specificity).
          </p>
          
          <p className={styles.text}>
            <strong>4. Резиновая вёрстка:</strong> Мы используем <code>max-width: 1200px</code> для ограничения максимальной ширины контента, но при этом шапка растягивается на всю ширину окна.
          </p>
          
          <p className={styles.text}>
            <strong>В этой теме</strong> мы разобрали все ключевые CSS-стили для создания красивой, функциональной и адаптивной шапки. В следующей теме мы перейдём к созданию главного баннера (Hero-секции) с большим фоновым изображением.
          </p>
        </section>

        {!isTestPassed && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Тест</h2>
            <p className={styles.text}>Пройдите тест, чтобы открыть практику.</p>
            <Test3 onComplete={handleTestComplete} setTestAnswers={setTestAnswers} testAnswers={testAnswers} />
          </section>
        )}

        {isTestPassed && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Практика</h2>
            <p className={styles.text}>
              Добавьте CSS-стили для шапки сайта <strong>Frosted Muse</strong>, чтобы превратить HTML-структуру в красивый, фиксированный и адаптивный компонент.
            </p>

            <h3 className={styles.subSectionTitle}>Шаг 1: Подготовка CSS-файла</h3>
            <p className={styles.text}>
              1. Откройте ваш проект в VS Code.
              <br />
              2. Убедитесь, что файл <code>style.css</code> существует (мы создали его в теме 1).
              <br />
              3. Если файл пустой, откройте его.
            </p>
            <div className={styles.screenshotPlaceholder}>
              <img src="./images/Topic3/screen-1.webp" alt="screen-1" className={styles.screenshotImage} />
              <p className={styles.screenshotText}>Рис.1 — Открытый файл style.css в VS Code</p>
            </div>

            <h3 className={styles.subSectionTitle}>Шаг 2: Сброс стандартных стилей</h3>
            <p className={styles.text}>
              В начале файла добавьте сброс стандартных стилей браузера:
            </p>
            <pre className={styles.code}>
{`* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}`}
            </pre>
            <p className={styles.text}>
              <strong>Зачем это нужно?</strong> Браузеры добавляют свои собственные отступы и стили к элементам. Этот код сбрасывает их, чтобы начать с чистого листа. <code>box-sizing: border-box</code> гарантирует, что padding и border включаются в общую ширину элемента.
            </p>

            <h3 className={styles.subSectionTitle}>Шаг 3: Стили для body</h3>
            <p className={styles.text}>
              Добавьте базовые стили для body:
            </p>
            <pre className={styles.code}>
{`body {
    font-family: 'Lexend', sans-serif;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #f5f5f5;
}

main {
    flex: 1 0 auto;
    background-color: #f5f5f5;
}`}
            </pre>
            <div className={styles.screenshotPlaceholder}>
                <img src="./images/Topic3/screen-2.webp" alt="screen-2" className={styles.screenshotImage} />
              <p className={styles.screenshotText}>Рис.2 — Базовые стили для body и main</p>
            </div>

            <h3 className={styles.subSectionTitle}>Шаг 4: Фиксированная шапка</h3>
            <p className={styles.text}>
              Добавьте стили для шапки с фиксированным позиционированием:
            </p>
            <pre className={styles.code}>
{`header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 40px;
    background-color: #f7f5f1;
    position: fixed;
    top: 0;
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    height: 70px;
    width: 100%;
}`}
            </pre>
            <p className={styles.text}>
              <strong>Что делает этот код?</strong>
            </p>
            <ul>
              <li><code>position: fixed</code> — фиксирует шапку вверху страницы</li>
              <li><code>z-index: 1000</code> — поднимает шапку над другими элементами</li>
              <li><code>box-shadow</code> — добавляет лёгкую тень для эффекта глубины</li>
              <li><code>background-color: #f7f5f1</code> — кремовый цвет фона</li>
            </ul>

            <h3 className={styles.subSectionTitle}>Шаг 5: Внутренний контейнер с Flexbox</h3>
            <p className={styles.text}>
              Создайте контейнер для выравнивания элементов внутри шапки:
            </p>
            <pre className={styles.code}>
{`.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    position: relative;
}`}
            </pre>
            <div className={styles.screenshotPlaceholder}>
                <img src="./images/Topic3/screen-3.webp" alt="screen-3" className={styles.screenshotImage} />
              <p className={styles.screenshotText}>Рис.3 — Flexbox-контейнер для элементов шапки</p>
            </div>

            <h3 className={styles.subSectionTitle}>Шаг 6: Стили для логотипа</h3>
            <p className={styles.text}>
              Добавьте элегантные стили для логотипа кондитерской:
            </p>
            <pre className={styles.code}>
{`.logo p {
    font-family: 'Imperial Script', cursive;
    font-size: 36px;
    color: #6B4E31;
    transition: all 0.3s ease;
}`}
            </pre>
            <p className={styles.text}>
              Обратите внимание: мы используем специальный шрифт <code>'Imperial Script'</code> и коричневый цвет <code>#6B4E31</code>, который напоминает шоколад.
            </p>

            <h3 className={styles.subSectionTitle}>Шаг 7: Скрытие бургер-меню на десктопе</h3>
            <p className={styles.text}>
              На десктопной версии мы скрываем бургер-меню:
            </p>
            <pre className={styles.code}>
{`.burger-menu {
    display: none;
}`}
            </pre>

            <h3 className={styles.subSectionTitle}>Шаг 8: Стили для навигации</h3>
            <p className={styles.text}>
              Добавьте стили для горизонтального меню:
            </p>
            <pre className={styles.code}>
{`nav {
    display: flex;
    align-items: center;
    gap: 30px;
}

nav a {
    text-decoration: none;
    color: #6B4E31;
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    transition: color 0.3s ease;
}

nav a:hover {
    color: #F5E8E4;
}`}
            </pre>
            <div className={styles.screenshotPlaceholder}>
              <img src="./images/Topic3/screen-4.webp" alt="screen-4" className={styles.screenshotImage} />
              <p className={styles.screenshotText}>Рис.4 — Стили для навигационного меню</p>
            </div>

            <h3 className={styles.subSectionTitle}>Шаг 9: Стили для иконки корзины</h3>
            <p className={styles.text}>
              Измените цвет и размер иконки корзины:
            </p>
            <pre className={styles.code}>
{`.cart-icon img {
    height: 20px;
    filter: grayscale(100%) sepia(100%) hue-rotate(10deg) saturate(200%);
}`}
            </pre>
            <p className={styles.text}>
              CSS-фильтры превращают чёрную иконку в коричневую, подходящую под цветовую палитру сайта.
            </p>

            <h3 className={styles.subSectionTitle}>Шаг 10: Скрытие мобильного логотипа на десктопе</h3>
            <p className={styles.text}>
              Мобильный логотип пока не нужен на десктопе:
            </p>
            <pre className={styles.code}>
{`.mobile-logo {
    display: none;
}`}
            </pre>

            <h3 className={styles.subSectionTitle}>Шаг 11: Проверка результата</h3>
            <p className={styles.text}>
              1. Сохраните файл <code>style.css</code> (Ctrl+S).
              <br />
              2. Вернитесь к файлу <code>index.html</code> и убедитесь, что CSS подключен в разделе <code>&lt;head&gt;</code>:
            </p>
            <pre className={styles.code}>
{`<link rel="stylesheet" href="style.css">`}
            </pre>
            <p className={styles.text}>
              3. Если Live Server работает, страница автоматически обновится.
              <br />
              4. Откройте страницу в браузере.
            </p>
            <p className={styles.text}>
              Теперь вы должны видеть красивую, фиксированную шапку с:
            </p>
            <ul>
              <li>Кремовым фоном</li>
              <li>Элегантным коричневым логотипом курсивом</li>
              <li>Горизонтальным меню с коричневыми ссылками</li>
              <li>Коричневой иконкой корзины справа</li>
              <li>Лёгкой тенью под шапкой</li>
            </ul>
            <div className={styles.screenshotPlaceholder}>
                <img src="./images/Topic3/screen-5.webp" alt="screen-5" className={styles.screenshotImage} />
              <p className={styles.screenshotText}>Рис.5 — Готовая стилизованная шапка в браузере</p>
            </div>

            <h3 className={styles.subSectionTitle}>Шаг 12: Полный код CSS для шапки</h3>
            <p className={styles.text}>
              Вот как должен выглядеть полный CSS-код для шапки:
            </p>
            <pre className={styles.code}>
{`header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 40px;
    background-color: #f7f5f1;
    position: fixed;
    top: 0;
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    height: 70px;
    width: 100%;
}

.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    position: relative;
}

.logo p {
    font-family: 'Imperial Script', cursive;
    font-size: 36px;
    color: #6B4E31;
    transition: all 0.3s ease;
}

.burger-menu {
    display: none;
}

nav {
    display: flex;
    align-items: center;
    gap: 30px;
}

nav a {
    text-decoration: none;
    color: #6B4E31;
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    transition: color 0.3s ease;
}

nav a:hover {
    color: #F5E8E4;
}

.cart-icon img {
    height: 20px;
    filter: grayscale(100%) sepia(100%) hue-rotate(10deg) saturate(200%);
}

.mobile-logo {
    display: none;
}`}
            </pre>

            <p className={styles.text}>
              <strong>Если</strong> шрифты не отображаются правильно, проверьте подключение Google Fonts в файле <code>index.html</code>. Убедитесь, что эта строка присутствует:
            </p>
            <pre className={styles.code}>
{`<link href="https://fonts.googleapis.com/css2?family=Imperial+Script&family=Lexend:wght@100..900&display=swap" rel="stylesheet">`}
            </pre>

            <p className={styles.text}>
              <strong>Сноска</strong>: В следующей теме мы создадим главный баннер (Hero-секцию) с большим фоновым изображением, заголовками и кнопкой.
            </p>
          </section>
        )}

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Итогом работы будет</h2>
          <p className={styles.text}>
            Вы превратили HTML-структуру шапки сайта <strong>Frosted Muse</strong> в красивый, функциональный компонент с помощью CSS. Вы научились использовать фиксированное позиционирование (<code>position: fixed</code>), Flexbox для выравнивания элементов (<code>display: flex</code>, <code>justify-content: space-between</code>), подключать и применять кастомные шрифты, работать с цветовой палитрой (коричневый, кремовый, бежевый), добавлять тени (<code>box-shadow</code>) и эффекты при наведении (<code>:hover</code>, <code>transition</code>), а также изменять цвет иконок с помощью CSS-фильтров.
          </p>
          <div className={styles.endImg}>
            <img src='./images/General/general.webp' alt='general-logo'></img>
          </div>
        </section>
      </div>

      <div className={styles.navigation}>
        <NavLink to="/topic4" className={styles.nextButton}>
          К следующей теме
        </NavLink>
        <BackProgress onReset={handleResetProgress} testPassed={isTestPassed} />
      </div>
    </div>
  );
};

export default Topic3;