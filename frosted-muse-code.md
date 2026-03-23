# Frosted Muse - Полный код проекта

Этот файл содержит эталонный код всех частей проекта Frosted Muse.
Студенты могут обращаться к нему для проверки своего кода или поиска ошибок.

---

## 📄 HTML (index.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Frosted Muse</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/media.css">
    <link href="https://fonts.googleapis.com/css2?family=Ballet&family=Imperial+Script&family=Lexend:wght@100..900&display=swap" rel="stylesheet">
    <link rel="icon" href="img/ssicon.png">
</head>
<body>
    <script src="js/script.js"></script>
    <main>
        <!-- HEADER -->
        <header>
            <div class="header-container">
                <!-- Burger Checkbox Input -->
                <input type="checkbox" id="burger-checkbox" class="burger-checkbox">
                <label for="burger-checkbox" class="burger-menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
                
                <div class="logo">
                    <p>Frosted Muse</p>
                </div>
                
                <div class="cart-icon">
                    <img src="https://img.icons8.com/ios-filled/50/shopping-cart.png" alt="Cart Icon">
                </div>
            </div>
            
            <nav id="nav-menu">
                <div class="mobile-logo">Frosted Muse</div>
                <a href="#">Assortment</a>
                <a href="#">About</a>
                <a href="#order-section">Order</a>
                <a href="#">Delivery</a>
            </nav>
        </header>

        <!-- HERO SECTION -->
        <div class="hero">
            <img src="img/background1.jpg" class="hero-img" alt="Cake Background">
            <div class="hero-content">
                <h1>Frosted Muse</h1>
                <p>turn the cake into art</p>
                <a href="#" class="hero-button">Choose a cake</a>
            </div>
        </div>

        <!-- ASSORTMENT SECTION -->
        <section class="assortment">
            <h2>Assortment</h2>
            <div class="assortment-grid">
                <div class="assortment-item">
                    <img src="img/block2.1.jpg" alt="Cakes">
                    <h3>Cakes</h3>
                </div>
                <div class="assortment-item">
                    <img src="img/block2.2.jpg" alt="Baking">
                    <h3>Baking</h3>
                </div>
                <div class="assortment-item">
                    <img src="img/block2.3.jpg" alt="Wedding Cakes">
                    <h3>Wedding Cakes</h3>
                </div>
                <div class="assortment-item">
                    <img src="img/block2.4.jpg" alt="Cupcakes">
                    <h3>Cupcakes</h3>
                </div>
            </div>
        </section>

        <!-- ABOUT SECTION -->
        <section class="about">
            <h2>About</h2>
            <div class="about-content">
                <div class="about-text">
                    <p>We bake the cake and prepare the cream as you want, using only natural ingredients of high quality. Putting the bake cake we are waiting for the biscuit to inflate and soak. We think over the design, the color scheme and every detail of the cake and proceed to the donor. <a href="#" class="about-button">Learn more</a></p>
                </div>
                <div class="about-images">
                    <img src="img/block3.1.jpg" alt="About Image 1">
                    <img src="img/block3.2.jpg" alt="About Image 2">
                    <img src="img/block3.3.jpg" alt="About Image 3">
                </div>
            </div>
        </section>

        <!-- ORDER FORM SECTION (Added in Topic 13) -->
        <section class="order-section" id="order-section" style="padding: 60px 40px; background: #fff; text-align: center;">
            <h2 style="font-family: 'Ballet', cursive; font-size: 36px; color: #6B4E31; margin-bottom: 30px;">Make an Order</h2>
            <form id="order-form" style="max-width: 500px; margin: 0 auto; display: flex; flex-direction: column; gap: 15px;">
                <input type="text" name="name" placeholder="Your Name" style="padding: 15px; border: 1px solid #ccc; font-family: 'Lexend', sans-serif;">
                <input type="tel" name="phone" placeholder="Phone Number" style="padding: 15px; border: 1px solid #ccc; font-family: 'Lexend', sans-serif;">
                <button type="submit" class="hero-button" style="border: none; cursor: pointer;">Send Order</button>
            </form>
        </section>

        <!-- NEW FINAL SECTION -->
        <section class="new-section">
            <img src="img/top-view-creamy-delicious-cake-with-strawberries-white-surface-birthday-cream-tea-cake-biscuit-sweet.jpg" class="new-section-img" alt="Background Image 3">
            <div class="new-section-content">
                <h2>Indulge in Sweet Bliss</h2>
                <p>our signature dessert awaits you</p>
                <a href="#" class="new-section-button">Try It Now</a>
            </div>
        </section>
    </main>

    <footer>
        <p>© 2023 Frosted Muse. All rights reserved.</p>
    </footer>
