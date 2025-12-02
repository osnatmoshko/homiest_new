export class Customer {
    
    firstName: string;
    lastName: string;
    id?: number;
    email: string;
    phone: string;
    birthDate: Date;

    constructor(
        firstName: string,
        lastName: string,
        id: number,
        email: string,
        phone: string,
        birthDate: Date
    ) {
        // אתחול המאפיינים
        this.firstName = firstName;
        this.lastName = lastName;
        this.id = id;
        this.email = email;
        this.phone = phone;
        this.birthDate = birthDate;
    }
}