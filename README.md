# Require in order to start

## file .env

```
environment=production
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

3. update version on package.json
4. create pull request to `dev`

# branch strategy

```
master -> dev -> feature
```

| keyword        | description                   |
| -------------- | ----------------------------- |
| master         | on production                 |
| dev            | on develop environment        |
| {feature_name} | on local or under development |
