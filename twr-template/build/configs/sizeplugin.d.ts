declare module 'size-plugin' {
    import { Plugin } from 'webpack';

    interface SizePluginOptions {
        pattern: string;
        exclude: string;
        filename: string;
        publish: boolean;
        writeFile: boolean;
        // eslint-disable-next-line @typescript-eslint/ban-types
        stripHash: Function;
    }

    class SizePlugin extends Plugin {
        constructor(options?: Partial<SizePluginOptions>);
    }

    export = SizePlugin;
}
