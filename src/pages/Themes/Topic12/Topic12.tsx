import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../Themes.module.scss';
import { motion } from 'framer-motion';
import BackButton from '../../components/BackButton/BackButton';
import BackProgress from '../../components/BackProgress/BackProgress';
import Test12 from './components/Test12';
import { useTopicProgress } from '../../../hooks/useTopicProgress';

interface Topic12Props {
    testPassed: boolean;
    setTestPassed: (value: boolean) => void;
}

const Topic12: React.FC<Topic12Props> = ({ testPassed: propTestPassed, setTestPassed: propSetTestPassed }) => {
    const { testPassed: cachedTestPassed, setTestPassed: setCachedTestPassed, testAnswers, setTestAnswers, resetProgress } = useTopicProgress('12');

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
                <h1 className={styles.title}>Тема 12: События: клики и обработчики</h1>
                <p className={styles.subtitle}>Делаем сайт интерактивным — от кликов до клавиатуры</p>
            </motion.div>

            <div className={styles.content}>
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Теория</h2>

                    <h3 className={styles.subSectionTitle}>1. Философия интерактивности</h3>
                    <p className={styles.text}>
                        Ранее мы строили «стены» (HTML) и «красили» их (CSS). Теперь пришло время провести «электричество». <strong>События</strong> — это нервная система вашего сайта. Клик мышкой, нажатие клавиши, скролл страницы — всё это события, на которые мы можем реагировать.
                    </p>
                    <p className={styles.text}>
                        Браузер постоянно следит за действиями пользователя, но молчит, пока мы не скажем ему: «Эй, если кто-то нажмёт сюда — сделай вот это!».
                    </p>

                    <div className={styles.screenshotPlaceholder}>
                        <img src="./images/Topic12/screen-1.webp" alt="screen-1" className={styles.screenshotImage} />
                        <p className={styles.screenshotText}>Рис.1 — Виды событий в браузере</p>
                    </div>

                    <h3 className={styles.subSectionTitle}>2. Эволюция: Как добавляли события раньше</h3>
                    <p className={styles.text}>
                        В 90-х писали так: <code>&lt;button onclick="alert('Привет')"&gt;</code>. Это называется <strong>инлайн-события</strong>. Сейчас так делать <strong>нельзя</strong>, потому что это смешивает HTML и JS.
                    </p>
                    <p className={styles.text}>
                        Потом придумали DOM-свойства: <code>button.onclick = function()</code>. Это лучше, но есть минус: на одно событие можно повесить только одну функцию. Если вы захотите добавить вторую — первая сотрётся.
                    </p>

                    <h3 className={styles.subSectionTitle} id="addEventListener">3. Современный стандарт: addEventListener</h3>
                    <p className={styles.text}>
                        Метод <code>addEventListener</code> (добавить слушателя) — это золотой стандарт. Он позволяет вешать <strong>сколько угодно функций</strong> на одно событие, и их можно потом снять.
                    </p>
                    <pre className={styles.code}>
                        {`const btn = document.querySelector('button');

btn.addEventListener('click', function() {
    console.log("Клик!");
});

// Можно добавить ещё один — первый не сотрётся
btn.addEventListener('click', function() {
    console.log("И ещё один обработчик!");
});`}
                    </pre>

                    <div className={styles.screenshotPlaceholder}>
                        <img src="./images/Topic12/screen-2.webp" alt="screen-2" className={styles.screenshotImage} />
                        <p className={styles.screenshotText}>Рис.2 — Работа addEventListener</p>
                    </div>

                    <h3 className={styles.subSectionTitle} id="event">4. Объект события (Event Object)</h3>
                    <p className={styles.text}>
                        Когда происходит событие, браузер создаёт специальный объект с подробностями (где кликнули, какая клавиша нажата). Он передаётся первым аргументом в вашу функцию. Обычно его называют <code>event</code> или просто <code>e</code>.
                    </p>
                    <pre className={styles.code}>
                        {`document.addEventListener('click', function(e) {
    console.log("Вы кликнули по:", e.target); // Элемент, по которому кликнули
    console.log("Координаты:", e.clientX, e.clientY);
});`}
                    </pre>
                    <p className={styles.text}>
                        Свойство <code>e.target</code> — это именно тот элемент, по которому кликнул пользователь. Это очень полезно при работе со списками и динамически добавленными элементами.
                    </p>

                    <div className={styles.screenshotPlaceholder}>
                        <img src="./images/Topic12/screen-3.webp" alt="screen-3" className={styles.screenshotImage} />
                        <p className={styles.screenshotText}>Рис.3 — Свойства объекта Event</p>
                    </div>

                    <h3 className={styles.subSectionTitle} id="keyboard">5. События клавиатуры: keydown и keyup</h3>
                    <p className={styles.text}>
                        Помимо кликов, можно слушать <strong>нажатия клавиш</strong>. Это позволяет создавать горячие клавиши, обрабатывать нажатие Enter в поле ввода, игровые управления.
                    </p>
                    <pre className={styles.code}>
                        {`// keydown — срабатывает при нажатии клавиши
// keyup — срабатывает при отпускании клавиши

document.addEventListener('keydown', function(e) {
    console.log("Нажата клавиша:", e.key); // "Enter", "Escape", "a", "1"...
    console.log("Код клавиши:", e.code);   // "KeyA", "Digit1", "Enter"...

    // Проверяем конкретную клавишу
    if (e.key === 'Enter') {
        console.log("Вы нажали Enter!");
    }
    if (e.key === 'Escape') {
        console.log("Вы нажали Escape!");
    }
});`}
                    </pre>
                    <p className={styles.text}>
                        Разница между <code>e.key</code> и <code>e.code</code>: <code>key</code> зависит от языка клавиатуры и регистра («А», «a», «Enter»), <code>code</code> — физическая позиция кнопки («KeyA», «Enter»).
                    </p>

                    <h3 className={styles.subSectionTitle} id="mouse">6. События мыши: mouseenter и mouseleave</h3>
                    <p className={styles.text}>
                        Кроме кликов, можно отслеживать <strong>движение мыши</strong>. Это используется для ховер-эффектов, тултипов, интерактивных галерей.
                    </p>
                    <pre className={styles.code}>
                        {`const card = document.querySelector('.card');

// Срабатывает, когда курсор входит в элемент
card.addEventListener('mouseenter', function() {
    card.style.transform = "scale(1.05)";
    card.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";
});

// Срабатывает, когда курсор уходит из элемента
card.addEventListener('mouseleave', function() {
    card.style.transform = "scale(1)";
    card.style.boxShadow = "none";
});`}
                    </pre>

                    <h3 className={styles.subSectionTitle} id="bubbling">7. Всплытие (Bubbling) и Делегирование</h3>
                    <p className={styles.text}>
                        Если вы кликнете на кнопку внутри <code>div</code>, событие сработает сначала на кнопке, потом на <code>div</code>, потом на <code>body</code>. Это называется <strong>всплытием</strong> (bubbling) — событие «поднимается» вверх по дереву DOM.
                    </p>
                    <p className={styles.text}>
                        Это полезно для паттерна <strong>Делегирование</strong>: вместо того чтобы вешать 100 обработчиков на 100 кнопок, можно повесить один на их общего родителя и проверять <code>e.target</code>.
                    </p>
                    <pre className={styles.code}>
                        {`// Делегирование: один обработчик на весь список
const list = document.querySelector('ul');

list.addEventListener('click', function(e) {
    // Проверяем, был ли клик именно по <li>
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('done'); // Отмечаем как выполненное
    }
});`}
                    </pre>

                    <div className={styles.screenshotPlaceholder}>
                        <img src="./images/Topic12/screen-4.webp" alt="screen-4" className={styles.screenshotImage} />
                        <p className={styles.screenshotText}>Рис.4 — Схема всплытия событий</p>
                    </div>

                    <h3 className={styles.subSectionTitle} id="preventDefault">8. Отмена действий браузера: preventDefault</h3>
                    <p className={styles.text}>
                        Некоторые элементы имеют встроенное поведение: ссылки переходят на другую страницу, формы отправляются и перезагружают страницу. Метод <code>e.preventDefault()</code> отменяет это поведение.
                    </p>
                    <pre className={styles.code}>
                        {`const form = document.querySelector('form');

form.addEventListener('submit', function(e) {
    e.preventDefault(); // Страница НЕ перезагрузится

    // Теперь можно проверить данные и обработать их вручную
    console.log("Форма отправлена без перезагрузки!");
});

// Также для ссылок:
const link = document.querySelector('a');
link.addEventListener('click', function(e) {
    e.preventDefault(); // Переход по ссылке НЕ произойдёт
});`}
                    </pre>


                    <h3 className={styles.subSectionTitle} id="custom-events">9. Свои события: CustomEvent</h3>
                    <p className={styles.text}>
                        Вы не ограничены только «кликами» и «нажатиями». Вы можете создавать <strong>свои собственные события</strong>. Это сердце современной архитектуры (например, в React или Vue всё построено на этом).
                    </p>
                    <pre className={styles.code}>
                        {`// 1. Создаём событие
const myEvent = new CustomEvent('userLogin', {
    detail: { name: 'Артем', role: 'admin' } // Передаём данные
});

// 2. Слушаем его где-то в коде
document.addEventListener('userLogin', (e) => {
    console.log("Вошел пользователь:", e.detail.name);
});

// 3. Вызываем (генерируем) его
document.dispatchEvent(myEvent);`}
                    </pre>

                    <h3 className={styles.subSectionTitle} id="once-passive">10. Оптимизация: once и passive</h3>
                    <p className={styles.text}>
                        Третий аргумент <code>addEventListener</code> — это объект настроек.
                    </p>
                    <pre className={styles.code}>
                        {`// { once: true } — сработает только ОДИН раз и сам удалится
btn.addEventListener('click', () => alert('Больше не нажмёшь!'), { once: true });

// { passive: true } — говорит браузеру, что вы не вызываете preventDefault.
// Это критически важно для плавности скролла на мобильных устройствах.
window.addEventListener('scroll', () => { /* ... */ }, { passive: true });`}
                    </pre>

                    <h3 className={styles.subSectionTitle} id="window-events">11. События окна и Фокуса</h3>
                    <p className={styles.text}>
                        Не все события происходят на кнопках. <strong>Resize</strong> (изменение размера окна) и <strong>Scroll</strong> относятся к объекту <code>window</code>.
                        <br />А <strong>focus</strong> и <strong>blur</strong> помогают понять, находится ли пользователь в поле ввода.
                    </p>
                    <pre className={styles.code}>
                        {`window.addEventListener('resize', () => {
    console.log("Новая ширина окна:", window.innerWidth);
});

const input = document.querySelector('input');
input.addEventListener('focus', () => {
    input.style.border = "2px solid gold"; // Подсвечиваем при входе
});
input.addEventListener('blur', () => {
    input.style.border = ""; // Убираем при выходе
});`}
                    </pre>

                    <h3 className={styles.subSectionTitle} id="throttle">12. Контроль частоты: Throttle и Debounce</h3>
                    <p className={styles.text}>
                        События вроде <code>scroll</code> или <code>mousemove</code> срабатывают сотни раз в секунду. Если вешать на них тяжелый код — сайт «зависнет».
                        <br />• <strong>Throttle</strong> — запускает функцию не чаще чем раз в X мс.
                        <br />• <strong>Debounce</strong> — ждёт паузы в действиях пользователя перед запуском.
                    </p>

                    <h3 className={styles.subSectionTitle} id="drag-drop">13. Drag and Drop: Основы</h3>
                    <p className={styles.text}>
                        Современный веб позволяет перетаскивать элементы. Для этого используется атрибут <code>draggable="true"</code> и события <code>dragstart</code>, <code>dragover</code>, <code>drop</code>.
                    </p>
                    <pre className={styles.code}>
                        {`const item = document.querySelector('.item');
item.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id);
    e.target.style.opacity = '0.5';
});`}
                    </pre>


                    <h3 className={styles.subSectionTitle} id="lifecycle">15. Глубокое погружение: Жизненный цикл (Capturing)</h3>
                    <p className={styles.text}>
                        Вы знали, что до того как событие «всплывёт» вверх (Bubbling), оно сначала «погружается» вниз? Это фаза <strong>Capturing</strong>.
                        Браузер идёт от <code>window</code> до элемента-цели, проверяя слушателей с флагом <code>capture: true</code>.
                    </p>
                    <pre className={styles.code}>
                        {`// Слушаем на фазе погружения (сверху вниз)
document.addEventListener('click', () => {
    console.log("Погружение: поймали клик на уровне документа");
}, { capture: true });`}
                    </pre>

                    <h3 className={styles.subSectionTitle} id="touch">16. Мобильные интерфейсы: Touch-события</h3>
                    <p className={styles.text}>
                        На смартфонах нет мышки, есть пальцы. Для свайпов и жестов используйте <code>touchstart</code>, <code>touchmove</code> и <code>touchend</code>.
                    </p>
                    <pre className={styles.code}>
                        {`let startX;
card.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});
card.addEventListener('touchend', (e) => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) console.log("Свайп влево!");
});`}
                    </pre>

                    <h3 className={styles.subSectionTitle} id="leaks">17. Утечки памяти: removeEventListener</h3>
                    <p className={styles.text}>
                        Если вы часто создаете и удаляете элементы (например, в модальных окнах), забытые слушатели событий будут висеть в памяти и тормозить сайт.
                    </p>
                    <pre className={styles.code}>
                        {`function onMessage() { console.log("Hi!"); }

// Добавляем
window.addEventListener('message', onMessage);

// УДАЛЯЕМ, когда компонент не нужен
window.removeEventListener('message', onMessage);`}
                    </pre>

                    <h3 className={styles.subSectionTitle} id="patterns">18. Паттерны: Аккордеон и Табы</h3>
                    <p className={styles.text}>
                        Используя делегирование событий, можно легко создать систему вкладок (табов). Вешаем клик на контейнер вкладок и переключаем класс <code>active</code>.
                    </p>
                    <pre className={styles.code}>
                        {`const tabsContainer = document.querySelector('.tabs');
tabsContainer.addEventListener('click', (e) => {
    const tab = e.target.closest('.tab-button');
    if (!tab) return;
    
    // 1. Убираем active у всех
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    // 2. Добавляем нажатой
    tab.classList.add('active');
});`}
                    </pre>

                    <h3 className={styles.subSectionTitle} id="forms-adv">19. Формы: Change vs Input</h3>
                    <p className={styles.text}>
                        • <code>input</code> срабатывает при каждом нажатом символе (мгновенно).
                        <br />• <code>change</code> срабатывает только когда вы вышли из поля или нажали Enter.
                        <br />Используйте <code>input</code> для живой валидации, а <code>change</code> для тяжелых операций.
                    </p>

                    <h3 className={styles.subSectionTitle} id="performance">20. Производительность: Throttle и Debounce</h3>
                    <p className={styles.text}>
                        Никогда не вешайте тяжелые вычисления на <code>scroll</code> или <code>mousemove</code> напрямую. Используйте техники ограничения частоты вызовов.
                    </p>

                    <h3 className={styles.subSectionTitle} id="pointer">21. Pointer Events: Будущее наступило</h3>
                    <p className={styles.text}>
                        Вместо того чтобы писать отдельно для <code>mousedown</code> и <code>touchstart</code>, используйте <code>pointerdown</code>. Это унифицированное событие для мыши, пальца и стилуса.
                    </p>
                    <pre className={styles.code}>
                        {`canvas.addEventListener('pointerdown', (e) => {
    console.log("Тип устройства:", e.pointerType); // 'mouse', 'touch' or 'pen'
    console.log("Сила нажатия:", e.pressure);
});`}
                    </pre>

                    <h3 className={styles.subSectionTitle} id="observer">22. Intersection Observer: Замена Scroll</h3>
                    <p className={styles.text}>
                        Следить за скроллом через <code>window.addEventListener('scroll')</code> — прошлый век и плохая производительность. Используйте <code>IntersectionObserver</code>, чтобы узнать, когда элемент появился на экране.
                    </p>
                    <pre className={styles.code}>
                        {`const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.5 }); // 50% элемента видно

observer.observe(document.querySelector('.footer'));`}
                    </pre>

                    <h3 className={styles.subSectionTitle} id="security">23. Безопасность: XSS и события</h3>
                    <p className={styles.text}>
                        Никогда не используйте атрибуты вроде <code>onclick="..." </code> с данными от пользователя. Это прямой путь к XSS-атакам. Всегда регистрируйте события через <code>addEventListener</code>.
                    </p>

                    <h3 className={styles.subSectionTitle} id="event-table">24. Шпаргалка свойств Event Object</h3>
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Свойство</th>
                                    <th>Описание</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td><code>e.target</code></td><td>Элемент, на котором возникло событие (цель)</td></tr>
                                <tr><td><code>e.currentTarget</code></td><td>Элемент, на котором сработал обработчик (текущий в цепочке)</td></tr>
                                <tr><td><code>e.type</code></td><td>Тип события (click, submit и т.д.)</td></tr>
                                <tr><td><code>e.clientX / Y</code></td><td>Координаты курсора относительно окна</td></tr>
                                <tr><td><code>e.key / code</code></td><td>Для клавиатуры: символ и физический код клавиши</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className={styles.subSectionTitle} id="troubleshooting">25. Troubleshooting: Почему не работает?</h3>
                    <h3 className={styles.subSectionTitle} id="best-practices-adv">26. Best Practices: Делай так!</h3>
                    <p className={styles.text}>
                        • <strong>Именуйте функции</strong>: вместо <code>btn.onclick = () {'=>'} {'{ }'}</code> пишите <code>function handleButtonClick() {'{ }'}</code>. Это облегчит отладку в консоли.
                        <br />• <strong>Сначала DOMContentLoaded</strong>: всегда оборачивайте ваш код в слушатель загрузки документа, чтобы не получить ошибку <code>null</code> при поиске элементов.
                        <br />• <strong>Минимум анонимных функций</strong>: если вы передаете анонимную функцию в <code>addEventListener</code>, вы НИКОГДА не сможете её удалить через <code>removeEventListener</code>.
                        <br />• <strong>dataset для данных</strong>: передавайте ID товаров или категории через <code>data-id</code> атрибуты, а в JS читайте их через <code>e.target.dataset.id</code>.
                    </p>

                    <h3 className={styles.subSectionTitle} id="faq">27. Часто задаваемые вопросы (FAQ)</h3>
                    <p className={styles.text}>
                        <strong>Q: В чем разница между event.target и event.currentTarget?</strong>
                        <br />A: <code>target</code> — это тот «малыш», на которого реально кликнули (например, иконка внутри кнопки). <code>currentTarget</code> — это элемент, на котором висит обработчик (сама кнопка).
                    </p>
                    <p className={styles.text}>
                        <strong>Q: Нужно ли удалять события в современных браузерах?</strong>
                        <br />A: Если элемент удаляется навсегда — браузер сам очистит память. Но если вы вешаете событие на <code>window</code> или <code>document</code> — ОБЯЗАТЕЛЬНО удаляйте его, иначе оно будет жить вечно.
                    </p>
                    <p className={styles.text}>
                        <strong>Q: Как остановить клик по ссылке?</strong>
                        <br />A: Вызовите <code>e.preventDefault()</code> в первой строке обработчика.
                    </p>

                    <h3 className={styles.subSectionTitle} id="architecture">29. Архитектура: События как клей (Pub/Sub)</h3>
                    <p className={styles.text}>
                        В больших проектах не стоит вешать всё в один файл. Используйте паттерн «Издатель-Подписчик». Один модуль генерирует CustomEvent, а десять других на него реагируют. Это делает код чистым.
                    </p>

                    <h3 className={styles.subSectionTitle} id="event-loop">30. Event Loop: Что происходит под капотом?</h3>
                    <p className={styles.text}>
                        Когда вы кликаете, браузер не бросает всё и не бежит выполнять JS. Он ставит ваше событие в <strong>Callback Queue</strong>. JS-движок возьмет его оттуда, как только освободится основной поток. Помните: JS однопоточен!
                    </p>
                    <pre className={styles.code}>
                        {`console.log("1");
setTimeout(() => console.log("2"), 0);
console.log("3");
// Выведет: 1, 3, 2. Потому что таймер ушел в очередь.`}
                    </pre>

                    <h3 className={styles.subSectionTitle} id="devtools">31. Отладка: Вкладка Event Listeners</h3>
                    <p className={styles.text}>
                        В Google Chrome выделите элемент в дереве элементов и посмотрите на панель справа (вкладка <strong>Event Listeners</strong>). Там показаны все события, которые на нем висят, и в каком файле они описаны. Это ваш лучший друг при поиске багов.
                    </p>

                    <h3 className={styles.subSectionTitle} id="final-summary">32. Итоги модуля</h3>
                    <p className={styles.text}>
                        События — это то, что превращает статичную картинку в приложение.
                        Главное правило: <strong>слушайте только то, что нужно, и там, где это удобно (делегирование)</strong>.
                    </p>
                </section>

                {!isTestPassed && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Тест</h2>
                        <p className={styles.text}>Пройдите тест, чтобы открыть доступ к практике.</p>
                        <Test12 onComplete={handleTestComplete} setTestAnswers={setTestAnswers} testAnswers={testAnswers} />
                    </section>
                )}

                {isTestPassed && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Практика</h2>
                        <p className={styles.text}>
                            Три разогревочных задания — и итоговое: делаем бургер-меню для Frosted Muse.
                        </p>

                        <h3 className={styles.subSectionTitle}>Задание 1: Кнопка-светофор</h3>
                        <p className={styles.text}>
                            Создайте кнопку и круглый <code>div</code>. При каждом клике на кнопку цвет круга должен меняться по кругу: красный — жёлтый — зелёный — красный...
                        </p>
                        <p className={styles.text}>
                            <span onClick={() => scrollToSection('addEventListener')} className={styles.hintLink} style={{ cursor: 'pointer' }}>
                                💡 Подсказка: заведите массив ['red', 'yellow', 'green'] и переменную-индекс. После каждого клика увеличивайте индекс и берите следующий цвет
                            </span>
                        </p>
                        <pre className={styles.code}>
                            {`const colors = ['red', 'yellow', 'green'];
let currentIndex = 0;
const circle = document.querySelector('.circle');
const btn = document.querySelector('button');

btn.addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % colors.length;
    circle.style.backgroundColor = colors[currentIndex];
});`}
                        </pre>

                        <h3 className={styles.subSectionTitle}>Задание 2: Реакция на Escape</h3>
                        <p className={styles.text}>
                            Добавьте на страницу всплывающее окно (модал) — любой <code>div</code> с классом <code>modal</code>. Сделайте так, чтобы оно закрывалось при нажатии клавиши <strong>Escape</strong>.
                        </p>
                        <p className={styles.text}>
                            <span onClick={() => scrollToSection('keyboard')} className={styles.hintLink} style={{ cursor: 'pointer' }}>
                                💡 Подсказка: слушайте 'keydown' на document. Проверяйте e.key === 'Escape'
                            </span>
                        </p>
                        <pre className={styles.code}>
                            {`const modal = document.querySelector('.modal');

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        modal.style.display = 'none';
    }
});`}
                        </pre>

                        <h3 className={styles.subSectionTitle}>Задание 3: Карточка с ховером</h3>
                        <p className={styles.text}>
                            Создайте карточку товара (div). При наведении мыши добавляйте класс <code>hovered</code> (опишите его в CSS с тенью и масштабированием). При уходе — удаляйте.
                        </p>
                        <p className={styles.text}>
                            <span onClick={() => scrollToSection('mouse')} className={styles.hintLink} style={{ cursor: 'pointer' }}>
                                💡 Подсказка: события mouseenter и mouseleave вместе с classList.add/remove — идеальная пара
                            </span>
                        </p>

                        <h3 className={styles.subSectionTitle}>Задание 4: Frosted Muse — Бургер-Меню</h3>
                        <p className={styles.text}>
                            Пришло время реализовать одну из самых популярных фич — мобильное меню. Откройте <code>js/script.js</code>.
                        </p>
                        <pre className={styles.code}>
                            {`const checkbox = document.querySelector('#burger-checkbox');
const menu = document.querySelector('nav');

checkbox.addEventListener('change', function() {
    if (checkbox.checked) {
        menu.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    } else {
        menu.classList.remove('active');
        document.body.style.overflow = ''; 
    }
});`}
                        </pre>

                        <h3 className={styles.subSectionTitle}>Задание 5: Закрытие по клику вне меню</h3>
                        <p className={styles.text}>
                            Сделайте так, чтобы меню закрывалось, если пользователь кликнул <strong>мимо</strong> него (на темный фон или просто в пустую область страницы).
                        </p>
                        <pre className={styles.code}>
                            {`document.addEventListener('click', (e) => {
    const isClickInsideMenu = menu.contains(e.target);
    const isClickOnBurger = checkbox.contains(e.target);
    
    if (!isClickInsideMenu && !isClickOnBurger && checkbox.checked) {
        checkbox.checked = false;
        menu.classList.remove('active');
        document.body.style.overflow = '';
    }
});`}
                        </pre>

                        <h3 className={styles.subSectionTitle}>Задание 6: Индикатор прогресса чтения</h3>
                        <p className={styles.text}>
                            Создайте вверху страницы узкую полоску (<code>div</code> с <code>position: fixed</code>). При скролле её ширина должна меняться от 0% до 100% в зависимости от того, как далеко прокручена страница.
                        </p>
                        <pre className={styles.code}>
                            {`window.addEventListener('scroll', () => {
    const windowScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (windowScroll / height) * 100;
    
    document.querySelector('.progress-bar').style.width = scrolled + '%';
});`}
                        </pre>

                        <h3 className={styles.subSectionTitle}>Задание 7: Анимация при появлении (On Scroll)</h3>
                        <p className={styles.text}>
                            Добавьте класс <code>fade-in</code> всем секциям. С помощью <code>window.innerHeight</code> и <code>getBoundingClientRect()</code> определите, когда секция появляется в зоне видимости, и добавляйте ей класс <code>visible</code>.
                        </p>
                        <pre className={styles.code}>
                            {`function reveal() {
    const reveals = document.querySelectorAll('.fade-in');
    for (let i = 0; i < reveals.length; i++) {
        let windowHeight = window.innerHeight;
        let elementTop = reveals[i].getBoundingClientRect().top;
        if (elementTop < windowHeight - 150) {
            reveals[i].classList.add('active');
        }
    }
}
window.addEventListener('scroll', reveal);`}
                        </pre>

                        <h3 className={styles.subSectionTitle}>Задание 8: Копирование в буфер обмена</h3>
                        <p className={styles.text}>
                            Создайте блок с текстом промокода. При клике на этот блок текст должен копироваться в буфер обмена, а пользователю должно выводиться сообщение «Скопировано!».
                        </p>
                        <pre className={styles.code}>
                            {`const promo = document.querySelector('.promo-code');
promo.addEventListener('click', () => {
    navigator.clipboard.writeText(promo.textContent);
    promo.textContent = "Скопировано!";
    setTimeout(() => promo.textContent = "ICE-CAKE-2025", 2000);
});`}
                        </pre>

                        <h3 className={styles.subSectionTitle}>Задание 9: Живой поиск (Debounce)</h3>
                        <p className={styles.text}>
                            Реализуйте поиск по списку товаров. Поиск должен срабатывать не на каждое нажатие клавиши, а только после того, как пользователь перестал печатать на 500мс.
                        </p>
                        <pre className={styles.code}>
                            {`let timeoutId;
input.addEventListener('input', (e) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        performSearch(e.target.value);
    }, 500);
});`}
                        </pre>

                        <h3 className={styles.subSectionTitle}>Задание 10: Frosted Muse — Умная шапка</h3>
                        <p className={styles.text}>
                            Финальное задание: сделайте так, чтобы шапка сайта <strong>скрывалась</strong> при прокрутке вниз (чтобы не мешать обзору) и <strong>появлялась</strong> обратно при малейшей прокрутке вверх.
                        </p>
                        <pre className={styles.code}>
                            {`let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add('header-hidden');
    } else {
        header.classList.remove('header-hidden');
    }
    lastScroll = currentScroll;
});`}
                        </pre>

                        <h3 className={styles.subSectionTitle}>Задание 11: Паттерн «Аккордеон»</h3>
                        <p className={styles.text}>
                            Сделайте так, чтобы при клике на заголовок секции <code>.accordion-item</code> её содержимое плавно раскрывалось, а другие секции закрывались.
                        </p>
                        <pre className={styles.code}>
                            {`const accordion = document.querySelector('.accordion');
accordion.addEventListener('click', (e) => {
    const header = e.target.closest('.header');
    if (!header) return;
    
    const item = header.parentElement;
    item.classList.toggle('open');
});`}
                        </pre>

                        <h3 className={styles.subSectionTitle}>Задание 12: Детектор двойного клика</h3>
                        <p className={styles.text}>
                            Реализуйте лайк «как в соцсетях»: при двойном клике по изображению товара (<code>dblclick</code>) на мгновение появляется иконка сердца.
                        </p>
                        <pre className={styles.code}>
                            {`const img = document.querySelector('.product-img');
img.addEventListener('dblclick', () => {
    heartIcon.classList.add('show-heart');
    setTimeout(() => heartIcon.classList.remove('show-heart'), 1000);
});`}
                        </pre>

                        <h3 className={styles.subSectionTitle}>Задание 13: Ограничение ввода</h3>
                        <p className={styles.text}>
                            Создайте текстовое поле. Сделайте так, чтобы пользователь не мог вводить в него цифры. Если нажата клавиша-цифра — отменяйте действие через <code>preventDefault</code>.
                        </p>
                        <pre className={styles.code}>
                            {`input.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        alert("Цифры запрещены!");
    }
});`}
                        </pre>

                        <h3 className={styles.subSectionTitle}>Задание 14: Проверка на выход (BeforeUnload)</h3>
                        <p className={styles.text}>
                            Защитите пользователя от потери данных. Если в форме заказа введен хоть один символ — при попытке закрыть вкладку браузер должен спросить: «Уверены, что хотите уйти?».
                        </p>
                        <pre className={styles.code}>
                            {`window.addEventListener('beforeunload', (e) => {
    if (input.value.length > 0) {
        e.preventDefault();
        e.returnValue = ''; // Стандартный способ вызвать окно подтверждения
    }
});`}
                        </pre>

                        <h3 className={styles.subSectionTitle}>Задание 15: Frosted Muse — Перетаскивание (Drag)</h3>
                        <p className={styles.text}>
                            Добавьте в корзину возможность перетаскивать товары из списка прямо в иконку корзины. Используйте Drag and Drop API.
                        </p>
                        <pre className={styles.code}>
                            {`const cart = document.querySelector('.cart-icon');
cart.addEventListener('dragover', (e) => e.preventDefault());
cart.addEventListener('drop', (e) => {
    const productId = e.dataTransfer.getData('text');
    addToCart(productId);
    alert('Товар добавлен!');
});`}
                        </pre>

                        <h3 className={styles.subSectionTitle}>Задание 16: Смена темы оформления</h3>
                        <p className={styles.text}>
                            Создайте кнопку переключения Темная/Светлая. При нажатии меняйте класс <code>dark-theme</code> у тега <code>body</code>.
                        </p>

                        <h3 className={styles.subSectionTitle}>Задание 17: Галерея снимков</h3>
                        <p className={styles.text}>
                            При клике на маленькую картинку из списка (делегирование!) она должна становиться главной в большом блоке.
                        </p>

                        <h3 className={styles.subSectionTitle}>Задание 18: Контроль фокуса в форме</h3>
                        <p className={styles.text}>
                            При входе в поле ввода (focus) меняйте фон на нежно-персиковый. При выходе (blur) возвращайте белый.
                        </p>

                        <h3 className={styles.subSectionTitle}>Задание 19: Кнопка «Наверх»</h3>
                        <p className={styles.text}>
                            Показывайте кнопку только если страница прокручена на 500px вниз. При клике плавно прокручивайте (<code>window.scrollTo</code>) в начало.
                        </p>

                        <h3 className={styles.subSectionTitle}>Задание 20: Frosted Muse — Секретная комбинация</h3>
                        <p className={styles.text}>
                            Добавьте «пасхалку»: если пользователь наберет на клавиатуре слово <code>cake</code>, на экране должен пойти визуальный «дождь из конфетти».
                        </p>
                        <pre className={styles.code}>
                            {`let sequence = "";
document.addEventListener('keydown', (e) => {
    sequence += e.key.toLowerCase();
    if (sequence.includes("cake")) {
        startConfetti();
        sequence = "";
    }
    if (sequence.length > 10) sequence = "";
});`}
                        </pre>
                    </section>
                )}

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Итогом работы стало</h2>
                    <p className={styles.text}>
                        Мы вдохнули жизнь в наш интерфейс. Теперь Frosted Muse имеет полноценное <strong>адаптивное меню</strong>, которое блокирует скролл (признак качества!) и автоматически закрывается при навигации. Вы освоили фундамент интерактивности: <strong>события</strong>, <strong>делегирование</strong> и <strong>управление состоянием</strong>.
                    </p>
                    <div className={styles.endImg}>
                        <img src='./images/General/general.webp' alt='general-logo'></img>
                    </div>
                </section>
            </div>

            <div className={styles.navigation}>
                <NavLink to="/topic13" className={styles.nextButton}>
                    К следующей теме
                </NavLink>
                <BackProgress onReset={handleResetProgress} testPassed={isTestPassed} />
            </div>
        </div>
    );
};

export default Topic12;
