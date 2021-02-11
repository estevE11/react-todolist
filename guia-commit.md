# Guia commit


## Auto change log

La dependencia que genera el change log es `standard-version`

Per instalar `npm i --save-dev standard-version`

Els scripts per executar son (package.json):

```json
  "scripts": {
    "release": "standard-version",
    "release:minor": "standard-version --release-as minor",
    "release:patch": "standard-version --release-as patch",
    "release:major": "standard-version --release-as major"
  },
```

Per generar la primera versió s'ha d'executar `npm run release -- --first-release`

## Commits

Per els missatges de commit s'haura de seguir el standard de ([Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/))

Basicament els commits han de seguir les seguents normes:

1. Obligatoriament han de contenir un prefix amb un tipus (feat, fix...), seguit de un `!` opcional que serveix per donar enfasi al commit, i ha d'acabar obligatoriament amb `:` i un `espai`.
2. Opcionalment poden tenir un "scope" que serveix per donar context al commit. Acabat amb `:` i espai obligatoriament.
3. Obligatoriament hi ha d'haver un missatge de commit despres de `:` i espai.
4. Si es vol afegir un text amb mes informació sobre el commit, s'ha de fer deixant una linia en blanc entre aquest i el missatge principal.

#### Tipus de commit

Els mes utiltizats:

- **FEAT**: Quan un commit afegeix una caracteristica nova a l'app.
- **FIX**: Quan un commit arregla un bug.

Altres opcions:

- **REFACTOR**: Quan un commit canvia una caracteristica (no afegeix res ni arregla cap bug)
- **PERF**: Quan un commit que millora la performance.
- **DOCS**: Quan un commit fa algun canvi a la documentació.
- **STYLE**: Quan un commit fa algun canvi nomes d'estil.
- **TEST**: Quan un commit fa afegeix o canvia algun test.

#### Configuració

L'aparició d'aquests en el changelog pot ser configurada amb l'arxiu `.versionrc.json`:

```json
{
    "types": [
      {"type": "feat", "section": "Features"},
      {"type": "fix", "section": "Bug Fixes"},
      {"type": "docs", "hidden": true},
      {"type": "style", "hidden": true},
      {"type": "refactor", "hidden": true},
      {"type": "test", "hidden": true}
    ],
    "commitUrlFormat": "https://github.com/mokkapps/changelog-generator-demo/commits/{{hash}}",
    "compareUrlFormat": "https://github.com/mokkapps/changelog-generator-demo/compare/{{previousTag}}...{{currentTag}}"
  }
```

En aquest cas el changelog nomes contindrà les seccions de `feat` i `fix`, els altres commits no apareixeran.

## Correció de commits

Primer instalem `husky` que ens permetrà executar un script quan fem un commit:

`npm install husky`

Despres instalem `commitlint` que es el que ens corregirà el commit:

`npm install @commitlint/{cli,config-conventional}`

Estem instalant el `config-conventional`, per tant estem seguin especificament el [Angular commit convention](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)

Ara per executar el corrector cada cop que fem un commit, hem d'especificar al `package.json`:

```json
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
```

Per acabar hem de crear l'arxiu `.commitlintrc.json` que extendrà de `config-conventional`:

```
{
  "extends": ["@commitlint/config-conventional"]
}
```

Ara ja podem crear commits amb format correcte i un changelog automatic.