</body>
</html>
```

---

## 🎨 CSS (css/style.css)

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Lexend', sans-serif;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #f5f5f5;
}

main {
    flex: 1 0 auto;
    background-color: #f5f5f5;
}

/* Header */
header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 40px;
    background-color: #f7f5f1;
    position: fixed;
    top: 0;
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    height: 70px;
    width: 100%;
}

.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    position: relative;
}

.logo p {
    font-family: 'Imperial Script', cursive;
    font-size: 36px;
    color: #6B4E31;
    transition: all 0.3s ease;
}

.burger-menu {
    display: none;
}

nav {
    display: flex;
    align-items: center;
    gap: 30px;
}

nav.active {
    left: 0; /* Для JS-открытия меню */
}

nav a {
    text-decoration: none;
    color: #6B4E31;
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    transition: color 0.3s ease;
}

nav a:hover {
    color: #F5E8E4;
}

.cart-icon img {
    height: 20px;
    filter: grayscale(100%) sepia(100%) hue-rotate(10deg) saturate(200%);
}

.mobile-logo {
    display: none;
}

/* Hero Section */
.hero {
    position: relative;
    text-align: center;
    padding-top: 70px;
    margin-bottom: 20px;
}

.hero-img {
    width: 100%;
    height: 800px;
    object-fit: cover;
    object-position: center;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.hero-content {
    position: absolute;
    top: 38%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #6B4E31;
    z-index: 10;
    background-color: rgba(255, 255, 255, 0.56);
    padding: 20px;
}

.hero-content h1 {
    font-family: 'Lexend', sans-serif;
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 8px;
}

.hero-content p {
    font-family: 'Imperial Script', cursive;
    font-size: 20px;
    margin-bottom: 15px;
}

.hero-button {
    display: inline-block;
    padding: 12px 24px;
    background-color: #6B4E31;
    color: #fff;
    text-decoration: none;
    font-size: 16px;
    font-weight: 500;
    border-radius: 25px;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.hero-button:hover {
    background-color: #F5E8E4;
    color: #6B4E31;
}

/* Assortment Section */
.assortment {
    padding: 60px 40px;
    margin-top: -3px;
    text-align: center;
    background-color: #f5f5f5;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.assortment h2 {
    font-family: 'Ballet', cursive;
    font-size: 36px;
    color: #6B4E31;
    margin-bottom: 40px;
}

.assortment-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
}

.assortment-item img {
    width: 100%;
    height: 450px;
    object-fit: contain;
}

.assortment-item h3 {
    font-family: 'Lexend', sans-serif;
    font-size: 18px;
    font-weight: 500;
    color: #333;
    margin-top: 10px;
}

/* About Section */
.about {
    padding: 60px 40px;
    margin-top: 20px;
    text-align: center;
    background-color: transparent;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.about h2 {
    font-family: 'Ballet', cursive;
    font-size: 36px;
    color: #6B4E31;
    margin-bottom: 40px;
}

.about-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
}

.about-text {
    flex: 1;
    text-align: left;
}

.about-text p {
    font-family: 'Lexend', sans-serif;
    font-size: 16px;
    color: #333;
    line-height: 1.6;
    margin-bottom: 20px;
}

.about-button {
    font-family: 'Lexend', sans-serif;
    font-size: 16px;
    color: #6B4E31;
    text-decoration: underline;
    transition: color 0.3s ease;
}

.about-button:hover {
    color: #F5E8E4;
}

.about-images {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 10px;
}

.about-images img:nth-child(1) {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
}

.about-images img:nth-child(2) {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
}

.about-images img:nth-child(3) {
    grid-column: 2 / 3;
    grid-row: 1 / 3;
}

.about-images img {
    width: 100%;
    height: 150px;
    object-fit: cover;
}

.about-images img:nth-child(3) {
    height: 310px;
}

/* New Section */
.new-section {
    position: relative;
    text-align: center;
    margin-top: 20px;
    background-color: #f7f5f1;
}

.new-section-img {
    width: 100%;
    height: 700px;
    object-fit: cover;
    object-position: center;
    filter: brightness(0.7);
}

.new-section-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #fff;
    z-index: 10;
}

.new-section-content h2 {
    font-family: 'Ballet', cursive;
    font-size: 48px;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.new-section-content p {
    font-family: 'Lexend', cursive;
    font-size: 24px;
    margin-bottom: 20px;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
}

.new-section-button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #6B4E31;
    color: #ffffff;
    text-decoration: none;
    font-family: 'Lexend', sans-serif;
    font-size: 16px;
    font-weight: 500;
    border-radius: 25px;
    transition: background-color 0.3s ease, color 0.3s ease;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.new-section-button:hover {
    background-color: #F5E8E4;
    color: #a37373;
}

/* Footer */
footer {
    flex-shrink: 0;
    text-align: center;
    padding: 20px;
    background-color: #f7f5f1;
    border-top: 1px solid #e6e6e6;
}

footer p {
    font-family: 'Lexend', sans-serif;
    font-size: 14px;
    color: #333;
}

/* Scrolled Header State */
.scrolled {
  background-color: #6B4E31 !important;
  transition: background-color 0.3s ease;
}

.scrolled .logo p {
  color: #F5E8E4 !important;
}

.scrolled nav a {
  color: #F5E8E4 !important;
}

.scrolled .cart-icon img {
  filter: brightness(0) invert(1);
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(60px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.hero-content > * { opacity: 0; animation: fadeInUp 1.5s ease-out forwards; }
.hero-content h1 { animation-delay: 0.2s; }
.hero-content p { animation-delay: 0.4s; }
.hero-button { animation-delay: 0.6s; }

.assortment h2 { opacity: 0; animation: fadeInUp 1.5s ease-out forwards; animation-delay: 0.2s; }
.assortment-item { opacity: 0; animation: fadeInUp 1.5s ease-out forwards; }
.assortment-item:nth-child(1) { animation-delay: 0.3s; }
.assortment-item:nth-child(2) { animation-delay: 0.4s; }
.assortment-item:nth-child(3) { animation-delay: 0.5s; }
.assortment-item:nth-child(4) { animation-delay: 0.6s; }

.about h2 { opacity: 0; animation: fadeInUp 1.5s ease-out forwards; animation-delay: 0.2s; }
.about-text { opacity: 0; animation: fadeInUp 1.5s ease-out forwards; animation-delay: 0.4s; }
.about-images img { opacity: 0; animation: fadeInUp 1.5s ease-out forwards; }
.about-images img:nth-child(1) { animation-delay: 0.5s; }
.about-images img:nth-child(2) { animation-delay: 0.6s; }
.about-images img:nth-child(3) { animation-delay: 0.7s; }

.new-section-content > * { opacity: 0; animation: fadeInUp 1.5s ease-out forwards; }
.new-section-content h2 { animation-delay: 0.2s; }
.new-section-content p { animation-delay: 0.4s; }
.new-section-button { animation-delay: 0.6s; }
```

