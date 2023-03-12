import { User } from "../users/user";
import { DataTypes } from "sequelize";
import { Table, Model, Column, DataType, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Book_reserved } from "./book_reserved";
import { Receipt } from "./receipt";
import { Status } from "./status";
import { Request_message } from "./request_message";

@Table({
  timestamps: false,
  tableName: "Sale_request",
})
export class Sale_request extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  })
  id!: number
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  address!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  city!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  school_name!: string

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  })
  purchase_date!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  cell!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  zip_code!: string;

  
  @ForeignKey(() => Status)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  id_status!: number

  @BelongsTo(() => Status)
  status!: Status;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  id_user!: number

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => Receipt)
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  id_receipt!: number

  @BelongsTo(() => Receipt)
  receipt!: Receipt;
  
  @HasMany(() => Book_reserved)
  book_reserved!: Book_reserved[];

  @HasMany(() => Request_message)
  request_message!: Request_message[];

}