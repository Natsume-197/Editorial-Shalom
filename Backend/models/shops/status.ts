import { Table, Model, Column, DataType, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";

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
}