declare module "@sindresorhus/transliterate" {
    interface Options {
        customReplacements?: [string, string][];
        maintainCase?: boolean;
        separator?: string;
        ignore?: string[];
    }

    function transliterate(input: string, options?: Options): string;

    export = transliterate;
}
