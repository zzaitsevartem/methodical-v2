import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../Themes.module.scss';
import { motion } from 'framer-motion';
import BackButton from '../../components/BackButton/BackButton';
import BackProgress from '../../components/BackProgress/BackProgress';
import Test1 from './components/Test1';
import { useTopicProgress } from '../../../hooks/useTopicProgress';

interface Topic1Props {
  testPassed: boolean;
  setTestPassed: (value: boolean) => void;
}

const Topic1: React.FC<Topic1Props> = ({ testPassed: propTestPassed, setTestPassed: propSetTestPassed }) => {
  const { testPassed: cachedTestPassed, setTestPassed: setCachedTestPassed, testAnswers, setTestAnswers, resetProgress } = useTopicProgress('1');

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
        <h1 className={styles.title}>Тема 1: Настройка окружения и первая HTML-страница</h1>
        <p className={styles.subtitle}>Установка VS Code, создание файлов, базовая HTML-структура</p>
      </motion.div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Теория</h2>
          <p className={styles.text}>
            <strong>Веб-разработка</strong> — это масштабная, многогранная инженерно-творческая дисциплина, целью которой является создание полнофункциональных, динамичных и доступных продуктов в глобальной сети Интернет. Если проводить глубокую аналогию, то веб-разработка — это полный цикл создания и эксплуатации современного умного города, а не просто постройки отдельного здания.
          </p>
          <p className={styles.text}>
            Это процесс, который включает в себя:
          </p>
          <p className={styles.text}>
            <strong>Архитектурное проектирование и урбанистику (Планирование и Дизайн)</strong>: определение того, как будут двигаться «жители» (пользователи), где расположатся ключевые «районы» (блоки сайта), и как будет выглядеть город (визуальный дизайн).
          </p>
          <p className={styles.text}>
            <strong>Строительство инфраструктуры и коммуникаций (Backend-разработка)</strong>: создание невидимых, но жизненно важных систем: электроснабжения (серверы), водопровода и канализации (базы данных), дорог и тоннелей (API).
          </p>
          <p className={styles.text}>
            <strong>Возведение зданий, фасадов и общественных пространств (Frontend-разработка)</strong>: создание всего, с чем непосредственно взаимодействуют люди — от удобных входных групп и лифтов (интерфейс) до интерактивных вывесок и витрин (анимации, элементы управления).
          </p>
          <p className={styles.text}>
            <strong>Службы эксплуатации, безопасности и постоянной модернизации (Поддержка и DevOps)</strong>: обеспечение бесперебойной работы, защита от угроз, ремонт и расширение города по мере его роста.
          </p>
          <p className={styles.text}>
            Проще говоря, веб-разработка — это магия превращения статичной идеи или набора дизайн-макетов в живой, дышащий цифровой организм, способный реагировать на действия пользователей, обрабатывать информацию и приносить реальную пользу.
          </p>
          <p className={styles.text}>
            Чтобы понять этот сложный механизм, его принято делить на три фундаментальные и взаимосвязанные области.
          </p>

          <h3 className={styles.subSectionTitle}>1. Frontend-разработка: Искусство создания цифрового опыта</h3>
          <p className={styles.text}>
            Frontend — это вся видимая и осязаемая часть веб-продукта, которая существует в браузере пользователя. Задача фронтенд-разработчика — оживить дизайн, превратив картинку из Figma или Photoshop в интерактивный, отзывчивый и визуально безупречный интерфейс.
          </p>
          <p className={styles.text}>
            <strong>Что входит в зону ответственности фронтенда?</strong>
          </p>
          <p className={styles.text}>
            <strong>Верстка (HTML/CSS)</strong>: HTML (HyperText Markup Language) — это скелет страницы, её каркас. Он определяет структуру: где находится заголовок, абзац текста, кнопка или изображение. CSS (Cascading Style Sheets) — это кожа и одежда этого скелета. CSS отвечает за всё визуальное представление: цвета, шрифты, расположение элементов на странице, анимации и адаптацию под разные размеры экранов (технология Responsive Web Design).
          </p>
          <p className={styles.text}>
            <strong>Интерактивность (JavaScript)</strong>: Если HTML и CSS создают статичную страницу, то JavaScript (JS) — это её нервная система. JS позволяет странице реагировать на действия пользователя: нажатие кнопки, прокрутку, заполнение формы. Именно JavaScript делает веб-страницы по-настоящему динамичными приложениями.
          </p>
          <p className={styles.text}>
            <strong>Почему это важно?</strong> Потому что фронтенд — это единственная часть проекта, которую видит конечный пользователь. От его качества напрямую зависит удобство, доверие и лояльность аудитории. Плохой фронтенд, даже с самым мощным бэкендом, отпугнёт пользователей за несколько секунд.
          </p>

          <h3 className={styles.subSectionTitle}>2. Backend-разработка: Мощный мозг и невидимый хребет системы</h3>
          <p className={styles.text}>
            Backend — это всё, что работает на сервере, вдали от глаз пользователя. Если фронтенд — это красивая витрина магазина, то бэкенд — это его склад, бухгалтерия, логистический отдел и служба безопасности вместе взятые. Пользователь не видит этой работы, но ощущает её результаты каждую секунду.
          </p>
          <p className={styles.text}>
            <strong>Что скрывается на серверной стороне?</strong>
          </p>
          <p className={styles.text}>
            <strong>Серверы и их логика</strong>: Сервер — это мощный компьютер, который обрабатывает запросы от браузеров. Бэкенд-разработчик пишет код (на языках вроде Python, PHP, Java, C#, Node.js), который определяет, что именно сервер должен сделать в ответ на запрос. Например: «Если пользователь ввёл правильный логин и пароль, разреши ему доступ к личному кабинету».
          </p>
          <p className={styles.text}>
            <strong>Базы данных (БД)</strong>: Это гигантские структурированные хранилища информации. Все данные пользователей, товары в каталоге, статьи в блоге — всё это сохраняется и управляется в базах данных (например, MySQL, PostgreSQL, MongoDB). Бэкенд умеет быстро извлекать, добавлять, изменять и удалять данные из БД.
          </p>
          <p className={styles.text}>
            <strong>API (Application Programming Interface)</strong>: API — это мост, который позволяет фронтенду общаться с бэкендом на понятном им обоим языке. Когда вы листаете ленту в социальной сети, фронтенд через API отправляет на бэкенд запрос: «Дай мне следующие 10 постов», а бэкенд, в свою очередь, возвращает нужные данные в формате, который фронтенд может отобразить.
          </p>
          <p className={styles.text}>
            <strong>Почему это важно?</strong> Бэкенд отвечает за безопасность, производительность и бизнес-логику всего приложения. Без грамотно построенного бэкенда самое красивое приложение просто не сможет работать с данными и выполнять свои основные функции.
          </p>

          <h3 className={styles.subSectionTitle}>3. HTML — фундамент каждого сайта</h3>
          <p className={styles.text}>
            В этом курсе мы сосредоточимся на <strong>фронтенд-разработке</strong>, а именно — на создании красивого и функционального лендинга для кондитерской <strong>Frosted Muse</strong>. Начнём с самого фундамента — HTML.
          </p>
          <p className={styles.text}>
            <strong>HTML (HyperText Markup Language)</strong> — это не язык программирования, а язык разметки. Он сообщает браузеру, что на странице является заголовком, абзацем, изображением или ссылкой. Без HTML веб-страница — просто белый лист.
          </p>
          <p className={styles.text}>
            Каждый HTML-документ имеет базовую структуру:
          </p>

          <p className={styles.subtitleScreen}>Минимальная структура HTML-документа:</p>
          <pre className={styles.code}>
{`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Название страницы</title>
</head>
<body>
    <!-- Здесь будет содержимое страницы -->
</body>
</html>`}
          </pre>

          <p className={styles.text}>
            <strong>Разберём по частям:</strong>
          </p>
          <p className={styles.text}>
            <code>&lt;!DOCTYPE html&gt;</code> — сообщает браузеру, что это документ HTML5.
          </p>
          <p className={styles.text}>
            <code>&lt;html lang="en"&gt;</code> — корневой элемент, содержит весь документ. Атрибут <code>lang</code> указывает язык страницы.
          </p>
          <p className={styles.text}>
            <code>&lt;head&gt;</code> — служебная часть, содержит метаданные: кодировку, заголовок страницы, подключение стилей. Эта часть не отображается пользователю.
          </p>
          <p className={styles.text}>
            <code>&lt;meta charset="UTF-8"&gt;</code> — указывает кодировку символов (чтобы русские буквы отображались правильно).
          </p>
          <p className={styles.text}>
            <code>&lt;meta name="viewport"&gt;</code> — настройки для адаптивного дизайна на мобильных устройствах.
          </p>
          <p className={styles.text}>
            <code>&lt;title&gt;</code> — заголовок страницы, который отображается во вкладке браузера.
          </p>
          <p className={styles.text}>
            <code>&lt;body&gt;</code> — тело документа. Здесь размещается всё содержимое, которое видят пользователи: текст, изображения, кнопки, формы.
          </p>

          <p className={styles.text}>
            <strong>Проект Frosted Muse</strong> — это лендинг кондитерской. Вы сможете:
          </p>
          <ul>
            <li>Создать адаптивный лендинг с шапкой, секциями и подвалом.</li>
            <li>Добавить интерактивное бургер-меню для мобильных устройств.</li>
            <li>Реализовать форму заказа с валидацией.</li>
            <li>Добавить анимации при скролле и hover-эффекты.</li>
          </ul>
          <p className={styles.text}>
            <strong>Зачем это?</strong> Frosted Muse — реальный проект для портфолио. Вы научитесь создавать сайт с нуля, работать с HTML, CSS, JavaScript и публиковать его онлайн.
          </p>
          <p className={styles.subtitle}>
            Этапы разработки:
          </p>
          <ol>
            <li>Настройка окружения (сегодня).</li>
            <li>Создание шапки сайта (HTML + CSS).</li>
            <li>Верстка основных секций.</li>
            <li>Добавление адаптивности.</li>
            <li>Интерактивность на JavaScript.</li>
            <li>Публикация на GitHub Pages.</li>
          </ol>
          <p className={styles.text}>
            <strong>Главное помнить:</strong> ошибки — это нормально. Если видите, к примеру, <code>404 Not Found</code>, проверьте пути к файлам. Если Live Server не запускается, проверьте, правильно ли установлено расширение.
          </p>
        </section>

        {!isTestPassed && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Тест</h2>
            <p className={styles.text}>Пройдите тест, чтобы открыть практику.</p>
            <Test1 onComplete={handleTestComplete} setTestAnswers={setTestAnswers} testAnswers={testAnswers} />
          </section>
        )}

        {isTestPassed && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Практика</h2>
            <p className={styles.text}>
              Настройте окружение для создания сайта <strong>Frosted Muse</strong>.
            </p>

            <h3 className={styles.subSectionTitle}>Шаг 1: Установка Visual Studio Code</h3>
            <p className={styles.text}>
              1. Перейдите на{' '}
              <a href="https://code.visualstudio.com" target="_blank" rel="noopener noreferrer">
                code.visualstudio.com
              </a>{' '}
              и скачайте Visual Studio Code для вашей операционной системы.
              <br />
              2. Запустите установщик и следуйте <strong>инструкциям</strong>.
            </p>
            <div className={styles.screenshotPlaceholder}>
              <img src="./images/Topic1/screen-1.webp" alt="screen-1" className={styles.screenshotImage} />
              <p className={styles.screenshotText}>Рис.1 — Страница загрузки VS Code</p>
            </div>

            <h3 className={styles.subSectionTitle}>Шаг 2: Создание папки проекта</h3>
            <p className={styles.text}>
              1. На рабочем столе создайте папку <code>frosted-muse</code>.
              <br />
              2. Откройте VS Code.
              <br />
              3. В VS Code: File → Open Folder... → выберите <strong>созданную</strong> папку.
            </p>
            <div className={styles.screenshotPlaceholder}>
              <img src="./images/Topic1/screen-2.webp" alt="screen-2" className={styles.screenshotImage} />
              <p className={styles.screenshotText}>Рис.2 — Открытие папки в VS Code</p>
            </div>

            <h3 className={styles.subSectionTitle}>Шаг 3: Установка расширения Live Server</h3>
            <p className={styles.text}>
              1. В левом боковом меню VS Code нажмите на иконку <strong>Extensions</strong> (Ctrl+Shift+X).
              <br />
              2. В поиске введите <strong>"Live Server"</strong>.
              <br />
              3. Найдите расширение от Yannick и нажмите <strong>Install</strong>.
            </p>
            <div className={styles.screenshotPlaceholder}>
              <img src="./images/Topic1/screen-3.webp" alt="screen-3" className={styles.screenshotImage} />
              <p className={styles.screenshotText}>Рис.3 — Установка <strong>Live Server</strong></p>
            </div>

            <h3 className={styles.subSectionTitle}>Шаг 4: Создание первого HTML-файла</h3>
            <p className={styles.text}>
              1. В VS Code нажмите правой кнопкой мыши в области <strong>Explorer</strong> (левая панель) → New File.
              <br />
              2. Назовите файл <code>index.html</code>.
              <br />
              3. Внутри файла введите <code>!</code> и нажмите <strong>Enter</strong>. VS Code <strong>автоматически</strong> создаст базовую <br/> <strong>HTML-структуру</strong>.
            </p>
            <pre className={styles.code}>
{`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>`}
            </pre>
            <div className={styles.screenshotPlaceholder}>
              <img src="./images/Topic1/screen-4.webp" alt="screen-4" className={styles.screenshotImage} />
              <p className={styles.screenshotText}>Рис.4 — Результат после нажатия "!"</p>
            </div>

            <h3 className={styles.subSectionTitle}>Шаг 5: Запуск через Live Server</h3>
            <p className={styles.text}>
              1. Нажмите правой кнопкой мыши на файл <code>index.html</code> в VS Code.
              <br />
              2. Находясь <strong>внутри</strong> файла выберите на нижней панели <strong>"Go Live"</strong>.
              <br />
              3. Ваш браузер по умолчанию <strong>откроется</strong> с адресом <code>http://127.0.0.1:5500/</code>.
              <br />
              4. Вы увидите <strong>пустую</strong> страницу с заголовком "Document" во вкладке браузера.
            </p>
            <div className={styles.screenshotPlaceholder}>
              <img src="./images/Topic1/screen-5.webp" alt="screen-5" className={styles.screenshotImage} />
              <p className={styles.screenshotText}>Рис.5 — Запуск через Live Server</p>
            </div>

            <h3 className={styles.subSectionTitle}>Шаг 6: Создание остальных файлов</h3>
            <p className={styles.text}>
              1. Создайте файл <code>style.css</code> (правая кнопка → New File).
              <br />
              2. Создайте файл <code>script.js</code>.
              <br />
              3. Создайте папку <code>img</code> (правая кнопка → New Folder).
            </p>
            <pre className={styles.code}>
{`frosted-muse/
├── index.html
├── style.css
├── script.js
└── img/`}
            </pre>
            <div className={styles.screenshotPlaceholder}>
            <img src="./images/Topic1/screen-6.webp" alt="screen-6" className={styles.screenshotImage} />
              <p className={styles.screenshotText}>Рис.6 — Готовая структура проекта</p>
            </div>

            <h3 className={styles.subSectionTitle}>Шаг 7: Подключение CSS и JS к HTML</h3>
            <p className={styles.text}>
              1. В файле <code>index.html</code> внутри <code>&lt;head&gt;</code> добавьте:
            </p>
            <pre className={styles.code}>
{`<link rel="stylesheet" href="style.css">`}
            </pre>
            <p className={styles.text}>
              2. Перед закрывающим тегом <code>&lt;/body&gt;</code> добавьте:
            </p>
            <pre className={styles.code}>
{`<script src="script.js"></script>`}
            </pre>
            <p className={styles.text}>
              3. Измените заголовок страницы:
            </p>
            <pre className={styles.code}>
{`<title>Frosted Muse</title>`}
            </pre>
            <p className={styles.text}>
              4. Внутри <code>&lt;body&gt;</code> добавьте тестовый текст:
            </p>
            <pre className={styles.code}>
{`<h1>Frosted Muse</h1>
<p>Кондитерская будущего</p>`}
            </pre>

            <p className={styles.text}>
              <strong>Если</strong> Live Server не запускается, проверьте: установлено ли расширение, не занят ли порт 5500, открыта ли папка проекта в VS Code.
            </p>

            <p className={styles.text}>
              <strong>Сноска</strong>: В следующей теме вы создадите шапку сайта с логотипом и навигацией.
            </p>
          </section>
        )}

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Итогом работы будет</h2>
          <p className={styles.text}>
            Настройка окружения для разработки сайта <strong>Frosted Muse</strong>.<br />
            Вы установили VS Code, расширение Live Server, создали структуру проекта и написали первый HTML-документ.
          </p>
          <div className={styles.endImg}>
            <img src='./images/General/general.webp' alt='general-logo'></img>
          </div>
        </section>
      </div>

      <div className={styles.navigation}>
        <NavLink to="/topic2" className={styles.nextButton}>
          К следующей теме
        </NavLink>
        <BackProgress onReset={handleResetProgress} testPassed={isTestPassed} />
      </div>
    </div>
  );
};

export default Topic1;