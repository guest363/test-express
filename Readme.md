## Describe

Тестовое задание от IT Recruiting Agency
## Task

Стэк:
- NodeJS
- TypeScript
- express
- mongodb (mongoose)
- axios (or any http client library)

Что нужно сделать:

1. Создать коллекции (таблицы) в базе.  ✔️

- users (login, email, password (md5), registerDate (data)) 
- photos (albumId (ref to album collection), title, url, thumbnailUrl, owner (ref to users collection))
- albums (title, owner)

2. Эндпоинт авторизации (/login). Принимает логин (или почту) и пароль.  ✔️
   Если пришла почта - валидировать и искать по почте иначе поиск по логину. 
   Если данные нашлись в БД - отдать юзеру токен (можно использовать jwt). 
   Если данные не нашлись - вывести ошибку. 

3. Эндпоинт регистрации (/register). Принимает логин, почту, пароль. ✔️

4. Эндпоинт загрузки фотографий (/load-photos). ✔️
   Сделать проверку на авторизацию
   Если юзер авторизован, загрузить в базу под его именем фотки с сайта
   http://jsonplaceholder.typicode.com/photos, разбить на альбомы. Так как
   в запросе нет название альбома, можно просто писать порядковый номер

5. Эндпоинт получения всех фотографий с возможностью выбора страницы (/get-photos). ✔️
   Принимает ownerid, page, maxcount
   ownerid - если присутствует то выводит фотографии указанного юзера
   page - страница
   maxcount - максимальное кол-во фотографий, которое отдаётся

6. Эндпоинт удаления фотографий (/delete-photo) ✔️
   Сделать проверку на авторизацию
   Принимает photoid (айдишник фотографии с базы, может иметь несколько значений через запятую)

7. Эндпоинт удалениен альбома (/delete-album) ✔️
   Сделать проверку на авторизацию
   Принимает albumid (айдишник фотографии с базы, может иметь несколько значений через запятую)
   При удалении альбома - удалять все фотографии с этим альбомом

8. Эндпоинт изменения названия альбома (/change-album-title)  ✔️
   Сделать проверку на авторизацию
   Принимает albumid, new_album_name

Будет плюсом:

- Использование аггрегаций где возможно

Обязательно:

- Писать на typescript с описанием всех структур  ✔️

## API

| Path        | HTTP method | Params | Request Auth | Result |
| :---------- | :---------- | :----- | :----------- | :----- |
| /login | POST |  { login, password, email } = req.body | false | токен |
| /register | POST |  req.body | false | код ответа |
| /get-photos?ownerId={}&page={}&maxCount={} | GET | { ownerId, page, maxCount } = req.params | false | массив фото |
| /load-photos | GET |  -  | true | код ответа |
| /delete-photo | DELETE |  { photoId } = req.params | true | код ответа |
| /delete-album | DELETE |  { albumId } = req.params | true | код ответа |
| /change-album-title | PUT |  { albumId, new_album_name } = req.body | true | обновленный альбом |

## RUN

### In Docker
На машине должен быть установлен Docker
Выполнить:
- docker-compose build
- npm run docker:run

После этого приложение доступно по адресу localhost:{PORT} , PORT берется из файла .env и по умолчанию 4001

### Local
На машине должна работать база MongoDb и слушать порт заданный в перемеенной окружения MONGO_PORT, по умолчанию 5000


Выполнить:
- в файле .env изменить значение переменной окружения MONGO_HOST=host.docker.internal на MONGO_HOST=localhost 
- npm install
- npm run dev

После этого приложение доступно по адресу localhost:{PORT} , PORT берется из файла .env и по умолчанию 4001

