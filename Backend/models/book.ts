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
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  category!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  amount!: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
  available!: Boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    defaultValue: false
  })
  ISBN!: String;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  })
  publication!: Date;

}