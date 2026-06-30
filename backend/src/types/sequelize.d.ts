import 'sequelize';

declare module 'sequelize' {
	interface Hookable {
		context?: unknown;
	}
	interface CountOptions {
		context?: unknown;
	}
	
	interface FindOptions {
		context?: unknown;
	}
}

