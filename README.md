# Sovcombank Team Challenge 2023

## Команда Lambda 2

Совстав команды:
- Владлена
- Ринат
- Андрей
- Илья

## Технические сведения

[Репа где велась разработка с историей(link)](https://github.com/PotashinAndrey/SCB_challenge23)

### Стек:

> `nodejs`, `postgres`, `fastify`, `react`, `effector`, `javascript`, `typescript`, `antd`

### настройки
  Для локального развёртывантя web-приложения понадобится **nodeJS** (20.2.0 Current), **PostgreSQL** (v 15.3)

- Создать пустую БД в postgres (порт 5432)
- Склонировать репозиторий
- Выполнить `npm install`
- Из корня проекта выпонлить

> В зависимости от конфигурации вашего pstrgess и портов возможно нужно будет настроить конфиг `.\config\local.ts` по образу `.\config\global.ts`


```shell
# запуск сервера фронта
$ npm run frontend

# запуск сервера бека и миграций для БД
$ npm run backend
```

> CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; если нет genarete_v4

> Команду старта backend(`npm run backend`) сервера лучше выполнять в **bash** оболочке

## Описание архитектуры


