const path = require("path");

const nodeSymbol = '#!/usr/bin/env node \n';

class addNodeSymbol {
    apply(compiler) {
        compiler.hooks.emit.tap('CodeBeautify', (compilation) => {
            Object.keys(compilation.assets).filter(name => name.endsWith('.js')).forEach(name => {
                let content = compilation.assets[name].source();
                content = nodeSymbol + content;
                compilation.assets[name] = {
                    source() {
                        return content;
                    },
                    size() {
                        return content.length;
                    }
                }
            })
        })

    }
}

module.exports = {
    mode: "production",
    entry: "./src/server.js",
    output: {
        filename: "server.js",
        path: path.resolve(__dirname, "./lib"),
        clean: true,
    },
    plugins: [new addNodeSymbol()],
    //设置打包类型是node
    target: "node",
};
