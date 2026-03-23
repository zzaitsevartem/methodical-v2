import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../Themes.module.scss';
import { motion } from 'framer-motion';
import BackButton from '../../components/BackButton/BackButton';
import BackProgress from '../../components/BackProgress/BackProgress';
import Test13 from './components/Test13';
import { useTopicProgress } from '../../../hooks/useTopicProgress';

interface Topic13Props {
    testPassed: boolean;
    setTestPassed: (value: boolean) => void;
}

const Topic13: React.FC<Topic13Props> = ({ testPassed: propTestPassed, setTestPassed: propSetTestPassed }) => {
    const { testPassed: cachedTestPassed, setTestPassed: setCachedTestPassed, testAnswers, setTestAnswers, resetProgress } = useTopicProgress('13');

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

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
                <h1 className={styles.title}>Тема 13: Работа с формами: валидация</h1>
                <p className={styles.subtitle}>Форма заказа, проверка данных, ошибки через DOM</p>
            </motion.div>

            <div className={styles.content}>
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Теория</h2>

                    <h3 className={styles.subSectionTitle}>1. Формы как основа интернета</h3>
                    <p className={styles.text}>
                        Без форм интернет был бы похож на телевизор: смотри, но не трогай. <strong>HTML-формы</strong> позволяют пользователю отправлять данные на сервер. Регистрация, поиск, покупка билетов — всё это формы.
                    </p>
                    <p className={styles.text}>
                        Главное правило веб-разработки: <strong>Никогда не доверяй вводу пользователя</strong>. Люди ошибаются, опечатываются или пытаются взломать сайт. Наша задача — проверить данные (валидировать) перед их обработкой.
                    </p>

                    <div className={styles.screenshotPlaceholder}>
                        <img src="./images/Topic13/screen-1.webp" alt="screen-1" className={styles.screenshotImage} />
                        <p className={styles.screenshotText}>Рис.1 — Примеры форм в вебе</p>
                    </div>

                    <h3 className={styles.subSectionTitle} id="formStructure">2. Анатомия формы</h3>
                    <p className={styles.text}>
                        Форму создаёт тег <code>&lt;form&gt;</code>. Внутри него живут <code>&lt;input&gt;</code> (поля ввода) и <code>&lt;button&gt;</code>.
                    </p>
                    <pre className={styles.code}>
                        {`<form id="order-form">
    <input type="text" id="name-input" placeholder="Ваше имя">
    <input type="email" id="email-input" placeholder="Email">
    <input type="tel" id="phone-input" placeholder="Телефон">
    <button type="submit">Отправить</button>
</form>`}
                    </pre>
                    <p className={styles.text}>
                        Атрибут <code>required</code> — это первая линия обороны. Браузер сам не даст отправить пустое поле. Но этого мало — нужна JavaScript-валидация.
                    </p>

                    <div className={styles.screenshotPlaceholder}>
                        <img src="./images/Topic13/screen-2.webp" alt="screen-2" className={styles.screenshotImage} />
                        <p className={styles.screenshotText}>Рис.2 — Встроенная валидация браузера</p>
                    </div>

                    <h3 className={styles.subSectionTitle} id="inputTypes">3. Типы input</h3>
                    <p className={styles.text}>
                        HTML5 добавил много типов полей. Использование правильного типа улучшает UX (особенно на мобильных):
                    </p>
                    <ul className={styles.text}>
                        <li><code>type="email"</code>: Проверяет наличие @ и меняет клавиатуру на смартфоне.</li>
                        <li><code>type="tel"</code>: Открывает цифровую клавиатуру.</li>
                        <li><code>type="password"</code>: Скрывает символы точками.</li>
                        <li><code>type="number"</code>: Разрешает только цифры.</li>
                        <li><code>type="checkbox"</code>: Чекбокс — галочка.</li>
                        <li><code>type="radio"</code>: Переключатели (один из многих).</li>
                    </ul>

                    <div className={styles.screenshotPlaceholder}>
                        <img src="./images/Topic13/screen-3.webp" alt="screen-3" className={styles.screenshotImage} />
                        <p className={styles.screenshotText}>Рис.3 — Разные клавиатуры на мобильных устройствах</p>
                    </div>

                    <h3 className={styles.subSectionTitle} id="jsValidation">4. JavaScript-валидация и preventDefault</h3>
                    <p className={styles.text}>
                        Чтобы проверить данные по-настоящему, нужен JS. Мы слушаем событие <code>submit</code> на форме.
                    </p>
                    <p className={styles.text}>
                        <strong>Важно:</strong> Первым делом нужно отменить стандартную отправку формы через <code>event.preventDefault()</code>, иначе страница перезагрузится и все данные потеряются.
                    </p>
                    <pre className={styles.code}>
                        {`const form = document.getElementById('order-form');

form.addEventListener('submit', function(e) {
    e.preventDefault(); // Страница НЕ перезагрузится

    const nameInput = document.getElementById('name-input');
    const name = nameInput.value.trim(); // .trim() убирает пробелы по краям

    if (name.length < 2) {
        // Показываем ошибку
        console.log("Имя слишком короткое!");
    } else {
        console.log("Форма валидна, отправляем:", name);
    }
});`}
                    </pre>

                    <div className={styles.screenshotPlaceholder}>
                        <img src="./images/Topic13/screen-4.webp" alt="screen-4" className={styles.screenshotImage} />
                        <p className={styles.screenshotText}>Рис.4 — Схема работы валидации на JS</p>
                    </div>

                    <h3 className={styles.subSectionTitle} id="domErrors">5. Показ ошибок через DOM (не alert!)</h3>
                    <p className={styles.text}>
                        Использовать <code>alert()</code> для показа ошибок — дурной тон. Это прерывает работу пользователя и выглядит некрасиво. Профессиональный подход: создаём специальный элемент для ошибки прямо под полем ввода и управляем им через DOM.
                    </p>
                    <pre className={styles.code}>
                        {`function showError(input, message) {
    // Ищем элемент для ошибки рядом с полем
    const errorEl = input.parentElement.querySelector('.error-msg');

    // Подсвечиваем поле красным
    input.style.borderColor = 'red';

    // Показываем текст ошибки
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
    }
}

function clearError(input) {
    const errorEl = input.parentElement.querySelector('.error-msg');
    input.style.borderColor = '';
    if (errorEl) {
        errorEl.textContent = '';
        errorEl.style.display = 'none';
    }
}`}
                    </pre>
                    <p className={styles.text}>
                        В HTML рядом с каждым полем полем добавляется пустой блок: <code>&lt;span class="error-msg"&gt;&lt;/span&gt;</code>. Мы заполняем его текстом только при ошибке.
                    </p>

                    <div className={styles.screenshotPlaceholder}>
                        <img src="./images/Topic13/screen-5.webp" alt="screen-5" className={styles.screenshotImage} />
                        <p className={styles.screenshotText}>Рис.5 — Показ ошибок под полем ввода</p>
                    </div>

                    <h3 className={styles.subSectionTitle} id="stringMethods">6. Полезные методы строк для валидации</h3>
                    <p className={styles.text}>
                        При проверке данных формы вам понадобятся несколько строковых методов:
                    </p>
                    <pre className={styles.code}>
                        {`const email = "  Hello@WORLD.com  ";

// trim() — убирает пробелы по краям
console.log(email.trim()); // "Hello@WORLD.com"

// toLowerCase() — переводит в нижний регистр
console.log(email.trim().toLowerCase()); // "hello@world.com"

// includes() — проверяет, содержит ли строка подстроку
console.log(email.includes("@")); // true
console.log(email.includes("@@")); // false

// length — длина строки
console.log("Иван".length); // 4

// startsWith() / endsWith() — начинается/заканчивается ли на
console.log("hello@mail.ru".endsWith(".ru")); // true`}
                    </pre>

                    <h3 className={styles.subSectionTitle} id="regex">7. Регулярные выражения (Regex) — кратко</h3>
                    <p className={styles.text}>
                        Это мощный инструмент для проверки формата строки. Выглядят страшно, но работают эффективно.
                    </p>
                    <pre className={styles.code}>
                        {`// Проверить, что строка содержит только цифры
    /* eslint-disable-next-line no-useless-escape */
const isAllDigits = /^\d+$/.test("12345"); // true
const isAllDigits2 = /^\d+$/.test("123a5"); // false

// Проверить формат российского телефона
const phoneRegex = /^[+7|8][\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;
console.log(phoneRegex.test("+7 (999) 123-45-67")); // true`}
                    </pre>

                    <div className={styles.screenshotPlaceholder}>
                        <img src="./images/Topic13/screen-6.webp" alt="screen-6" className={styles.screenshotImage} />
                        <p className={styles.screenshotText}>Рис.6 — Подсветка ошибок в реальном времени</p>
                    </div>

                    <h3 className={styles.subSectionTitle} id="liveValidation">8. UX: Мгновенная обратная связь</h3>
                    <p className={styles.text}>
                        Хорошая форма сообщает об ошибке сразу, а не после нажатия кнопки. Для этого мы слушаем событие <code>input</code> (каждое нажатие клавиши) или <code>blur</code> (потеря фокуса — пользователь перешёл к следующему полю) на каждом поле.
                    </p>
                    <pre className={styles.code}>
                        {`const nameInput = document.getElementById('name-input');

// Проверяем при каждом вводе символа
nameInput.addEventListener('input', function() {
    if (nameInput.value.trim().length < 2) {
        showError(nameInput, "Имя должно содержать минимум 2 символа");
    } else {
        clearError(nameInput); // Убираем ошибку, если всё хорошо
    }
});`}
                    </pre>

                </section>

                {
                    !isTestPassed && (
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Тест</h2>
                            <p className={styles.text}>Пройдите тест, чтобы открыть доступ к практике.</p>
                            <Test13 onComplete={handleTestComplete} setTestAnswers={setTestAnswers} testAnswers={testAnswers} />
                        </section>
                    )
                }

                {
                    isTestPassed && (
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Практика: Форма заказа</h2>
                            <p className={styles.text}>
                                Добавим на сайт Frosted Muse форму заказа с профессиональной валидацией — без единого <code>alert()</code>!
                            </p>

                            <h3 className={styles.subSectionTitle}>Задание 1: Форма с DOM-ошибками</h3>
                            <p className={styles.text}>
                                Создайте простую форму с полем «Имя» и кнопкой. Рядом с полем добавьте <code>&lt;span class="error"&gt;&lt;/span&gt;</code>. При нажатии кнопки проверяйте: если имя короче 2 символов — показывайте текст в span красным цветом. Если всё хорошо — очищайте ошибку.
                            </p>
                            <p className={styles.text}>
                                <span onClick={() => scrollToSection('domErrors')} className={styles.hintLink} style={{ cursor: 'pointer' }}>
                                    💡 Подсказка: используйте функции showError() и clearError() из теории. Не забудьте e.preventDefault()!
                                </span>
                            </p>

                            <h3 className={styles.subSectionTitle}>Задание 2: Валидация email в реальном времени</h3>
                            <p className={styles.text}>
                                Добавьте поле email. Слушайте событие <code>input</code>. Используйте <code>.includes('@')</code>, чтобы проверять корректность прямо во время ввода. Показывайте зелёную рамку при корректном вводе и красную при ошибке.
                            </p>
                            <p className={styles.text}>
                                <span onClick={() => scrollToSection('liveValidation')} className={styles.hintLink} style={{ cursor: 'pointer' }}>
                                    💡 Подсказка: слушайте событие 'input', а не 'submit'. Это даёт мгновенную обратную связь
                                </span>
                            </p>
                            <pre className={styles.code}>
                                {`const emailInput = document.getElementById('email-input');

emailInput.addEventListener('input', function() {
    const val = emailInput.value.trim();
    if (val.includes('@') && val.includes('.')) {
        emailInput.style.borderColor = 'green';
    } else {
        emailInput.style.borderColor = 'red';
    }
});`}
                            </pre>

                            <h3 className={styles.subSectionTitle}>Задание 3: Frosted Muse — Полная форма заказа</h3>
                            <p className={styles.text}>
                                Теперь добавим в проект полноценную форму. Откройте <code>index.html</code> и добавьте HTML формы в раздел контактов.
                            </p>

                            <h3 className={styles.subSectionTitle}>Шаг 1. HTML</h3>
                            <pre className={styles.code}>
                                {`<form id="order-form">
    <div class="form-group">
        <input type="text" id="name-input" name="name" placeholder="Ваше имя" class="input-field">
        <span class="error-msg" id="name-error"></span>
    </div>
    <div class="form-group">
        <input type="tel" id="phone-input" name="phone" placeholder="Телефон" class="input-field">
        <span class="error-msg" id="phone-error"></span>
    </div>
    <button type="submit" class="btn">Заказать торт</button>
    <div id="success-msg" class="success-msg"></div>
</form>`}
                            </pre>

                            <h3 className={styles.subSectionTitle}>Шаг 2. JavaScript Валидация</h3>
                            <p className={styles.text}>
                                <span onClick={() => scrollToSection('jsValidation')} className={styles.hintLink} style={{ cursor: 'pointer' }}>
                                    💡 Подсказка: проверяйте каждое поле отдельно. Только если все поля прошли — показывайте сообщение об успехе
                                </span>
                            </p>
                            <pre className={styles.code}>
                                {`const form = document.getElementById('order-form');
const nameInput = document.getElementById('name-input');
const phoneInput = document.getElementById('phone-input');
const nameError = document.getElementById('name-error');
const phoneError = document.getElementById('phone-error');
const successMsg = document.getElementById('success-msg');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    let isValid = true;

    // Проверка имени
    const name = nameInput.value.trim();
    if (name.length < 2) {
        nameError.textContent = "Имя должно быть минимум 2 символа";
        nameInput.style.borderColor = "red";
        isValid = false;
    } else {
        nameError.textContent = "";
        nameInput.style.borderColor = "green";
    }

    // Проверка телефона
    const phone = phoneInput.value.trim();
    if (phone.length < 10) {
        phoneError.textContent = "Введите корректный номер телефона";
        phoneInput.style.borderColor = "red";
        isValid = false;
    } else {
        phoneError.textContent = "";
        phoneInput.style.borderColor = "green";
    }

    // Если всё хорошо
    if (isValid) {
        successMsg.textContent = "Спасибо, " + name + "! Мы свяжемся с вами по номеру " + phone;
        successMsg.style.display = "block";
        form.reset();
        nameInput.style.borderColor = "";
        phoneInput.style.borderColor = "";
    }
});`}
                            </pre>
                        </section>
                    )
                }

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Итогом работы стало</h2>
                    <p className={styles.text}>
                        Теперь ваш сайт умеет общаться с пользователями профессионально. Вы научились создавать <strong>удобные и безопасные формы</strong>, применять <strong>валидацию</strong> для предотвращения ошибок, и показывать сообщения об ошибках через DOM — как делают настоящие опытные разработчики.
                    </p>
                    <div className={styles.endImg}>
                        <img src='./images/General/general.webp' alt='general-logo'></img>
                    </div>
                </section>
            </div >

            <div className={styles.navigation}>
                <NavLink to="/topic14" className={styles.nextButton}>
                    К следующей теме
                </NavLink>
                <BackProgress onReset={handleResetProgress} testPassed={isTestPassed} />
            </div>
        </div >
    );
};

export default Topic13;
