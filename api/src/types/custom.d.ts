import { HttpRequest } from "@azure/functions";
declare module "@azure/functions" {
    interface HttpRequest {
        validatedBody?: any;
        validatedQuery?: any;
    }
}
declare module '@azure/functions' {
    interface HttpRequest {
        rawBody?: string | Buffer;
    }
}