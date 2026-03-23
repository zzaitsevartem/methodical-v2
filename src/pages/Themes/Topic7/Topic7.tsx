import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../Themes.module.scss';
import { motion } from 'framer-motion';
import BackButton from '../../components/BackButton/BackButton';
import BackProgress from '../../components/BackProgress/BackProgress';
import Test7 from './components/Test7';
import { useTopicProgress } from '../../../hooks/useTopicProgress';

interface Topic7Props {
  testPassed: boolean;
  setTestPassed: (value: boolean) => void;
}

const Topic7: React.FC<Topic7Props> = ({ testPassed: propTestPassed, setTestPassed: propSetTestPassed }) => {
  const { testPassed: cachedTestPassed, setTestPassed: setCachedTestPassed, testAnswers, setTestAnswers, resetProgress } = useTopicProgress('7');

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
        <h1 className={styles.title}>Тема 7: Финальный баннер и подвал (Footer)</h1>
        <p className={styles.subtitle}>Второй баннер с призывом к действию и информативный футер сайта</p>
      </motion.div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Теория</h2>
          
          <p className={styles.text}>
            <strong>Финал — это не просто конец, это кульминация.</strong> В веб-дизайне последние секции страницы выполняют роль 
            <strong>эмоционального и логического завершения</strong>. Если Hero-секция — это приветствие, то финальный баннер — 
            <strong>прощание с предложением остаться на связи</strong>, а футер — <strong>деловая визитка</strong>, которую 
            пользователь забирает с собой. Согласно исследованиям Nielsen Norman Group, <strong>86% пользователей</strong>, 
            достигших конца страницы, <strong>прокручивают футер</strong> в поисках дополнительной информации, контактов или 
            призыва к действию.
          </p>

          <h3 className={styles.subSectionTitle}>1. Эволюция подвалов: от скромных копирайтов до многофункциональных хабов</h3>
          <p className={styles.text}>
            <strong>В 1990-х</strong> футеры были примитивны — просто строка текста: "© 1999 Компания. Все права защищены." 
            Это была <strong>юридическая формальность</strong>, а не элемент дизайна. В <strong>2000-х</strong> появились 
            первые попытки добавить навигацию — дублирование основных ссылок меню. Но настоящая революция произошла в 
            <strong>2010-х</strong> с приходом <strong>Mobile-First</strong> подхода. Дизайнеры осознали: футер — 
            <strong>последний шанс</strong> удержать пользователя, когда он пролистал весь контент.
          </p>
          <div className={styles.screenshotPlaceholder}>
            <img src="./images/Topic7/screen-1.webp" alt="screen-1" className={styles.screenshotImage} />
            <p className={styles.screenshotText}>Рис.1 — Эволюция футеров от 1990-х до современных многоуровневых структур</p>
          </div>

          <p className={styles.text}>
            <strong>Современный футер Frosted Muse</strong> — это <strong>минималистичный, но содержательный</strong> элемент. 
            Он содержит только копирайт, но его расположение, шрифт и цветовая схема <strong>создают ощущение завершённости</strong>. 
            Отсутствие лишних ссылок — <strong>осознанный дизайн-выбор</strong>: для лендинга кондитерской важнее сфокусировать 
            внимание на продукте, а не на административной информации.
          </p>

          <h3 className={styles.subSectionTitle}>2. Психология финального CTA: "Indulge in Sweet Bliss"</h3>
          <p className={styles.text}>
            Второй баннер (секция <code>.new-section</code>) в Frosted Muse — это <strong>стратегически размещённый призыв к действию</strong>. 
            После того как пользователь увидел ассортимент и узнал о философии бренда, ему предлагается 
            <strong>совершить конкретное действие</strong>: "Try It Now" ("Попробуйте сейчас").
          </p>

          <p className={styles.text}>
            <strong>Почему именно здесь?</strong> По данным исследования <strong>Content Marketing Institute</strong>, 
            размещение CTA <strong>после демонстрации ценности</strong> увеличивает конверсию на <strong>42%</strong>. 
            Пользователь уже "разогрет": он видел красивые торты, прочитал о натуральных ингредиентах, теперь ему 
            <strong>проще решиться</strong> на действие.
          </p>

          <p className={styles.text}>
            <strong>Формула эффективного финального CTA:</strong>
          </p>
          <ol>
            <li><strong>Эмоциональный заголовок</strong>: "Indulge in Sweet Bliss" ("Погрузитесь в сладкое блаженство") — создаёт желание.</li>
            <li><strong>Подзаголовок-уточнение</strong>: "our signature dessert awaits you" ("наш фирменный десерт ждёт вас") — конкретизирует предложение.</li>
            <li><strong>Чёткий глагол действия</strong>: "Try It Now" — однозначное указание что делать.</li>
            <li><strong>Визуальное подкрепление</strong>: аппетитное изображение торта с клубникой — работает на подсознание.</li>
          </ol>
          <div className={styles.screenshotPlaceholder}>
            <img src="./images/Topic7/screen-2.webp" alt="screen-2" className={styles.screenshotImage} />
            <p className={styles.screenshotText}>Рис.2 — Структура эффективного финального призыва к действию</p>
          </div>

          <h3 className={styles.subSectionTitle}>3. CSS-фильтры: создание атмосферы с помощью brightness(0.7)</h3>
          <p className={styles.text}>
            В финальном баннере Frosted Muse используется <strong>гениальный приём</strong>: <code>filter: brightness(0.7)</code>. 
            Это не просто "затемнение" — это <strong>сознательное управление контрастом</strong> между изображением и текстом.
          </p>

          <p className={styles.text}>
            <strong>Как это работает физически?</strong> CSS-фильтр <code>brightness()</code> умножает значения RGB каждого пикселя на указанный коэффициент:
          </p>
          <pre className={styles.code}>{`/* Исходный пиксель: RGB(200, 150, 100) */
/* После brightness(0.7): */
R: 200 × 0.7 = 140
G: 150 × 0.7 = 105
B: 100 × 0.7 = 70
/* Результат: RGB(140, 105, 70) */`}</pre>

          <p className={styles.text}>
            <strong>Почему именно 0.7?</strong> Это <strong>научно обоснованное значение</strong>. Исследование 
            <strong> W3C по доступности</strong> (WCAG 2.1) требует минимального контраста 4.5:1 для обычного текста. 
            При <code>brightness(0.7)</code> тёмное изображение создаёт <strong>идеальный фон</strong> для белого текста с контрастом ~8:1.
          </p>

          <p className={styles.text}>
            <strong>Альтернативы, которые мы не используем (и почему):</strong>
          </p>
          <ul>
            <li><strong><code>rgba() overlay</code></strong>: наложение полупрозрачного тёмного слоя — даёт аналогичный эффект, но добавляет лишний HTML-элемент.</li>
            <li><strong><code>linear-gradient()</code></strong>: градиентное затемнение — сложнее в управлении, может "перекрыть" важные детали изображения.</li>
            <li><strong>Тёмное изображение изначально</strong>: теряем гибкость — нельзя динамически регулировать уровень затемнения для разных устройств.</li>
          </ul>
          <div className={styles.screenshotPlaceholder}>
            <img src="./images/Topic7/screen-3.webp" alt="screen-3" className={styles.screenshotImage} />
            <p className={styles.screenshotText}>Рис.3 — Разница между оригинальным изображением и версией с brightness(0.7)</p>
          </div>

          <h3 className={styles.subSectionTitle}>4. Абсолютное позиционирование: математика идеального центрирования</h3>
          <p className={styles.text}>
            Текст в финальном баннере центрируется с помощью классической формулы: 
            <code>top: 50%; left: 50%; transform: translate(-50%, -50%)</code>. Но почему именно так, а не с помощью Flexbox или Grid?
          </p>

          <p className={styles.text}>
            <strong>Исторический контекст:</strong> До появления Flexbox (2009) и CSS Grid (2017) это был 
            <strong>единственный надёжный способ</strong> абсолютного центрирования. В Frosted Muse этот метод сохранён как 
            <strong>дань традиции</strong> и потому что он <strong>идеально работает</strong> для одиночного блока поверх изображения.
          </p>

          <p className={styles.text}>
            <strong>Математика трансформации:</strong>
          </p>
          <pre className={styles.code}>{`/* 1. top: 50%; left: 50% — перемещает ЛЕВЫЙ ВЕРХНИЙ УГОЛ блока в центр родителя */
/* 2. transform: translate(-50%, -50%) — сдвигает блок НАЗАД на половину его собственных размеров */
/* Визуализация:
   Родитель: 1000px × 700px, центр в точке (500, 350)
   Ребёнок: 300px × 200px
   Шаг 1: левый верх ребёнка в (500, 350)
   Шаг 2: сдвиг на (-150, -100) — теперь ЦЕНТР ребёнка в (500, 350)
*/`}</pre>

          <p className={styles.text}>
            <strong>Современная альтернатива:</strong> Можно использовать <code>display: grid; place-items: center;</code> 
            на родителе, но тогда потребовалось бы <strong>менять структуру HTML</strong>, добавляя дополнительный контейнер.
          </p>
          <div className={styles.screenshotPlaceholder}>
            <img src="./images/Topic7/screen-4.webp" alt="screen-4" className={styles.screenshotImage} />
            <p className={styles.screenshotText}>Рис.4 — Принцип работы абсолютного позиционирования с трансформацией</p>
          </div>

          <h3 className={styles.subSectionTitle}>5. Типографика завершения: Ballet для эмоций, Lexend для ясности</h3>
          <p className={styles.text}>
            В финальном баннере Frosted Muse используется <strong>контрастное сочетание шрифтов</strong>, которое мы видели ранее, 
            но с <strong>усиленным визуальным воздействием</strong>.
          </p>

          <p className={styles.text}>
            <strong>Ballet для заголовка (48px):</strong> Это <strong>самый крупный</strong> экземпляр данного шрифта на всём сайте. 
            Увеличенный размер говорит: "это важно". Курсивные, плавные линии <strong>вызывают ассоциации</strong> с изящным 
            украшением торта, с финальным штрихом шеф-кондитера.
          </p>

          <p className={styles.text}>
            <strong>Lexend для подзаголовка (24px):</strong> Увеличенный относительно основной навигации (14px), но 
            <strong>меньше заголовка</strong>. Создаёт <strong>иерархию</strong>: сначала эмоция ("блаженство"), потом 
            конкретика ("десерт ждёт"). Использование <code>text-shadow</code> — <strong>микро-деталь</strong>, которая 
            делает текст читаемым на любом фоне.
          </p>

          <p className={styles.text}>
            <strong>Текстовая тень (text-shadow):</strong> <code>2px 2px 4px rgba(0, 0, 0, 0.3)</code> — это не просто украшение. 
            Это <strong>техника повышения читаемости</strong>, известная в полиграфии как "выворотка". Тёмная полупрозрачная 
            тень создаёт <strong>контурный эффект</strong>, отделяя буквы от фона.
          </p>
          <div className={styles.screenshotPlaceholder}>
            <img src="./images/Topic7/screen-5.webp" alt="screen-5" className={styles.screenshotImage} />
            <p className={styles.screenshotText}>Рис.5 — Типографическая иерархия в финальном баннере</p>
          </div>

          <h3 className={styles.subSectionTitle}>6. Футер как элемент брендинга: минимализм vs функциональность</h3>
          <p className={styles.text}>
            Футер Frosted Muse — <strong>образец осознанного минимализма</strong>. Всего одна строка: 
            "© 2023 Frosted Muse. All rights reserved." Почему так мало?
          </p>

          <p className={styles.text}>
            <strong>Психология простоты:</strong> В мире, где футеры превратились в "все-в-одном" с ссылками на 
            соцсети, карты, политики конфиденциальности, контакты и т.д., <strong>лаконичный футер выделяется</strong>. 
            Он транслирует сообщение: "Мы уверены в своём продукте настолько, что не нуждаемся в дополнительном 
            убеждении в конце".
          </p>

          <p className={styles.text}>
            <strong>Технические аспекты:</strong>
          </p>
          <ul>
            <li><strong><code>flex-shrink: 0</code></strong> — гарантирует, что футер не "сожмётся", если контента мало.</li>
            <li><strong><code>border-top: 1px solid #e6e6e6</code></strong> — визуально отделяет футер от основного контента.</li>
            <li><strong>Цвет #333</strong> — не чисто чёрный (#000), а тёмно-серый. Создаёт <strong>меньший контраст</strong> с фоном, выглядит мягче, современнее.</li>
            <li><strong>Размер 14px</strong> — стандартный для юридической информации, читается, но не привлекает излишнего внимания.</li>
          </ul>

          <p className={styles.text}>
            <strong>Что МОЖНО было бы добавить (и почему не добавляем):</strong>
          </p>
          <ul>
            <li><strong>Социальные иконки</strong> — отвлекают от основного CTA, могут увести пользователя с сайта.</li>
            <li><strong>Повторную навигацию</strong> — избыточно для лендинга, где все секции видны на одной странице.</li>
            <li><strong>Контактную информацию</strong> — для кондитерской важнее форма заказа, чем телефон или адрес.</li>
          </ul>
          <div className={styles.screenshotPlaceholder}>
            <img src="./images/Topic7/screen-6.webp" alt="screen-6" className={styles.screenshotImage} />
            <p className={styles.screenshotText}>Рис.6 — Минималистичный футер как элемент брендинга</p>
          </div>

          <p className={styles.text}>
            <strong>В этой теме</strong> мы завершаем визуальную часть сайта Frosted Muse. Мы создали эмоциональный 
            финальный баннер, который подталкивает к действию, и лаконичный футер, который ставит точку в дизайне. 
            <strong>Следующая тема</strong> — переход от статики к динамике: мы начнём изучать адаптивный дизайн и 
            медиазапросы, чтобы наш сайт идеально выглядел на любом устройстве.
          </p>
        </section>

        {!isTestPassed && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Тест</h2>
            <p className={styles.text}>Пройдите тест, чтобы открыть практику.</p>
            <Test7 onComplete={handleTestComplete} setTestAnswers={setTestAnswers} testAnswers={testAnswers} />
          </section>
        )}

        {isTestPassed && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Практика</h2>
            <p className={styles.text}>
              Добавьте финальный баннер и подвал сайта <strong>Frosted Muse</strong>. 
               Внимательно изучите <a href="https://zzaitsevartem.github.io/frosted-muse/">оригинальный</a> сайт и создайте точную копию.
            </p>

            <h3 className={styles.subSectionTitle}>Шаг 1: HTML для финального баннера</h3>
            <p className={styles.text}>
              1. В файле <code>index.html</code> после секции About добавьте:
            </p>
            <pre className={styles.code}>{`<section class="________">
  <img src="img/top-view-creamy-delicious-cake-with-strawberries-white-surface-birthday-cream-tea-cake-biscuit-sweet.jpg" class="________" alt="Background Image 3">
  <div class="________">
    <h2>________</h2>
    <p>________</p>
    <a href="#" class="________">________</a>
  </div></section>`}</pre>

            <h3 className={styles.subSectionTitle}>Шаг 2: HTML для футера</h3>
            <p className={styles.text}>
              2. Закройте тег <code>&lt;/main&gt;</code> и после него добавьте футер:
            </p>
            <pre className={styles.code}>{`<________>
  <p>________</p>
</________>`}</pre>

            <h3 className={styles.subSectionTitle}>Шаг 3: Основные стили финального баннера</h3>
            <p className={styles.text}>
              3. В файле <code>style.css</code> добавьте стили для новой секции:
            </p>
            <pre className={styles.code}>{`.new-section {
  position: ________;
  text-align: ________;
  margin-top: ________px;
  background-color: ________;
}.new-section-img {
  width: ________;
  height: ________px;
  object-fit: ________;
  object-position: ________;
  filter: ________(0.7);
}`}</pre>

            <h3 className={styles.subSectionTitle}>Шаг 4: Позиционирование текста поверх изображения</h3>
            <pre className={styles.code}>{`.new-section-content {
  position: ________;
  top: ________%;
  left: ________%;
  transform: ________(________%, ________%);
  text-align: ________;
  color: ________;
  z-index: ________;
}`}</pre>

            <h3 className={styles.subSectionTitle}>Шаг 5: Типографика финального баннера</h3>
            <pre className={styles.code}>{`.new-section-content h2 {
  font-family: '________', cursive;
  font-size: ________px;
  margin-bottom: ________px;
  text-shadow: ________px ________px ________px rgba(0, 0, 0, 0.3);
}.new-section-content p {
  font-family: '________', cursive;
  font-size: ________px;
  margin-bottom: ________px;
  text-shadow: ________px ________px ________px rgba(0, 0, 0, 0.2);
}`}</pre>

            <h3 className={styles.subSectionTitle}>Шаг 6: Кнопка "Try It Now"</h3>
            <pre className={styles.code}>{`.new-section-button {
  display: ________-block;
  padding: ________px ________px;
  background-color: ________;
  color: ________;
  text-decoration: ________;
  font-family: '________', sans-serif;
  font-size: ________px;
  font-weight: ________;
  border-radius: ________px;
  transition: background-color ________ ease, color ________ ease;
  box-shadow: 0 ________px ________px rgba(0, 0, 0, 0.2);
}.new-section-button:hover {
  background-color: ________;
  color: ________;
}`}</pre>

            <h3 className={styles.subSectionTitle}>Шаг 7: Стили для футера</h3>
            <pre className={styles.code}>{`footer {
  flex-shrink: ________;
  text-align: ________;
  padding: ________px;
  background-color: ________;
  border-top: ________px solid #e6e6e6;
}footer p {
  font-family: '________', sans-serif;
  font-size: ________px;
  color: ________;
}`}</pre>

            <h3 className={styles.subSectionTitle}>Шаг 8: Добавление контактной информации (ДОПОЛНИТЕЛЬНОЕ ЗАДАНИЕ)</h3>
              <p className={styles.text}>
                <strong>Расширьте футер</strong>, добавив контактную информацию автора курса. 
                Создайте блок с иконками социальных сетей (VK и Telegram) под копирайтом.
              </p>
              <p className={styles.text}>
                <strong>Что нужно сделать:</strong>
              </p>
              <ol>
                <li>Добавьте контейнер для иконок с классом <code>footer-social</code></li>
                <li>Используйте иконки, которые найдете в интернете</li>
                <li>Создайте гиперссылки на ваши реальные профили</li>
              </ol>
              <p className={styles.text}>
                <strong>Подсказка:</strong> Используйте Flexbox для выравнивания иконок по центру.
              </p>

            <h3 className={styles.subSectionTitle}>Шаг 9: Проверка результата и важное замечание</h3>
              <p className={styles.text}>
                Сохраните файлы и откройте сайт в браузере.
              </p>
              <div className={styles.screenshotPlaceholder}>
                <img src="./images/Topic7/screen-7.webp" alt="screen-7" className={styles.screenshotImage} />
                <p className={styles.screenshotText}>Рис.7 — Как должен выглядеть результат</p>
              </div>
              <p className={styles.text}>
                <strong>Важное замечание:</strong> Наш текущий сайт пока не идентичен оригиналу — 
                <strong> мы специально пропустили финальный баннер</strong>, чтобы добавить его именно в этой теме. 
                После выполнения всех шагов у вас должен появиться:
              </p>
              <ul>
                <li>Финальный баннер с затемнённым изображением торта между секцией About и футером</li>
                <li>Эмоциональный заголовок "Indulge in Sweet Bliss" красивым курсивным шрифтом</li>
                <li>Призыв к действию "Try It Now" с hover-эффектом инверсии цветов</li>
                <li>Минималистичный футер (или расширенный, если выполнили доп. задание)</li>
              </ul>
              <p className={styles.text}>
                Только <strong>после добавления секции new-section</strong> структура нашего сайта 
                станет полной и будет соответствовать финальному дизайну Frosted Muse.
              </p>
          </section>
        )}

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Итогом работы будет</h2>
          <p className={styles.text}>
            Вы завершили визуальную часть сайта <strong>Frosted Muse</strong>, добавив финальный баннер с эмоциональным 
            призывом к действию и профессиональный подвал. Вы освоили работу с CSS-фильтрами (<code>brightness()</code>), 
            закрепили технику абсолютного позиционирования для точного размещения текста поверх изображений, применили 
            типографические приёмы для повышения читаемости (<code>text-shadow</code>), создали эффективную кнопку CTA с 
            инвертирующимися цветами при наведении, а также спроектировали минималистичный, но информативный футер, 
            соответствующий современным стандартам веб-дизайна.
          </p>
          <div className={styles.endImg}>
            <img src='./images/General/general.webp' alt='general-logo'></img>
          </div>
        </section>
      </div>

      <div className={styles.navigation}>
        <NavLink to="/topic8" className={styles.nextButton}>
          К следующей теме
        </NavLink>
        <BackProgress onReset={handleResetProgress} testPassed={isTestPassed} />
      </div>
    </div>
  );
};

export default Topic7;