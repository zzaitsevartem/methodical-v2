import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../Themes.module.scss';
import { motion } from 'framer-motion';
import BackButton from '../../components/BackButton/BackButton';
import BackProgress from '../../components/BackProgress/BackProgress';
import Test4 from './components/Test4';
import { useTopicProgress } from '../../../hooks/useTopicProgress';

interface Topic4Props {
  testPassed: boolean;
  setTestPassed: (value: boolean) => void;
}

const Topic4: React.FC<Topic4Props> = ({ testPassed: propTestPassed, setTestPassed: propSetTestPassed }) => {
  const { testPassed: cachedTestPassed, setTestPassed: setCachedTestPassed, testAnswers, setTestAnswers, resetProgress } = useTopicProgress('4');

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
        <h1 className={styles.title}>Тема 4: Главный баннер: HERO-секция</h1>
        <p className={styles.subtitle}>Большое фоновое изображение, заголовки, кнопка.</p>
      </motion.div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Теория</h2>
          <p className={styles.text}>
            <strong>Первое впечатление решает всё.</strong> В цифровом мире, где внимание пользователя — самый ценный ресурс, у вас есть всего <strong>3-5 секунд</strong>, чтобы убедить посетителя остаться на сайте. Согласно исследованию Microsoft, средняя продолжительность концентрации внимания у человека сократилась с 12 секунд в 2000 году до 8 секунд в 2023 — это меньше, чем у золотой рыбки (9 секунд). Hero-секция становится главным оружием в борьбе за эти драгоценные секунды.
          </p>
          
          <p className={styles.text}>
            <strong>Исторический экскурс:</strong> Концепция "герой-изображения" (Hero Image) уходит корнями в искусство плакатов начала XX века. Художники-конструктивисты вроде Александра Родченко понимали: чтобы сообщение запомнилось, оно должно быть <strong>большим, смелым и эмоциональным</strong>. В веб-дизайне эта традиция возродилась с приходом эпохи Flat Design и мобильных устройств, где большой, качественный визуал стал показателем качества самого продукта.
          </p>

          <h3 className={styles.subSectionTitle}>1. Нейробиология восприятия: почему мозг любит большие изображения?</h3>
          <p className={styles.text}>
            Человеческий мозг — удивительный орган, который обрабатывает визуальную информацию по особому алгоритму:
          </p>
          
          <ul>
            <li><strong>Зрительная кора</strong> (затылочная доля) обрабатывает изображения за 13 миллисекунд — быстрее, чем вы успеете осознать, что что-то увидели.</li>
            <li><strong>Миндалевидное тело</strong> (центр эмоций) активируется, когда мы видим что-то красивое или аппетитное — именно поэтому фотография торта вызывает почти физическое желание.</li>
            <li><strong>Зеркальные нейроны</strong> заставляют нас "примерять" опыт: видя торт, мы подсознательно представляем его вкус, текстуру, аромат.</li>
          </ul>
          
          <p className={styles.text}>
            <strong>Научный факт:</strong> Исследование NNGroup показало, что пользователи тратят на 10% больше времени на страницах с качественными Hero-изображениями и на 7% чаще выполняют целевое действие (покупку, регистрацию, клик).
          </p>

          <h3 className={styles.subSectionTitle}>2. Композиция Hero-секции: законы золотого сечения в вебе</h3>
          <p className={styles.text}>
            Древние греки открыли золотое сечение (1:1.618) — пропорцию, которая воспринимается человеческим глазом как идеально гармоничная. Леонардо да Винчи, Сальвадор Дали, Ле Корбюзье — все великие мастера использовали эту пропорцию. В Hero-секции Frosted Muse мы применяем те же принципы:
          </p>
          
          <p className={styles.subtitleScreen}>Математика красоты:</p>
          <pre className={styles.code}>
{`/* Высота изображения: 800px (это не случайное число) */
800 / 1.618 = 494.5px
/* Текст расположен на высоте ~38% от верха */
800 * 0.38 = 304px (близко к 494.5/2)

/* Почему 38%, а не 50%?
   Правило третей в фотографии: важные элементы размещаются
   на пересечениях линий, делящих кадр на трети.
   100% / 3 = 33.3%, но мы даём небольшую поправку
   на психологический комфорт (глаз предпочитает асимметрию). */`}
          </pre>
          
          <p className={styles.text}>
            <strong>Дизайнерский секрет:</strong> Когда мы ставим <code>top: 38%</code> для текстового блока, мы не просто "примерно посередине". Мы размещаем его на линии, которая делит высоту изображения в пропорции, близкой к золотому сечению. Это создаёт подсознательное ощущение гармонии, даже если пользователь не знает математики.
          </p>

          <h3 className={styles.subSectionTitle}>3. Цветовая психология: почему именно #6B4E31?</h3>
          <p className={styles.text}>
            Цвет — это не просто украшение, это язык, который говорит напрямую с лимбической системой мозга (отвечает за эмоции и память).
          </p>
          
          <p className={styles.text}>
            <strong>Шоколадный коричневый (#6B4E31) в кондитерском контексте:</strong>
          </p>
          
          <ul>
            <li><strong>Ассоциации:</strong> какао-бобы, тёмный шоколад, кофейные зёрна, карамель — всё, что связано с натуральностью и качеством.</li>
            <li><strong>Психологическое воздействие:</strong> вызывает чувство тепла, комфорта, надёжности. Коричневый — цвет земли, корней, стабильности.</li>
            <li><strong>Контраст с фоном:</strong> на светлом фоне торта этот оттенок читается идеально (соотношение контраста ~5.5:1, что превышает минимальные требования доступности WCAG 2.1).</li>
            <li><strong>Культурный код:</strong> в западной культуре коричневый ассоциируется с ручной работой, ремеслом, премиум-качеством (вспомните упаковку дорогого шоколада).</li>
          </ul>
          
          <p className={styles.text}>
            <strong>Интересный факт:</strong> McDonald's в 2009 году провёл глобальное исследование и обнаружил, что сочетание коричневого и бежевого (именно как у нас: #6B4E31 и #F5E8E4) повышает воспринимаемую "натуральность" продукта на 23%.
          </p>

          <h3 className={styles.subSectionTitle}>4. Типографика как голос бренда: диалог между Lexend и Imperial Script</h3>
          <p className={styles.text}>
            Шрифты — это не просто буквы. Это голос, которым бренд разговаривает с клиентом. В Hero-секции Frosted Muse происходит тонкий диалог между двумя типажами:
          </p>
          
          <p className={styles.text}>
            <strong>Lexend (для заголовка):</strong>
          </p>
          
          <ul>
            <li><strong>Происхождение:</strong> Создан специально для улучшения читабельности для людей с дислексией. Буквы имеют увеличенные просветы и чёткие формы.</li>
            <li><strong>Психология:</strong> передаёт современность, технологичность, ясность. Это голос эксперта, который знает своё дело.</li>
            <li><strong>Технические особенности:</strong> variable font (переменный шрифт) с весом от 100 до 900, что позволяет тонко настраивать насыщенность.</li>
          </ul>
          
          <p className={styles.text}>
            <strong>Imperial Script (для слогана):</strong>
          </p>
          
          <ul>
            <li><strong>Происхождение:</strong> Вдохновлён каллиграфией времён Британской империи, но адаптирован для цифрового использования.</li>
            <li><strong>Психология:</strong> роскошь, эксклюзивность, ручная работа. Это намёк на то, что каждый торт — уникальное произведение искусства.</li>
            <li><strong>Дизайнерский приём:</strong> Контраст между строгим Lexend и декоративным Imperial Script создаёт "инь-ян" — баланс между профессионализмом и творчеством.</li>
          </ul>
          
          <p className={styles.text}>
            <strong>Кернинг (расстояние между буквами):</strong> Обратите внимание, что в заголовке "Frosted Muse" буквы расположены немного ближе, чем по умолчанию. Это называется "отрицательный кернинг" и используется в логотипах для создания ощущения целостности.
          </p>

          <h3 className={styles.subSectionTitle}>5. Кнопка CTA: инженерная психология взаимодействия</h3>
          <p className={styles.text}>
            Кнопка "Choose a cake" — это не просто ссылка. Это точка превращения пассивного зрителя в активного пользователя. Её дизайн подчинён законам UX-психологии:
          </p>
          
          <p className={styles.subtitleScreen}>Формула идеальной CTA-кнопки:</p>
          <pre className={styles.code}>
{`/* Размер по закону Фиттса: время достижения цели зависит от размера и расстояния */
padding: 12px 24px; /* Достаточно для клика пальцем на мобильном */

/* Цвет по теории действия: красный возбуждает, зелёный разрешает, коричневый "приглашает" */
background-color: #6B4E31; /* "Попробуйте, это вкусно" */

/* Скругление: острые углы воспринимаются как опасность, круглые — как дружелюбие */
border-radius: 25px; /* "Пилл" (таблетка) — стандарт для primary action */

/* Микроинтеракция: мозг любит подтверждение, что его услышали */
transition: all 0.3s ease; /* Плавность = качество */

/* Ховер-эффект: индикация "я интерактивен" */
&:hover {
  background-color: #F5E8E4; /* Светлеет = "активируется" */
  color: #6B4E31; /* Инверсия = "изменение состояния" */
}`}
          </pre>
          
          <p className={styles.text}>
            <strong>Текст на кнопке:</strong> "Choose a cake" вместо "Buy now" или "Order". Почему?
          </p>
          
          <ol>
            <li><strong>Снижает психологическое сопротивление:</strong> "Выбрать" легче, чем "купить" (меньше обязательств).</li>
            <li><strong>Создаёт образ процесса:</strong> как будто пользователь уже в кондитерской и рассматривает витрину.</li>
            <li><strong>Соответствует стадии воронки:</strong> на главной странице пользователь ещё только знакомится, он не готов к покупке.</li>
          </ol>

          <h3 className={styles.subSectionTitle}>6. Техническая магия: как object-fit: cover изменил веб-дизайн</h3>
          <p className={styles.text}>
            Раньше, до появления <code>object-fit</code> в CSS3 (2015 год), создание адаптивных изображений было кошмаром для верстальщиков. Приходилось использовать:
          </p>
          
          <pre className={styles.code}>
{`/* Dark ages of web design (до 2015) */
background-image: url('cake.jpg');
background-size: cover;
background-position: center;
height: 800px;

/* Проблемы:
   1. Не семантично (изображение как фон, а не как контент)
   2. Сложно добавить alt-текст для доступности
   3. Нет lazy loading
   4. Плохо для SEO */`}
          </pre>
          
          <p className={styles.text}>
            <strong>object-fit: cover</strong> — это гениальное решение, которое позволяет тегу <code>&lt;img&gt;</code> вести себя как <code>background-size: cover</code>, но с сохранением всех преимуществ семантического изображения:
          </p>
          
          <ul>
            <li>Можно добавить <code>alt</code> для скринридеров</li>
            <li>Поддерживает <code>loading="lazy"</code></li>
            <li>Лучше для SEO (поисковые системы "видят" контентные изображения)</li>
            <li>Проще в управлении через JavaScript</li>
          </ul>
          
          <p className={styles.text}>
            <strong>Физическая аналогия:</strong> Представьте, что у вас есть фотография 10x15 см и рамка 20x20 см. <code>object-fit: cover</code> — это как увеличить фотографию до 20x30 см и обрезать лишние 5 см с каждой стороны, чтобы она идеально заполнила квадратную рамку, сохранив все пропорции.
          </p>

          <h3 className={styles.subSectionTitle}>7. Производительность: искусство баланса между красотой и скоростью</h3>
          <p className={styles.text}>
            Hero-изображение — самый тяжёлый элемент на странице. По данным HTTP Archive, средний вес изображений на веб-страницах вырос с 528 KB в 2015 до 1.2 MB в 2023. Как не допустить, чтобы красота убила скорость?
          </p>
          
          <p className={styles.text}>
            <strong>Стратегии оптимизации для Frosted Muse:</strong>
          </p>
          
          <ol>
            <li><strong>Выбор формата:</strong> WebP (на 30% меньше JPEG при том же качестве) с fallback на JPEG для старых браузеров.</li>
            <li><strong>Адаптивные изображения:</strong> Загрузка разных размеров для разных устройств через <code>srcset</code>.</li>
            <li><strong>Ленивая загрузка:</strong> <code>loading="lazy"</code> для браузеров, которые её поддерживают.</li>
            <li><strong>Оптимизация в Photoshop:</strong> Сохранение для Web с качеством 80-85% (человеческий глаз не заметит разницы).</li>
            <li><strong>CDN:</strong> Размещение изображений на Content Delivery Network для быстрой доставки в любую точку мира.</li>
          </ol>
          
          <p className={styles.text}>
            <strong>Золотое правило:</strong> Hero-изображение должно весить не более 300 KB на десктопе и 150 KB на мобильном. Больше — и вы теряете пользователей: по данным Google, вероятность отскока увеличивается на 32% при задержке загрузки от 1 до 3 секунд.
          </p>

          <h3 className={styles.subSectionTitle}>8. Адаптивность: одна секция для тысячи устройств</h3>
          <p className={styles.text}>
            В 2023 году существует более 24,000 различных комбинаций размеров экранов. Hero-секция должна выглядеть идеально на каждом из них.
          </p>
          
          <p className={styles.text}>
            <strong>Философия mobile-first:</strong> Мы начинаем проектирование с мобильной версии, потому что:
          </p>
          
          <ul>
            <li>58% посещений сайтов приходится на мобильные устройства (данные StatCounter, 2023)</li>
            <li>Google использует mobile-first индексирование с 2019 года</li>
            <li>Ограничения мобильного дизайна заставляют быть более креативными</li>
          </ul>
          
          <p className={styles.text}>
            <strong>План адаптации Hero-секции:</strong>
          </p>
          
          <pre className={styles.code}>
{`/* Mobile (до 768px) */
.hero-img { height: 500px; }
.hero-content h1 { font-size: 32px; }
.hero-content p { font-size: 18px; }

/* Tablet (769px - 1024px) */
@media (min-width: 769px) {
  .hero-img { height: 650px; }
}

/* Desktop (1025px и больше) */
@media (min-width: 1025px) {
  .hero-img { height: 800px; } /* Наш текущий вариант */
}`}
          </pre>

          <h3 className={styles.subSectionTitle}>9. A/B тестирование: наука вместо догадок</h3>
          <p className={styles.text}>
            Самые успешные компании (Amazon, Netflix, Booking.com) не верят в "чутьё дизайнера". Они тестируют. Вот какие гипотезы можно было бы проверить для Hero-секции Frosted Muse:
          </p>
          
          <ul>
            <li><strong>Вариант А:</strong> Текущий дизайн (крупный торт)</li>
            <li><strong>Вариант B:</strong> Торт в интерьере кондитерской (контекст использования)</li>
            <li><strong>Вариант C:</strong> Видео-фон с процессом украшения торта</li>
            <li><strong>Вариант D:</strong> Фотография счастливых клиентов с тортом</li>
          </ul>
          
          <p className={styles.text}>
            <strong>Метрики успеха:</strong> CTR кнопки, время на странице, процент отказов, конверсия в заказ. По данным VWO, правильно проведённое A/B тестирование Hero-секции может увеличить конверсию на 40-60%.
          </p>

          <h3 className={styles.subSectionTitle}>10. Будущее Hero-секций: что ждёт нас завтра?</h3>
          <p className={styles.text}>
            Веб-дизайн не стоит на месте. Уже сегодня появляются тренды, которые завтра станут стандартом:
          </p>
          
          <ul>
            <li><strong>Иммерсивный 3D:</strong> Three.js и WebGL позволяют создавать интерактивные 3D-торты, которые можно вращать, приближать.</li>
            <li><strong>Параллакс-скроллинг:</strong> Разные слои изображения двигаются с разной скоростью, создавая эффект глубины.</li>
            <li><strong>Микроанимации:</strong> Едва заметные движения (мерцание глазури, падающая сахарная пудра) привлекают внимание.</li>
            <li><strong>Динамический контент:</strong> Hero-секция, которая меняется в зависимости от времени суток, погоды или предыдущих посещений пользователя.</li>
            <li><strong>Голосовые интерфейсы:</strong> "Привет, Frosted Muse, покажи мне торты на день рождения" — и Hero-секция меняется соответствующим образом.</li>
          </ul>
          
          <p className={styles.text}>
            <strong>Главный вывод:</strong> Hero-секция Frosted Muse — это не просто "картинка с текстом". Это сложный психолого-технический комплекс, где каждый пиксель, каждый миллисекунд анимации, каждый оттенок цвета работают на одну цель: заставить посетителя почувствовать, что он уже держит в руках кусочек идеального торта.
          </p>
          
          <p className={styles.text}>
            <strong>В следующей теме</strong> мы перейдём от эмоций к практичности — создадим секцию "Assortment", где пользователь сможет выбрать конкретный торт из каталога. От искусства впечатления к искусству выбора.
          </p>
        </section>

        {!isTestPassed && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Тест</h2>
            <p className={styles.text}>Пройдите тест, чтобы открыть практику.</p>
            <Test4 onComplete={handleTestComplete} setTestAnswers={setTestAnswers} testAnswers={testAnswers} />
          </section>
        )}

        {isTestPassed && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Практика</h2>
            <p className={styles.text}>
              Создайте главный баннер (Hero-секцию) для сайта <strong>Frosted Muse</strong>.
            </p>

            <h3 className={styles.subSectionTitle}>Шаг 1: Добавление HTML-разметки</h3>
            <p className={styles.text}>
              1. Откройте файл <code>index.html</code>.
              <br />
              2. После навигации добавьте:
            </p>
            <pre className={styles.code}>
{`<div class="hero">
  <img src="img/background1.jpg" class="hero-img" alt="Cake Background">
  <div class="hero-content">
    <!-- Добавьте заголовок h1 с названием кондитерской -->
    <!-- Добавьте параграф p со слоганом -->
    <!-- Добавьте ссылку-кнопку с классом hero-button -->
  </div>
</div>`}
            </pre>

            <h3 className={styles.subSectionTitle}>Шаг 2: Базовые CSS-стили для Hero-секции</h3>
            <p className={styles.text}>
              В файле <code>style.css</code> добавьте:
            </p>
            <pre className={styles.code}>
{`.hero {
  position: relative;
  text-align: center;
  padding-top: 70px; /* Компенсация фиксированной шапки */
  margin-bottom: 20px;
}

.hero-img {
  width: 100%;
  height: 800px;
  /* Добавьте object-fit и object-position */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}`}
            </pre>

            <h3 className={styles.subSectionTitle}>Шаг 3: Позиционирование текста</h3>
            <pre className={styles.code}>
{`.hero-content {
  position: absolute;
  top: 38%;
  left: 50%;
  /* Добавьте transform для центрирования */
  text-align: center;
  color: #6B4E31;
  z-index: 10;
}`}
            </pre>

            <h3 className={styles.subSectionTitle}>Шаг 4: Стили для текста</h3>
            <pre className={styles.code}>
{`.hero-content h1 {
  font-family: 'Lexend', sans-serif;
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 8px;
}

.hero-content p {
  font-family: 'Imperial Script', cursive;
  /* Задайте размер шрифта */
  margin-bottom: 15px;
}`}
            </pre>

            <h3 className={styles.subSectionTitle}>Шаг 5: Кнопка призыва к действию</h3>
            <pre className={styles.code}>
{`.hero-button {
  display: inline-block;
  padding: 12px 24px;
  background-color: #6B4E31;
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  /* Добавьте border-radius */
  transition: background-color 0.3s ease, color 0.3s ease;
}

.hero-button:hover {
  /* Измените фон и цвет текста при наведении */
}`}
            </pre>

            <h3 className={styles.subSectionTitle}>Шаг 6: Проверка результата</h3>
            <p className={styles.text}>
              Сохраните файлы и откройте в браузере. Должны увидеть:
            </p>
            <ul>
              <li>Изображение торта на всю ширину</li>
              <li>Текст "Frosted Muse" поверх изображения</li>
              <li>Кнопку, которая меняет цвет при наведении</li>
            </ul>
            <div className={styles.screenshotPlaceholder}>
              <img src="./images/Topic4/screen-1.webp" alt="screen-1" className={styles.screenshotImage} />
              <p className={styles.screenshotText}>Рис.1 — Готовая Hero-секция</p>
            </div>
          </section>
        )}

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Итогом работы будет</h2>
          <p className={styles.text}>
            Вы создали психологически и технически продуманную Hero-секцию для сайта <strong>Frosted Muse</strong>. Вы научились работать с большими фоновыми изображениями, используя <code>object-fit: cover</code> для сохранения пропорций, освоили технику абсолютного позиционирования с трансформациями для точного размещения текста, применили принципы цветовой психологии (коричневый #6B4E31 для ассоциации с шоколадом и натуральностью) и типографической иерархии (контраст между строгим Lexend и декоративным Imperial Script), а также создали эффективную кнопку призыва к действию с продуманными hover-эффектами и семантической разметкой для доступности.
          </p>
          <div className={styles.endImg}>
            <img src='./images/General/general.webp' alt='general-logo'></img>
          </div>
        </section>
      </div>

      <div className={styles.navigation}>
        <NavLink to="/topic5" className={styles.nextButton}>
          К следующей теме
        </NavLink>
        <BackProgress onReset={handleResetProgress} testPassed={isTestPassed} />
      </div>
    </div>
  );
};

export default Topic4;