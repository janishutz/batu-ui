<!--
*				batu-ui - App.vue
*
*	Created by Janis Hutz 09/30/2024, Licensed under the GPL V3 License
*			https://janishutz.com, development@janishutz.com
*
*
-->

<script setup lang="ts">
    import { ref, type Ref } from 'vue';
    import formView from './components/formView.vue';
    import statsView from './components/statsView.vue';

    const theme = ref( 'light_mode' );
    const stats = ref( statsView );

    const changeTheme = () => {
        if ( theme.value === 'dark_mode' ) {
            document.documentElement.classList.remove( 'dark' );
            document.documentElement.classList.add( 'light' );
            localStorage.setItem( 'theme', 'light_mode' );
            theme.value = 'light_mode';
        } else if ( theme.value === 'light_mode' ) {
            document.documentElement.classList.remove( 'light' );
            document.documentElement.classList.add( 'dark' );
            localStorage.setItem( 'theme', 'dark_mode' );
            theme.value = 'dark_mode';
        }
    }

    theme.value = localStorage.getItem( 'theme' ) ?? '';
    if ( window.matchMedia( '(prefers-color-scheme: dark)' ).matches || theme.value === 'dark_mode' ) {
        document.documentElement.classList.add( 'dark' );
        theme.value = 'dark_mode';
    } else {
        document.documentElement.classList.add( 'light' );
        theme.value = 'light_mode';
    }

    const unlocked = ref( false );
    const pw = ref( '' );
    const showPW = ref( false );
    const isLoading = ref( false );

    fetch( localStorage.getItem( 'url' ) + '/check', { credentials: 'include' } ).then( res => {
        isLoading.value = false;
        if ( res.status === 200 ) {
            unlocked.value = true;
        }
    } ).catch( e => {
        isLoading.value = false;
        console.warn( e );
    } );
    

    const togglePWShow = () => {
        showPW.value = !showPW.value;
    }

    const unlock = () => {
        fetch( localStorage.getItem( 'url' ) + '/unlock', {
            method: 'post',
            body: JSON.stringify( { 'password': pw.value } ),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'charset': 'utf-8'
            }
        } ).then( res => {
            if ( res.status === 200 ) {
                unlocked.value = true;
            } else {
                alert( 'Password incorrect' );
                unlocked.value = false;
            }
        } ).catch( e => {
            console.error( e );
            alert( 'Error logging in. Please retry!' )
        } ); 
    }

    const keyDownHandler = ( e: KeyboardEvent ) => {
        if ( e.key === 'Enter' ) {
            unlock();
        }
    }

    const showStats = () => {
        stats.value.openStats();
    }
</script>

<template>
    <div>
        <a id="github-link" href="https://github.com/janishutz/batu-ui" target="_blank"><img :src="theme === 'dark_mode' ? '/github-mark-white.svg' : '/github-mark.svg'" alt="GitHub Logo"></a>
        <button @click="changeTheme();" id="themeSelector" title="Toggle between light and dark mode"><span class="material-symbols-outlined" v-html="theme"></span></button>
        <main>
            <h1 id="title">Smoke Data Recorder</h1>
            <div v-if="!isLoading">
                <div v-if="unlocked" class="main-interface">
                    <button class="fancy-button" @click="showStats()">Stats</button>
                    <formView :theme="theme"></formView>
                </div>
                <div v-else>
                    <p>Please log in</p>
                    <div v-if="!showPW">
                        <input type="password" placeholder="Password" class="input" v-model="pw" @keydown="( e ) => keyDownHandler( e )">
                        <button class="transparent-button" @click="togglePWShow()"><span class="material-symbols-outlined">visibility</span></button><br>
                    </div>
                    <div v-else>
                        <input type="text" placeholder="Password" class="input" v-model="pw" @keydown="( e ) => keyDownHandler( e )">
                        <button class="transparent-button" @click="togglePWShow()"><span class="material-symbols-outlined">visibility_off</span></button><br>
                    </div>
                    <button @click="unlock()" class="fancy-button" style="margin-top: 10px;">Login</button>
                </div>
            </div>
            <div v-else>
                Loading...
            </div>
        </main>
        <statsView ref="stats"></statsView>
    </div>
