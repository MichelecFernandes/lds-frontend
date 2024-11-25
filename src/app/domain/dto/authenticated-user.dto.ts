import { UserRole } from "../model/user-role.model";


export interface AuthenticatedUser {
    email: string,
    token: string,
    fullName: string,
    role: UserRole
}
