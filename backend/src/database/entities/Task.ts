import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";

import { User } from "./User";

@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  title!: string;

  @Column({type: "text", nullable: true})
  description!: string;

  @Column({type: "varchar", default: "todo"})
  status!: string;

  @CreateDateColumn({type: "timestamp"})
  createdAt!: Date;

  @UpdateDateColumn({type: "timestamp"})
  updateAt!: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: "user_id" })
  user!: User;
}