</template>

<style>
    .main-interface {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100vw;
    }

    #github-link {
        position: fixed;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        color: var( --primary-color );
        cursor: pointer;
        height: 2rem;
        width: 2rem;
    }

    #github-link img {
        width: 100%;
        height: 100%;
    }

    .input-element {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
</style>

<style>
    body {
        background-color: var( --background-color );
        transition: background-color 0.5s;
        user-select: none;
    }

    :root, :root.light {
        --primary-color: #0a1520;
        --secondary-color: white;
        --background-color: rgb(221, 221, 221);
        --nav-background: white;
        --hover-color: #00457a;
        --popup-color: rgb(224, 224, 224);
        --overlay-color: rgba(0, 0, 0, 0.7);
        --PI: 3.14159265358979;
        --gray-color: rgb(53, 53, 53);
        --footer-background: rgb(233, 233, 233);
        --accent-background: rgb(195, 235, 243);
        --loading-color: rgb(167, 167, 167);
        --slider-color: rgb(119, 132, 255);
    }

    :root.dark {
        --primary-color: white;
        --secondary-color: black;
        --background-color: rgb(32, 32, 32);
        --nav-background: rgb(54, 54, 54);
        --popup-color: rgb(58, 58, 58);
        --hover-color: #007ddd;
        --overlay-color: rgba(104, 104, 104, 0.575);
        --gray-color: rgb(207, 207, 207);
        --footer-background: rgb(53, 53, 53);
        --accent-background: rgb(24, 12, 58);
        --loading-color: rgb(65, 65, 65);
        --slider-color: rgb(119, 132, 255);
    }

    @media ( prefers-color-scheme: dark ) {
        :root {
            --primary-color: white;
            --secondary-color: black;
            --background-color: rgb(32, 32, 32);
            --nav-background: rgb(54, 54, 54);
            --popup-color: rgb(58, 58, 58);
            --hover-color: #007ddd;
            --overlay-color: rgba(104, 104, 104, 0.575);
            --gray-color: rgb(207, 207, 207);
            --footer-background: rgb(53, 53, 53);
            --accent-background: rgb(24, 12, 58);
            --loading-color: rgb(65, 65, 65);
            --slider-color: rgb(119, 132, 255);
        }
    }

    ::selection {
        background-color: #7c8cec;
        color: white;
    }

    #title {
        font-family: "Qwitcher Grypen", cursive;
        font-weight: 700;
        font-size: 5rem;
    }

    html,
    body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        font-size: 17px;
        font-family: "Jost", sans-serif;
    }

    #app {
        transition: all 0.5s;
        background-color: var( --background-color );
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: var( --primary-color );
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        width: 100vw;
        margin: 0;
    }

    #main-view {
        min-height: 60vh;
    }

    .material-symbols-outlined {
        font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 48
    }

    .clr-open {
        border: black solid 1px !important;
    }

    #themeSelector {
        position: fixed;
        top: 10px;
        left: 10px;
        background: none;
        border: none;
        color: var( --primary-color );
        cursor: pointer;
    }
</style>

<style>
    .fancy-button {
        text-decoration: none;
        color: white;
        padding: 20px;
        border-radius: 20px;
        border: none;
        background: linear-gradient( 45deg, rgb(0, 33, 139), rgb(151, 0, 0) );
        font-size: larger;
        transition: all 0.5s;
        background-size: 150%;
        cursor: pointer;
    }

    .fancy-button:hover {
        border-radius: 5px;
        background-position: 50%;
    }

    .fancy-button-inactive {
        background: linear-gradient( 45deg, rgba(0, 33, 139, 0.6), rgba(151, 0, 0, 0.6) );
        cursor: not-allowed;
    }

    .fancy-button-inactive:hover {
        border-radius: 20px;
        background-position: 0px;
    }

    .input {
        padding: 10px;
        border-radius: 10px;
        border: none;
        font-size: 1rem;
    }
</style>