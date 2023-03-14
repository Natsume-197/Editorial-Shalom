import { Table, Model, Column, DataType, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Sale_request } from "./sales_request";
import { Book } from "../books/book";

@Table({
  timestamps: false,
  tableName: "Book_reserved",
})
export class Book_reserved extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      })
      id!: number

      @ForeignKey(() => Sale_request)
      @Column({
        type: DataType.INTEGER,
        allowNull: false,
      })
      id_sale!: number
    
      @BelongsTo(() => Sale_request)
      sale_request!: Sale_request

      @ForeignKey(() => Book)
      @Column({
      type: DataType.INTEGER,
      allowNull: true
      })
      id_book!: number

      @BelongsTo(() => Book)
      book!: Book

      @Column({
        type: DataType.INTEGER,
        allowNull: false
      })
      amount!: number

      @Column({
        type: DataType.INTEGER,
        allowNull: false
      })
      price!: number
}
