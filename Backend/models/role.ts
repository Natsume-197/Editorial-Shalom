import { Table, Model, Column, DataType } from 'sequelize-typescript'

@Table({
  timestamps: false,
  tableName: 'Role'
})
export class Role extends Model {
    static associate(models){
        Role.belongsTo()
    }

  @Column({
    type: DataType.INTEGER,
    primaryKey: true
  })
  id!: number

  @Column({
    type: DataType.STRING
  })
  name!: string


}
