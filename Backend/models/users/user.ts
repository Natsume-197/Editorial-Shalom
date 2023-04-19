import { DataTypes } from "sequelize";
import { Table, Model, Column, DataType, HasMany, HasOne, BelongsToMany, ForeignKey } from "sequelize-typescript";
import { User_role } from "./user_role";
import { Role } from "./role"
import { Sale_request } from "../shops/sales_request";
import { Request_message } from "../shops/request_message";

@Table({
  timestamps: false,
  tableName: "User",
})

export class User extends Model {
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
    allowNull: true,
  })
  second_name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  })
  created_at!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  modified_at!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  address!: String;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  cellphone!: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  last_login!: Date;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
  is_verified!: Boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
  is_active!: Boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
  })
  email_token!: String;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  city!: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
  })
  password_token!: String;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  last_password_update!: String;

  @HasMany(() => User_role)
  user_roles!: User_role[];

  @HasMany(() => Sale_request)
  sale_request!: Sale_request[];

  @HasMany(() => Request_message)
  request_message!: Request_message[];
  
}