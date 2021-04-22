Необходимо доработать лабораторную работу №2, добавив реализацию серверной части приложения. Серверная часть реализуется на NodeJS, допустимо использовать фреймворки вроде Express или Sails.

Приложение в этой работе становится клиент-серверным, запросы данных о погоде к внешнему API и хранение данных об избранных городах переносятся на сервер. Запросы с клиента отправляются только к самостоятельно реализованной серверной части.

Для получения данных о погоде из внешнего API по городу используется запрос на GET-endpoint /weather/city (например: /weather/city?q=Moscow), по координатам – /weather/coordinates (например: /weather/coordinates?lat=123&long=456). Если город не найден, должен возвращаться соответствующий ответ с 404 статусом.

Данные об избранных городах хранятся в базе данных, можно использовать любое SQL/NoSQL решение. Для работы с избранными городами на сервере должен быть реализован endpoint /favourites, обрабатывающий POST-запросы на добавление города и DELETE-запросы на удаление конкретного города из списка. GET-запрос на /favourites возвращает список избранных городов.

Клиентская логика должна быть адаптирована с учетом этих изменений, включая обработку возможных ошибок. Изменения на клиенте должны применяться только после получения соответствующего ответа с сервера (например, удаление города из избранного).

