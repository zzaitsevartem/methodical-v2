import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../Themes.module.scss';
import { motion } from 'framer-motion';
import BackButton from '../../components/BackButton/BackButton';
import BackProgress from '../../components/BackProgress/BackProgress';
import Test6 from './components/Test6';
import { useTopicProgress } from '../../../hooks/useTopicProgress';

interface Topic6Props {
  testPassed: boolean;
  setTestPassed: (value: boolean) => void;
}

const Topic6: React.FC<Topic6Props> = ({ testPassed: propTestPassed, setTestPassed: propSetTestPassed }) => {
  const { testPassed: cachedTestPassed, setTestPassed: setCachedTestPassed, testAnswers, setTestAnswers, resetProgress } = useTopicProgress('6');

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
        <h1 className={styles.title}>Тема 6: Секция "About" с текстом и галереей</h1>
        <p className={styles.subtitle}>Комплексная верстка: текст + сетка изображений</p>
      </motion.div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Теория</h2>
          
          <h3 className={styles.subSectionTitle}>1. История секций "О нас": от визиток до сторителлинга</h3>
          <p className={styles.text}>
            <strong>В начале 2000-х</strong> секция "About" на сайтах была сухой формальностью — пара строк про компанию, 
            юридический адрес, контакты. Это было похоже на визитную карточку, переведённую в цифру. 
            <strong>Сегодня "About" — это сторителлинг</strong>, эмоциональное повествование, где бренд показывает 
            не <b>что</b> он делает, а <b>почему</b> и <b>как</b>. Согласно исследованию 
            <strong> Forrester Research</strong>, 71% покупателей выбирают бренды, чьи ценности совпадают с их 
            собственными. Frosted Muse использует это: вместо сухого "мы печём торты" — поэтичное описание процесса, 
            где каждое предложение звучит как рецепт с душой.
          </p>
          <div className={styles.screenshotPlaceholder}>
            <img src="./images/Topic6/screen-1.webp" alt="screen-1" className={styles.screenshotImage} />
            <p className={styles.screenshotText}>Рис.1 — Эволюция секций "О нас" в веб-дизайне</p>
          </div>

          <h3 className={styles.subSectionTitle}>2. Дизайн-принцип "текст + визуал": почему это работает</h3>
          <p className={styles.text}>
            <strong>Когнитивная психология</strong> доказала: информация, поданная и текстом, и изображениями, 
            запоминается на <strong>65% лучше</strong>, чем только текстом (эффект двойного кодирования, Paivio, 1971). 
            Frosted Muse применяет это безупречно: <strong>текст слева</strong> рассказывает про натуральные ингредиенты 
            и ручную работу, <strong>галерея справа</strong> показывает этот процесс. <br />Мозг получает подтверждение 
            словам через визуал — возникает <strong>доверие</strong>. Важный нюанс: на Западе (где чтение слева направо) 
            текст всегда ставят слева — это первое, что видит глаз.
          </p>
          <div className={styles.screenshotPlaceholder}>
            <img src="./images/Topic6/screen-2.webp" alt="screen-2" className={styles.screenshotImage} />
            <p className={styles.screenshotText}>Рис.2 — Принцип "текст + изображение" в дизайне</p>
          </div>

          <h3 className={styles.subSectionTitle}>3. Flexbox vs Grid: стратегический выбор</h3>
          <p className={styles.text}>
            Почему Frosted Muse использует <strong>Flexbox для общего макета</strong> (две колонки), но 
            <strong> CSS Grid внутри галереи</strong>? Это не случайность. <strong>Flexbox идеален для 
            одномерного выравнивания</strong> — нужно просто раздвинуть текст и изображения с 
            <code>justify-content: space-between</code>. <strong>CSS Grid нужен для двумерной точности</strong> — 
            создать сетку 2×2, где одно фото занимает две строки. Это пример <strong>комбинирования технологий 
            по их сильным сторонам</strong>. Интересный факт: в 2018 году, когда Grid только набирал популярность, 
            многие дизайнеры пытались делать всё только им, но сегодня <strong>гибридный подход считается 
            профессиональным стандартом</strong>.
          </p>
          <div className={styles.screenshotPlaceholder}>
            <img src="./images/Topic6/screen-3.webp" alt="screen-3" className={styles.screenshotImage} />
            <p className={styles.screenshotText}>Рис.3 — Комбинация Flexbox и Grid в одной секции</p>
          </div>

          <h3 className={styles.subSectionTitle}>4. Галерея "ведущий элемент": власть большого фото</h3>
          <p className={styles.text}>
            В галерее Frosted Muse три фото, но <strong>одно большое занимает две строки</strong>. Это дизайн-паттерн 
            <strong>"доминирующий элемент"</strong>, пришедший из журнальной вёрстки. <strong>Большое фото привлекает 
            внимание первым</strong>, задаёт эмоциональный тон (здесь — красота готового торта), а два маленьких 
            дополняют контекстом (ингредиенты, процесс). Психологически это работает как <strong>иерархия важности</strong>: 
            сначала результат, потом детали. <strong>Grid делает это тривиально</strong> с 
            <code>grid-row: 1 / 3</code> — свойство, которое буквально говорит "займи строки с 1 по 3".
          </p>
          <div className={styles.screenshotPlaceholder}>
            <img src="./images/Topic6/screen-4.webp" alt="screen-4" className={styles.screenshotImage} />
            <p className={styles.screenshotText}>Рис.4 — Принцип "доминирующего элемента" в галереях</p>
          </div>

          <h3 className={styles.subSectionTitle}>5. Object-fit: cover — изменение отображения</h3>
          <p className={styles.text}>
            Все изображения в галерее используют <code>object-fit: cover</code>. Почему не <code>contain</code>, который 
            показывает полное фото? Потому что <strong>cover жертвует краями ради композиции</strong>. В кулинарной 
            фотографии <strong>важнее целостность сетки</strong>, чем показать каждую клубничку на торте. 
            <strong> Профессиональные фотографы знают</strong>: при съёмке еды они оставляют "мёртвые зоны" по краям 
            именно под будущую обрезку. 
          </p>
          <div className={styles.screenshotPlaceholder}>
            <img src="./images/Topic6/screen-5.webp" alt="screen-5" className={styles.screenshotImage} />
            <p className={styles.screenshotText}>Рис.5 — Разница между object-fit: cover и contain</p>
          </div>

          <h3 className={styles.subSectionTitle}>6. Адаптивность: mobile-first как переворот иерархии</h3>
          <p className={styles.text}>
            На мобильных Frosted Muse делает <strong>смелый ход</strong>: <code>flex-direction: column-reverse</code>. 
            Галерея оказывается <strong>сверху</strong>, текст — <strong>снизу</strong>. Почему? 
            <strong> Мобильные пользователи скроллят быстрее</strong>, им нужно сразу дать визуальный якорь. 
            Текст на маленьком экране читается хуже, чем воспринимается изображение. Это пример 
            <strong>адаптивного мышления</strong>: не просто сжать десктопную версию, а переосмыслить приоритеты. 
            Галерея также превращается в одну колонку — <strong>вертикальный поток естественен для пальцевого 
            скролла</strong>.
          </p>
          <div className={styles.screenshotPlaceholder}>
            <img src="./images/Topic6/screen-6.webp" alt="screen-6" className={styles.screenshotImage} />
            <p className={styles.screenshotText}>Рис.6 — Адаптивная перестройка секции на мобильных</p>
          </div>

          <h3 className={styles.subSectionTitle}>7. Типографика: Ballet vs Lexend — диалог изящества и ясности</h3>
          <p className={styles.text}>
            Заголовок "About" написан шрифтом <strong>Ballet</strong> — курсивным, танцующим, но читаемым. 
            Это <strong>намёк на искусство</strong>, ручная работа, индивидуальность. Основной текст — 
            <strong> Lexend</strong>, созданный специально для улучшения читаемости при дислексии. 
            <strong>Контраст намеренный</strong>: заголовок — эмоция, текст — информация. Ссылка 
            "Learn more" подчёркнута, но не как кнопка — это <strong>интригующее приглашение</strong>, 
            а не агрессивный призыв к действию.
          </p>
        </section>

        {!isTestPassed && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Тест</h2>
            <p className={styles.text}>Пройдите тест, чтобы открыть практику.</p>
            <Test6 onComplete={handleTestComplete} setTestAnswers={setTestAnswers} testAnswers={testAnswers} />
          </section>
        )}

        {isTestPassed && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Практика</h2>
            <p className={styles.text}>
              <strong>Внимательно изучите сайт Frosted Muse</strong> и создайте секцию "About" точно как 
              в <a href='https://zzaitsevartem.github.io/frosted-muse/'>оригинале</a>. Не добавляйте лишних классов или стилей.
            </p>

            <h3 className={styles.subSectionTitle}>Шаг 1: HTML структура (точная копия)</h3>
            <p className={styles.text}>
              <strong>Добавьте после секции Assortment:</strong>
            </p>
            <pre className={styles.code}>
{`<section class="________">
  <h2>________</h2>
  <div class="________">
    <div class="________">
      <p>We bake the cake and prepare the cream as you want, using only natural ingredients of high quality. Putting the bake cake we are waiting for the biscuit to inflate and soak. We think over the design, the color scheme and every detail of the cake and proceed to the donor. <a href="#" class="________">Learn more</a></p>
    </div>
    <div class="________">
      <img src="img/block3.1.jpg" alt="About Image 1">
      <img src="img/block3.2.jpg" alt="About Image 2">
      <img src="img/block3.3.jpg" alt="About Image 3">
    </div>
  </div>
</section>`}
            </pre>

            <h3 className={styles.subSectionTitle}>Шаг 2: Основные стили секции</h3>
            <pre className={styles.code}>
{`.about {
  padding: ________px ________px;
  margin-top: ________px;
  text-align: ________;
  background-color: ________;
}

.about h2 {
  font-family: '________', cursive;
  font-size: ________px;
  color: ________;
  margin-bottom: ________px;
}`}
            </pre>

            <h3 className={styles.subSectionTitle}>Шаг 3: Flexbox для двух колонок</h3>
            <pre className={styles.code}>
{`.about-content {
  display: ________;
  justify-content: ________;
  align-items: ________;
  gap: ________px;
}

.about-text {
  flex: ________;
  text-align: ________;
}

.about-text p {
  font-family: '________', sans-serif;
  font-size: ________px;
  color: ________;
  line-height: ________;
  margin-bottom: ________px;
}`}
            </pre>

            <h3 className={styles.subSectionTitle}>Шаг 4: Ссылка "Learn more"</h3>
            <pre className={styles.code}>
{`.about-button {
  font-family: '________', sans-serif;
  font-size: ________px;
  color: ________;
  text-decoration: ________;
  transition: ________;
}

.about-button:hover {
  color: ________;
}`}
            </pre>

            <h3 className={styles.subSectionTitle}>Шаг 5: CSS Grid для галереи</h3>
            <pre className={styles.code}>
{`.about-images {
  flex: ________;
  display: ________;
  grid-template-columns: ________ ________;
  grid-template-rows: ________ ________;
  gap: ________px;
}

.about-images img:nth-child(________) {
  grid-column: ________ / ________;
  grid-row: ________ / ________;
}

.about-images img:nth-child(________) {
  grid-column: ________ / ________;
  grid-row: ________ / ________;
}

.about-images img:nth-child(________) {
  grid-column: ________ / ________;
  grid-row: ________ / ________;
}`}
            </pre>

            <h3 className={styles.subSectionTitle}>Шаг 6: Размеры изображений</h3>
            <pre className={styles.code}>
{`.about-images img {
  width: ________;
  height: ________px;
  object-fit: ________;
}

.about-images img:nth-child(________) {
  height: ________px;
}`}
            </pre>

            <h3 className={styles.subSectionTitle}>Шаг 7: Проверка результата</h3>
            <p className={styles.text}>
              Сохраните файлы и откройте сайт в браузере. У вас должна появиться секция About с текстом слева и 
              галереей из трёх изображений справа.
            </p>
            <p className={styles.text}>
              <strong>Замечание:</strong> На данном этапе наш сайт <strong>ещё не является полной копией</strong> 
              оригинального Frosted Muse. Мы изучаем и создаём сайт <strong>постепенно, тема за темой</strong>.
            </p>
            <p className={styles.text}>
              Если вы посмотрите на оригинальный сайт по ссылке:{' '}
              <a href="https://zzaitsevartem.github.io/frosted-muse/" target="_blank" rel="noopener noreferrer">
                <strong>https://zzaitsevartem.github.io/frosted-muse/</strong>
              </a>
              , то увидите, что там есть дополнительная секция (финальный баннер) между About и футером.
            </p>
            <p className={styles.text}>
              <strong>Это нормально и запланировано!</strong> Эту недостающую секцию мы добавим в 
              <strong> следующей теме</strong>. Сейчас сосредоточьтесь на точном воспроизведении именно секции 
              About с её двухколоночной структурой и галереей изображений.
            </p>
          </section>
        )}

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Итогом работы будет</h2>
          <p className={styles.text}>
            Вы создали точную копию секции <strong>"About"</strong> с сайта <strong>Frosted Muse</strong>, используя комбинацию  
            <strong> Flexbox</strong> для макета (две колонки: текст + изображения) и <strong>CSS Grid</strong> для внутренней 
            структуры галереи (2×2 сетка с доминирующим элементом), применили правильную типографику (Ballet для заголовка, 
            Lexend для текста), освоили работу с <code>object-fit: cover</code> для сохранения композиции изображений и 
            заложили основу для адаптивности, которая будет подробно изучена в следующих темах.
          </p>
          <div className={styles.endImg}>
            <img src='./images/General/general.webp' alt='general-logo'></img>
          </div>
        </section>
      </div>

      <div className={styles.navigation}>
        <NavLink to="/topic7" className={styles.nextButton}>
          К следующей теме
        </NavLink>
        <BackProgress onReset={handleResetProgress} testPassed={isTestPassed} />
      </div>
    </div>
  );
};

export default Topic6;