declare module 'fuse.js' {
	class Fuse { 
		constructor(list: any, options: any)
		search(query: string);
	}

	namespace Fuse {}
	
	export = Fuse;
}