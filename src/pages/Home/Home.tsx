import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Home.module.scss';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
    const topics = [
        { id: 1, title: 'Настройка окружения и первая страница', description: 'Установка VS Code, создание файлов, базовая HTML-структура.' },
        { id: 2, title: 'Создаем шапку сайта: HTML-разметка', description: 'Верстаем логотип, навигацию, иконку корзины.' },
        { id: 3, title: 'Оформляем шапку: первые стили CSS', description: 'Шрифты, цвета, фон, фиксированное позиционирование.' },
        { id: 4, title: 'Главный баннер: HERO-секция', description: 'Большое фоновое изображение, заголовки, кнопка.' },
        { id: 5, title: 'Секция "Assortment" с сеткой товаров', description: 'CSS Grid, адаптивные изображения, сетка из 4 товаров' },
        { id: 6, title: 'Секция "About" с текстом и галереей', description: 'Текстовый блок + 3 изображения в сетке.' },
        { id: 7, title: 'Финальный баннер и подвал', description: 'Второй баннер с призывом, футер с копирайтом.' },
        { id: 8, title: 'Адаптивный дизайн и анимации', description: 'Медиазапросы для адаптивности и CSS-анимации при скролле.' },
        { id: 9, title: 'Основы JavaScript: переменные и функции', description: 'Что такое JS, переменные, простые функции.' },
        { id: 10, title: 'Основы JavaScript: переменные и функции ч.2', description: 'Что такое JS, переменные, простые функции. ч.2' },
        { id: 11, title: 'DOM: поиск и изменение элементов', description: 'getElementById, querySelector, изменение текста/стилей.' },
        { id: 12, title: 'События: клики и обработчики', description: 'Делаем работающий бургер-меню.' },
        { id: 13, title: 'Работа с формами: валидация', description: 'Форма заказа, проверка email/телефона.' },
        { id: 14, title: 'Работа с localStorage', description: 'Сохранение данных формы, простые настройки.' },
        { id: 15, title: 'Публикация сайта на GitHub Pages', description: 'GitHub, загрузка кода, настройка хостинга.' },
    ];

    return (
        <div className={styles.home}>
            <motion.div
                className={styles.header}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>Методические указания<br /> по основам веб-разработки: HTML, CSS, JavaScript</h1>
                    <p className={styles.subtitle}>
                        Практический курс по созданию современного лендинга <strong>Frosted Muse</strong> с нуля до публикации
                    </p>
                </div>
                <div className={styles.courseInfo}>
                    <h2 className={styles.sectionTitle}>О курсе</h2>
                    <p className={styles.description}>
                        Этот курс предназначен для студентов СТГАУ, факультета: "цифровых технологий", изучающих веб-разработку. За 15 занятий вы создадите
                        полноценный адаптивный лендинг "Frosted Muse", который позволяет знакомиться с ассортиментом, оформлять заказы и
                        изучать историю кондитерской. Вы познакомитесь с современным стеком технологий: HTML5, CSS3, JavaScript,
                        а также научитесь выгружать код в репозиторий GitHub и публиковать сайт на хостинге.
                    </p>
                    <div className={styles.description}>
                        <strong>Что вы создадите:</strong>
                        <ul>
                            <li>Адаптивный лендинг с хедером, секциями и футером.</li>
                            <li>Интерактивное бургер-меню для мобильных устройств.</li>
                            <li>Форму заказа с валидацией на JavaScript.</li>
                            <li>Анимации при скролле и hover-эффекты.</li>
                            <li>Систему сохранения данных формы через localStorage.</li>
                        </ul>
                    </div>
                    <div className={styles.description}>
                        <strong>Что вы изучите:</strong>
                        <ul>
                            <li>Семантическую HTML-разметку и основы доступности.</li>
                            <li>Современный CSS: Flexbox, Grid, медиазапросы.</li>
                            <li>Основы JavaScript и работу с DOM.</li>
                            <li>Обработку событий и валидацию форм.</li>
                            <li>Работу с Git и публикацию на GitHub Pages.</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.author}>
                    <img src="./images/General/me.webp" alt="Автор курса" className={styles.profileImage} />
                    <div className={styles.authorInfo}>
                        <p className={styles.authorText}>Автор курса</p>
                        <p className={styles.authorName}>Зайцев Артём Сергеевич</p>
                        <p className={styles.authorDetails}>Студент 3 курса СТГАУ</p>
                        <p className={styles.authorDetails}>Факультет цифровых технологий</p>
                        <p className={styles.authorDetails}>Направление "Информационные системы и технологии в бизнесе"</p>
                    </div>
                </div>
                <div className={styles.author}>
                    <img src="./images/General/glor.webp" alt="Автор курса" className={styles.profileImage} />
                    <div className={styles.authorInfo}>
                        <p className={styles.authorText}>Автор курса</p>
                        <p className={styles.authorName}>Тулузакова Глория Юрьевна</p>
                        <p className={styles.authorDetails}>Студентка 3 курса СТГАУ</p>
                        <p className={styles.authorDetails}>Факультет цифровых технологий</p>
                        <p className={styles.authorDetails}>Направление "Информационные системы и технологии в бизнесе"</p>
                    </div>
                </div>
            </motion.div>

            <div className={styles.topicsContainer}>
                <h2 className={styles.sectionTitle}>Список тем</h2>
                <div className={styles.topicsGrid}>
                    {topics.map((topic) => (
                        <NavLink
                            key={topic.id}
                            to={`/topic${topic.id}`}
                            className={({ isActive }) => `${styles.topicCard} ${isActive ? styles.active : ''}`}
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            >
                                <span className={styles.topicNumber}>Тема {topic.id}</span>
                                <h3 className={styles.topicTitle}>{topic.title}</h3>
                                <p className={styles.topicDescription}>{topic.description}</p>
                                <div className={styles.topicHoverEffect}></div>
                            </motion.div>
                        </NavLink>
                    ))}
                </div>
                <NavLink to="/topic1" className={styles.startButton}>
                    Начать курс
                </NavLink>
            </div>
        </div>
    );
};

export default Home;
