import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: '1', description: 'Address ID' })
  public id: string;

  @ManyToOne(() => User, (user) => user.addresses)
  public user: User;

  @ApiProperty({ example: '123 Main St', description: 'Street address' })
  @Column()
  public street: string;

  @ApiProperty({ example: 'New York', description: 'City' })
  @Column()
  public city: string;

  @ApiProperty({ example: 'USA', description: 'Country' })
  @Column()
  public country: string;
}
