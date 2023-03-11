import { Table, Model, Column, DataType, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "Receipt",
})
export class Receipt extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      })
      id!: number
      
      @Column({
        type: DataType.STRING,
        allowNull: true,
      })
      file_receipt!: string;
}