const TWO_LINE_BREAK = '\n\n';
const typeTransfer = {
	"integer": "number",
	"array": "Array",
	"boolean": "boolean",
	"string": "string",
	"object": "object",
	"number": "number",
	"null": "null",
	"file": "File",
};
class ApiMethodType {
	static get = 'get';
	static post = 'post';
	static put = 'put';
	static delete = 'delete';
	static patch = 'patch';
}
class ApiContentType {
	static JSON = 'application/json';
	static FORMDATA = 'multipart/form-data';
	static URLENCODED = 'application/x-www-form-urlencoded';
}

export { TWO_LINE_BREAK, typeTransfer, ApiMethodType, ApiContentType };