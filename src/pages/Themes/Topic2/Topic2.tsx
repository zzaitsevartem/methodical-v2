import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../Themes.module.scss';
import { motion } from 'framer-motion';
import BackButton from '../../components/BackButton/BackButton';
import BackProgress from '../../components/BackProgress/BackProgress';
import Test2 from './components/Test2';
import { useTopicProgress } from '../../../hooks/useTopicProgress';

interface Topic2Props {
  testPassed: boolean;
  setTestPassed: (value: boolean) => void;
}

const Topic2: React.FC<Topic2Props> = ({ testPassed: propTestPassed, setTestPassed: propSetTestPassed }) => {
  const { testPassed: cachedTestPassed, setTestPassed: setCachedTestPassed, testAnswers, setTestAnswers, resetProgress } = useTopicProgress('2');

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
        <h1 className={styles.title}>Тема 2: Создание шапки сайта: HTML-разметка</h1>
        <p className={styles.subtitle}>Верстаем логотип, навигацию, иконку корзины</p>
      </motion.div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Теория</h2>
          <p className={styles.text}>
            <strong>Шапка сайта (Header)</strong> — это не просто декоративный элемент вверху страницы. Это фундаментальный компонент пользовательского интерфейса, который выполняет минимум четыре критически важные функции: <strong>идентификация</strong> (кто мы?), <strong>навигация</strong> (куда идти?), <strong>ориентация</strong> (где я?) и <strong>действие</strong> (что делать?). В случае с <strong>Frosted Muse</strong> шапка становится визитной карточкой кондитерской, которая должна вызывать желание попробовать наши десерты ещё до того, как пользователь прокрутит страницу.
          </p>
          
          <p className={styles.text}>
            Представьте, что вы входите в элитную кондитерскую. Первое, что вы видите:
          </p>
          
          <p className={styles.text}>
            <strong>1. Вывеска "Frosted Muse" (логотип)</strong> — сразу сообщает о бренде, его стиле и уровне. В веб-мире это текстовый или графический элемент в левом верхнем углу.
          </p>
          
          <p className={styles.text}>
            <strong>2. Указатели на отделы (навигация)</strong> — таблички "Торты", "Выпечка", "О нас", "Заказ". В сайте это кликабельные ссылки, ведущие к соответствующим секциям.
          </p>
          
          <p className={styles.text}>
            <strong>3. Стойка кассира или корзина (функциональный элемент)</strong> — место, где происходит финальное действие. У нас это иконка корзины, намекающая на будущие покупки.
          </p>
          
          <h3 className={styles.subSectionTitle}>1. Семантические теги HTML5: язык, понятный машинам</h3>
          <p className={styles.text}>
            Раньше шапки делали через <code>&lt;div id="header"&gt;</code>. Это работало, но было как писать "этот блок" вместо "это заголовок". HTML5 ввёл <strong>семантические теги</strong> — словарь, где каждое слово имеет чёткое значение для браузеров, поисковых систем и скринридеров.
          </p>
          
          <p className={styles.text}>
            <strong>Тег</strong> <code>&lt;header&gt;</code>: Обозначает вводный или навигационный контейнер. Может использоваться не только для всей страницы, но и для отдельных статей или секций. Ключевое: содержимое <code>&lt;header&gt;</code> — это введение к тому, что следует за ним.
          </p>
          
          <p className={styles.subtitleScreen}>Правильное использование:</p>
          <pre className={styles.code}>
{`<!-- Шапка всей страницы -->
<header>
  <h1>Frosted Muse</h1>
  <p>Кондитерская премиум-класса</p>
</header>

<!-- Шапка отдельной статьи (внутри <article>) -->
<article>
  <header>
    <h2>Шоколадный торт "Мона Лиза"</h2>
    <p>Автор: Шеф-кондитер Мария</p>
  </header>
  <p>Содержимое статьи...</p>
</article>`}
          </pre>
          
          <p className={styles.text}>
            <strong>Тег</strong> <code>&lt;nav&gt;</code> (от navigation): Предназначен <strong>исключительно</strong> для основных навигационных блоков — тех, по которым пользователь перемещается по сайту. Не нужно оборачивать в <code>&lt;nav&gt;</code> пагинацию статьи или ссылки в футере, если это не основное меню.
          </p>
          
          <p className={styles.text}>
            <strong>Почему семантика так важна?</strong>
          </p>
          
          <ul>
            <li><strong>Для SEO</strong>: Поисковые системы (Google, Яндекс) лучше понимают структуру страницы и могут точнее определять релевантность контента.</li>
            <li><strong>Для доступности (Accessibility)</strong>: Скринридеры для слабовидящих озвучивают: "Основная навигация, 4 пункта", помогая пользователю сориентироваться.</li>
            <li><strong>Для разработчиков</strong>: Код становится самодокументируемым. Видя <code>&lt;nav&gt;</code>, сразу понятно, что здесь меню, а не просто группа ссылок.</li>
            <li><strong>Для будущего</strong>: Браузеры могут предлагать встроенные функции для семантических тегов (например, быстрая навигация по landmarks).</li>
          </ul>
          
          <h3 className={styles.subSectionTitle}>2. Тег <code>&lt;a&gt;</code>: мосты между страницами</h3>
          <p className={styles.text}>
            <strong>Тег </strong><code>&lt;a&gt;</code> (anchor — якорь) — возможно, самый важный тег в HTML, ведь он создаёт гиперссылки, делая интернет интернетом. Без него каждая страница была бы островом.
          </p>
          
          <p className={styles.text}>
            <strong>Ключевые атрибуты тега</strong> <code>&lt;a&gt;</code>:
          </p>
          
          <ul>
            <li><strong><code>href</code></strong> (hypertext reference): Самый важный атрибут. Указывает URL-адрес, на который ведёт ссылка. Может быть абсолютным (<code>https://site.com/page</code>), относительным (<code>about.html</code>) или якорем (<code>#section</code>).</li>
            <li><strong><code>target</code></strong>: Определяет, где открыть ссылку. <code>_blank</code> — в новой вкладке, <code>_self</code> — в текущей (значение по умолчанию).</li>
            <li><strong><code>rel</code></strong> (relationship): Описывает отношение между текущим документом и целевым. <code>nofollow</code> — для SEO, <code>noopener</code> — для безопасности.</li>
            <li><strong><code>title</code></strong>: Всплывающая подсказка при наведении курсора.</li>
          </ul>
          
          <p className={styles.subtitleScreen}>Примеры разных ссылок:</p>
          <pre className={styles.code}>
{`<!-- Ссылка на внешний сайт (откроется в новой вкладке) -->
<a href="https://icons8.com" target="_blank" rel="noopener">
  Сайт с иконками
</a>

<!-- Ссылка на внутреннюю страницу -->
<a href="about.html" title="Узнайте о нашей истории">
  О нас
</a>

<!-- Якорная ссылка (переход внутри страницы) -->
<a href="#assortment">
  К ассортименту
</a>

<!-- Ссылка-изображение -->
<a href="#cart">
  <img src="cart.png" alt="Корзина">
</a>`}
          </pre>
          
          <p className={styles.text}>
            В нашей шапке мы используем якорные ссылки с <code>href="#"</code> — это временное решение. Знак решётки означает ссылку на текущую страницу. Позже мы заменим их на реальные якоря к секциям или URL.
          </p>
          
          <h3 className={styles.subSectionTitle}>3. Тег <code>&lt;img&gt;</code>: визуальный контент и доступность</h3>
          <p className={styles.text}>
            Иконка корзины в нашей шапке — это <strong>тег </strong><code>&lt;img&gt;</code>. Это одиночный тег (не требует закрывающего), который вставляет изображение.
          </p>
          
          <p className={styles.text}>
            <strong>Обязательные атрибуты:</strong>
          </p>
          
          <ul>
            <li><strong><code>src</code></strong> (source): Путь к файлу изображения. У нас используется внешний URL от Icons8.</li>
            <li><strong><code>alt</code></strong> (alternative text): <strong>Альтернативный текст</strong>. Это не подпись, а описание для случаев, когда изображение не загрузилось, или для скринридеров. Должен быть кратким и информативным. Для декоративных изображений можно оставить пустым (<code>alt=""</code>), но для функциональных (как корзина) — обязательно.</li>
          </ul>
          
          <p className={styles.text}>
            <strong>Дополнительные атрибуты:</strong>
          </p>
          
          <ul>
            <li><strong><code>width</code> / <code>height</code></strong>: Задают размеры. Указание размеров помогает браузеру зарезервировать место под изображение до его загрузки, предотвращая скачки макета.</li>
            <li><strong><code>loading</code></strong>: <code>lazy</code> — отложенная загрузка, когда изображение появится в области видимости.</li>
          </ul>
          
          <p className={styles.subtitleScreen}>Правильное и неправильное использование alt:</p>
          <pre className={styles.code}>
{`<!-- ❌ ПЛОХО: Слишком общее или избыточное -->
<img src="cart.png" alt="Изображение">
<img src="cart.png" alt="Это изображение корзины для покупок, 
на которой лежат различные товары...">

<!-- ✅ ХОРОШО: Конкретно и по делу -->
<img src="cart.png" alt="Корзина покупок">
<img src="logo.png" alt="Логотип Frosted Muse">

<!-- Для декоративных элементов -->
<img src="divider.png" alt="">`}
          </pre>
          
          <h3 className={styles.subSectionTitle}>4. Бургер-меню: решение для маленьких экранов</h3>
          <p className={styles.text}>
            <strong>Бургер-меню</strong> (три горизонтальные линии) стало стандартом де-факто для мобильной навигации. Его цель — экономия драгоценного пространства на экране смартфона.
          </p>
          
          <p className={styles.text}>
            <strong>Как это работает:</strong>
          </p>
          
          <ol>
            <li>На десктопе (широком экране) мы видим горизонтальное меню со всеми пунктами.</li>
            <li>При сужении экрана до ширины мобильного устройства (через медиазапросы в CSS) горизонтальное меню скрывается.</li>
            <li>Вместо него появляется иконка бургера.</li>
            <li>При клике на бургер (это будет реализовано на JavaScript) сбоку выезжает вертикальное меню со всеми пунктами.</li>
          </ol>
          
          <p className={styles.text}>
            <strong>HTML-реализация бургера</strong> проста до гениальности — три пустых элемента <code>&lt;span&gt;</code> внутри контейнера:
          </p>
          
          <pre className={styles.code}>
{`<div class="burger-menu">
  <span></span> <!-- Верхняя полоска будущего бургера -->
  <span></span> <!-- Средняя полоска -->
  <span></span> <!-- Нижняя полоска -->
</div>`}
          </pre>
          
          <p className={styles.text}>
            Вся магия (превращение трёх линий в крестик, выезд меню, анимации) будет сделана с помощью CSS (трансформации, переходы) и JavaScript (обработка клика). Сейчас мы просто закладываем основу.
          </p>
          
          <h3 className={styles.subSectionTitle}>5. Структурные элементы: <code>&lt;div&gt;</code> как универсальный контейнер</h3>
          <p className={styles.text}>
            Тег <code>&lt;div&gt;</code> (division — раздел) — это нейтральный контейнер без какого-либо семантического значения. Его задача — группировать другие элементы для удобства стилизации (через CSS) или программирования (через JavaScript).
          </p>
          
          <p className={styles.text}>
            <strong>Когда использовать</strong> <code>&lt;div&gt;</code> ? Когда нет подходящего семантического тега. В нашей шапке:
          </p>
          
          <ul>
            <li><code>&lt;div class="header-container"&gt;</code> — нужен, чтобы выровнять содержимое шапки по центру и задать ему максимальную ширину.</li>
            <li><code>&lt;div class="logo"&gt;</code> — обёртка для текста логотипа. Можно было бы использовать <code>&lt;h1&gt;</code>, но мы сделаем это позже для SEO.</li>
            <li><code>&lt;div class="cart-icon"&gt;</code> — контейнер для иконки корзины.</li>
          </ul>
          
          <p className={styles.text}>
            <strong>Главное правило</strong>: Сначала ищи подходящий семантический тег (<code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;button&gt;</code>). Если такого нет — используй <code>&lt;div&gt;</code>.
          </p>
          
          <h3 className={styles.subSectionTitle}>6. Атрибут <code>class</code>: даём имена элементам</h3>
          <p className={styles.text}>
            Атрибут <code>class</code> (класс) — это метка, которую мы вешаем на HTML-элемент, чтобы потом найти его в CSS или JavaScript. Один элемент может иметь несколько классов, разделённых пробелом.
          </p>
          
          <p className={styles.subtitleScreen}>Примеры:</p>
          <pre className={styles.code}>
{`<!-- Элемент с одним классом -->
<div class="logo">Frosted Muse</div>

<!-- Элемент с несколькими классами -->
<a href="#" class="nav-link active">Assortment</a>

<!-- Классы для состояний -->
<button class="btn btn-primary btn-disabled">Купить</button>`}
          </pre>
          
          <p className={styles.text}>
            <strong>Правила именования классов:</strong>
          </p>
          
          <ul>
            <li>Используйте осмысленные имена (<code>header-container</code>, а не <code>block1</code>).</li>
            <li>Используйте kebab-case (дефисы между словами, как в <code>burger-menu</code>).</li>
            <li>Избегайте названий, связанных с внешним видом (<code>red-button</code>), лучше описывайте функцию (<code>submit-button</code>).</li>
          </ul>
          
          <p className={styles.text}>
            <strong>В этой теме</strong> мы сосредоточились исключительно на <strong>структуре и семантике</strong>. Мы не трогали внешний вид. Наш HTML — это чистый, логичный каркас. В следующей теме с помощью CSS мы превратим этот каркас в элегантную, визуально привлекательную шапку, которая закрепится вверху страницы, приобретёт цвета, шрифты и тени.
          </p>
        </section>

        {!isTestPassed && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Тест</h2>
            <p className={styles.text}>Пройдите тест, чтобы открыть практику.</p>
            <Test2 onComplete={handleTestComplete} setTestAnswers={setTestAnswers} testAnswers={testAnswers} />
          </section>
        )}

        {isTestPassed && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Практика</h2>
            <p className={styles.text}>
              Создайте HTML-разметку для шапки сайта <strong>Frosted Muse</strong>.
            </p>

            <h3 className={styles.subSectionTitle}>Шаг 1: Подготовка файла</h3>
            <p className={styles.text}>
              1. Откройте ваш проект <code>frosted-muse</code> в VS Code.
              <br />
              2. Убедитесь, что файл <code>index.html</code> открыт.
              <br />
              3. Удалите тестовый текст внутри <code>&lt;body&gt;</code>, который мы добавляли в первой теме <br />(<code>&lt;h1&gt;Frosted Muse&lt;/h1&gt;</code> и параграф).
            </p>
            <div className={styles.screenshotPlaceholder}>
              <img src="./images/Topic2/screen-1.webp" alt="screen-1" className={styles.screenshotImage} />
              <p className={styles.screenshotText}>Рис.1 — Очищенное тело HTML-документа</p>
            </div>

            <h3 className={styles.subSectionTitle}>Шаг 2: Создание основного контейнера header</h3>
            <p className={styles.text}>
              1. Внутри тега <code>&lt;body&gt;</code> добавьте семантический тег для шапки:
            </p>
            <pre className={styles.code}>
{`<header class="header">
  <!-- Содержимое шапки будет здесь -->
</header>`}
            </pre>
            <p className={styles.text}>
              Класс <code>class="header"</code> нужен, чтобы потом обратиться к этому элементу в CSS.
            </p>

            <h3 className={styles.subSectionTitle}>Шаг 3: Внутренний контейнер для выравнивания</h3>
            <p className={styles.text}>
              Чтобы содержимое шапки не растягивалось на всю ширину, а было выровнено по центру с отступами, создаём внутренний блок:
            </p>
            <pre className={styles.code}>
{`<header class="header">
  <div class="header-container">
    <!-- Логотип, меню и корзина будут здесь -->
  </div>
</header>`}
            </pre>

            <h3 className={styles.subSectionTitle}>Шаг 4: Добавление бургер-меню для мобильных</h3>
            <p className={styles.text}>
              Внутри <code>div class="header-container"</code> добавьте разметку для бургера:
            </p>
            <pre className={styles.code}>
{`<div class="burger-menu">
  <span></span>
  <span></span>
  <span></span>
</div>`}
            </pre>
            <div className={styles.screenshotPlaceholder}>
              <img src="./images/Topic2/screen-2.webp" alt="screen-2" className={styles.screenshotImage} />
              <p className={styles.screenshotText}>Рис.2 — Код бургер-меню в VS Code</p>
            </div>

            <h3 className={styles.subSectionTitle}>Шаг 5: Создание логотипа</h3>
            <p className={styles.text}>
              После бургер-меню добавьте блок с логотипом:
            </p>
            <pre className={styles.code}>
{`<div class="logo">
  <p>Frosted Muse</p>
</div>`}
            </pre>
            <p className={styles.text}>
              Пока это просто текст. Специальный декоративный шрифт мы подключим и применим в CSS.
            </p>

            <h3 className={styles.subSectionTitle}>Шаг 6: Добавление иконки корзины</h3>
            <p className={styles.text}>
              После логотипа добавьте иконку корзины. Мы используем бесплатную иконку с сайта Icons8:
            </p>
            <pre className={styles.code}>
{`<div class="cart-icon">
  <img src="https://img.icons8.com/ios-filled/50/shopping-cart.png" alt="Cart Icon">
</div>`}
            </pre>
      
            <h3 className={styles.subSectionTitle}>Шаг 7: Создание навигационного меню (тег nav)</h3>
            <p className={styles.text}>
              Помещаем тег <code>&lt;nav&gt;</code> внутри <code>&lt;header&gt;</code>, добавляем блок навигации:
            </p>
            <pre className={styles.code}>
{`<nav>
  <div class="mobile-logo">Frosted Muse</div>
  <a href="#">Assortment</a>
  <a href="#">About</a>
  <a href="#">Order</a>
  <a href="#">Delivery</a>
</nav>`}
            </pre>
            <p className={styles.text}>
              <strong>Обратите внимание:</strong> мы добавили повтор логотипа с классом <code>mobile-logo</code>. Он будет виден только в мобильной версии, когда обычное меню скрыто.
            </p>
            <div className={styles.screenshotPlaceholder}>
              <img src="./images/Topic2/screen-3.webp" alt="screen-3" className={styles.screenshotImage} />
              <p className={styles.screenshotText}>Рис.4 — Полная структура шапки в VS Code</p>
            </div>

            <h3 className={styles.subSectionTitle}>Шаг 8: Проверка результата в браузере</h3>
            <p className={styles.text}>
              1. Сохраните файл <code>index.html</code> (Ctrl+S).
              <br />
              2. Если Live Server ещё работает, страница обновится автоматически.
              <br />
              3. Откройте страницу в браузере.
            </p>
            <p className={styles.text}>
              Вы увидите <strong>неотформатированную</strong> структуру: три линии бургера, текст логотипа, иконку корзины и список ссылок под ними.<strong> Это нормально !</strong> Мы создали только структуру. В <strong>следующей</strong> теме с помощью CSS мы превратим это в <strong>красивую</strong> шапку.
            </p>
            <div className={styles.screenshotPlaceholder}>
              <img src="./images/Topic2/screen-4.webp" alt="screen-4" className={styles.screenshotImage} />
              <p className={styles.screenshotText}>Рис.5 — Нестилизованная шапка в браузере</p>
            </div>

            <h3 className={styles.subSectionTitle}>Шаг 9: Финализация кода (полный пример)</h3>
            <p className={styles.text}>
              Вот как должен выглядеть полный код шапки внутри <code>&lt;body&gt;</code>:
            </p>
            <pre className={styles.code}>
{`<header class="header">
  <div class="header-container">
    <div class="burger-menu">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="logo">
      <p>Frosted Muse</p>
    </div>
    <div class="cart-icon">
      <img src="https://img.icons8.com/ios-filled/50/shopping-cart.png" alt="Cart Icon">
    </div>
  </div>
    <nav>
    <div class="mobile-logo">Frosted Muse</div>
      <a href="#">Assortment</a>
      <a href="#">About</a>
      <a href="#">Order</a>
      <a href="#">Delivery</a>
    </nav>
  </header> `}
            </pre>

            <p className={styles.text}>
              <strong>Если</strong> у вас не отображается иконка корзины, проверьте подключение к интернету, так как мы используем внешнюю ссылку. В будущем мы заменим её на локальный файл.
            </p>

            <p className={styles.text}>
              <strong>Сноска:</strong> В следующей теме мы "оживим" эту структуру: добавим фиксированное позиционирование, красивые шрифты, цвета, тени и сделаем шапку адаптивной.
            </p>
          </section>
        )}

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Итогом работы будет</h2>
          <p className={styles.text}>
            Вы создали полноценную HTML-структуру шапки сайта <strong>Frosted Muse</strong> с использованием семантических тегов. Вы изучили тег <code>&lt;header&gt;</code> для основного контейнера, тег <code>&lt;nav&gt;</code> для навигации, тег <code>&lt;a&gt;</code> с атрибутом <code>href</code> для создания ссылок и тег <code>&lt;img&gt;</code> с обязательным атрибутом <code>alt</code> для вставки иконки корзины. Также вы заложили основу для адаптивного бургер-меню.
          </p>
          <div className={styles.endImg}>
            <img src='./images/General/general.webp' alt='general-logo'></img>
          </div>
        </section>
      </div>

      <div className={styles.navigation}>
        <NavLink to="/topic3" className={styles.nextButton}>
          К следующей теме
        </NavLink>
        <BackProgress onReset={handleResetProgress} testPassed={isTestPassed} />
      </div>
    </div>
  );
};

export default Topic2;