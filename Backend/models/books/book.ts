import { DataTypes } from "sequelize";
import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { Book_t } from "./book_t";

@Table({
  timestamps: false,
  tableName: "Book",
})
export class Book extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true
  })
  id!: number
  
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  isbn!: bigint;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  released_date!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  })
  published_date!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  cover!: string;
  
  @HasMany(() => Book_t)
  book_t!: Book_t[];

}