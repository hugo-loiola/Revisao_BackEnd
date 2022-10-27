import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProfessorValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    nome: schema.string([rules.alpha({ allow: ['space'] }), rules.maxLength(100)]),

    cpf: schema.string([rules.alphaNum({ allow: ['space', 'dash', 'underscore'] })]),

    matricula: schema.string([
      rules.alphaNum({ allow: ['space', 'dash', 'underscore'] }),
      rules.maxLength(20),
    ]),

    salario: schema.number.optional([rules.range(1, 10000)]),

    email: schema.string.optional([rules.email(), rules.maxLength(100)]),

    telefone: schema.string.optional([rules.mobile({ locale: ['pt-BR'] })]),

    cep: schema.number.optional(),

    logradouro: schema.string.optional([rules.maxLength(100), rules.alpha({ allow: ['space'] })]),

    complemento: schema.string.optional([rules.maxLength(100), rules.alpha({ allow: ['space'] })]),

    numero: schema.string.optional([rules.maxLength(20), rules.alphaNum({ allow: ['dash'] })]),

    bairro: schema.string.optional([rules.maxLength(100), rules.alpha({ allow: ['space'] })]),
  })

  /*
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {}
}
