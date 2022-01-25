# Task

Стэк:

- NodeJS
- TypeScript
- express
- mongodb (mongoose)
- axios (or any http client library)

Что нужно сделать:

1. Создать коллекции (таблицы) в базе.

- users (login, email, password (md5), registerDate (data)) ✔️
- photos (albumId (ref to album collection), title, url, thumbnailUrl, owner (ref to users collection))
- albums (title, owner)

2. Эндпоинт авторизации (/login). Принимает логин (или почту) и пароль.
   Если пришла почта - валидировать и искать по почте иначе поиск по логину. ✔️
   Если данные нашлись в БД - отдать юзеру токен (можно использовать jwt). ✔️
   Если данные не нашлись - вывести ошибку. ✔️

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

6. Эндпоинт удаления фотографий (/delete-photo)
   Сделать проверку на авторизацию
   Принимает photoid (айдишник фотографии с базы, может иметь несколько значений через запятую)

7. Эндпоинт удалениен альбома (/delete-album)
   Сделать проверку на авторизацию
   Принимает albumid (айдишник фотографии с базы, может иметь несколько значений через запятую)
   При удалении альбома - удалять все фотографии с этим альбомом

8. Эндпоинт изменения названия альбома (/change-album-title)
   Сделать проверку на авторизацию
   Принимает albumid, new_album_name

Будет плюсом:

- Использование аггрегаций где возможно

Обязательно:

- Писать на typescript с описанием всех структур

## Questions

- Зачем в качестве базы где есть связи между сущностями выбранна MongoDB ?
