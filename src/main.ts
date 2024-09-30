import { createApp } from 'vue';
import App from './App.vue';

localStorage.setItem( 'url', 'http://localhost:8080' );
// localStorage.setItem( 'url', 'https://api.janishutz.com' );

createApp( App ).mount( '#app' );
