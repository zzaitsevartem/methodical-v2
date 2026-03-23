import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../Themes.module.scss';
import { motion } from 'framer-motion';
import BackButton from '../../components/BackButton/BackButton';
import BackProgress from '../../components/BackProgress/BackProgress';
import Test9 from './components/Test9';
import { useTopicProgress } from '../../../hooks/useTopicProgress';

interface Topic9Props {
  testPassed: boolean;
  setTestPassed: (value: boolean) => void;
}

const Topic9: React.FC<Topic9Props> = ({ testPassed: propTestPassed, setTestPassed: propSetTestPassed }) => {
  const { testPassed: cachedTestPassed, setTestPassed: setCachedTestPassed, testAnswers, setTestAnswers, resetProgress } = useTopicProgress('9');

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
        <h1 className={styles.title}>Тема 9: Основы JavaScript — Переменные и типы данных</h1>
        <p className={styles.subtitle}>Первые шаги в программировании: переменные, типы, ввод и вывод</p>
      </motion.div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Теория</h2>

          <h3 className={styles.subSectionTitle}>1. Что такое JavaScript и зачем он нужен</h3>
          <p className={styles.text}>
            <strong>JavaScript</strong> — это язык программирования, который делает веб-страницы <strong>живыми и интерактивными</strong>. Если <strong>HTML</strong> — это скелет страницы, а <strong>CSS</strong> — её внешний вид (одежда), то <strong>JavaScript</strong> — это мозг и нервная система, которые позволяют странице "думать" и реагировать на действия пользователя.
          </p>
          <p className={styles.text}>
            Представьте себе обычный светофор. <strong>HTML</strong> описывает, что у светофора есть три лампочки (красная, желтая, зеленая). <strong>CSS</strong> определяет их цвета, размеры и положение. А <strong>JavaScript</strong> — это программа внутри, которая переключает эти лампочки в нужной последовательности: "зажги красный на 30 секунд, потом желтый, потом зелёный". Без JavaScript светофор был бы просто красивой, но бесполезной картинкой.
          </p>

          <div className={styles.screenshotPlaceholder}>
            <img src="./images/Topic9/screen-1.webp" alt="screen-1" className={styles.screenshotImage} />
            <p className={styles.screenshotText}>Рис.1 — Основные концепции JavaScript: HTML (структура), CSS (стиль), JS (поведение)</p>
          </div>

          <p className={styles.text}>
            JavaScript был создан в <strong>1995 году</strong> программистом <strong>Бренданом Айком</strong> всего за <strong>10 дней</strong>. Изначально он назывался Mocha, потом LiveScript, и только потом получил имя JavaScript. Несмотря на название, JavaScript <strong>не имеет почти ничего общего с языком Java</strong> — это был просто маркетинговый ход того времени, чтобы привлечь внимание к новому языку за счёт популярности Java.
          </p>
          <p className={styles.text}>
            Сегодня <strong>JavaScript (JS)</strong> — это один из самых популярных языков программирования в мире. На нём пишут не только сайты, но и мобильные приложения, серверные программы (Node.js), игры и даже управляют роботами (IoT). Изучив JavaScript, вы откроете для себя огромный мир возможностей в IT.
          </p>
          <p className={styles.text}>
            В этой теме мы начнём с самых основ: научимся создавать <strong>переменные</strong>, хранить в них данные, выводить информацию на экран и получать данные от пользователя. Это фундамент, на котором строится всё остальное программирование.
          </p>

          <h3 className={styles.subSectionTitle} id="variables">2. Переменные: let и const</h3>
          <p className={styles.text}>
            <strong>Переменная</strong> — это именованный контейнер для хранения данных. Представьте себе коробку с наклейкой. На наклейке написано имя (например, "age"), а внутри коробки лежит значение (например, число 25). В любой момент вы можете заглянуть в эту коробку и узнать, что там лежит, или выкинуть старое содержимое и положить туда что-то новое.
          </p>

          <div className={styles.screenshotPlaceholder}>
            <img src="./images/Topic9/screen-2.webp" alt="screen-2" className={styles.screenshotImage} />
            <p className={styles.screenshotText}>Рис.2 — Переменные как коробки с данными</p>
          </div>

          <p className={styles.text}>
            В современном JavaScript есть два основных способа создания (объявления) переменных: <code>let</code> и <code>const</code>. Старый способ <code>var</code> использовать <strong>не рекомендуется</strong>, так как он имеет неочевидное поведение (hoisting, функциональная область видимости).
          </p>
          <p className={styles.text}>
            <strong>let</strong> — создаёт переменную, значение которой <strong>можно изменить</strong> в будущем. Это как обычная коробка, в которую можно класть разные вещи.
          </p>
          <pre className={styles.code}>
            {`let userName = "Анна";
console.log(userName); // Выведет: Анна

userName = "Мария"; // Меняем значение (переприсваиваем)
console.log(userName); // Выведет: Мария`}
          </pre>
          <p className={styles.text}>
            <strong>const</strong> — создаёт константу, значение которой <strong>нельзя изменить</strong> после создания. Это как сейф с кодовым замком: что положили один раз, то там и останется навсегда. Если вы попытаетесь изменить <code>const</code>, браузер выдаст ошибку.
          </p>
          <pre className={styles.code}>
            {`const birthYear = 1995;
console.log(birthYear); // Выведет: 1995

birthYear = 2000; // ОШИБКА! Uncaught TypeError: Assignment to constant variable`}
          </pre>
          <p className={styles.text}>
            <strong>Правило хорошего тона</strong>: используйте <code>const</code> по умолчанию. И только если вы <strong>точно знаете</strong>, что значение переменной будет меняться в ходе программы (например, счётчик очков в игре), используйте <code>let</code>. Это делает код более предсказуемым и безопасным — вы (и другие программисты) сразу видите, какие данные статичны, а какие динамичны.
          </p>

          <h3 className={styles.subSectionTitle}>3. Именование переменных</h3>
          <p className={styles.text}>
            Имена переменных должны быть <strong>понятными</strong> и описывать, что в них хранится. Компьютеру всё равно, назовёте вы переменную <code>x</code> или <code>userAge</code>, но вам через месяц будет не всё равно.
          </p>
          <ul>
            <li><strong>Хорошие имена</strong>: <code>userName</code>, <code>totalPrice</code>, <code>isLoggedIn</code>, <code>itemsCount</code>.</li>
            <li><strong>Плохие имена</strong>: <code>x</code>, <code>data</code>, <code>temp</code>, <code>val</code>, <code>info</code>.</li>
          </ul>
          <p className={styles.text}>
            В JavaScript принято использовать стиль <strong>camelCase</strong> ("верблюжий регистр"): первое слово пишется с маленькой буквы, а каждое следующее — с большой, без пробелов.
          </p>
          <pre className={styles.code}>
            {`let myFirstVariable;
let currentUserAge;
let isPaymentSuccessful;`}
          </pre>
          <p className={styles.text}>
            Имена переменных могут содержать буквы, цифры, знаки подчёркивания <code>_</code> и доллара <code>$</code>, но <strong>не могут начинаться с цифры</strong>.
          </p>

          <h3 className={styles.subSectionTitle} id="types">4. Типы данных: String, Number, Boolean</h3>
          <p className={styles.text}>
            В JavaScript существует несколько типов данных. Тип данных определяет, <strong>какого рода информацию</strong> можно хранить в переменной и какие операции с ней можно выполнять. Javascript — это язык с <strong>динамической типизацией</strong> (dynamic typing), то есть одна и та же переменная может сначала хранить число, а потом строку (хотя делать так специально не стоит).
          </p>

          <div className={styles.screenshotPlaceholder}>
            <img src="./images/Topic9/screen-3.webp" alt="screen-3" className={styles.screenshotImage} />
            <p className={styles.screenshotText}>Рис.3 — Основные примитивные типы данных</p>
          </div>

          <p className={styles.text}>
            <strong>1. String (Строка)</strong> — это текст. Строки всегда заключаются в кавычки: одинарные <code>'...'</code>, двойные <code>"..."</code> или обратные <code>`...`</code>.
          </p>
          <pre className={styles.code}>
            {`let firstName = "Иван"; // Двойные кавычки
let city = 'Москва';    // Одинарные кавычки
let message = \`Привет\`; // Обратные кавычки (backticks)`}
          </pre>

          <p className={styles.text}>
            <strong>2. Number (Число)</strong> — это числовые данные. В JavaScript нет разделения на целые (integer) и дробные (float) числа — все они имеют тип <code>Number</code>. Числа пишутся <strong>без кавычек</strong>.
          </p>
          <pre className={styles.code}>
            {`let age = 25;
let price = 99.99;
let temperature = -5;`}
          </pre>

          <p className={styles.text}>
            <strong>3. Boolean (Логический тип)</strong> — это тип данных, который может принимать только два значения: <code>true</code> (истина, да) или <code>false</code> (ложь, нет). Булевы значения используются для проверок и условий.
          </p>
          <pre className={styles.code}>
            {`let isStudent = true;
let hasLicense = false;
let isOnline = true;`}
          </pre>
          <p className={styles.text}>
            Важно понимать разницу между числом и строкой. Число <code>25</code> и строка <code>"25"</code> — это <strong>абсолютно разные вещи</strong>. С числом можно выполнять математику (сложение, вычитание), а строка — это просто символы.
          </p>
          <pre className={styles.code}>
            {`console.log(25 + 5);      // 30 (Математика)
console.log("25" + "5");  // "255" (Склеивание строк)`}
          </pre>

          <h3 className={styles.subSectionTitle} id="null-undefined">5. Специальные значения: null и undefined</h3>
          <p className={styles.text}>
            Кроме чисел и строк, в JavaScript есть два специальных типа для обозначения "пустоты". Они похожи, но имеют разный смысл.
          </p>

          <div className={styles.screenshotPlaceholder}>
            <img src="./images/Topic9/screen-4.webp" alt="screen-4" className={styles.screenshotImage} />
            <p className={styles.screenshotText}>Рис.4 — Разница между null (пустая коробка) и undefined (нет коробки)</p>
          </div>

          <p className={styles.text}>
            <strong>undefined</strong> — означает "значение не присвоено". Это значение по умолчанию для переменных, которые вы объявили, но ничего в них не положили. Это как пустая коробка, о содержимом которой мы <strong>ещё не знаем</strong>.
          </p>
          <pre className={styles.code}>
            {`let myVariable;
console.log(myVariable); // Выведет: undefined`}
          </pre>

          <p className={styles.text}>
            <strong>null</strong> — означает "значение намеренно отсутствует". Программист сам присваивает это значение, чтобы показать: "здесь ничего нет". Это как коробка с табличкой "Пусто".
          </p>
          <pre className={styles.code}>
            {`let selectedUser = null; // Пользователь пока не выбран
console.log(selectedUser); // Выведет: null`}
          </pre>

          <h3 className={styles.subSectionTitle} id="console">6. Вывод данных: console.log</h3>
          <p className={styles.text}>
            <strong>Консоль</strong> — это лучший друг разработчика. Это специальное окно в браузере, где вы можете видеть сообщения от вашей программы, ошибки и результаты вычислений. Обычные пользователи туда не смотрят, это инструмент для нас.
          </p>

          <div className={styles.screenshotPlaceholder}>
            <img src="./images/Topic9/screen-5.webp" alt="screen-5" className={styles.screenshotImage} />
            <p className={styles.screenshotText}>Рис.5 — Chrome DevTools: вкладка Console</p>
          </div>

          <p className={styles.text}>
            Команда <code>console.log()</code> выводит информацию в консоль. Внутри скобок мы пишем то, что хотим вывести (переменную, число, строку).
          </p>
          <pre className={styles.code}>
            {`console.log("Привет, мир!");
let age = 30;
console.log("Возраст пользователя:", age);`}
          </pre>
          <p className={styles.text}>
            Чтобы открыть консоль в браузере Chrome: нажмите <code>F12</code> или правой кнопкой мыши на странице - "Посмотреть код" (Inspect) - вкладка "Console".
          </p>

          <h3 className={styles.subSectionTitle} id="input">7. Ввод данных: prompt и alert</h3>
          <p className={styles.text}>
            Сайты часто взаимодействуют с пользователем. Самые простые (и старые) способы — это встроенные браузерные функции.
          </p>

          <div className={styles.screenshotPlaceholder}>
            <img src="./images/Topic9/screen-6.webp" alt="screen-6" className={styles.screenshotImage} />
            <p className={styles.screenshotText}>Рис.6 — Всплывающее окно prompt</p>
          </div>

          <p className={styles.text}>
            <strong>alert()</strong> — показывает всплывающее окно с сообщением и кнопкой "ОК". Скрипт останавливается, пока пользователь не нажмёт кнопку.
          </p>
          <pre className={styles.code}>
            {`alert("Добро пожаловать на наш сайт!");`}
          </pre>

          <p className={styles.text}>
            <strong>prompt()</strong> — показывает окно с полем для ввода текста и кнопками "ОК/Отмена". Функция <strong>возвращает</strong> то, что ввёл пользователь, в виде строки.
          </p>
          <pre className={styles.code}>
            {`let name = prompt("Как вас зовут?");
console.log(name); // Выведет то, что ввёл пользователь`}
          </pre>
          <p className={styles.text}>
            Важно: <code>prompt</code> всегда возвращает строку! Даже если ввести "100", это будет строка <code>"100"</code>.
          </p>

          <h3 className={styles.subSectionTitle} id="typeof">8. Оператор typeof</h3>
          <p className={styles.text}>
            Иногда нам нужно узнать, какой тип данных хранится в переменной прямо сейчас. Для этого есть оператор <code>typeof</code>.
          </p>
          <pre className={styles.code}>
            {`console.log(typeof "Привет");    // "string"
console.log(typeof 42);          // "number"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof null);        // "object" (это официальный баг JS)`}
          </pre>
          <p className={styles.text}>
            Это полезно для отладки, когда программа ведёт себя странно (например, складывает числа как строки), и вы хотите проверить типы переменных.
          </p>

          <div className={styles.screenshotPlaceholder}>
            <img src="./images/Topic9/screen-8.webp" alt="screen-8" className={styles.screenshotImage} />
            <p className={styles.screenshotText}>Рис.7 — Проверка типов с typeof</p>
          </div>

          <h3 className={styles.subSectionTitle} id="concatenation">9. Объединение строк (Конкатенация)</h3>
          <p className={styles.text}>
            Часто нужно собрать одну строку из нескольких кусочков. Это называется <strong>конкатенация</strong>. В JS для этого используется знак плюса <code>+</code>.
          </p>
          <pre className={styles.code}>
            {`let firstName = "Иван";
let greeting = "Привет, " + firstName + "!";
console.log(greeting); // "Привет, Иван!"`}
          </pre>
          <p className={styles.text}>
            Более современный и удобный способ — <strong>шаблонные строки (Template Literals)</strong>. Они используют обратные кавычки <code>` `</code> и конструкцию <code>${`{переменная}`}</code>.
          </p>
          <pre className={styles.code}>
            {`let name = "Анна";
let age = 25;
// Склеивание плюсами (неудобно)
console.log("Меня зовут " + name + ", мне " + age + " лет.");

// Шаблонная строка (удобно!)
console.log(\`Меня зовут \${name}, мне \${age} лет.\`);`}
          </pre>

          <div className={styles.screenshotPlaceholder}>
            <img src="./images/Topic9/screen-9.webp" alt="screen-9" className={styles.screenshotImage} />
            <p className={styles.screenshotText}>Рис.8 — Шаблонные строки vs Конкатенация</p>
          </div>

          <h3 className={styles.subSectionTitle}>10. Комментарии в коде</h3>
          <p className={styles.text}>
            Код пишется не только для машин, но и для людей. Комментарии — это заметки в коде, которые компьютер игнорирует.
          </p>
          <pre className={styles.code}>
            {`// Это однострочный комментарий
let x = 10; 

/*
  Это многострочный комментарий.
  Здесь можно написать целую поэму
  или объяснить сложную логику.
*/`}
          </pre>
          <div className={styles.screenshotPlaceholder}>
            <img src="./images/Topic9/screen-10.webp" alt="screen-10" className={styles.screenshotImage} />
            <p className={styles.screenshotText}>Рис.9 — Хорошо задокументированный код</p>
          </div>
        </section>

        {!isTestPassed && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Тест</h2>
            <p className={styles.text}>Пройдите тест, чтобы открыть доступ к практике.</p>
            <Test9 onComplete={handleTestComplete} setTestAnswers={setTestAnswers} testAnswers={testAnswers} />
          </section>
        )}

        {isTestPassed && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Практика: Первые шаги в программировании</h2>
            <p className={styles.text}>
              Теперь применим полученные знания на практике. Откройте консоль браузера (F12) и выполняйте задания прямо там.
            </p>

            <h3 className={styles.subSectionTitle}>Задание 1: Анкета</h3>
            <p className={styles.text}>
              Создайте переменные для вашего имени и города. Выведите в консоль фразу: <strong>«Я [Имя] из [Город]»</strong>, используя шаблонные строки.
            </p>
            <p className={styles.text}>
              <span onClick={() => scrollToSection('concatenation')} className={styles.hintLink} style={{ cursor: 'pointer' }}>
                💡 Подсказка: для вставки переменной в строку используйте ${'{переменная}'} внутри обратных кавычек
              </span>
            </p>
            <pre className={styles.code}>
              {`let myName = "Артем";
let myCity = "Москва";
console.log(\`Я \${myName} из \${myCity}\`);`}
            </pre>

            <h3 className={styles.subSectionTitle}>Задание 2: Калькулятор возраста</h3>
            <p className={styles.text}>
              Создайте константу <code>currentYear</code> с текущим годом и константу <code>birthYear</code> с годом вашего рождения. Вычислите возраст и выведите его с помощью <code>console.log</code>.
            </p>
            <p className={styles.text}>
              <span onClick={() => scrollToSection('variables')} className={styles.hintLink} style={{ cursor: 'pointer' }}>
                💡 Подсказка: для значений, которые не меняются, используйте const. Год рождения — хороший кандидат.
              </span>
            </p>
            <pre className={styles.code}>
              {`const currentYear = 2024;
const birthYear = 1995;
let myAge = currentYear - birthYear;
console.log(myAge);`}
            </pre>

            <h3 className={styles.subSectionTitle}>Задание 3: Интерактивное приветствие</h3>
            <p className={styles.text}>
              Используйте <code>prompt</code>, чтобы спросить имя пользователя, а затем <code>alert</code>, чтобы поприветствовать его по имени.
            </p>
            <p className={styles.text}>
              <span onClick={() => scrollToSection('prompt')} className={styles.hintLink} style={{ cursor: 'pointer' }}>
                💡 Подсказка: prompt() возвращает то, что ввёл пользователь — сохраните это в переменную
              </span>
            </p>
            <pre className={styles.code}>
              {`let user = prompt("Как тебя зовут?");
alert(\`Привет, \${user}!\`);`}
            </pre>

            <h3 className={styles.subSectionTitle}>Задание 4: Проверка типов</h3>
            <p className={styles.text}>
              Создайте переменную со строкой «123». Проверьте её тип с помощью <code>typeof</code>. Затем преобразуйте в число с помощью <code>Number()</code> и проверьте тип снова.
            </p>
            <p className={styles.text}>
              <span onClick={() => scrollToSection('types')} className={styles.hintLink} style={{ cursor: 'pointer' }}>
                💡 Подсказка: typeof всегда возвращает строку — "string", "number", "boolean"...
              </span>
            </p>
            <pre className={styles.code}>
              {`let str = "123";
console.log(typeof str); // "string"

let num = Number(str);
console.log(typeof num); // "number"`}
            </pre>

            <h3 className={styles.subSectionTitle}>Задание 5: Undefined vs Null</h3>
            <p className={styles.text}>
              Объявите переменную, но не присваивайте ей значение. Выведите её через <code>console.log</code>. Затем присвойте <code>null</code> и выведите снова. Почувствуйте разницу между «не определено» и «специально пусто».
            </p>
            <p className={styles.text}>
              <span onClick={() => scrollToSection('null')} className={styles.hintLink} style={{ cursor: 'pointer' }}>
                💡 Подсказка: undefined — переменная объявлена, но не заполнена. null — вы сами сказали «здесь пусто».
              </span>
            </p>
          </section>
        )}

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Итогом работы стало</h2>
          <p className={styles.text}>
            Вы освоили <strong>фундаментальные концепции программирования</strong>: научились создавать переменные (понимая разницу между let и const), работать с основными типами данных (строки, числа, булевы значения), выводить информацию в консоль и взаимодействовать с пользователем через prompt/alert. Это <strong>алфавит</strong> программирования, из которого мы будем собирать сложные программы.
          </p>
          <p className={styles.text}>
            В следующей теме мы углубимся в структуры данных — <strong>массивы и объекты</strong>, которые позволят нам хранить списки товаров, данные пользователей и многое другое. Продолжайте практиковаться — пишите код каждый день!
          </p>
          <div className={styles.endImg}>
            <img src='./images/General/general.webp' alt='general-logo'></img>
          </div>
        </section>
      </div>

      <div className={styles.navigation}>
        <NavLink to="/topic10" className={styles.nextButton}>
          К следующей теме
        </NavLink>
        <BackProgress onReset={handleResetProgress} testPassed={isTestPassed} />
      </div>
    </div>
  );
};

export default Topic9;