import { DataTypes } from "sequelize";
import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "Book",
})
export class Book extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  total_pages!: number;

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
    type: DataType.STRING,
    allowNull: true,
  })
  format!: string;

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

}