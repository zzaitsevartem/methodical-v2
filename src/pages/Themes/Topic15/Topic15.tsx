import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../Themes.module.scss';
import { motion } from 'framer-motion';
import BackButton from '../../components/BackButton/BackButton';
import BackProgress from '../../components/BackProgress/BackProgress';
import Test15 from './components/Test15';
import { useTopicProgress } from '../../../hooks/useTopicProgress';

interface Topic15Props {
    testPassed: boolean;
    setTestPassed: (value: boolean) => void;
}

const Topic15: React.FC<Topic15Props> = ({ testPassed: propTestPassed, setTestPassed: propSetTestPassed }) => {
    const { testPassed: cachedTestPassed, setTestPassed: setCachedTestPassed, testAnswers, setTestAnswers, resetProgress } = useTopicProgress('15');

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
                <h1 className={styles.title}>Тема 15: Публикация сайта на GitHub Pages</h1>
                <p className={styles.subtitle}>GitHub, загрузка кода, настройка хостинга.</p>
            </motion.div>

            <div className={styles.content}>
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Теория: Глубокое погружение</h2>

                    <h3 className={styles.subSectionTitle}>1. История создания: Гнев Линуса Торвальдса</h3>
                    <p className={styles.text}>
                        Чтобы понять <strong>Git</strong>, нужно понять обстоятельства его появления. Это не просто программа, это результат конфликта и гениальности.
                    </p>
                    <p className={styles.text}>
                        До 2005 года разработка ядра <strong>Linux</strong> (самого сложного Open-Source проекта в мире) велась с использованием проприетарной (платной) системы контроля версий <strong>BitKeeper</strong>. Разработчикам Linux разрешали пользоваться ей бесплатно, но с ограничениями.
                    </p>
                    <p className={styles.text}>
                        В 2005 году случился скандал. Один из разработчиков Linux попытался сделать "реверс-инжиниринг" протоколов BitKeeper. Компания-владелец обиделась и отозвала бесплатную лицензию. Линус Торвальдс, создатель Linux, оказался в тупике: огромная команда осталась без инструмента.
                    </p>
                    <p className={styles.text}>
                        Линус ушел в "отпуск" на неделю. Он ненавидит плохие инструменты. Существующие аналоги (CVS, Subversion) он называл "мусором", потому что они были <strong>централизованными</strong> и медленными.
                    </p>
                    <p className={styles.text}>
                        Через <strong>10 дней</strong> он представил первую версию Git. Он назвал её "Git" (на британском сленге "мерзавец" или "упрямец"), сказав: <em>"Я эгоистичный ублюдок, и я называю все свои проекты в честь себя. Сначала Linux, теперь Git"</em>.
                    </p>
                    <p className={styles.text}>
                        <strong>Философия Git:</strong>
                        <br />1. <strong>Скорость</strong>. Операции должны занимать доли секунды.
                        <br />2. <strong>Распределенность</strong>. У каждого разработчика есть ПОЛНАЯ копия всей истории проекта. Если сервер сгорит, проект можно восстановить с любого ноутбука.
                        <br />3. <strong>Целостность данных</strong>. Невозможно изменить файл так, чтобы Git этого не заметил (используется хеширование SHA-1).
                    </p>

                    <div className={styles.screenshotPlaceholder}>
                        <img src="./images/Topic15/screen-1.webp" alt="screen-1" className={styles.screenshotImage} />
                        <p className={styles.screenshotText}>Рис.1 — Линус Торвальдс (2005 год)</p>
                    </div>

                    <h3 className={styles.subSectionTitle}>2. Архитектура: Три Дерева</h3>
                    <p className={styles.text}>
                        Многие новички путаются в Git, потому что не понимают, "где" находятся файлы. В Git есть три логические зоны:
                    </p>
                    <ol className={styles.text}>
                        <li>
                            <strong>Working Directory (Рабочая директория)</strong>:
                            <br />Это ваша папка с файлами. То, что вы видите в VS Code и можете открыть. Здесь файлы "грязные", измененные.
                        </li>
                        <li>
                            <strong>Staging Area (Индекс / Зона подготовки)</strong>:
                            <br />Это промежуточная зона. Когда вы пишете <code>git add</code>, вы говорите: "Я хочу включить эти изменения в следующий снимок". Это как корзина покупок перед кассой. Вы можете положить туда 5 файлов, а потом передумать и положить 6-й.
                        </li>
                        <li>
                            <strong>Repository (Комиты / История)</strong>:
                            <br />Это "касса". Команда <code>git commit</code> берет всё из Staging Area и запечатывает в "капсулу времени" навсегда. Этот снимок получает уникальный ID (хеш).
                        </li>
                    </ol>
                    <p className={styles.text}>
                        <strong>Поток данных:</strong>
                        <br />Рабочая папка -&gt; <code>git add</code> -&gt; Staging Area -&gt; <code>git commit</code> -&gt; Репозиторий.
                    </p>

                    <div className={styles.screenshotPlaceholder}>
                        <img src="./images/Topic15/screen-2.webp" alt="screen-2" className={styles.screenshotImage} />
                        <p className={styles.screenshotText}>Рис.2 — Схема движения файлов между зонами</p>
                    </div>

                    <h3 className={styles.subSectionTitle}>3. Git vs GitHub: Не путать!</h3>
                    <p className={styles.text}>
                        Это самая частая ошибка новичков.
                    </p>
                    <p className={styles.text}>
                        <strong>Git</strong> — это консольная утилита. Она работает локально. Ей не нужен интернет. Она живет в папке <code>.git</code>.
                        <br />
                        <strong>GitHub</strong> (или GitLab, Bitbucket) — это веб-сайт. Это хостинг. Это социальная сеть.
                    </p>
                    <p className={styles.text}>
                        Вы можете использовать Git без GitHub (просто хранить историю локально). Но вы не можете загрузить проект на GitHub без Git.
                    </p>
                    <p className={styles.text}>
                        <strong>Сценарий:</strong>
                        <br />Вы делаете коммиты у себя дома (локально). Вечером вы делаете <code>git push</code> — и ваши коммиты "летят" на сервер GitHub. Утром ваш коллега в офисе делает <code>git pull</code> — и эти коммиты "прилетают" к нему.
                    </p>

                    <h3 className={styles.subSectionTitle}>4. Ветвление (Branching) — Суперсила</h3>
                    <p className={styles.text}>
                        Представьте, что вы пишите игру. У вас есть рабочая версия. Вы хотите добавить нового монстра, но боитесь сломать игру.
                    </p>
                    <p className={styles.text}>
                        В старых системах (SVN) вы бы копировали папку с проектом: "Game_v1", "Game_new_monster".
                        <br />
                        В Git вы создаете <strong>ветку</strong>.
                    </p>
                    <p className={styles.text}>
                        <code>git checkout -b new-monster</code>
                    </p>
                    <p className={styles.text}>
                        Мгновенно создается параллельная вселенная. Вы можете делать там что угодно: ломать код, удалять файлы. Основная ветка (<code>main</code>) остается чистой и рабочей.
                    </p>
                    <p className={styles.text}>
                        Когда монстр готов и протестирован, вы делаете <strong>Merge</strong> (слияние). Git автоматически (почти всегда) объединяет код из ветки <code>new-monster</code> в <code>main</code>.
                    </p>

                    <div className={styles.screenshotPlaceholder}>
                        <img src="./images/Topic15/screen-3.webp" alt="screen-3" className={styles.screenshotImage} />
                        <p className={styles.screenshotText}>Рис.3 — Визуализация веток и слияния</p>
                    </div>

                    <h3 className={styles.subSectionTitle}>5. Командная работа: Workflow</h3>
                    <p className={styles.text}>
                        Как работают в Google, Facebook и Яндексе? Никто не пишет в <code>main</code>.
                    </p>
                    <p className={styles.text}>
                        <strong>Gold Standard Workflow:</strong>
                        <br />1. Утром программист скачивает обновления: <code>git pull</code>.
                        <br />2. Создает ветку под задачу: <code>git checkout -b fix-login-form</code>.
                        <br />3. Пишет код, делает коммиты.
                        <br />4. Отправляет ветку на сервер: <code>git push origin fix-login-form</code>.
                        <br />5. Создает <strong>Pull Request (PR)</strong> на сайте GitHub.
                        <br />6. Коллеги читают код (Code Review), пишут замечания ("Здесь переменная названа криво", "Тут возможна ошибка").
                        <br />7. Программист исправляет замечания.
                        <br />8. Тимлид нажимает кнопку "Merge". Код попадает в <code>main</code>.
                    </p>

                    <div className={styles.screenshotPlaceholder}>
                        <img src="./images/Topic15/screen-4.webp" alt="screen-4" className={styles.screenshotImage} />
                        <p className={styles.screenshotText}>Рис.4 — Интерфейс Pull Request на GitHub</p>
                    </div>

                    <h3 className={styles.subSectionTitle}>6. Конвенция Коммитов (Conventional Commits)</h3>
                    <p className={styles.text}>
                        Нельзя писать в коммитах "fix", "update", "qwerty". Это непрофессионально. Есть стандарт <strong>Conventional Commits</strong>, который требуют в крупных компаниях.
                    </p>
                    <p className={styles.text}>
                        Формат: <code>тип: описание в повелительном наклонении</code>
                    </p>
                    <ul className={styles.text}>
                        <li><code>feat: add burger menu</code> — (feature) новая функция.</li>
                        <li><code>fix: resolve validation error</code> — исправление бага.</li>
                        <li><code>docs: update readme</code> — изменения в документации.</li>
                        <li><code>style: format code with prettier</code> — пробелы, точки с запятой (код не меняется логически).</li>
                        <li><code>refactor: rewrite loop function</code> — улучшение кода без изменения функционала.</li>
                    </ul>

                    <h3 className={styles.subSectionTitle}>7. Файл .gitignore — Мусоропровод</h3>
                    <p className={styles.text}>
                        Зачем он нужен?
                        <br />В современных проектах есть папка <code>node_modules</code>. Там лежат библиотеки. Она может весить <strong>500 Мб</strong> и содержать <strong>100 000 файлов</strong>.
                        <br />Если вы попытаетесь добавить её в Git, всё зависнет.
                    </p>
                    <p className={styles.text}>
                        Мы не храним библиотеки в Git. Мы храним только список <code>package.json</code>. Любой другой программист скачает ваш проект и напишет <code>npm install</code>, чтобы скачать библиотеки.
                    </p>
                    <p className={styles.text}>
                        Что обязательно должно быть в <code>.gitignore</code>:
                        <br />- <code>node_modules/</code> (библиотеки)
                        <br />- <code>dist/</code> или <code>build/</code> (готовая сборка сайта)
                        <br />- <code>.env</code> (файлы с паролями и ключами API — <strong>КРИТИЧНО!</strong>)
                        <br />- <code>.DS_Store</code> (мусор от MacOS)
                    </p>

                    <div className={styles.screenshotPlaceholder}>
                        <img src="./images/Topic15/screen-5.webp" alt="screen-5" className={styles.screenshotImage} />
                        <p className={styles.screenshotText}>Рис.5 — Создание файла .gitignore</p>
                    </div>

                    <h3 className={styles.subSectionTitle}>8. SSH ключи: Доступ без пароля</h3>
                    <p className={styles.text}>
                        Каждый раз вводить логин и пароль при <code>git push</code> — мучение. Профессионалы используют <strong>SSH</strong> (Secure Shell).
                    </p>
                    <p className={styles.text}>
                        Суть: Вы генерируете пару ключей на компьютере (публичный и приватный). Публичный ключ вы загружаете в настройки профиля GitHub.
                        <br />
                        Теперь GitHub "узнает" ваш компьютер по цифровому отпечатку. Это безопаснее и удобнее паролей.
                    </p>

                    <div className={styles.screenshotPlaceholder}>
                        <img src="./images/Topic15/screen-6.webp" alt="screen-6" className={styles.screenshotImage} />
                        <p className={styles.screenshotText}>Рис.6 — Добавление SSH ключа в GitHub</p>
                    </div>

                </section>

                {!isTestPassed && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Тест</h2>
                        <p className={styles.text}>Пройдите тест, чтобы открыть доступ к практике.</p>
                        <Test15 onComplete={handleTestComplete} setTestAnswers={setTestAnswers} testAnswers={testAnswers} />
                    </section>
                )}

                {isTestPassed && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Практика: Деплой с нуля</h2>
                        <p className={styles.text}>
                            Мы не просто зальем код. Мы сделаем это по стандартам индустрии: с правильными коммитами, ветками и настройкой окружения.
                        </p>

                        <h3 className={styles.subSectionTitle}>Шаг 0. Установка Git</h3>
                        <p className={styles.text}>
                            Перед всем убедитесь, что Git установлен на вашем компьютере. Откройте терминал и введите:
                        </p>
                        <pre className={styles.code}>
                            {`git --version`}
                        </pre>
                        <p className={styles.text}>
                            Если вы видите ответ вида <code>git version 2.x.x</code> — отлично, Git установлен. Если видите ошибку <code>command not found</code> — нужно установить.
                        </p>

                        <div className={styles.screenshotPlaceholder}>
                            <img src="./images/Topic15/screen-7.webp" alt="screen-7" className={styles.screenshotImage} />
                            <p className={styles.screenshotText}>Рис.7 — Проверка версии Git в терминале</p>
                        </div>

                        <p className={styles.text}>
                            Если Git не установлен, скачайте его с официального сайта:{' '}
                            <a href="https://git-scm.com/downloads" target="_blank" rel="noopener noreferrer">git-scm.com/downloads</a>.
                            {' '}После установки перезапустите терминал и снова выполните <code>git --version</code>.
                        </p>

                        <h3 className={styles.subSectionTitle}>Шаг 1. Регистрация на GitHub</h3>
                        <p className={styles.text}>
                            Если у вас уже есть аккаунт — пропустите этот шаг. Если нет — выполните следующие действия:
                        </p>
                        <ol className={styles.text}>
                            <li>
                                Откройте{' '}
                                <a href="https://github.com" target="_blank" rel="noopener noreferrer">github.com</a>
                                {' '}и нажмите <strong>Sign up</strong>.
                            </li>
                            <li>
                                Введите электронную почту и придумайте пароль.
                            </li>
                            <li>
                                Выберите <strong>имя пользователя (username)</strong>. Он будет виден в ваших ссылках. Выбирайте что-то профессиональное (например, ваше-имя-дев).
                            </li>
                            <li>
                                Подтвердите емайл (GitHub пришлёт письмо с кодом) и выберите бесплатный план подписки <strong>Free</strong>.
                            </li>
                        </ol>

                        <div className={styles.screenshotPlaceholder}>
                            <img src="./images/Topic15/screen-8.webp" alt="screen-8" className={styles.screenshotImage} />
                            <p className={styles.screenshotText}>Рис.8 — Форма регистрации на GitHub</p>
                        </div>

                        <p className={styles.text}>
                            Также необходимо редактировать конфигурацию Git с юзерданными (сделайте это один раз):
                        </p>
                        <pre className={styles.code}>
                            {`git config --global user.name "Ваше Имя"
git config --global user.email "vashe@mail.com"`}
                        </pre>

                        <h3 className={styles.subSectionTitle}>Шаг 2. Подготовка проекта</h3>
                        <p className={styles.text}>
                            Убедитесь, что вы в корне проекта. Создайте файл <code>.gitignore</code> если его ещё нет.
                        </p>
                        <pre className={styles.code}>
                            {`# Logs
logs
*.log
npm-debug.log*

# Dependency directories
node_modules/

# Mac OS junk
.DS_Store

# IDE Settings
.vscode/
.idea/`}
                        </pre>

                        <h3 className={styles.subSectionTitle}>Шаг 3. Инициализация и Первый Коммит</h3>
                        <p className={styles.text}>
                            В терминале прописываем магию.
                        </p>
                        <pre className={styles.code}>
                            {`git init
git add .
git commit -m "feat: initial project structure completion"`}
                        </pre>
                        <p className={styles.text}>
                            Обратите внимание на сообщение коммита! Мы используем префикс <code>feat:</code>.
                        </p>

                        <h3 className={styles.subSectionTitle}>Шаг 4. Переименование ветки</h3>
                        <p className={styles.text}>
                            GitHub в 2020 году сменил название основной ветки с <code>master</code> на <code>main</code>.
                        </p>
                        <pre className={styles.code}>{`git branch -M main`}</pre>

                        <h3 className={styles.subSectionTitle}>Шаг 5. Создание удалённого репозитория</h3>
                        <p className={styles.text}>
                            1. Перейдите на{' '}
                            <a href="https://github.com/new" target="_blank" rel="noopener noreferrer">github.com/new</a>.
                            <br />2. Имя: <code>frosted-muse-final</code>.
                            <br />3. Видимость: <strong>Public</strong>.
                            <br />4. Нажмите <strong>Create repository</strong>.
                        </p>

                        <div className={styles.screenshotPlaceholder}>
                            <img src="./images/Topic15/screen-9.webp" alt="screen-9" className={styles.screenshotImage} />
                            <p className={styles.screenshotText}>Рис.9 — Создание нового репозитория на GitHub</p>
                        </div>

                        <p className={styles.text}>
                            После создания GitHub покажет страницу с инструкциями. В разделе <strong>«...or push an existing repository»</strong> вы увидите URL репозитория — скопируйте его (вид будет <code>https://github.com/ваш-логин/frosted-muse-final.git</code>).
                        </p>

                        <h3 className={styles.subSectionTitle}>Шаг 6. Связь и Отправка</h3>
                        <p className={styles.text}>
                            Копируем команды с GitHub (раздел «...or push an existing repository»).
                        </p>
                        <pre className={styles.code}>
                            {`git remote add origin https://github.com/ваш-логин/frosted-muse-final.git
git push -u origin main`}
                        </pre>

                        <h3 className={styles.subSectionTitle}>Шаг 7. Настройка GitHub Pages</h3>
                        <p className={styles.text}>
                            Мы хотим, чтобы сайт открывался по ссылке, а не просто лежал кодом.
                            <br />1. В репозитории: <strong>Settings</strong> → <strong>Pages</strong>.
                            <br />2. Source: <strong>Deploy from a branch</strong>.
                            <br />3. Branch: <strong>main</strong> / <strong>/(root)</strong>.
                            <br />4. Save.
                            <br />Через 2-3 минуты появится ссылка вида <code>https://ваш-логин.github.io/frosted-muse-final/</code>.
                        </p>

                        <div className={styles.screenshotPlaceholder}>
                            <img src="./images/Topic15/screen-10.webp" alt="screen-10" className={styles.screenshotImage} />
                            <p className={styles.screenshotText}>Рис.10 — Настройка GitHub Pages</p>
                        </div>

                        <hr className={styles.divider} />

                        <h2 className={styles.sectionTitle}>ВЫПУСКНОЙ БАЛ</h2>

                        <h3 className={styles.subSectionTitle}>Ваше новое звание</h3>
                        <p className={styles.text}>
                            Поздравляем. С этого момента вы перестаете быть "человеком, который интересуется IT" и становитесь <strong>Junior Frontend Developer</strong>.
                        </p>

                        <h3 className={styles.subSectionTitle}>Что вы теперь знаете (Чек-лист для резюме)</h3>
                        <ul className={styles.text}>
                            <li><strong>HTML5 Semantic</strong>: Умение строить структуру документа, формы, валидация.</li>
                            <li><strong>CSS3 Flexbox & Grid</strong>: Адаптивная верстка, анимации, миксины, работа с макетом.</li>
                            <li><strong>JavaScript ES6+</strong>: Переменные, циклы, функции, стрелочные функции, области видимости.</li>
                            <li><strong>DOM Manipulation</strong>: События, создание элементов, управление классами.</li>
                            <li><strong>Data Storage</strong>: LocalStorage, JSON, работа с состоянием.</li>
                            <li><strong>Git Flow</strong>: Коммиты, ветки, пуши, работа с GitHub.</li>
                            <li><strong>Soft Skills</strong>: Умение читать документацию и гуглить ошибки (надеюсь, вы научились этому, когда у вас что-то не работало).</li>
                        </ul>

                        <h3 className={styles.subSectionTitle}>Карьерная Стратегия</h3>
                        <p className={styles.text}>
                            <strong>Рынок труда (РФ, 2024-2025):</strong>
                            <br />- Стажер (Intern): 30k - 50k руб. (Обучение в боевых условиях).
                            <br />- Джуниор (Junior): 60k - 100k руб. (Самостоятельные задачи).
                            <br />- Миддл (Middle): 150k - 300k руб. (1.5 - 3 года опыта).
                            <br />- Сеньор (Senior): 350k+ руб. (Архитектура, менторство, 5+ лет).
                        </p>

                        <h3 className={styles.subSectionTitle}>Куда расти (Roadmap)</h3>
                        <ol className={styles.text}>
                            <li>
                                <strong>React.js / Vue.js / Angular</strong>. Вы уже коснулись React в этом учебнике. Это стандарт индустрии. Чистый JS сейчас используется редко.
                            </li>
                            <li>
                                <strong>TypeScript</strong>. Это JavaScript на стероидах. Типизация спасает от 90% глупых ошибок. Must have для всех крупных компаний.
                            </li>
                            <li>
                                <strong>Backend Basics</strong> (Node.js). Чтобы понимать, откуда приходят данные и как работает сервер.
                            </li>
                            <li>
                                <strong>Английский язык</strong>. Вся документация, все новые статьи — на английском. Без него вы всегда будете отставать на год от мира.
                            </li>
                        </ol>

                        <h3 className={styles.subSectionTitle}>Финальное напутствие</h3>
                        <p className={styles.text}>
                            Программирование — это боль. Это часы дебаггинга, красные консоли и ощущение собственной тупости. Но момент, когда код начинает работать... это чистый дофамин. Это магия, которую вы творите своими руками.
                        </p>
                        <p className={styles.text}>
                            Не бойтесь ошибаться. Сеньор — это джуниор, который совершил все возможные ошибки и запомнил их.
                            <br />
                            <strong>Удачи в мире кода, коллега!</strong> 🚀
                        </p>

                    </section>
                )}

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Итогом работы стало</h2>
                    <p className={styles.text}>
                        Вы не просто создали сайт. Вы прошли полный цикл разработки ПО: от настройки окружения до деплоя в продакшн с использованием системы контроля версий Git.
                        <strong>Вы готовы к реальной работе.</strong>
                    </p>
                    <div className={styles.endImg}>
                        <img src='./images/General/general.webp' alt='general-logo'></img>
                    </div>
                </section>
            </div>

            <div className={styles.navigation}>
                <NavLink to="/" className={styles.nextButton}>
                    Завершить Курс
                </NavLink>
                <BackProgress onReset={handleResetProgress} testPassed={isTestPassed} />
            </div>
        </div>
    );
};

export default Topic15;
