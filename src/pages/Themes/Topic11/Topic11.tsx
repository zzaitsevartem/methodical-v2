import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../Themes.module.scss';
import { motion } from 'framer-motion';
import BackButton from '../../components/BackButton/BackButton';
import BackProgress from '../../components/BackProgress/BackProgress';
import Test11 from './components/Test11';
import { useTopicProgress } from '../../../hooks/useTopicProgress';

interface Topic11Props {
    testPassed: boolean;
    setTestPassed: (value: boolean) => void;
}

const Topic11: React.FC<Topic11Props> = ({ testPassed: propTestPassed, setTestPassed: propSetTestPassed }) => {
    const { testPassed: cachedTestPassed, setTestPassed: setCachedTestPassed, testAnswers, setTestAnswers, resetProgress } = useTopicProgress('11');

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
                <h1 className={styles.title}>Тема 11: Взаимодействие с DOM</h1>
                <p className={styles.subtitle}>Управление элементами страницы через JavaScript</p>
            </motion.div>

            <div className={styles.content}>
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Теория</h2>

                    <h3 className={styles.subSectionTitle} id="dom-intro">1. Что такое DOM?</h3>
                    <p className={styles.text}>
                        <strong>DOM (Document Object Model)</strong> — это представление всей вашей HTML-страницы в виде <strong>дерева объектов</strong>. Когда браузер загружает страницу, он берёт ваш HTML и строит из него DOM.
                    </p>
                    <p className={styles.text}>
                        Представьте, что <strong>HTML</strong> — это чертёж здания, а <strong>DOM</strong> — это само здание, построенное по чертежу. JavaScript — это прораб, который может ходить по этому зданию, открывать окна, красить стены и переставлять мебель. Без DOM JavaScript был бы изолирован от веб-страницы.
                    </p>

                    <div className={styles.screenshotPlaceholder}>
                        <img src="./images/Topic11/screen-1.webp" alt="screen-1" className={styles.screenshotImage} />
                        <p className={styles.screenshotText}>Рис.1 — Структура DOM-дерева</p>
                    </div>

                    <p className={styles.text}>
                        Каждый тег, каждый атрибут и даже текст внутри тегов становятся <strong>объектами</strong>. У этих объектов есть свойства (например, цвет, текст, ширина) и методы (например, «удалиться», «добавиться»).
                    </p>

                    <h3 className={styles.subSectionTitle} id="querySelector">2. Поиск элементов: querySelector</h3>
                    <p className={styles.text}>
                        Чтобы управлять чем-то на странице, сначала нужно это найти. Главный инструмент для поиска — метод <code>document.querySelector()</code>.
                    </p>
                    <p className={styles.text}>
                        Он работает так же, как селекторы в CSS. Вы говорите ему, <strong>что</strong> искать, и он возвращает <strong>первый найденный элемент</strong>. Если элемент не найден — вернёт <code>null</code>.
                    </p>

                    <div className={styles.screenshotPlaceholder}>
                        <img src="./images/Topic11/screen-2.webp" alt="screen-2" className={styles.screenshotImage} />
                        <p className={styles.screenshotText}>Рис.2 — Синтаксис querySelector</p>
                    </div>

                    <pre className={styles.code}>
                        {`// Найти первый <p> на странице
const text = document.querySelector('p');

// Найти элемент с классом .btn
const button = document.querySelector('.btn');

// Найти элемент с id #header
const header = document.querySelector('#header');

// Найти ссылку внутри навигации
const link = document.querySelector('nav a');`}
                    </pre>
                    <p className={styles.text}>
                        Если вам нужны <strong>все</strong> элементы (например, все кнопки), используйте <code>document.querySelectorAll()</code>. Он вернёт список элементов, который можно перебрать циклом <code>forEach</code>.
                    </p>
                    <pre className={styles.code}>
                        {`// Найти все ссылки на странице
const allLinks = document.querySelectorAll('a');

// Перебрать каждую ссылку
allLinks.forEach(function(link) {
    console.log(link.textContent);
});`}
                    </pre>

                    <div className={styles.screenshotPlaceholder}>
                        <img src="./images/Topic11/screen-3.webp" alt="screen-3" className={styles.screenshotImage} />
                        <p className={styles.screenshotText}>Рис.3 — Поиск множества элементов</p>
                    </div>

                    <h3 className={styles.subSectionTitle} id="textContent">3. Изменение текста: textContent</h3>
                    <p className={styles.text}>
                        Нашли элемент? Отлично! Теперь можно поменять в нём текст с помощью свойства <code>textContent</code>.
                    </p>
                    <pre className={styles.code}>
                        {`const title = document.querySelector('h1');

// Читаем текущий текст
console.log(title.textContent);

// Меняем текст на новый
title.textContent = "Новый заголовок!";`}
                    </pre>
                    <p className={styles.text}>
                        Это безопасно — любые HTML-теги, которые вы попытаетесь туда записать, будут отображены как обычный текст, а не интерпретированы.
                    </p>

                    <div className={styles.screenshotPlaceholder}>
                        <img src="./images/Topic11/screen-4.webp" alt="screen-4" className={styles.screenshotImage} />
                        <p className={styles.screenshotText}>Рис.4 — Динамическая смена текста</p>
                    </div>

                    <h3 className={styles.subSectionTitle} id="innerHTML">4. innerHTML: вставка HTML-кода</h3>
                    <p className={styles.text}>
                        В отличие от <code>textContent</code>, свойство <code>innerHTML</code> позволяет вставлять <strong>настоящий HTML-код</strong> внутрь элемента. Браузер разберёт его и создаст соответствующие узлы DOM.
                    </p>
                    <pre className={styles.code}>
                        {`const container = document.querySelector('.container');

// Вставляем HTML-разметку
container.innerHTML = '<p>Привет, <strong>мир!</strong></p>';

// Добавляем в конец (не заменяем)
container.innerHTML += '<p>Ещё один абзац</p>';`}
                    </pre>
                    <p className={styles.text}>
                        <strong>Важно!</strong> Никогда не вставляйте через <code>innerHTML</code> данные, которые пришли от пользователя — это может стать дырой в безопасности. Для пользовательских данных всегда используйте <code>textContent</code>.
                    </p>

                    <h3 className={styles.subSectionTitle} id="style">5. Изменение стилей: style</h3>
                    <p className={styles.text}>
                        Вы можете менять CSS-свойства элемента прямо из JavaScript через объект <code>style</code>.
                    </p>
                    <p className={styles.text}>
                        <strong>Важное правило</strong>: CSS-свойства с дефисом (<code>font-size</code>, <code>background-color</code>) в JavaScript пишутся в <strong>camelCase</strong> (<code>fontSize</code>, <code>backgroundColor</code>).
                    </p>
                    <pre className={styles.code}>
                        {`const box = document.querySelector('.box');

box.style.color = "red";
box.style.backgroundColor = "black";
box.style.fontSize = "20px"; // Обратите внимание: значение всегда строка!
box.style.display = "none";  // Скрыть элемент`}
                    </pre>

                    <div className={styles.screenshotPlaceholder}>
                        <img src="./images/Topic11/screen-5.webp" alt="screen-5" className={styles.screenshotImage} />
                        <p className={styles.screenshotText}>Рис.5 — Инлайновые стили через JS</p>
                    </div>

                    <h3 className={styles.subSectionTitle} id="classList">6. Управление классами: classList</h3>
                    <p className={styles.text}>
                        Менять стили по одному через <code>style</code> неудобно. Гораздо профессиональнее — заранее описать класс в CSS и просто добавлять/удалять его через JS. Для этого есть <code>classList</code>.
                    </p>
                    <pre className={styles.code}>
                        {`const element = document.querySelector('.menu');

// Добавить класс
element.classList.add('active');

// Удалить класс
element.classList.remove('hidden');

// Переключить (если есть — убрать, если нет — добавить)
element.classList.toggle('open');

// Проверить наличие
if (element.classList.contains('active')) {
    console.log("Меню открыто!");
}`}
                    </pre>

                    <div className={styles.screenshotPlaceholder}>
                        <img src="./images/Topic11/screen-7.webp" alt="screen-7" className={styles.screenshotImage} />
                        <p className={styles.screenshotText}>Рис.6 — Методы classList</p>
                    </div>

                    <h3 className={styles.subSectionTitle} id="events">7. События: addEventListener</h3>
                    <p className={styles.text}>
                        Сайт оживает, когда он начинает реагировать на действия пользователя. Эти действия называются <strong>событиями</strong> (клик, наведение мыши, нажатие клавиши, прокрутка).
                    </p>
                    <p className={styles.text}>
                        Чтобы «поймать» событие, мы используем метод <code>addEventListener(событие, функция)</code>.
                    </p>
                    <pre className={styles.code}>
                        {`const button = document.querySelector('button');

button.addEventListener('click', function() {
    alert("Вы нажали кнопку!");
});`}
                    </pre>

                    <div className={styles.screenshotPlaceholder}>
                        <img src="./images/Topic11/screen-8.webp" alt="screen-8" className={styles.screenshotImage} />
                        <p className={styles.screenshotText}>Рис.7 — Принцип работы Event Listener</p>
                    </div>

                    <p className={styles.text}>
                        Популярные события:
                    </p>
                    <ul>
                        <li><code>click</code> — клик мышью.</li>
                        <li><code>mouseenter</code> / <code>mouseleave</code> — наведение курсора.</li>
                        <li><code>input</code> — ввод текста в поле.</li>
                        <li><code>scroll</code> — прокрутка страницы.</li>
                        <li><code>submit</code> — отправка формы.</li>
                    </ul>

                    <h3 className={styles.subSectionTitle} id="value">8. Получение данных: value</h3>
                    <p className={styles.text}>
                        Если пользователь что-то ввёл в <code>&lt;input&gt;</code>, мы можем получить это через свойство <code>value</code>.
                    </p>
                    <pre className={styles.code}>
                        {`const input = document.querySelector('input');
const button = document.querySelector('button');

button.addEventListener('click', function() {
    console.log(input.value); // Выводим то, что ввёл пользователь
});`}
                    </pre>

                    <div className={styles.screenshotPlaceholder}>
                        <img src="./images/Topic11/screen-10.webp" alt="screen-10" className={styles.screenshotImage} />
                        <p className={styles.screenshotText}>Рис.8 — Работа с формами и value</p>
                    </div>

                    <h3 className={styles.subSectionTitle} id="createElement">9. Создание элементов: createElement</h3>
                    <p className={styles.text}>
                        Иногда нужно не просто изменить существующий элемент, а <strong>создать новый</strong> и добавить его на страницу. Для этого есть метод <code>document.createElement()</code>.
                    </p>
                    <p className={styles.text}>
                        После создания элемент нужно <strong>добавить</strong> в DOM с помощью <code>appendChild()</code> (в конец) или <code>prepend()</code> (в начало).
                    </p>
                    <pre className={styles.code}>
                        {`// 1. Создаём новый элемент
const newParagraph = document.createElement('p');

// 2. Добавляем ему текст
newParagraph.textContent = "Я появился динамически!";

// 3. Добавляем стиль (необязательно)
newParagraph.style.color = "green";

// 4. Вставляем в DOM (в конец контейнера)
const container = document.querySelector('.container');
container.appendChild(newParagraph);`}
                    </pre>
                    <p className={styles.text}>
                        Эта техника используется повсеместно: добавление карточек товаров, создание уведомлений, рендеринг списков — всё это работает по такой схеме.
                    </p>

                    <h3 className={styles.subSectionTitle} id="querySelectorAll">10. querySelectorAll: работа со множеством элементов</h3>
                    <p className={styles.text}>
                        <code>querySelector</code> находит только <strong>первый</strong> элемент. Если нужно найти <strong>все</strong> подходящие элементы — используйте <code>querySelectorAll</code>. Он возвращает коллекцию NodeList, по которой можно итерировать через <code>forEach</code>.
                    </p>
                    <pre className={styles.code}>
                        {`// Найти ВСЕ параграфы на странице:
const allParagraphs = document.querySelectorAll('p');
console.log(allParagraphs.length);

// Покрасить все параграфы:
allParagraphs.forEach(function(p) {
    p.style.color = 'navy';
});

// Все ссылки в навигации:
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.style.textDecoration = 'none';
    link.style.fontWeight = 'bold';
});

// С индексом:
const cards = document.querySelectorAll('.product-card');
cards.forEach((card, index) => {
    console.log('Карточка ' + (index + 1));
});`}
                    </pre>

                    <div className={styles.screenshotPlaceholder}>
                        <img src="./images/Topic11/screen-10.webp" alt="screen-10" className={styles.screenshotImage} />
                        <p className={styles.screenshotText}>Рис.10 — querySelectorAll и forEach</p>
                    </div>

                    <h3 className={styles.subSectionTitle} id="attributes">11. Атрибуты: getAttribute и setAttribute</h3>
                    <p className={styles.text}>
                        Каждый HTML-тег может иметь <strong>атрибуты</strong>: <code>href</code> у ссылки, <code>src</code> у картинки, <code>disabled</code> у кнопки. JavaScript позволяет читать и изменять эти атрибуты.
                    </p>
                    <pre className={styles.code}>
                        {`const link = document.querySelector('a');

// Прочитать атрибут:
console.log(link.getAttribute('href')); // "/catalog"

// Установить атрибут:
link.setAttribute('href', '/new-page');
link.setAttribute('target', '_blank');

// Удалить атрибут:
link.removeAttribute('target');

// Прямой доступ (чаще всего удобнее):
const img = document.querySelector('img');
img.src = './images/new-photo.jpg';
img.alt = 'Новое фото';

// Блокировать/разблокировать кнопку:
const btn = document.querySelector('button');
btn.disabled = true;
btn.disabled = false;`}
                    </pre>

                    <div className={styles.screenshotPlaceholder}>
                        <img src="./images/Topic11/screen-11.webp" alt="screen-11" className={styles.screenshotImage} />
                        <p className={styles.screenshotText}>Рис.11 — Атрибуты: чтение и запись</p>
                    </div>

                    <h3 className={styles.subSectionTitle} id="removeElement">12. Удаление элементов</h3>
                    <p className={styles.text}>
                        Создавать элементы мы научились. Теперь научимся их <strong>удалять</strong> — убирать из видимой части страницы.
                    </p>
                    <pre className={styles.code}>
                        {`// Современный способ:
const banner = document.querySelector('.promo-banner');
banner.remove();

// Старый способ:
const item = document.querySelector('.cart-item');
item.parentNode.removeChild(item);

// Очистить контейнер:
const list = document.querySelector('#product-list');
list.innerHTML = '';

// Скрыть через стиль:
const modal = document.querySelector('.modal');
modal.style.display = 'none';   // скрыть
modal.style.display = 'block';  // показать

// Лучший способ — через класс:
modal.classList.add('hidden');
modal.classList.remove('hidden');

// Удалить карточку по кнопке:
const delBtn = document.querySelector('.delete-btn');
delBtn.addEventListener('click', function() {
    const card = this.closest('.card');
    card.remove();
});`}
                    </pre>

                    <div className={styles.screenshotPlaceholder}>
                        <img src="./images/Topic11/screen-12.webp" alt="screen-12" className={styles.screenshotImage} />
                        <p className={styles.screenshotText}>Рис.12 — Удаление элементов из DOM</p>
                    </div>

                    <h3 className={styles.subSectionTitle} id="dataAttributes">13. data-атрибуты: хранение данных в HTML</h3>
                    <p className={styles.text}>
                        Иногда нужно прикрепить дополнительную информацию к HTML-элементу, например, цену или id товара. Для этого существуют <strong>data-атрибуты</strong>. Добавьте любой атрибут с префиксом <code>data-</code> в HTML, и <code>dataset</code> в JavaScript его прочитает.
                    </p>
                    <pre className={styles.code}>
                        {`/* HTML:
<button class="add-to-cart"
        data-product-id="42"
        data-price="1200"
        data-name="Торт Фрост">
    Добавить в корзину
</button> */

const addBtn = document.querySelector('.add-to-cart');

// data-product-id -> dataset.productId (camelCase!)
console.log(addBtn.dataset.productId); // "42" (строка!)
console.log(addBtn.dataset.price);     // "1200"
console.log(addBtn.dataset.name);      // "Торт Фрост"

addBtn.addEventListener('click', function() {
    const id = Number(this.dataset.productId);
    const price = Number(this.dataset.price);
    console.log('Товар #' + id + ' за ' + price + ' руб.');
});`}
                    </pre>

                    <div className={styles.screenshotPlaceholder}>
                        <img src="./images/Topic11/screen-13.webp" alt="screen-13" className={styles.screenshotImage} />
                        <p className={styles.screenshotText}>Рис.13 — data-атрибуты в работе</p>
                    </div>

                    <h3 className={styles.subSectionTitle} id="domTraversal">14. Навигация по DOM: parentElement и children</h3>
                    <p className={styles.text}>
                        DOM — это дерево. С помощью специальных свойств можно перемещаться по нему: находить родителя, детей, соседей. Это называется <strong>DOM Traversal</strong>.
                    </p>
                    <pre className={styles.code}>
                        {`const item = document.querySelector('.cart-item');

// Родитель:
console.log(item.parentElement);

// Все прямые дети:
console.log(item.children);

// Первый/последний дочерний элемент:
console.log(item.firstElementChild);
console.log(item.lastElementChild);

// Соседние элементы:
console.log(item.nextElementSibling);
console.log(item.previousElementSibling);

// closest() — ищет ближайшего родителя с нужным классом:
const btn = document.querySelector('.delete-btn');
btn.addEventListener('click', function() {
    const card = this.closest('.product-card');
    card.remove();
});`}
                    </pre>

                    <h3 className={styles.subSectionTitle} id="props-vs-attrs">15. Свойства vs Атрибуты: В чем разница?</h3>
                    <p className={styles.text}>
                        Вы могли заметить, что поменять <code>href</code> можно и через <code>link.href</code>, и через <code>link.setAttribute('href', ...)</code>. В чем разница?
                        <br />• <strong>Атрибуты</strong> — это то, что написано в HTML-коде.
                        <br />• <strong>Свойства</strong> — это то, что хранится в объекте JavaScript.
                        <br />Обычно они синхронизированы, но не всегда. Например, значение в инпуте: <code>getAttribute('value')</code> — это изначальное значение из HTML, а <code>input.value</code> — это то, что пользователь набрал прямо сейчас.
                    </p>

                    <h3 className={styles.subSectionTitle} id="fragment">16. Групповые изменения: DocumentFragment</h3>
                    <p className={styles.text}>
                        Если вам нужно добавить 100 элементов в список, не делайте <code>appendChild</code> 100 раз. Это заставит браузер перерисовывать страницу 100 раз. Используйте <code>DocumentFragment</code> — это «виртуальный контейнер», который добавляется в DOM целиком за один раз.
                    </p>
                    <pre className={styles.code}>
                        {`const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
    const li = document.createElement('li');
    li.textContent = "Пункт " + i;
    fragment.appendChild(li);
}
document.querySelector('ul').appendChild(fragment); // Быстро!`}
                    </pre>

                    <h3 className={styles.subSectionTitle} id="perf-dom">17. Производительность: Reflow и Repaint</h3>
                    <p className={styles.text}>
                        <strong>Reflow</strong> — это когда браузер пересчитывает размеры и положение элементов. Это дорого.
                        <br /><strong>Repaint</strong> — это когда браузер перерисовывает пиксели (например, меняет цвет), не меняя геометрию. Это дешевле.
                        <br />Совет: меняйте классы (<code>classList</code>), а не стили по одному, чтобы уменьшить количество перерисовок.
                    </p>

                    <h3 className={styles.subSectionTitle} id="computedStyle">18. Чтение стилей: getComputedStyle</h3>
                    <p className={styles.text}>
                        Свойство <code>element.style</code> видит только то, что вы написали в атрибуте <code>style="..."</code>. Если стиль задан в CSS-файле, вы его там не увидите. Чтобы прочитать <strong>реальный</strong> стиль, используйте <code>window.getComputedStyle()</code>.
                    </p>
                    <pre className={styles.code}>
                        {`const box = document.querySelector('.box');
const styles = window.getComputedStyle(box);
console.log(styles.width); // Достанет ширину, даже если она в CSS`}
                    </pre>

                    <h3 className={styles.subSectionTitle} id="adv-traversal">19. Продвинутая навигация</h3>
                    <p className={styles.text}>
                        Иногда нужно двигаться по всему дереву, не пропуская текстовые узлы. Свойства <code>childNodes</code> и <code>parentNode</code> включают в себя абсолютно всё (даже пробелы и комментарии), в то время как <code>children</code> и <code>parentElement</code> — только HTML-теги.
                    </p>

                    <h3 className={styles.subSectionTitle} id="shadow-dom">20. Теневой DOM (Shadow DOM)</h3>
                    <p className={styles.text}>
                        Это способ создания изолированных кусочков страницы, стили которых не влияют на остальной сайт и наоборот. Именно так работают встроенные элементы браузера, например <code>&lt;video&gt;</code> или <code>&lt;input type="range"&gt;</code>.
                    </p>

                    <h3 className={styles.subSectionTitle} id="security-dom">21. Безопасность: XSS через DOM</h3>
                    <p className={styles.text}>
                        Основная угроза при работе с DOM — это <strong>XSS (Cross-Site Scripting)</strong>. Если вы вставляете текст от пользователя через <code>innerHTML</code>, злоумышленник может ввести <code>&lt;img src=x onerror=alert(1)&gt;</code>, и ваш сайт выполнит его код.
                        <br /><strong>Золотое правило</strong>: для любых данных от пользователя (имена, отзывы, сообщения) используйте ТОЛЬКО <code>textContent</code>.
                    </p>

                    <h3 className={styles.subSectionTitle} id="troubleshooting-dom">22. Troubleshooting: Почему не меняется?</h3>
                    <p className={styles.text}>
                        • <strong>null is not an object</strong>: вы пытаетесь найти элемент, которого нет в HTML или селектор написан с ошибкой (забыли точку перед классом).
                        <br />• <strong>Инлайновые стили vs CSS</strong>: если вы задали цвет через <code>style.color</code>, он перекроет всё, что написано в <code>.css</code> файле (кроме <code>!important</code>). Будьте осторожны.
                        <br />• <strong>Динамические элементы</strong>: если вы добавили кнопку через JS, старые селекторы её не видели. Ищите её заново или используйте делегирование.
                    </p>

                    <h3 className={styles.subSectionTitle} id="history-dom">24. История: От IE6 до современных стандартов</h3>
                    <p className={styles.text}>
                        Раньше DOM был «диким западом». Браузер Internet Explorer имел свои методы, а Netscape — свои. Разработчикам приходилось писать тонны кода-проверок. Сегодня у нас есть <strong>W3C Standard</strong>, который гарантирует, что <code>querySelector</code> работает одинаково везде. Это «золотой век» фронтенда.
                    </p>

                    <h3 className={styles.subSectionTitle} id="modern-tools">25. Современные инструменты: Emmet и DevTools</h3>
                    <p className={styles.text}>
                        Для быстрой работы с DOM в VS Code используйте <strong>Emmet</strong>. Напишите <code>div.card {'->'} h3+p</code> и нажмите Tab — структура готова. А в браузере используйте <code>$0</code> в консоли, чтобы сразу получить доступ к выделенному элементу в дереве.
                    </p>

                    <h3 className={styles.subSectionTitle} id="final-summary">26. Заключение</h3>
                    <p className={styles.text}>
                        Управление DOM — это фундамент. Даже если вы будете работать с React или Vue, знание того, как работают узлы, стили и атрибуты «под капотом», сделает вас на голову выше других разработчиков.
                    </p>

                    <h3 className={styles.subSectionTitle} id="dom-table">27. Шпаргалка: Все методы DOM</h3>
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Метод / Свойство</th>
                                    <th>Что делает</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td><code>querySelector(s)</code></td><td>Находит первый элемент по селектору s</td></tr>
                                <tr><td><code>querySelectorAll(s)</code></td><td>Находит все элементы по селектору s</td></tr>
                                <tr><td><code>createElement(tag)</code></td><td>Создает новый HTML-тег</td></tr>
                                <tr><td><code>appendChild(el)</code></td><td>Добавляет el в конец родителя</td></tr>
                                <tr><td><code>textContent</code></td><td>Читает или меняет безопасный текст</td></tr>
                                <tr><td><code>innerHTML</code></td><td>Читает или меняет HTML-разметку</td></tr>
                                <tr><td><code>classList.add/remove</code></td><td>Управляет CSS-классами</td></tr>
                                <tr><td><code>setAttribute(a, v)</code></td><td>Устанавливает атрибут a со значением v</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className={styles.subSectionTitle} id="best-practices-dom">28. Советы «бывалых»</h3>
                    <p className={styles.text}>
                        1. <strong>Кэшируйте селекторы</strong>: не пишите <code>document.querySelector('.btn')</code> внутри цикла или события 100 раз. Сохраните его в переменную <code>const btn = ...</code> один раз в начале файла.
                        <br />2. <strong>Меньше правок</strong>: если нужно поменять 5 стилей у элемента, лучше создать класс в CSS и просто переключить его одной командой <code>classList.add</code>.
                        <br />3. <strong>Иерархия</strong>: ищите элементы внутри других элементов: <code>container.querySelector('.item')</code> быстрее, чем <code>document.querySelector('.container .item')</code>.
                    </p>
                </section>

                {!isTestPassed && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Тест</h2>
                        <p className={styles.text}>Пройдите тест, чтобы открыть доступ к практике.</p>
                        <Test11 onComplete={handleTestComplete} setTestAnswers={setTestAnswers} testAnswers={testAnswers} />
                    </section>
                )}

                {isTestPassed && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Практика: Оживляем страницу</h2>
                        <p className={styles.text}>
                            Время магии! Откройте ваш проект <strong>Frosted Muse</strong> и файл <code>js/script.js</code>. Задания выстроены от простого к сложному.
                        </p>

                        <h3 className={styles.subSectionTitle}>Задание 1: Лампа</h3>
                        <p className={styles.text}>
                            Откройте консоль браузера (F12). Найдите любой элемент на странице через <code>querySelector</code> и поменяйте его текст с помощью <code>textContent</code>. Убедитесь, что изменение видно на странице.
                        </p>
                        <p className={styles.text}>
                            <span onClick={() => scrollToSection('textContent')} className={styles.hintLink} style={{ cursor: 'pointer' }}>
                                💡 Подсказка: попробуйте document.querySelector('h1').textContent = 'Привет!'
                            </span>
                        </p>

                        <h3 className={styles.subSectionTitle}>Задание 2: Счётчик кликов</h3>
                        <p className={styles.text}>
                            В HTML у вас есть кнопка. Создайте переменную-счётчик <code>count = 0</code>. При каждом нажатии на кнопку увеличивайте счётчик и обновляйте текст кнопки: «Кликов: 3».
                        </p>
                        <p className={styles.text}>
                            <span onClick={() => scrollToSection('events')} className={styles.hintLink} style={{ cursor: 'pointer' }}>
                                💡 Подсказка: используйте addEventListener('click', ...) и меняйте button.textContent внутри функции
                            </span>
                        </p>
                        <pre className={styles.code}>
                            {`let count = 0;
const button = document.querySelector('button');

button.addEventListener('click', function() {
    count++;
    button.textContent = "Кликов: " + count;
});`}
                        </pre>

                        <h3 className={styles.subSectionTitle}>Задание 3: Приветствие</h3>
                        <p className={styles.text}>
                            Создайте инпут и кнопку «Поздороваться». Когда пользователь вводит имя и нажимает кнопку, под ними должен появляться текст «Привет, [Имя]!». Используйте для этого <code>innerHTML</code>.
                        </p>
                        <p className={styles.text}>
                            <span onClick={() => scrollToSection('value')} className={styles.hintLink} style={{ cursor: 'pointer' }}>
                                💡 Подсказка: сначала получите input.value, затем запишите результат через innerHTML в отдельный блок
                            </span>
                        </p>
                        <pre className={styles.code}>
                            {`const input = document.querySelector('#name-input');
const btn = document.querySelector('#greet-btn');
const result = document.querySelector('#result');

btn.addEventListener('click', function() {
    const name = input.value;
    result.innerHTML = '<strong>Привет, ' + name + '!</strong>';
});`}
                        </pre>

                        <h3 className={styles.subSectionTitle}>Задание 4: Переключатель темы</h3>
                        <p className={styles.text}>
                            Создайте кнопку «Тёмная тема». При нажатии добавляйте классу body класс <code>dark</code>. При повторном нажатии — убирайте. В CSS опишите стили для <code>body.dark</code>.
                        </p>
                        <p className={styles.text}>
                            <span onClick={() => scrollToSection('classList')} className={styles.hintLink} style={{ cursor: 'pointer' }}>
                                💡 Подсказка: classList.toggle() сделает всё сам — добавит, если нет, и уберёт, если есть
                            </span>
                        </p>
                        <pre className={styles.code}>
                            {`const themeBtn = document.querySelector('#theme-btn');

themeBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark');
    // Меняем текст кнопки
    if (document.body.classList.contains('dark')) {
        themeBtn.textContent = "Светлая тема";
    } else {
        themeBtn.textContent = "Тёмная тема";
    }
});`}
                        </pre>

                        <h3 className={styles.subSectionTitle}>Задание 5: Frosted Muse — Умная шапка</h3>
                        <p className={styles.text}>
                            Вернёмся к нашему проекту. Откройте <code>js/script.js</code> и добавьте следующий код. При прокрутке страницы шапка (<code>header</code>) должна менять внешний вид — становиться более непрозрачной.
                        </p>
                        <p className={styles.text}>
                            <span onClick={() => scrollToSection('classList')} className={styles.hintLink} style={{ cursor: 'pointer' }}>
                                💡 Подсказка: слушайте событие 'scroll' на window. window.scrollY покажет, насколько прокрутили
                            </span>
                        </p>
                        <pre className={styles.code}>
                            {`// В js/script.js
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});`}
                        </pre>

                        <h3 className={styles.subSectionTitle}>Задание 6: Список дел (TODO)</h3>
                        <p className={styles.text}>
                            Создайте инпут и кнопку «Добавить». При клике текст из инпута должен добавляться как новый элемент <code>li</code> в список <code>ul</code>.
                        </p>
                        <pre className={styles.code}>
                            {`const btn = document.querySelector('#add-btn');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');

btn.addEventListener('click', () => {
    const li = document.createElement('li');
    li.textContent = input.value;
    list.appendChild(li);
    input.value = '';
});`}
                        </pre>

                        <h3 className={styles.subSectionTitle}>Задание 7: Удаление элементов</h3>
                        <p className={styles.text}>
                            Добавьте к каждому пункту списка из предыдущего задания кнопку «Удалить». При клике на неё соответствующий пункт списка должен исчезать.
                        </p>
                        <pre className={styles.code}>
                            {`li.addEventListener('click', function() {
    this.remove();
});`}
                        </pre>

                        <h3 className={styles.subSectionTitle}>Задание 8: Фильтр товаров</h3>
                        <p className={styles.text}>
                            Создайте инпут «Поиск». При вводе текста скрывайте все карточки товаров (<code>.product-card</code>), которые не содержат введенную строку.
                        </p>
                        <pre className={styles.code}>
                            {`input.addEventListener('input', (e) => {
    const text = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = title.includes(text) ? 'block' : 'none';
    });
});`}
                        </pre>

                        <h3 className={styles.subSectionTitle}>Задание 9: Модальное окно</h3>
                        <p className={styles.text}>
                            Реализуйте открытие и закрытие окна по кнопке. Используйте добавление/удаление класса <code>active</code>.
                        </p>

                        <h3 className={styles.subSectionTitle}>Задание 10: Смена картинки</h3>
                        <p className={styles.text}>
                            Создайте 3 маленьких картинки и одну большую. При клике на маленькую большая должна менять свой <code>src</code> на адрес нажатой картинки.
                        </p>

                        <h3 className={styles.subSectionTitle}>Задание 11: Живой счётчик символов</h3>
                        <p className={styles.text}>
                            В поле комментария показывайте, сколько символов осталось ввести (максимум 200). При превышении лимита делайте текст красным.
                        </p>

                        <h3 className={styles.subSectionTitle}>Задание 12: Аккордеон</h3>
                        <p className={styles.text}>
                            Сделайте блок «Частые вопросы». При клике на вопрос должен плавно показываться/скрываться блок с ответом.
                        </p>

                        <h3 className={styles.subSectionTitle}>Задание 13: Увеличение шрифта</h3>
                        <p className={styles.text}>
                            Создайте кнопки «A+» и «A-», которые меняют размер шрифта основного текста статьи.
                        </p>

                        <h3 className={styles.subSectionTitle}>Задание 14: Индикатор заполнения</h3>
                        <p className={styles.text}>
                            Создайте полоску прогресса. Она должна заполняться по мере того, как пользователь заполняет поля в форме регистрации.
                        </p>

                        <h3 className={styles.subSectionTitle}>Задание 15: Frosted Muse — Уведомление</h3>
                        <p className={styles.text}>
                            Реализуйте всплывающее уведомление «Товар добавлен в корзину!», которое появляется на 3 секунды и плавно исчезает.
                        </p>
                        <pre className={styles.code}>
                            {`function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}`}
                        </pre>

                        <h3 className={styles.subSectionTitle}>Задание 16: Табы (Вкладки)</h3>
                        <p className={styles.text}>
                            Сделайте переключение контента при клике на разные кнопки «Описания», «Характеристики» и «Отзывы». (Подсказка: используйте классы <code>active</code> и <code>hidden</code>).
                        </p>

                        <h3 className={styles.subSectionTitle}>Задание 17: Галерея с зумом</h3>
                        <p className={styles.text}>
                            При клике на изображение товара оно должно открываться в модальном окне на весь экран (Lightbox).
                        </p>

                        <h3 className={styles.subSectionTitle}>Задание 18: Сортировка списка</h3>
                        <p className={styles.text}>
                            Создайте список чисел и кнопку «Отсортировать». При клике элементы в DOM должны выстроиться по возрастанию. (Подсказка: соберите их в массив, отсортируйте и вставьте обратно через <code>appendChild</code>).
                        </p>

                        <h3 className={styles.subSectionTitle}>Задание 19: Анимация при скролле</h3>
                        <p className={styles.text}>
                            Добавьте класс <code>fade-in</code> всем секциям сайта, когда они попадают в область видимости. (Используйте <code>getBoundingClientRect</code> или <code>IntersectionObserver</code>).
                        </p>

                        <h3 className={styles.subSectionTitle}>Задание 20: Frosted Muse — Умная корзина</h3>
                        <p className={styles.text}>
                            Реализуйте автоматический пересчет итоговой суммы в корзине при изменении количества товаров (инпуты с числом).
                        </p>
                    </section>
                )}

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Итогом работы стало</h2>
                    <p className={styles.text}>
                        Вы сделали первый и самый важный шаг в Frontend-разработке: вы научились <strong>управлять страницей</strong>. Теперь вы не просто верстальщик — вы программист, который может создавать живые интерфейсы. Шапка Frosted Muse теперь реагирует на прокрутку страницы — это ваш первый настоящий интерактивный элемент!
                    </p>
                    <div className={styles.endImg}>
                        <img src='./images/General/general.webp' alt='general-logo'></img>
                    </div>
                </section>
            </div>

            <div className={styles.navigation}>
                <NavLink to="/topic12" className={styles.nextButton}>
                    К следующей теме
                </NavLink>
                <BackProgress onReset={handleResetProgress} testPassed={isTestPassed} />
            </div>
        </div>
    );
};

export default Topic11;
