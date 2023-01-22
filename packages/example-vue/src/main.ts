import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {initializeTurret} from "@turretjs/sdk/src/lib/initialize";
import {TurretBrowserPlugin} from "@turretjs/sdk/src/domain/plugins/browser/TurretBrowserPlugin";

const app = createApp(App);

initializeTurret({
    project: '@turretjs/example-vue',
    projectVersion: 'v1.0.0',
    baseUrl: 'http://localhost:3000/api/trpc',
    plugins: [
        new TurretBrowserPlugin(),
    ],
})

app.mount('#app')
