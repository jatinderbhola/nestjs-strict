import { SwaggerDefinition } from "swagger-jsdoc";

export interface DocumentationOptions {
	enabled: boolean;
	definition: SwaggerDefinition | undefined;
	openApiDocsPath: string;
}