---

## 📱 CSS Media Queries (css/media.css)

```css
/* Мобильные устройства */
@media (max-width: 768px) {
  /* Burger Menu Button Styles */
  .burger-checkbox {
    display: none;
  }

  .burger-menu {
    display: flex;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    z-index: 1001;
  }

  .burger-menu span {
    width: 25px;
    height: 3px;
    background: #6B4E31;
    transition: all 0.3s ease;
  }

  /* Animations for Burger Icon */
  #burger-checkbox:checked ~ .burger-menu span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  #burger-checkbox:checked ~ .burger-menu span:nth-child(2) {
    opacity: 0;
  }

  #burger-checkbox:checked ~ .burger-menu span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
  }

  /* Mobile Navigation Styles */
  nav {
    position: fixed;
    top: 0;
    left: -100%;
    width: 80%;
    height: 100vh;
    background: #f7f5f1;
    flex-direction: column;
    padding: 80px 20px 20px;
    transition: left 0.3s ease;
    z-index: 1000;
  }

  /* Show menu when checkbox is checked (CSS method) */
  #burger-checkbox:checked ~ nav {
    left: 0;
  }
  
  /* Or when class 'active' is added via JS */
  nav.active {
    left: 0;
  }

  .logo {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .hero-img {
    height: 500px;
  }

  .hero-content {
    width: 80%;
    padding: 20px;
    background: rgba(255, 255, 255, 0.6);
  }

  .hero-content h1 {
    font-size: 28px;
  }
  /* ... other responsive adjustments ... */
}
```

