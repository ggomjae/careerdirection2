import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  BaseEntity,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql"; // 타입 그래프큐엘을 쓰니까 스키마를 따로 빼고 구현할 필요가 없다.

// 1:n 관계로 인한 Todo
import { Todo } from "./Todo";

// 사용자에 대한 권한
import { roleStatus} from "../type"

@ObjectType() // type-graphQL
@Entity() // typeorm
export class User extends BaseEntity {
  @Field(() => ID, {})
  @PrimaryGeneratedColumn() // Each entity must have at least one primary key column
  uno!: number;

  @Field() // () => String 같은 경우 생략이 가능하기 때문에 생략 ,TypeORM 같은 경우에는 String이 아닌 Text로 표현한다. default 255
  @Column({ length: 20 })
  name!: string;

  @Field()
  @Column({ length: 320, unique: true }) // local 64, @ 1 , domain 255 때문에 320, email을 유일한 값으로 설정했기에 unique 속성 추가
  email!: string;

  @Field() // bcrypt결과로 128
  @Column({ length: 128 })
  password!: string;

  @Field() // 'user', 'admin'으로 enum으로 설정
  @Column({ type: "enum", enum: roleStatus })
  roles!: roleStatus;

  @CreateDateColumn({ name: "created_at" })
  created!: Date;

  @OneToMany((type) => Todo, (todo) => todo.user)
  todos: Todo[]; // 없을 수 있기에 ! 안씀.
}
