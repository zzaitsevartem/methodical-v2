import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../Themes.module.scss';
import { motion } from 'framer-motion';
import BackButton from '../../components/BackButton/BackButton';
import BackProgress from '../../components/BackProgress/BackProgress';
import Test10 from './components/Test10';
import { useTopicProgress } from '../../../hooks/useTopicProgress';

interface Topic10Props {
  testPassed: boolean;
  setTestPassed: (value: boolean) => void;
}

const Topic10: React.FC<Topic10Props> = ({ testPassed: propTestPassed, setTestPassed: propSetTestPassed }) => {
  const { testPassed: cachedTestPassed, setTestPassed: setCachedTestPassed, testAnswers, setTestAnswers, resetProgress } = useTopicProgress('10');

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
        <h1 className={styles.title}>Тема 10: Работа с числами и строками</h1>
        <p className={styles.subtitle}>Математические операции, манипуляции со строками и преобразование типов</p>
      </motion.div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Теория</h2>

          <h3 className={styles.subSectionTitle}>1. От переменных к вычислениям</h3>
          <p className={styles.text}>
            В предыдущей теме мы научились создавать <strong>переменные</strong>. Но настоящая сила программирования — это <strong>вычисления</strong>. Переменные — это ингредиенты, а операторы и функции — это способы их приготовления.
          </p>
          <p className={styles.text}>
            В этой теме мы углубимся в работу с двумя самыми популярными типами данных: <strong>Number</strong> (числа) и <strong>String</strong> (строки). Вы удивитесь, сколько всего можно с ними делать.
          </p>
          <p className={styles.text}>
            Представьте, что вы делаете <strong>калькулятор стоимости торта</strong>: нужно умножить количество порций на цену, округлить результат и вывести его красивой фразой. Всё это вы сможете после этой темы.
          </p>

          <div className={styles.screenshotPlaceholder}>
            <img src="./images/Topic10/screen-1.webp" alt="screen-1" className={styles.screenshotImage} />
            <p className={styles.screenshotText}>Рис.1 — Основные математические операции</p>
          </div>

          <h3 className={styles.subSectionTitle} id="math">2. Арифметические операции</h3>
          <p className={styles.text}>
            JavaScript — это мощный калькулятор. Он поддерживает все школьные операции, и даже больше.
          </p>
          <p className={styles.text}>
            <strong>Базовые операторы:</strong>
          </p>
          <ul>
            <li><code>+</code> Сложение: <code>10 + 5 = 15</code></li>
            <li><code>-</code> Вычитание: <code>10 - 5 = 5</code></li>
            <li><code>*</code> Умножение: <code>10 * 5 = 50</code></li>
            <li><code>/</code> Деление: <code>10 / 2 = 5</code></li>
          </ul>

          <p className={styles.text}>
            <strong>Продвинутые операторы:</strong>
          </p>
          <ul>
            <li><code>%</code> <strong>Остаток от деления</strong>. Очень полезная вещь! <code>10 % 3 = 1</code> (так как в 10 три раза помещается 3, и остаётся 1). Используется для проверки на чётность (число % 2 === 0).</li>
            <li><code>**</code> <strong>Возведение в степень</strong>. <code>2 ** 3 = 8</code> (2 умножить на себя 3 раза).</li>
          </ul>

          <p className={styles.text}>
            <strong>Приоритет операций</strong> такой же, как в математике: сначала <code>*</code> и <code>/</code>, потом <code>+</code> и <code>-</code>. Скобки <code>( )</code> меняют приоритет.
          </p>
          <pre className={styles.code}>
            {`let x = 2 + 2 * 2;   // 6 (сначала умножение)
let y = (2 + 2) * 2; // 8 (сначала скобки)

// Пример: подсчёт суммы заказа
let porcelainCakePrice = 1200; // цена за торт
let decorationCost = 300;      // украшение
let deliveryCost = 150;        // доставка
let total = porcelainCakePrice + decorationCost + deliveryCost;
console.log(total); // 1650`}
          </pre>

          <div className={styles.screenshotPlaceholder}>
            <img src="./images/Topic10/screen-2.webp" alt="screen-2" className={styles.screenshotImage} />
            <p className={styles.screenshotText}>Рис.2 — Приоритет операций в JS</p>
          </div>

          <h3 className={styles.subSectionTitle} id="increment">3. Инкремент и декремент: ++, --</h3>
          <p className={styles.text}>
            Очень часто в программировании нужно увеличить или уменьшить переменную на 1. Для этого придуманы специальные операторы:
          </p>
          <ul>
            <li><code>counter++</code> — <strong>инкремент</strong>: увеличить на 1. То же самое, что <code>counter = counter + 1</code>.</li>
            <li><code>counter--</code> — <strong>декремент</strong>: уменьшить на 1. То же самое, что <code>counter = counter - 1</code>.</li>
            <li><code>counter += 5</code> — увеличить на 5. Краткая форма <code>counter = counter + 5</code>.</li>
            <li><code>counter -= 3</code> — уменьшить на 3.</li>
            <li><code>counter *= 2</code> — умножить на 2.</li>
          </ul>
          <pre className={styles.code}>
            {`let views = 0;    // Счётчик просмотров

views++;          // 1 (кто-то зашёл на страницу)
views++;          // 2
views++;          // 3
console.log(views); // 3

// Краткие операторы:
let price = 100;
price += 50;   // price теперь 150 (добавили наценку)
price *= 1.2;  // price теперь 180 (добавили НДС 20%)
console.log(price.toFixed(2)); // "180.00"`}
          </pre>
          <p className={styles.text}>
            <strong>Про-совет:</strong> Разница между <code>counter++</code> и <code>++counter</code> — в том, когда именно происходит увеличение. Первая форма возвращает <em>старое</em> значение, вторая — <em>новое</em>. Для новичка разница не критична, но знать об этом нужно.
          </p>

          <div className={styles.screenshotPlaceholder}>
            <img src="./images/Topic10/screen-3.webp" alt="screen-3" className={styles.screenshotImage} />
            <p className={styles.screenshotText}>Рис.3 — Инкремент и декремент в консоли</p>
          </div>

          <h3 className={styles.subSectionTitle} id="math-methods">4. Объект Math: Супер-калькулятор</h3>
          <p className={styles.text}>
            Для сложных задач в JavaScript есть встроенный объект <strong>Math</strong>. Это набор готовых инструментов для математики. Вам не нужно знать их все наизусть — важно знать <strong>что они существуют</strong> и что находить их в документации.
          </p>
          <ul>
            <li><code>Math.round(4.7)</code> — <code>5</code> (округление до ближайшего целого)</li>
            <li><code>Math.floor(4.9)</code> — <code>4</code> (округление <strong>вниз</strong>, «в пол»)</li>
            <li><code>Math.ceil(4.1)</code> — <code>5</code> (округление <strong>вверх</strong>, «в потолок»)</li>
            <li><code>Math.abs(-10)</code> — <code>10</code> (модуль числа, убирает знак минус)</li>
            <li><code>Math.max(5, 10, 1)</code> — <code>10</code> (выбирает самое большое число)</li>
            <li><code>Math.min(5, 10, 1)</code> — <code>1</code> (выбирает самое маленькое)</li>
            <li><code>Math.random()</code> — случайное число от 0 до 1 (например, <code>0.8234...</code>)</li>
            <li><code>Math.sqrt(16)</code> — <code>4</code> (квадратный корень)</li>
            <li><code>Math.PI</code> — <code>3.14159...</code> (число Пи)</li>
            <li><code>Math.pow(2, 8)</code> — <code>256</code> (то же что 2**8)</li>
          </ul>
          <pre className={styles.code}>
            {`// Случайное целое число от 1 до 100:
let rand = Math.floor(Math.random() * 100) + 1;
console.log(rand); // например, 42

// Найти самую дорогую позицию:
let cake = 1500, cookie = 120, macaron = 350;
let mostExpensive = Math.max(cake, cookie, macaron);
console.log(mostExpensive); // 1500

// Округлить итог в большую сторону (в пользу магазина):
let rawTotal = 1234.01;
let total = Math.ceil(rawTotal);
console.log(total); // 1235`}
          </pre>

          <div className={styles.screenshotPlaceholder}>
            <img src="./images/Topic10/screen-4.webp" alt="screen-4" className={styles.screenshotImage} />
            <p className={styles.screenshotText}>Рис.4 — Методы объекта Math</p>
          </div>

          <h3 className={styles.subSectionTitle} id="tofixed">5. Округление дробей: toFixed и toPrecision</h3>
          <p className={styles.text}>
            В магазинах цены обычно имеют две цифры после запятой (копейки). Метод <code>toFixed(n)</code> округляет число до <code>n</code> знаков после запятой и <strong>превращает его в строку</strong>.
          </p>
          <pre className={styles.code}>
            {`let price = 12.34567;
console.log(price.toFixed(2)); // "12.35" (строка!)
console.log(price.toFixed(0)); // "12"    (строка!)

// Будьте внимательны: toFixed возвращает СТРОКУ!
let result = "12.35" + 1; // "12.351" (конкатенация строк)

// Если нужно снова число — конвертируем:
let numResult = Number(price.toFixed(2)) + 1; // 13.35

// Пример с ценами:
let subtotal = 1499.9;
let tax = subtotal * 0.2; // НДС 20%
let grandTotal = subtotal + tax;
console.log(\`Итого: \${grandTotal.toFixed(2)} руб.\`); // "Итого: 1799.88 руб."`}
          </pre>
          <p className={styles.text}>
            Метод <code>toPrecision(n)</code> задаёт общее количество значащих цифр (не только после запятой):
          </p>
          <pre className={styles.code}>
            {`let big = 123456.789;
console.log(big.toPrecision(4)); // "1.235e+5" (научная нотация)
console.log(big.toPrecision(7)); // "123456.8"`}
          </pre>

          <div className={styles.screenshotPlaceholder}>
            <img src="./images/Topic10/screen-5.webp" alt="screen-5" className={styles.screenshotImage} />
            <p className={styles.screenshotText}>Рис.5 — Работа с дробными числами</p>
          </div>

          <h3 className={styles.subSectionTitle} id="strings">6. Строки: больше, чем просто текст</h3>
          <p className={styles.text}>
            Строка — это последовательность символов. У каждой буквы есть свой номер (индекс), начиная с нуля. Это очень важно запомнить: первый символ — это <strong>нулевой</strong> по счёту.
          </p>
          <pre className={styles.code}>
            {`let word = "Привет";
console.log(word[0]);      // "П" — первый символ
console.log(word[1]);      // "р"
console.log(word[5]);      // "т" — последний
console.log(word.length);  // 6 — длина строки

// Последний символ — хитрый приём:
console.log(word[word.length - 1]); // "т"

// Что будет, если индекс больше длины?
console.log(word[100]); // undefined (не ошибка!)`}
          </pre>
          <p className={styles.text}>
            Важный момент: <strong>строки неизменяемы</strong>. Нельзя написать <code>word[0] = "А"</code>, чтобы заменить первую букву. Нужно создавать новую строку.
          </p>
          <pre className={styles.code}>
            {`let name = "Артём";
name[0] = "М"; // Ничего не произойдёт — строка неизменяема!
console.log(name); // "Артём" — без изменений

// Правильный способ — создать новую строку:
let newName = "М" + name.slice(1);
console.log(newName); // "Мртём" — ну и имя вышло :)`}
          </pre>

          <div className={styles.screenshotPlaceholder}>
            <img src="./images/Topic10/screen-6.webp" alt="screen-6" className={styles.screenshotImage} />
            <p className={styles.screenshotText}>Рис.6 — Индексация символов строки</p>
          </div>

          <h3 className={styles.subSectionTitle} id="string-methods">7. Методы строк: инструментарий текста</h3>
          <p className={styles.text}>
            У строк есть целый набор встроенных инструментов. Вот самые полезные:
          </p>
          <pre className={styles.code}>
            {`let text = "  Hello, World!  ";

// toLowerCase() / toUpperCase() — меняет регистр
console.log(text.toLowerCase()); // "  hello, world!  "
console.log(text.toUpperCase()); // "  HELLO, WORLD!  "

// trim() — убирает пробелы по краям (ОБЯЗАТЕЛЬНО используйте при чтении пользовательского ввода!)
console.log(text.trim()); // "Hello, World!"

// includes("текст") — проверяет, есть ли подстрока (возвращает true/false)
console.log(text.includes("World")); // true
console.log(text.includes("world")); // false (регистр важен!)

// indexOf("текст") — находит позицию подстроки (-1 если нет)
console.log(text.indexOf("World")); // 9
console.log(text.indexOf("XYZ"));   // -1

// startsWith() и endsWith() — начинается/заканчивается ли строка на...
console.log("hello@mail.ru".startsWith("hello")); // true
console.log("hello@mail.ru".endsWith(".ru"));      // true

// slice(start, end) — вырезает кусочек строки
let url = "https://frosted-muse.ru/catalog";
let domain = url.slice(8, 22); // "frosted-muse"
console.log(domain);

// replace("было", "стало") — заменяет первое вхождение
let greeting = "Hello, World!";
console.log(greeting.replace("World", "Клиент")); // "Hello, Клиент!"

// replaceAll("было", "стало") — заменяет ВСЕ вхождения
let text2 = "кот сидит, кот спит, кот ест";
console.log(text2.replaceAll("кот", "пёс")); // "пёс сидит, пёс спит, пёс ест"`}
          </pre>

          <div className={styles.screenshotPlaceholder}>
            <img src="./images/Topic10/screen-7.webp" alt="screen-7" className={styles.screenshotImage} />
            <p className={styles.screenshotText}>Рис.7 — Манипуляции со строками в консоли</p>
          </div>

          <h3 className={styles.subSectionTitle} id="split-join">8. split и join: строки и массивы</h3>
          <p className={styles.text}>
            Два мощных метода для превращения строки в массив и обратно. Массивы мы изучим в следующей теме, но эти методы настолько полезны, что стоит знать их уже сейчас.
          </p>
          <pre className={styles.code}>
            {`// split("разделитель") — разбивает строку на массив частей
let csv = "Яблоко,Груша,Банан,Вишня";
let fruits = csv.split(",");
console.log(fruits); // ["Яблоко", "Груша", "Банан", "Вишня"]
console.log(fruits[0]); // "Яблоко" — первый элемент массива

// Разбить по пробелам:
let sentence = "Привет мир как дела";
let words = sentence.split(" ");
console.log(words.length); // 4 — кол-во слов

// Разбить на отдельные символы:
let str = "Hello";
let chars = str.split("");
console.log(chars); // ["H", "e", "l", "l", "o"]

// join("соединитель") — объединяет массив в строку
let tags = ["торт", "выпечка", "десерт"];
let tagString = tags.join(", ");
console.log(tagString); // "торт, выпечка, десерт"

// Типичный usecase: нормализация телефона
let phone = "+7 (999) 123-45-67";
let digits = phone.split("").filter(c => !isNaN(c) && c !== " ");
// Убрали все нецифровые символы
console.log(digits.join("")); // "79991234567"`}
          </pre>

          <div className={styles.screenshotPlaceholder}>
            <img src="./images/Topic10/screen-8.webp" alt="screen-8" className={styles.screenshotImage} />
            <p className={styles.screenshotText}>Рис.8 — split и join на практике</p>
          </div>

          <h3 className={styles.subSectionTitle} id="templates">9. Шаблонные строки (Template Literals)</h3>
          <p className={styles.text}>
            Это современный стандарт ES6. Вместо того чтобы склеивать строки плюсами, мы используем обратные кавычки <code>` `</code> и вставляем переменные внутрь конструкции <code>\${`...`}</code>.
          </p>
          <pre className={styles.code}>
            {`let item = "Яблоко";
let price = 50;
let count = 3;

// Старый способ (ужасный):
let old = "Вы купили " + count + " шт. товара " + item + " на сумму " + (price * count) + " руб.";

// Новый способ (красивый):
let modern = \`Вы купили \${count} шт. товара \${item} на сумму \${price * count} руб.\`;
console.log(modern); // "Вы купили 3 шт. товара Яблоко на сумму 150 руб."

// Внутри \${} может быть любое выражение:
let discount = 0.1; // 10% скидка
console.log(\`Цена со скидкой: \${(price * (1 - discount)).toFixed(2)} руб.\`);
// "Цена со скидкой: 45.00 руб."

// Многострочные строки — просто нажмите Enter внутри кавычек:
let html = \`
<div class="product">
  <h2>\${item}</h2>
  <p>Цена: \${price} руб.</p>
</div>
\`;
console.log(html);`}
          </pre>

          <div className={styles.screenshotPlaceholder}>
            <img src="./images/Topic10/screen-9.webp" alt="screen-9" className={styles.screenshotImage} />
            <p className={styles.screenshotText}>Рис.9 — Шаблонные строки vs Конкатенация</p>
          </div>

          <h3 className={styles.subSectionTitle} id="conversion">10. Преобразование типов</h3>
          <p className={styles.text}>
            Часто бывает, что число записано как строка (например, пользователь ввёл <code>"123"</code> в поле формы). Складывать его с другими числами нельзя — получится склеивание строк. Нужно преобразовать.
          </p>
          <pre className={styles.code}>
            {`// ПРОБЛЕМА:
let userInput = "10"; // Пользователь ввёл с клавиатуры — это СТРОКА
let result = userInput + 5;
console.log(result); // "105" (строки склеились!) — НЕПРАВИЛЬНО!

// РЕШЕНИЕ — преобразование в число:
// Способ 1: Number()
let num1 = Number("123");  // 123 — число
let num2 = Number("12.5"); // 12.5
let num3 = Number("");     // 0
let num4 = Number("abc");  // NaN (Not a Number)

// Способ 2: parseInt() и parseFloat()
let int1 = parseInt("42px");     // 42 — берёт только число слева!
let int2 = parseInt("3.14");     // 3  — только целая часть
let float1 = parseFloat("3.14"); // 3.14

// Способ 3: Унарный плюс (самый короткий)
let quick = +"123"; // 123

// Строка из числа:
let str = String(123);    // "123"
let str2 = (123).toString(); // "123"
let str3 = 123 + "";        // "123" (неявное преобразование)

console.log(typeof str); // "string"`}
          </pre>
          <p className={styles.text}>
            <strong>NaN (Not a Number)</strong> — это специальное значение, которое получается, если вы попытаетесь превратить в число что-то, что числом не является. Любая математика с <code>NaN</code> даёт <code>NaN</code>. Проверить через <code>isNaN(value)</code> или <code>Number.isNaN(value)</code>.
          </p>
          <pre className={styles.code}>
            {`let bad = Number("привет"); // NaN
console.log(bad + 5);        // NaN

// Два способа проверки NaN:
console.log(isNaN("привет"));        // true (проверяет после конвертации)
console.log(Number.isNaN("привет")); // false! (строка сама по себе не NaN)
console.log(Number.isNaN(NaN));      // true  — точная проверка

// Правило: используйте Number.isNaN() если хотите точности,
// isNaN() — для быстрой проверки "можно ли это использовать как число?"
let userAge = prompt("Сколько вам лет?");
if (isNaN(userAge) || userAge <= 0) {
    console.log("Пожалуйста, введите корректный возраст");
} else {
    console.log(\`Вам \${userAge} лет\`);
}`}
          </pre>

          <div className={styles.screenshotPlaceholder}>
            <img src="./images/Topic10/screen-10.webp" alt="screen-10" className={styles.screenshotImage} />
            <p className={styles.screenshotText}>Рис.10 — Преобразование типов и NaN</p>
          </div>

          <h3 className={styles.subSectionTitle} id="date">11. Работа с датами: объект Date</h3>
          <p className={styles.text}>
            <code>new Date()</code> создаёт объект с текущей датой и временем. Из него можно вытащить всё что угодно. Объект Date — это основа для счётчиков времени, возрастных ограничений и любой временной логики.
          </p>
          <pre className={styles.code}>
            {`let now = new Date();

// Получаем части даты:
console.log(now.getFullYear()); // 2024 — год
console.log(now.getMonth());    // 0 = Январь, 11 = Декабрь (ВНИМАНИЕ: счёт с нуля!)
console.log(now.getDate());     // 1-31 — день месяца
console.log(now.getDay());      // 0 = Воскресенье, 6 = Суббота (счёт с нуля!)
console.log(now.getHours());    // 0-23
console.log(now.getMinutes()); // 0-59
console.log(now.getSeconds()); // 0-59

// Конкретная дата:
let birthday = new Date(1990, 5, 15); // 15 июня 1990 (июнь = индекс 5!)
console.log(birthday.getFullYear()); // 1990

// Сравнение дат (в миллисекундах):
let start = new Date("2024-01-01");
let end = new Date("2024-12-31");
let diffMs = end - start; // разница в миллисекундах
let diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
console.log(diffDays); // 365 дней в 2024 году

// Текущая дата в читаемом виде:
let months = ["Январь","Февраль","Март","Апрель","Май","Июнь",
              "Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
console.log(\`Сегодня: \${now.getDate()} \${months[now.getMonth()]} \${now.getFullYear()}\`);`}
          </pre>
          <p className={styles.text}>
            Запомните этот подвох: <strong>месяцы и дни недели в JS считаются с нуля!</strong> Январь — это 0, декабрь — 11. Воскресенье — это 0, суббота — 6.
          </p>

          <div className={styles.screenshotPlaceholder}>
            <img src="./images/Topic10/screen-11.webp" alt="screen-11" className={styles.screenshotImage} />
            <p className={styles.screenshotText}>Рис.11 — Работа с объектом Date</p>
          </div>

          <h3 className={styles.subSectionTitle} id="typeof">12. typeof: что за тип?</h3>
          <p className={styles.text}>
            Оператор <code>typeof</code> позволяет узнать тип любого значения. Это незаменимо при отладке.
          </p>
          <pre className={styles.code}>
            {`console.log(typeof 42);          // "number"
console.log(typeof "Привет");    // "string"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof null);        // "object" (историческая ошибка JS!)
console.log(typeof {});          // "object"
console.log(typeof []);          // "object" (массивы тоже объекты)
console.log(typeof function(){}); // "function"

// Практическое применение:
function add(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        console.log("Ошибка: нужно передать два числа!");
        return null;
    }
    return a + b;
}

console.log(add(2, 3));       // 5
console.log(add("2", 3));     // "Ошибка: нужно передать два числа!"`}
          </pre>

          <div className={styles.screenshotPlaceholder}>
            <img src="./images/Topic10/screen-12.webp" alt="screen-12" className={styles.screenshotImage} />
            <p className={styles.screenshotText}>Рис.12 — оператор typeof</p>
          </div>

          <h3 className={styles.subSectionTitle} id="special">13. Особые числовые значения: Infinity и NaN</h3>
          <p className={styles.text}>
            JavaScript не падает с ошибкой при делении на ноль — вместо этого возвращает специальные значения:
          </p>
          <pre className={styles.code}>
            {`// Infinity — бесконечность
console.log(1 / 0);   // Infinity
console.log(-1 / 0);  // -Infinity
console.log(Infinity + 1000); // Infinity

// Проверить:
console.log(isFinite(1 / 0));  // false
console.log(isFinite(42));     // true

// NaN — Not a Number
console.log(0 / 0);           // NaN (0/0 не определено математически)
console.log(Math.sqrt(-1));   // NaN (нет вещественного корня из отрицательного)
console.log("текст" * 2);     // NaN

// Уникальное свойство NaN: он не равен самому себе!
console.log(NaN === NaN); // false!!! Это единственное значение в JS с таким поведением

// Поэтому для проверки используют isNaN() или Number.isNaN():
let val = NaN;
console.log(val !== val);      // true (хак проверки NaN)
console.log(Number.isNaN(val)); // true (правильный способ)`}
          </pre>

          <h3 className={styles.subSectionTitle} id="chaining">14. Цепочки методов (Method Chaining)</h3>
          <p className={styles.text}>
            Красота работы со строками — методы можно вызывать последовательно, в цепочке. Каждый метод возвращает строку, и на ней можно сразу вызвать следующий метод.
          </p>
          <pre className={styles.code}>
            {`let messy = "  hello@EXAMPLE.COM  ";

// Вместо 4 отдельных строк:
let step1 = messy.trim();
let step2 = step1.toLowerCase();
let step3 = step2.replace("example", "gmail");
console.log(step3); // "hello@gmail.com"

// Можно написать в одну строку — цепочка:
let clean = messy.trim().toLowerCase().replace("example", "gmail");
console.log(clean); // "hello@gmail.com"

// Реальный пример — нормализация имени с формы:
let rawName = "  АРТЁМ  ЗАЙЦЕВ  ";
let normalName = rawName
    .trim()
    .toLowerCase()
    .replace(/\\s+/g, " ") // убираем двойные пробелы
    .split(" ")
    .map(word => word[0].toUpperCase() + word.slice(1)) // каждое слово с заглавной
    .join(" ");
console.log(normalName); // "Артём Зайцев"`}
          </pre>

          <h3 className={styles.subSectionTitle} id="bigint">15. BigInt: Гигантские числа</h3>
          <p className={styles.text}>
            Обычные числа в JS ограничены. Если вам нужно число больше 9 квадриллионов (например, ID в базе), используйте <code>BigInt</code>. Просто добавьте <code>n</code> в конце.
          </p>
          <pre className={styles.code}>
            {`const huge = 9007199254740991n;
console.log(huge + 2n); // 9007199254740993n`}
          </pre>

          <h3 className={styles.subSectionTitle} id="symbols">16. Symbol: Уникальные ключи</h3>
          <p className={styles.text}>
            <code>Symbol</code> — это примитив, который всегда уникален. Даже если описание совпадает, символы разные. Полезны для скрытых свойств объектов.
          </p>
          <pre className={styles.code}>
            {`const sym1 = Symbol("key");
const sym2 = Symbol("key");
console.log(sym1 === sym2); // false`}
          </pre>

          <h3 className={styles.subSectionTitle} id="precision">17. Коварство дробных чисел</h3>
          <p className={styles.text}>
            В JavaScript (как и во многих языках) дробные числа могут давать странные результаты из-за особенностей хранения в памяти.
          </p>
          <pre className={styles.code}>
            {`console.log(0.1 + 0.2); // 0.30000000000000004
// Решение: округляйте при выводе
console.log((0.1 + 0.2).toFixed(2)); // "0.30"`}
          </pre>

          <h3 className={styles.subSectionTitle} id="locales">18. localeCompare: Правильная сортировка</h3>
          <p className={styles.text}>
            Сравнение <code>{"\"ё\" > \"я\""}</code> может выдать <code>true</code> из-за кодировки. Для списков используйте <code>localeCompare</code>.
          </p>
          <pre className={styles.code}>
            {`console.log("ё".localeCompare("я", "ru")); // -1 (идет до)`}
          </pre>

          <h3 className={styles.subSectionTitle} id="adv-date">19. Продвинутые Даты: Intl.DateTimeFormat</h3>
          <p className={styles.text}>
            Вместо ручной сборки даты используйте встроенный форматтер.
          </p>
          <pre className={styles.code}>
            {`const now = new Date();
const formatter = new Intl.DateTimeFormat("ru", {
    month: "long",
    day: "numeric",
    year: "numeric"
});
console.log(formatter.format(now)); // "21 февраля 2024 г."`}
          </pre>

          <h3 className={styles.subSectionTitle} id="pro-tips">20. Профессиональные советы</h3>
          <p className={styles.text}>
            • Используйте <strong>trim()</strong> всегда при работе с пользовательским вводом.
            <br />• Шаблонные строки <code>\` \`</code> — ваш лучший друг для читаемости.
            <br />• <code>Number.isNaN()</code> надежнее, чем старый <code>isNaN()</code>.
            <br />• Не забывайте, что <strong>строки неизменяемы</strong> — методы всегда возвращают новую строку.
          </p>
        </section>

        {!isTestPassed && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Тест</h2>
            <p className={styles.text}>Пройдите тест, чтобы открыть доступ к практике.</p>
            <Test10 onComplete={handleTestComplete} setTestAnswers={setTestAnswers} testAnswers={testAnswers} />
          </section>
        )}

        {isTestPassed && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Практика</h2>
            <p className={styles.text}>
              Закрепим теорию практикой. Откройте консоль (F12 → Console) и порешайте задачи. Встроенные подсказки помогут найти нужный раздел теории.
            </p>

            <h3 className={styles.subSectionTitle}>Задание 1: Счётчик кликов</h3>
            <p className={styles.text}>
              Создайте переменную <code>clicks = 0</code>. Увеличьте её на 1 три раза, используя оператор <code>++</code>. Затем выведите: <em>«Кнопку нажали 3 раза»</em> через шаблонную строку.
            </p>
            <p className={styles.text}>
              <span onClick={() => scrollToSection('increment')} className={styles.hintLink} style={{ cursor: 'pointer' }}>
                💡 Подсказка: clicks++ увеличивает переменную на 1. Шаблонная строка: `текст \${`clicks`} текст`
              </span>
            </p>
            <pre className={styles.code}>
              {`let clicks = 0;
clicks++;
clicks++;
clicks++;
console.log(\`Кнопку нажали \${clicks} раза\`);`}
            </pre>

            <h3 className={styles.subSectionTitle}>Задание 2: Случайное число</h3>
            <p className={styles.text}>
              Используя <code>Math.random()</code> и <code>Math.floor()</code>, напишите код, который генерирует случайное целое число от 1 до 100. Запустите несколько раз — число должно меняться.
            </p>
            <p className={styles.text}>
              <span onClick={() => scrollToSection('math-methods')} className={styles.hintLink} style={{ cursor: 'pointer' }}>
                💡 Подсказка: Math.random() возвращает число от 0 до 0.999. Умножьте на 100, округлите вниз Math.floor(), добавьте 1
              </span>
            </p>
            <pre className={styles.code}>
              {`let random = Math.floor(Math.random() * 100) + 1;
console.log(\`Случайное число: \${random}\`);`}
            </pre>

            <h3 className={styles.subSectionTitle}>Задание 3: Валидация email (простая)</h3>
            <p className={styles.text}>
              Спросите у пользователя email. Сделайте его строчными буквами, уберите пробелы по краям и проверьте, есть ли там символ <code>@</code>. Выведите результат.
            </p>
            <p className={styles.text}>
              <span onClick={() => scrollToSection('string-methods')} className={styles.hintLink} style={{ cursor: 'pointer' }}>
                💡 Подсказка: используйте цепочку .trim().toLowerCase() и потом .includes("@")
              </span>
            </p>
            <pre className={styles.code}>
              {`let email = prompt("Введите email");
let clean = email.trim().toLowerCase();
if (clean.includes("@")) {
    console.log(\`Email корректен: \${clean}\`);
} else {
    console.log("Ошибка: нет символа @");
}`}
            </pre>

            <h3 className={styles.subSectionTitle}>Задание 4: Последняя буква</h3>
            <p className={styles.text}>
              Получите слово от пользователя и выведите его первую и последнюю букву, используя свойство <code>length</code>.
            </p>
            <p className={styles.text}>
              <span onClick={() => scrollToSection('strings')} className={styles.hintLink} style={{ cursor: 'pointer' }}>
                💡 Подсказка: первый символ — word[0], последний — word[word.length - 1]
              </span>
            </p>
            <pre className={styles.code}>
              {`let word = prompt("Введите слово:");
console.log("Первая буква:", word[0]);
console.log("Последняя буква:", word[word.length - 1]);
console.log("Длина:", word.length, "символов");`}
            </pre>

            <h3 className={styles.subSectionTitle}>Задание 5: Калькулятор скидки</h3>
            <p className={styles.text}>
              Товар стоит 1500 руб. Скидка 15%. Вычислите цену со скидкой, округлите до 2 знаков и выведите красивой фразой через шаблонную строку.
            </p>
            <p className={styles.text}>
              <span onClick={() => scrollToSection('tofixed')} className={styles.hintLink} style={{ cursor: 'pointer' }}>
                💡 Подсказка: скидка = цена * 0.15. Итог = цена - скидка. Для форматирования: итог.toFixed(2)
              </span>
            </p>
            <pre className={styles.code}>
              {`let original = 1500;
let discountPercent = 15;
let discount = original * (discountPercent / 100);
let finalPrice = original - discount;
console.log(\`Цена: \${original} руб.\`);
console.log(\`Скидка \${discountPercent}%: -\${discount} руб.\`);
console.log(\`Итого: \${finalPrice.toFixed(2)} руб.\`);`}
            </pre>

            <h3 className={styles.subSectionTitle}>Задание 6: Текущая дата</h3>
            <p className={styles.text}>
              Создайте переменную <code>now = new Date()</code>. Выведите текущий год, месяц (в человеческом виде — не 0-11, а январь-декабрь) и день.
            </p>
            <p className={styles.text}>
              <span onClick={() => scrollToSection('date')} className={styles.hintLink} style={{ cursor: 'pointer' }}>
                💡 Подсказка: getMonth() возвращает 0-11, создайте массив названий месяцев и используйте индекс
              </span>
            </p>
            <pre className={styles.code}>
              {`let now = new Date();
let months = ["Январь","Февраль","Март","Апрель","Май","Июнь",
              "Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
console.log(\`Сегодня: \${now.getDate()} \${months[now.getMonth()]} \${now.getFullYear()}\`);`}
            </pre>

            <h3 className={styles.subSectionTitle}>Задание 7: Проверка на NaN</h3>
            <p className={styles.text}>
              Попробуйте преобразовать строки <code>"42"</code>, <code>"3.14"</code>, <code>"Hello"</code> и <code>""</code> в числа через <code>Number()</code>. Для каждой проверьте <code>isNaN()</code> и выведите результат.
            </p>
            <p className={styles.text}>
              <span onClick={() => scrollToSection('conversion')} className={styles.hintLink} style={{ cursor: 'pointer' }}>
                💡 Подсказка: Number("Hello") вернёт NaN. isNaN(NaN) вернёт true. Number("") вернёт 0 — не NaN!
              </span>
            </p>
            <pre className={styles.code}>
              {`let tests = ["42", "3.14", "Hello", ""];
tests.forEach(val => {
    let num = Number(val);
    console.log(\`"\${val}" -> \${num} (isNaN: \${isNaN(num)})\`);
});`}
            </pre>

            <h3 className={styles.subSectionTitle}>Задание 9: Форматирование валюты</h3>
            <p className={styles.text}>
              Напишите функцию <code>formatPrice(amount)</code>, которая принимает число и возвращает строку вида «1 200.00 руб.». Используйте <code>toFixed(2)</code>.
            </p>
            <pre className={styles.code}>
              {`function formatPrice(amount) {
    return amount.toFixed(2) + " руб.";
}
console.log(formatPrice(1200)); // "1200.00 руб."`}
            </pre>

            <h3 className={styles.subSectionTitle}>Задание 10: Секретный код</h3>
            <p className={styles.text}>
              Дана строка <code>"SECRET_CODE_12345"</code>. Вырежьте из неё только числовую часть <code>"12345"</code> с помощью <code>slice()</code> и преобразуйте её в число.
            </p>
            <pre className={styles.code}>
              {`const secret = "SECRET_CODE_12345";
const codeStr = secret.slice(12);
const codeNum = Number(codeStr);
console.log(codeNum); // 12345`}
            </pre>

            <h3 className={styles.subSectionTitle}>Задание 11: Безопасный URL</h3>
            <p className={styles.text}>
              Дана строка <code>"  http://Example.Com/My Page  "</code>. Трансформируйте её: уберите пробелы по краям, переведите в строчный регистр и замените пробел на дефис <code>-</code>.
            </p>
            <pre className={styles.code}>
              {`const rawUrl = "  http://Example.Com/My Page  ";
const safeUrl = rawUrl.trim().toLowerCase().replaceAll(" ", "-");
console.log(safeUrl); // "http://example.com/my-page"`}
            </pre>

            <h3 className={styles.subSectionTitle}>Задание 12: Дни до Нового года</h3>
            <p className={styles.text}>
              Вычислите, сколько полных дней осталось до 1 января 2026 года.
            </p>
            <pre className={styles.code}>
              {`const today = new Date();
const nextYear = new Date(2026, 0, 1);
const msDiff = nextYear - today;
const daysDiff = Math.floor(msDiff / (1000 * 60 * 60 * 24));
console.log(\`До 2026 года осталось \${daysDiff} дней\`);`}
            </pre>

            <h3 className={styles.subSectionTitle}>Задание 13: NaN-защита</h3>
            <p className={styles.text}>
              Напишите функцию <code>safeMultiply(a, b)</code>, которая перемножает два значения. Если хотя бы одно не является числом, возвращает «Ошибка: введите числа».
            </p>
            <pre className={styles.code}>
              {`function safeMultiply(a, b) {
    let n1 = Number(a);
    let n2 = Number(b);
    if (Number.isNaN(n1) || Number.isNaN(n2)) {
        return "Ошибка: введите числа";
    }
    return n1 * n2;
}
console.log(safeMultiply(5, "10")); // 50
console.log(safeMultiply(5, "abc")); // "Ошибка: введите числа"`}
            </pre>

            <h3 className={styles.subSectionTitle}>Задание 14: Генератор ID</h3>
            <p className={styles.text}>
              Создайте функцию <code>generateId()</code>, которая возвращает строку вида <code>"user_XXXX"</code>, где XXXX — случайное число от 1000 до 9999.
            </p>
            <pre className={styles.code}>
              {`function generateId() {
    let num = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    return \`user_\${num}\`;
}
console.log(generateId());`}
            </pre>

            <h3 className={styles.subSectionTitle}>Задание 15: Frosted Muse — Финальный отчёт</h3>
            <p className={styles.text}>
              Соберите строку заказа: «Вы заказали: [Торт], Цена: [1200] руб., Кол-во: [2]. Итого: [2400] руб.». Используйте только шаблонные строки.
            </p>
            <pre className={styles.code}>
              {`const product = "Торт";
const price = 1200;
const amount = 2;
const report = \`Вы заказали: \${product}, Цена: \${price} руб., Кол-во: \${amount}. Итого: \${price * amount} руб.\`;
console.log(report);`}
            </pre>
          </section>
        )}

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Итогом работы стало</h2>
          <p className={styles.text}>
            Вы научились манипулировать данными: считать, округлять, резать строки, форматировать текст и работать со временем. Теперь ваши программы могут не только <strong>хранить</strong> данные, но и <strong>обрабатывать</strong> их — это суть любой полезной программы.
          </p>
          <p className={styles.text}>
            Вы освоили: арифметику, инкремент/декремент, объект <code>Math</code>, методы строк, шаблонные литералы, преобразование типов, работу с датами и оператор <code>typeof</code>. Это фундамент, на котором строится всё остальное.
          </p>

          <div className={styles.endImg}>
            <img src='./images/General/general.webp' alt='general-logo'></img>
          </div>
        </section>
      </div>

      <div className={styles.navigation}>
        <NavLink to="/topic11" className={styles.nextButton}>
          К следующей теме
        </NavLink>
        <BackProgress onReset={handleResetProgress} testPassed={isTestPassed} />
      </div>
    </div>
  );
};

export default Topic10;