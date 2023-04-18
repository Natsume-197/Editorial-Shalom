import { User } from "../users/user";
import { Table, Model, Column, DataType, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Sale_request } from "./sales_request";
import { DataTypes } from "sequelize";

@Table({
  timestamps: false,
  tableName: "Request_message",
})
export class Request_message extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      })
      id!: number

      @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
      })
      is_readed!: Boolean;
      
      @ForeignKey(() => Sale_request)
      @Column({
        type: DataType.INTEGER,
        allowNull: false,
      })
      id_sale!: number
    
      @BelongsTo(() => Sale_request)
      sale_request!: Sale_request

      @ForeignKey(() => User)
      @Column({
      type: DataType.INTEGER,
      allowNull: false
      })
      id_user!: number  
      @BelongsTo(() => User)
      user!: User;

      @Column({
        type: DataType.STRING,
        allowNull: false,
      })
      comments!: string;

      @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      })
      message_date!: Date;
}