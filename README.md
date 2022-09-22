# Revisao_BackEnd

## Meu estudo sobre `AdonisJS`.

### Iniciar um projeto.

    npm init adonis-ts-app@latest [nome]

### Start o servidor de desenvolvimento.

    node ace serve --watch

### Criando um Controller.

    node ace make:controller [Nome]

### Controller

```ts
export default class RevisaosController {
  ex1({ request }) {
    const dados = request.body();
    if (dados.salario <= 2000) {
      const reajuste = 1.5;
      const newSal = dados.salario * reajuste;
      return { newSal };
    } else {
      const reajuste = 1.3;
      const newSal = dados.salario * reajuste;
      return { newSal };
    }
  }
}
```

### Controller com Model

```ts
import Curso from "App/Models/Curso";

export default class CursosController {
  index() {
    return Curso.all();
  }
  store({ request }) {
    const dados = request.only(["nome", "duracao", "modalidade"]);
    return Curso.create(dados);
  }
}
```

### Instalando o `lucid` para o baco de dados.

    npm i @adonisjs/lucid

### Configurando o `lucid`.

    node ace configure @adonisjs/lucid

### Criar Model e Migration

    node ace make:model [nome] -m

### Código de uma migration

```ts
import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "cursos";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("nome", 50).notNullable();
      table.integer("duracao");
      table.string("modalidade", 1).notNullable();

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
```

### Codigo de um Model

```ts
import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Curso extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public nome: string;

  @column()
  public duracao: number;

  @column()
  public modalidade: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
```

### Rodar as Migration

    node ace migration:run

### Voltar as Migration

    node ace migration:rollback
    ou
    node ace migration:refresh

### Voltar as Migration ao início

    node ace migration:reset

### Criar uma seeder

    node ace make:seeder [Nome]

### Rodar uma seeder

    node ace db:seed
