import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";

import { Task } from "./Task";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({ type: "varchar" })
    name!: string

    @Column({ type: "varchar", unique: true })
    email!: string

    @Column({ type: "varchar" })
    password!: string

    @CreateDateColumn({ type: "timestamp" })
    createdAt!: Date

    @OneToMany(() => Task, (Task) => Task.user)
    tasks!: Task[]
}
