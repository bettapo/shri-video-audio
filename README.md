# Стенд по мультимедиа в браузере 🎥🎧

Cтенд содержит несколько простых примеров с аудио и видео, а также демонстрирует работу с Media Source Extensions и Web Audio API.

> В приложении простейший сервер на Express.js для отдачи статичных файлов и примеров. Он нужен, чтобы избежать ограничений браузеров ([CORS](https://developer.mozilla.org/docs/Web/HTTP/Guides/CORS)) при работе с [MSE](https://developer.mozilla.org/docs/Web/API/Media_Source_Extensions_API), [fetch](https://developer.mozilla.org/docs/Web/API/Fetch_API) и другими API из локальных файлов — все запускается через HTTP и работает корректно и не требует никаких настроек.

---

## 📚 Структура стенда

- **./**`index.html` + **./**`index.js` — демонстрация потокового воспроизведения видео и аудио с использованием Media Source Extensions (MSE).
- **examples/** — отдельные странички с базовыми и продвинутыми примерами:
    - `audio.html` — простой HTML-аудио элемент с контролами;
    - `video.html` — базовый видео-тег с проверкой поддержки кодеков;
    - `video_with_source.html` — видео с несколькими источниками (`<source>`);
    - `web_audio_api.html` — пример работы с Web Audio API, включает регулировку громкости и панорамирования.

---

## ⚙️ Установка и запуск

1. Клонируйте репозиторий и установите зависимости:
    ```bash
    npm install
    ```
2. Для автоматического перезапуска сервера при изменениях кода используется пакет [`nodemon`](https://github.com/remy/nodemon). Он **НЕ добавлен в зависимости проекта**, поэтому:

    - Если перезагрузка при изменениях не требуется
        ```bash
        node server.js
        ```
    - Если хотите использовать автоматическую перезагрузку сервера – установите `nodemon`:
        - локально в проект:
            ```bash
            npm install -D nodemon
            ```
        - глобально на устройство:
            ```bash
            npm install -g nodemon
            ```

3. Запустите приложение:

    ```bash
    npm start
    ```

    Откройте в браузере ссылку из терминала.

4. После запуска сервера откройте в браузере страницу по адресу:  
   [http://localhost:3000/index.html](http://localhost:3000/index.html)  
   **Обратите внимание**, что просто `localhost:3000` откроет пустую страницу; нужен полный путь с `/index.html`.
