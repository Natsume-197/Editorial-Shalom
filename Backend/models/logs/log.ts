import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "Log",
})
export class Log extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  })
  id!: number

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  category!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  user!: number
  
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  action!: string;
  
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  status!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  message!: string;

}