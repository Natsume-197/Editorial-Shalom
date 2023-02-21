import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { Book } from './book'
import { Language } from './language'

@Table({
  timestamps: false,
  tableName: 'Book_t'
})
export class Book_t extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number

  @ForeignKey(() => Book)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_book!: number

  @BelongsTo(() => Book)
  book!: Book

  @ForeignKey(() => Language)
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  id_language!: number

  @BelongsTo(() => Language)
  language!: Language

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  title!: string

  @Column({
    type: DataType.STRING(500),
    allowNull: false
  })
  description!: string

}