---

## ⚡ JavaScript (js/script.js)

```javascript
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Работа с Header при скролле (Тема 12) ---
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    // --- 2. Мобильное Бургер-Меню (Тема 12) ---
    const burgerCheckbox = document.getElementById('burger-checkbox');
    const navMenu = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');

    // Открытие/закрытие по клику на чекбокс (или кнопку)
    // Если используем checkbox hack, этот код опционален, но полезен для контроля
    burgerCheckbox.addEventListener('change', function() {
        if (burgerCheckbox.checked) {
            navMenu.classList.add('active');
            document.body.style.overflow = 'hidden'; // Блокируем скролл фона
        } else {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Закрытие меню при клике на любую ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            burgerCheckbox.checked = false; // Снимаем галочку
            navMenu.classList.remove('active'); // Убираем класс
            document.body.style.overflow = ''; // Возвращаем скролл
        });
    });


    // --- 3. Форма заказа: Валидация и LocalStorage (Темы 13 и 14) ---
    const orderForm = document.getElementById('order-form');
    
    if (orderForm) {
        const nameInput = orderForm.querySelector('input[name="name"]');
        const phoneInput = orderForm.querySelector('input[name="phone"]');

        // --- Восстановление данных (localStorage) ---
        // Пытаемся найти сохраненные черновики
        const savedName = localStorage.getItem('order_name_draft');
        const savedPhone = localStorage.getItem('order_phone_draft');

        if (savedName) nameInput.value = savedName;
        if (savedPhone) phoneInput.value = savedPhone;

        // --- Сохранение при вводе (localStorage) ---
        nameInput.addEventListener('input', () => {
            localStorage.setItem('order_name_draft', nameInput.value);
        });

        phoneInput.addEventListener('input', () => {
            localStorage.setItem('order_phone_draft', phoneInput.value);
        });

        // --- Валидация при отправке ---
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Останавливаем стандартную отправку

            let isValid = true;

            // Проверка имени
            if (nameInput.value.trim().length < 2) {
                isValid = false;
                nameInput.style.border = '2px solid red';
                alert('Пожалуйста, введите корректное имя');
            } else {
                nameInput.style.border = '1px solid #ccc';
            }

            // Проверка телефона (упрощенная)
            if (phoneInput.value.trim().length < 6) {
                isValid = false;
                phoneInput.style.border = '2px solid red';
                alert('Введите корректный номер телефона');
            } else {
                phoneInput.style.border = '1px solid #ccc';
            }

            if (isValid) {
                // Если всё хорошо:
                alert('Спасибо! Ваш заказ принят. Мы перезвоним вам.');
                
                // Очищаем форму и хранилище
                orderForm.reset();
                localStorage.removeItem('order_name_draft');
                localStorage.removeItem('order_phone_draft');
            }
        });
    }
});
```
