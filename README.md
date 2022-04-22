# Require in order to start

## file .env

```xsl
environment=production
DATABASE_USER=raccoon
DATABASE_PASSWORD=test
DATABASE_DB=raccoon-db
DATABASE_URL="postgresql://raccoon:test@localhost:5432/raccoon-db?schema=public"
port=3000
```

### environment enum

-   local
-   develop
-   production

---

# how to update

1. create new branch
2. update Changelog.md

    1. version is set to

        ```
        {Rewrite}.{major}.{minor}
        ```

    2. type of change

        | keyword  | description                                             |
        | -------- | ------------------------------------------------------- |
        | Feature  | create new feature route                                |
        | Enhance  | update form, message, business logic                    |
        | Fixed    | fix bug change not effect form, message, business logic |
        | Refactor | rename variable, class, function, file or reformat code |
        | Rewrite  | rewrite code...                                         |

3. create pull request to `dev`

# branch strategy

```
master -> dev -> feature
```

| keyword        | description                   |
| -------------- | ----------------------------- |
| master         | on production                 |
| dev            | on develop environment        |
| {feature_name} | on local or under development |

# Code Structure

## Controller

    route setup

## Facade

## Service

## Repository

## Form

## Entity

## Model

## Message

---

# TODO

1. swagger
2. ResponseModel
3. [Optional] EnvironmentConfig
