import { Table, Model, Column, DataType, HasMany, BelongsToMany} from 'sequelize-typescript'
import { User_role } from './user_role'
import { User } from './user'

@Table({
  timestamps: false,
  tableName: 'Role'
})
export class Role extends Model {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true
  })
  id!: number

  @Column({
    type: DataType.STRING
  })
  name!: string

  @Column({
    type: DataType.STRING
  })
  description!: string

  @HasMany(() => User_role)
  user_roles!: User_role[];
 
}
