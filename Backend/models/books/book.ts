import { DataTypes } from "sequelize";
import { Table, Model, Column, DataType, HasMany, ForeignKey } from "sequelize-typescript";
import { Book_t } from "./book_t";
import { Category } from "./category";

@Table({
  timestamps: false,
  tableName: "Book",
})
export class Book extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
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
    type: DataType.INTEGER,
    allowNull: false
  })
  units_available!: number

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

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  preview!: string;
  
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  total_pages!: number
  
  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  id_category!: number

  
  @HasMany(() => Book_t)
  book_t!: Book_t[];

}