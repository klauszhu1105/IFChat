<template>
    <div class="container">
        <div class="header">
            <div class="header-right">
                <img src="../../assets/login/settings.png" alt="" width="20px" class="header-icon" @click="toSettings">
            </div>
        </div>
        <div class="content">
            <S_Login v-if="status == 'login'" @toLink="toLink"></S_Login>
            <S_Register v-if="status == 'register'" @toLink="toLink"></S_Register>
            <S_forgetPassword v-if="status == 'forgetPassword'" @toLink="toLink"></S_forgetPassword>
            <S_settings v-if="status == 'settings'" @toLink="toLink"></S_settings>
        </div>
    </div>
</template>

<script>
const remote = window.require('electron').remote;
const win = remote.getCurrentWindow();
import S_Login from './Login.vue';
import S_Register from './Register.vue';
import S_forgetPassword from './forgetPassword.vue';
import S_settings from './settings.vue';
const { ipcRenderer } = window.require('electron');
ipcRenderer.send('resize-window', { width: 400, height: 320 });
export default {
    name: "Login",
    components: {
        S_Login,
        S_Register,
        S_forgetPassword,
        S_settings
    },
    data() {
        return {
            status: "login"

        }
    },
    methods: {

        //跳转到指定路径
        toLink(path) {
            this.status = path
        },
        //跳转到设置
        toSettings() {
            this.status = "settings"
        }

    },
}
</script>

<style lang="scss" scoped>
.container {
    .header {
        width: 100%;
        height: 40vh;
        color: white;
        background: linear-gradient(135deg, #17ead9, #6078ea);
        box-sizing: border-box;
        padding: 0px 8px;
        // background-color: red;
        display: flex;
        justify-content: flex-end;
        -webkit-app-region: drag;

        .header-right {
            -webkit-app-region: no-drag;
            height: 30px;
            display: flex;
            align-items: center;

            .header-icon {
                cursor: pointer;
                margin: 0 5px;
            }
        }
    }

    .content {}
}
</style>