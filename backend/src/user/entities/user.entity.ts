import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import Role from 'src/auth/role.enum';
import RoleGuard from 'src/auth/role.guard';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ApiTags('user')
class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty({ example: 'David', description: 'Your name' })
  @Column()
  public name: string;

  @ApiProperty({ example: 'David@gmail.com', description: 'Your valid email' })
  @Column({ unique: true })
  public email: string;

  @ApiProperty({ example: 'password', description: 'Your password' })
  @Column()
  @Exclude()
  public password: string;
  @Exclude()
  @Column({ type: 'enum', array: true, enum: Role, default: [Role.User] })
  public roles: Role[];
}
export default User;
