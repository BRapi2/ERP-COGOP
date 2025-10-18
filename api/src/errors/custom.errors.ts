export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NotFoundError";
    }
}

export class ConflictError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ConflictError";
    }
}

export class BusinessError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'BusinessError';
    }
}

export class ValidationError extends Error {
    constructor(message: string, public details: any) {
        super(message);
        this.name = 'ValidationError';
    }
}

export class DatabaseError extends Error {
    constructor(message: string, public originalError: any) {
        super(message);
        this.name = 'DatabaseError';
    }
}

export class EntityNotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'EntityNotFoundError';
    }
}