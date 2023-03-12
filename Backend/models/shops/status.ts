import { Table, Model, Column, DataType, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Sale_request } from "./sales_request";

@Table({
  timestamps: false,
  tableName: "Status",
})
export class Status extends Model {
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

      @HasMany(() => Sale_request)
      sale_request!: Sale_request[];
      
}