import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { Book_t } from "./book_t";

@Table({
  timestamps: false,
  tableName: "Language",
})

export class Language extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true
  })
  id!: number

    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    code!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
      })
      description!: string;

      @HasMany(() => Book_t)
      book_t!: Book_t[];
      
}