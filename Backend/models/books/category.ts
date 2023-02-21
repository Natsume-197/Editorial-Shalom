import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript'
import { Book } from './book'

@Table({
  timestamps: false,
  tableName: 'Category'
})
export class Category extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true
  })
  id!: number

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name!: string

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  description!: string

  @HasMany(() => Book)
  book!: Book[];

}
