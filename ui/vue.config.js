/*
 * @Description: 
 * @Version: 1.0
 * @Autor: solid
 * @Date: 2022-08-12 14:51:35
 * @LastEditors: solid
 * @LastEditTime: 2022-10-11 09:56:19
 */
const path = require('path')
const fs = require('fs')
module.exports = {
    devServer: {
        port: "9999",
        // open: true,
        // open: true,
        https: {
            cert: fs.readFileSync(path.join(__dirname, 'src/ssl/server.crt')),
            key: fs.readFileSync(path.join(__dirname, 'src/ssl/server.key'))
        },
        overlay: {
            warnings: false,
            errors: true
        },
    },
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                nsis: {
                    allowToChangeInstallationDirectory: true,
                    oneClick: false,
                    installerIcon: "./src/assets/logo.png",  //安装logo
                    installerHeaderIcon: "./src/assets/logo.png", //安装logo
                    "guid": "xxxx",
                    "perMachine": true,
                    "allowElevation": true,
                    "createDesktopShortcut": true,
                    "createStartMenuShortcut": true,
                    "shortcutName": "remote"
                },
                "compression": "maximum", //压缩
                "asar": true,
                "directories": {
                    "output": "build", //打包后指定目录
                },
                // electronDownload: {
                //     mirror: "https://npm.taobao.org/mirrors/electron/" //镜像设置
                // },
                win: {
                    icon: './src/assets/logo.png',
                    "target": [
                        {
                            "target": "portable",  //分块打包
                            "arch": [
                                "x64", //64位
                                // "ia32" //32位
                            ],

                        }
                    ],


                },

                mac: {
                    icon: './src/assets/AppIcon.icns', // 应用图标
                    category: 'public.app-category.utilities', // 应用类型
                    target: ['zip'] // 打包的目标类型(默认是dmg和zip),支持很多类型，具体看文档
                },

                productName: "ifchat",  //应用的名称
                artifactName: '${productName}.${ext}'
            },
            // nodeIntegration: true,
        }
    }
}
