import { DataTypes } from "sequelize";
import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "User",
})

export class User extends Model {
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
    type: DataType.STRING,
    allowNull: true,
    unique: true,
  })
  email_token!: String;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
  })
  password_token!: String;
  
}