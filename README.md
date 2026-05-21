# Global-Travel-Hub

Задача:

1)Глянути курс https://www.youtube.com/watch?v=Rr9QmVLqoP4&list=PLenwk9TUJzJ6ep0oogRRQZHzPMtTGKqF1

datepicker


1)розібратися як він написаний 
2)Розбити Css JS .
3)Зроби адаптивність (Додати viewport-meta, щоб мобільний рендер був передбачуваним.) та viewport-meta на кожній сторінці.
4)Спільний css/styles.css підключений з усіх сторінок.
5)Однакові header, footer, main відступи.
6)Принаймні один multi-column grid (каталог, features тощо).
7)Сторінки не ламаються на 360 px і на 1200 px
8)Один спільний css/styles.css із design tokens.
9)Оформлені header, footer, main.container на всіх сторінках.
10)Адекватний вигляд на мобільній ширині (без горизонтального скролу).
11)JSON-файл під public/data/ зі своїми сідами.
Сторінка завантажує файл на старті та рендерить елементи.
Помітний індикатор loading і повідомлення про помилку при fail.
Сторінка завантажує цей файл через fetch на старті.
Видимі стани loading та error.
Contacts-сторінка з текстовими блоками і формою.
Форма зберігає запис у localStorage під окремим ключем.
Після sign-in форма отримує імʼя та email.
Admin бачить список запитів і може змінити статус.
Tailwind згенерував dist/tailwind.css (або аналог), підключений після css/styles.css.
На 2–3 сторінках є елементи, зверстані утилітарними класами.
Дизайн-токени з заняття 03 не зникли: вони співіснують з Tailwind.
Робочий Tailwind-білд і підключений файл.
Хоча б два реальні приклади utility-класів у вашому проєкті.
Стара кастомна база не зламана.

✅

=====================   Додаткові завдання   =====================
* Створіть 404.html з дружнім текстом і лінком на головну.
* Додайте видимий маркер «поточна сторінка» через клас на активному посиланні.
* Додайте skip-link (<a href="#main">) для користувачів із клавіатурою.
* Додати пару токенів для dark/light-режимів і перемикач класу на body.
* Зробити типографічну шкалу h1–h4 на основі коефіцієнтів базового розміру.
* Зробити sticky-header через position: sticky.

______________________________________________________________________________


==============   Адаптивні брекпоінти   ==============

@media (max-width: 720px) {
  .site-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-1);
  }

  .cards {
    grid-template-columns: 1fr;
  }
}

repeat(auto-fill, minmax(...)) зазвичай знімає потребу в ручних media-queries для колонок. Media-query використовуйте тоді, коли форма лейауту змінюється.
______________________________________________________



==============   Семантична базова сторінка   ==============

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>My site — Home</title>
    <link rel="stylesheet" href="css/styles.css" />
  </head>
  <body>
    <header class="site-header">...</header>
    <main class="container">...</main>
    <footer class="site-footer">...</footer>
    <script src="js/app.js" defer></script>
  </body>
</html>

==============================================================


https://supabase.com/

npm install @supabase/supabase-js

sb_publishable_1YigaD3BnGQohHM8ly-peA_yB-0oYbG                  API key
https://supabase.com/docs/reference/javascript/select


==== Заняття 01 ====
Тема: онлайн-система для пошуку, бронювання та управління туристичними послугами (тури, готелі, трансфери, екскурсії).
Аудиторія: молоді мандрівники та сім’ї, які самостійно планують подорожі онлайн і хочуть швидко порівнювати варіанти.
Цінність: сервіс допомагає зібрати всі туристичні послуги в одному місці та швидко оформити подорож без зайвих кроків.

