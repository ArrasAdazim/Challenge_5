import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("cars", (table: Knex.TableBuilder) => {
      table.bigIncrements("id").primary();
      table.string("nama", 30).notNullable();
      table.string("sewa", 30).notNullable();
      table.string("ukuran", 15)
      table.text("foto");
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("cars");
}

