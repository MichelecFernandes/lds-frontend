import { UserRole } from "./user-role.model";

export interface User {
    id?: string,
    fullName: string,
    email: string,
    password: string,
    role: UserRole

}