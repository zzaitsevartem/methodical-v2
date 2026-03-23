import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../Themes.module.scss';
import { motion } from 'framer-motion';
import BackButton from '../../components/BackButton/BackButton';
import BackProgress from '../../components/BackProgress/BackProgress';
import Test5 from './components/Test5';
import { useTopicProgress } from '../../../hooks/useTopicProgress';

interface Topic5Props {
  testPassed: boolean;
  setTestPassed: (value: boolean) => void;
}

const Topic5: React.FC<Topic5Props> = ({ testPassed: propTestPassed, setTestPassed: propSetTestPassed }) => {
  const { testPassed: cachedTestPassed, setTestPassed: setCachedTestPassed, testAnswers, setTestAnswers, resetProgress } = useTopicProgress('5');

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
        <h1 className={styles.title}>Тема 5: Секция "Assortment" с сеткой товаров</h1>
        <p className={styles.subtitle}>CSS Grid, адаптивные изображения, сетка из 4 товаров</p>
      </motion.div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Теория</h2>
          
          <h3 className={styles.subSectionTitle}>1. История CSS Grid: от таблиц до современных сеток</h3>
          <p className={styles.text}>
            В ранние годы веба (1995-2005) для создания макетов использовали HTML-таблицы (<code>&lt;table&gt;</code>). 
            Это работало, но нарушало семантику: таблицы предназначены для данных, а не для макетов.
          </p>
          <p className={styles.text}>
            С появлением CSS2 (1998) пришёл <code>float</code> — элементы "плавали" друг вокруг друга. 
            Хакерские приёмы типа <code>clearfix</code> стали нормой, но код был хрупким и не интуитивным.
          </p>
          <p className={styles.text}>
            <strong>CSS Flexbox (2009)</strong> решил проблему одномерного выравнивания, но для сложных двумерных 
            сеток всё ещё не хватало полноценного решения.
          </p>
          <div className={styles.screenshotPlaceholder}>
            <img src="./images/Topic5/screen-1.webp" alt="screen-1" className={styles.screenshotImage} />
            <p className={styles.screenshotText}>Рис.1 — Эволюция сеток в веб-дизайне</p>
          </div>

          <h3 className={styles.subSectionTitle}>2. CSS Grid Layout: революция 2017 года</h3>
          <p className={styles.text}>
            CSS Grid Layout официально стал стандартом W3C в марте 2017 года. Это первая нативная двумерная 
            система компоновки, разработанная специально для веба.
          </p>
          <p className={styles.text}>
            <strong>Ключевое отличие от Flexbox:</strong> Flexbox работает в одном измерении (строка ИЛИ колонка), 
            а Grid — в двух (строка И колонка одновременно). Grid позволяет точно позиционировать элементы 
            в ячейках, создавать сложные макеты без хаков.
          </p>
          <p className={styles.text}>
            <strong>Поддержка браузеров:</strong> Сегодня CSS Grid поддерживают 98% браузеров. Исключение — 
            некоторые версии IE, где нужны префиксы (-ms-grid).
          </p>
          <pre className={styles.code}>
{`/* Пример базовой сетки Grid */
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* 3 равные колонки */
  grid-template-rows: auto;           /* Автовысота строк */
  gap: 20px;                          /* Расстояние между ячейками */
}`}
          </pre>
          <div className={styles.screenshotPlaceholder}>
            <img src="./images/Topic5/screen-2.webp" alt="screen-2" className={styles.screenshotImage} />
            <p className={styles.screenshotText}>Рис.2 — Двумерная система Grid: строки и колонки</p>
          </div>

          <h3 className={styles.subSectionTitle}>3. Основные свойства CSS Grid для секции товаров</h3>
          <p className={styles.text}>
            Для создания сетки из 4 товаров как на Frosted Muse используем следующие свойства:
          </p>
          <p className={styles.text}>
            <strong><code>display: grid</code></strong> — включает режим сетки. Контейнер становится Grid-контейнером, 
            а его прямые дети — Grid-элементами.
          </p>
          <p className={styles.text}>
            <strong><code>grid-template-columns</code></strong> — определяет количество и размер колонок. 
            Значение <code>repeat(4, 1fr)</code> означает "4 колонки, каждая занимает равную долю свободного пространства (1 fraction)".
          </p>
          <p className={styles.text}>
            <strong><code>gap</code></strong> (ранее <code>grid-gap</code>) — задаёт расстояние между строками и колонками. 
            В Frosted Muse это <code>20px</code>, что создаёт достаточно воздуха между карточками.
          </p>
          <div className={styles.screenshotPlaceholder}>
            <img src="./images/Topic5/screen-3.webp" alt="screen-3" className={styles.screenshotImage} />
            <p className={styles.screenshotText}>Рис.3 — Сетка 4x1 на сайте Frosted Muse</p>
          </div>

          <h3 className={styles.subSectionTitle}>4. Единица fr (fraction) vs проценты</h3>
          <p className={styles.text}>
            Почему <code>1fr</code>, а не <code>25%</code>? Разница критическая:
          </p>
          <p className={styles.text}>
            <strong>Проценты:</strong> <code>grid-template-columns: 25% 25% 25% 25%</code> — теоретически работает, 
            но не учитывает <code>gap</code>. Если <code>gap: 20px</code>, то 25% + 25% + 25% + 25% + 3*20px = 100% + 60px, 
            что вызовет переполнение.
          </p>
          <p className={styles.text}>
            <strong>Единица fr:</strong> <code>grid-template-columns: repeat(4, 1fr)</code> — автоматически вычитает <code>gap</code> 
            из доступного пространства, затем делит остаток на 4 равные части. Это математически точное решение.
          </p>
          <pre className={styles.code}>
{`/* ❌ Проблема с процентами */
.grid-bad {
  grid-template-columns: 25% 25% 25% 25%;
  gap: 20px; /* Будет переполнение! */
}

/* ✅ Правильно с fr */
.grid-good {
  grid-template-columns: repeat(4, 1fr);
  gap: 20px; /* Пространство корректно распределено */
}`}
          </pre>

          <h3 className={styles.subSectionTitle}>5. Адаптивность Grid: медиазапросы как диалог с устройством</h3>
              <p className={styles.text}>
                <strong>Медиазапросы (Media Queries)</strong> — это не просто технические условия в CSS, а <strong>сложная система коммуникации</strong> между вашим сайтом и тысячами различных устройств. Представьте, что сайт Frosted Muse — это гостеприимный хозяин, который <strong>меняет сервировку стола</strong> в зависимости от гостя: для торжественного ужина (десктоп) — полный набор приборов, для ланча (планшет) — упрощённый вариант, для кофе с собой (мобильный) — только самое необходимое.
              </p>
              <p className={styles.text}>
                <strong>Историческая справка:</strong> Концепция медиазапросов родилась в 1994 году с CSS1, но настоящую революцию совершил <strong>Итан Маркотт в 2010 году</strong>, предложив термин "Responsive Web Design". До этого создавали отдельные мобильные версии сайтов (m.site.com) — дорого, неэффективно, плохо для SEO. Сегодня <strong>Google наказывает</strong> сайты без мобильной адаптивности, снижая их в поисковой выдаче.
              </p>
              <p className={styles.text}>
                <strong>Философия mobile-first:</strong> Современные разработчики начинают проектирование <strong>с мобильной версии</strong>, а затем добавляют стили для более широких экранов. Это не просто техника — это <strong>мировоззрение</strong>, признающее, что в 2024 году <strong>58,3% трафика</strong> приходится на мобильные устройства (данные StatCounter).
              </p>
              <pre className={styles.code}>
 {`/* Mobile-first подход: начинаем с мобильных */
 .assortment-grid {
   display: grid;
   grid-template-columns: 1fr; /* Одна колонка для мобильных */
   gap: 15px;
 /* Планшеты (≥768px) */
 @media (min-width: 768px) {
   .assortment-grid {
     grid-template-columns: repeat(2, 1fr); /* 2 колонки */
     gap: 20px;
   }
 /* Десктоп (≥1024px) */
 @media (min-width: 1024px) {
   .assortment-grid {
     grid-template-columns: repeat(4, 1fr); /* 4 колонки */
     gap: 25px;
   }
 /* Почему min-width, а не max-width?
   Mobile-first: "при ширине ОТ 768px И БОЛЬШЕ" 
   Проще масштабировать вверх, чем вниз. */`}
              </pre>
              <p className={styles.text}>
                <strong>Брейкпоинты (breakpoints)</strong> — это "точки перелома", где дизайн меняется. <strong>Не существует стандартных значений</strong> — они зависят от вашего контента. Frosted Muse использует 768px и 1024px, но Apple использует 834px (iPad Pro), а Samsung — 800px. <strong>Золотое правило:</strong> добавляйте брейкпоинт не когда "ширина 768px", а когда "дизайн ломается".
              </p>
              <p className={styles.text}>
                <strong>Современные подходы:</strong> Вместо фиксированных брейкпоинтов появляются <strong>контейнерные запросы</strong> (Container Queries) — стили применяются не к ширине окна, а к размеру родительского контейнера. И <strong>резиновые сетки</strong> с <code>grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))</code>, которые адаптируются без медиазапросов.
              </p>
              <div className={styles.screenshotPlaceholder}>
                <img src="./images/Topic5/screen-4.webp" alt="screen-4" className={styles.screenshotImage} />
                <p className={styles.screenshotText}>Рис.4 — Медиазапросы как система коммуникации с устройствами: смартфон, планшет, ноутбук, десктоп</p>
              </div>

          <h3 className={styles.subSectionTitle}>6. Управление изображениями в Grid: object-fit</h3>
          <p className={styles.text}>
            В карточках товаров Frosted Muse изображения имеют фиксированную высоту <code>450px</code> на десктопе. 
            Но все изображения разного пропорционального соотношения (одни квадратные, другие прямоугольные).
          </p>
          <p className={styles.text}>
            <strong>Проблема:</strong> если просто задать <code>width: 100%; height: 450px</code>, изображения будут 
            растягиваться/сжиматься, искажая пропорции.
          </p>
          <p className={styles.text}>
            <strong>Решение:</strong> свойство <code>object-fit</code> (появилось в CSS3).
          </p>
          <p className={styles.text}>
            <strong><code>object-fit: contain</code></strong> — изображение сохраняет свои пропорции, полностью помещается 
            в контейнер, могут появиться пустые области (как в Frosted Muse).
          </p>
          <p className={styles.text}>
            <strong><code>object-fit: cover</code></strong> — изображение заполняет контейнер полностью, сохраняя пропорции, 
            но может обрезаться по краям.
          </p>
          <p className={styles.text}>
            <strong><code>object-fit: fill</code></strong> — изображение растягивается, чтобы заполнить контейнер (искажает пропорции).
          </p>
          <div className={styles.screenshotPlaceholder}>
            <video 
              className={styles.screenshotImage}
              style={{
                width: '600px',
                height: '450px',
                }}
              autoPlay 
              muted 
              loop 
              playsInline
              preload="metadata"
            >
              <source src="./images/Topic5/video-1.mp4" type="video/mp4" />
              Ваш браузер не поддерживает видео.
            </video>
            <p className={styles.screenshotText}>Рис.5 — Разница между object-fit: contain, cover и fill</p>
          </div>

          <h3 className={styles.subSectionTitle}>7. Психология восприятия сетки товаров</h3>
          <p className={styles.text}>
            <strong>Закон Хика:</strong> время принятия решения увеличивается с ростом количества вариантов. 
            4 товара — оптимальное количество для быстрого сканирования (согласно исследованию NNGroup).
          </p>
          <p className={styles.text}>
            <strong>Правило нечётного числа:</strong> чётное количество элементов (2, 4) воспринимается как статичное, 
            формальное, сбалансированное. Нечётное (3, 5) — динамичное, интересное, но менее стабильное. 
            Frosted Muse выбирает 4 — это говорит о балансе и профессионализме.
          </p>
          <p className={styles.text}>
            <strong>F-образный паттерн чтения:</strong> пользователи сканируют контент по F-образной траектории. 
            Размещая самые важные товары в верхнем ряду и левой части, мы попадаем в зону внимания.
          </p>
          <div className={styles.screenshotPlaceholder}>
            <video 
              className={styles.screenshotImage}
              style={{
                width: '600px',
                height: '450px',
                }}
              autoPlay 
              muted 
              loop 
              playsInline
              preload="metadata"
            >
              <source src="./images/Topic5/video-2.mp4" type="video/mp4" />
              Ваш браузер не поддерживает видео.
            </video>
            <p className={styles.screenshotText}>Рис.6 — F-образный паттерн чтения веб-страниц</p>
          </div>

          <h3 className={styles.subSectionTitle}>8. Производительность Grid-сеток</h3>
          <p className={styles.text}>
            CSS Grid работает на GPU (графическом процессе), что делает рендеринг быстрым даже на мобильных устройствах.
          </p>
          <p className={styles.text}>
            <strong>Совет по оптимизации:</strong> использовать <code>grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))</code> 
            для полностью адаптивных сеток без медиазапросов.
          </p>
          <p className={styles.text}>
            Однако в Frosted Muse используется явное указание колонок через медиазапросы — это даёт больший контроль 
            над дизайном на каждом брейкпоинте.
          </p>
          <pre className={styles.code}>
{`/* Альтернатива: полностью адаптивная сетка без медиазапросов */
.assortment-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  /* Автоматически создаёт столько колонок, сколько помещается */
}`}
          </pre>
          <p className={styles.text}>
            <strong>В этой теме</strong> мы изучили CSS Grid от истории до практического применения в секции товаров. 
            В следующей теме создадим секцию "About" с текстом и галереей изображений.
          </p>
        </section>

        {!isTestPassed && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Тест</h2>
            <p className={styles.text}>Пройдите тест, чтобы открыть практику.</p>
            <Test5 onComplete={handleTestComplete} setTestAnswers={setTestAnswers} testAnswers={testAnswers} />
          </section>
        )}

        {isTestPassed && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Практика</h2>
            <p className={styles.text}>
              Создайте секцию Assortment с сеткой из 4 товаров.
            </p>

            <h3 className={styles.subSectionTitle}>Шаг 1: HTML структура</h3>
            <p className={styles.text}>
              Добавьте после Hero-секции:
            </p>
            <pre className={styles.code}>
{`<section class="________">
  <h2>________</h2>
  <div class="________">
    <div class="________">
      <img src="________" alt="Cakes">
      <h3>________</h3>
    </div>
    <!-- Добавьте еще 3 карточки -->
  </div>
</section>`}
            </pre>

            <h3 className={styles.subSectionTitle}>Шаг 2: CSS для сетки</h3>
            <pre className={styles.code}>
{`.assortment-grid {
  display: ________;
  grid-template-columns: ________;
  gap: ________;
}

.assortment-item img {
  width: ________;
  height: ________px;
  object-fit: ________;
}`}
            </pre>

            

            <p className={styles.text}>
              Проверьте результат в браузере.
            </p>
          </section>
        )}

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Итогом работы будет</h2>
          <p className={styles.text}>
            Вы создали секцию Assortment с сеткой из 4 товаров, используя CSS Grid.
          </p>
          <div className={styles.endImg}>
            <img src='./images/General/general.webp' alt='general-logo'></img>
          </div>
        </section>
      </div>

      <div className={styles.navigation}>
        <NavLink to="/topic6" className={styles.nextButton}>
          К следующей теме
        </NavLink>
        <BackProgress onReset={handleResetProgress} testPassed={isTestPassed} />
      </div>
    </div>
  );
};

export default Topic5;