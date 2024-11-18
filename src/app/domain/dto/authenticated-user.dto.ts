export interface AuthenticatedUser {
    email: string,
    token: string,
    fullName: string,
    role: string
}

export enum UserRole{
   ADMINISTRATOR = 'ADMINISTRATOR',
   USER = 'USER',    
}