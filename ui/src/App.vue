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
    import stopSlider from './components/stopSlider.vue';
    import VueDatePicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css'

    const date: Ref<Date | undefined> = ref();

    const theme = ref( 'light_mode' );

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
            fetchOldData();
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
                fetchOldData();
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
    
    const hasSelectedDate = ref( false );
    const difficulty = ref( -1 );
    const difficultyLevels = ref( [ 
        'sleep therapy', 
        'very easy', 
        'easy', 
        'of medium difficulty', 
        'hard', 
        'very hard', 
        'impossible to comprehend' 
    ] );
    const difficultySlider = ref( stopSlider );
    const setDifficulty = ( value: number ) => {
        difficulty.value = value;
    }

    const rest = ref( -1 );
    const restLevels = ref( [ 
        'very energized and incredibly well-rested',
        'very well-rested', 
        'well-rested', 
        'decently rested', 
        'tired', 
        'very tired', 
        'so tired I fell asleep again'
    ] );
    const restSlider = ref( stopSlider );


    const setRest = ( value: number ) => {
        rest.value = value;
    }

    const stress = ref( -1 );
    const stressLevels = ref( [ 
        'so low I thought I had holidays', 
        'low', 
        'below average', 
        'average', 
        'above average', 
        'high', 
        'so high I felt like I would certainly fail my studies' 
    ] );
    const stressSlider = ref( stopSlider );

    const setStress = ( value: number ) => {
        stress.value = value;
    }


    const freeTime = ref( -1 );
    const freeTimeLevels = ref( [ 
        'a lot of free time', 
        'quite a bit of free time',
        'some free time', 
        'little free time', 
        'no free time', 
    ] );
    const freeTimeSlider = ref( stopSlider );

    const setFreeTime = ( value: number ) => {
        freeTime.value = value;
    }


    const cigaretCount = ref( 0 );
    const sleepHours = ref( 0 );



    

    
    const setUpRestSlider = () => {
        setTimeout( () => {
            restSlider.value.setUp( 7, 3 );
        }, 500 );
    }

    const setUpDifficultySlider = () => {
        setTimeout( () => {
            difficultySlider.value.setUp( 7, 3 );
        }, 1000 );
    }

    const setUpStressSlider = () => {
        setTimeout( () => {
            stressSlider.value.setUp( 7, 3 );
        }, 1500 );
    }

    const setUpFreeTimeSlider = () => {
        setTimeout( () => {
            freeTimeSlider.value.setUp( 5, 2 );
        }, 2000 );
    }
    

    const showStats = () => {
        alert( 'Coming soon!' );
    }

    const submitForm = () => {
        if ( date.value && difficulty.value > -1 && stress.value > -1 && rest.value > -1 && cigaretCount.value >= 0 && sleepHours.value >= 0 ) {
            if ( sleepHours.value < 2 ) {
                if ( confirm( 'Are you sure you have entered the right number of sleep hours? Do you want to proceed with the entered ' + sleepHours.value + ' hours of sleep?' ) ) {
                    sendForm();
                }
            } else {
                sendForm();
            }
        } else {
            alert( 'Some entries are missing. Please fill them out before saving!' );
        }
    }

    const sendForm = () => {
        alert( 'Data submitted. Remember: Stop smoking! Smoking hurts your health!' );
    }

    const dateUpdatedHandler = () => {
        console.log( date.value );
        if ( date.value ) {
            if ( date.value.getTime() <= new Date().getTime() + 10000 ) {
                hasSelectedDate.value = true;
                // TODO: Load old data, if present
                
                if ( oldData[ date.value.toISOString() ] ) {
                    // TODO: Finish
                }
            } else {
                const errors = [
                    'Nice job, diviner, you just predicted the future. But since we are not at Hogwarts School of Witchcraft and Wizardry, we do not believe in this subject... They do not even really',
                    'I see you think you have the inner eye. No magical creature can stop you from predicting the future... well except Hermione Granger yeeting the crystal ball off the table',
                    `I believe the most likely outcome will be our collective demise. \n- Not if we strictly follow the rules of time travel. All right? It means no talking to our past selves... no betting on sporting events. \n- I'm gonna stop you right there, Scott. Are you seriously telling me that your plan to save the universe... is based on Back to the Future? Is it? \n- No. \n- Good. You had me worried there. 'Cause that would be horseshit. That's not how quantum physics works.`,
                    '', // Avengers: Endgame quote on Back to the future being BS
                    '', // Back to the future quote on interacting with your future self
                    'You are under arrest for crimes against the Sacred Timeline',
                    'Welcome to the TVA', // Loki Season 1 Episode 1 Ms. Minute quote from introduction at TVA
                    '', // Some Interstellar quote on time
                ]
                alert( errors[ Math.round( Math.random() * 7 ) ] );
            }
        } else {
            hasSelectedDate.value = false;
        }
    }


    interface OldData {
        [key: string]: object;
    }

    let oldData: OldData = {};

    const fetchOldData = () => {
        fetch( localStorage.getItem( 'url' ) + '/get', { credentials: 'include' } ).then( res => {
            if ( res.status === 200 ) {
                res.json().then( json => {
                    oldData = json;
                } );
            } else {
                alert( `Failed to load old data. Features are limited. Please reload to try again! (${ res.status })` );
            }
        } ).catch( e => {
            console.error( e );
            alert( 'Failed to load old data. Features are limited. Please reload to try again! (details in console)' );
        } );
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
                    <div class="input-element">
                        <p>Date for which this form is filled out</p>
                        <VueDatePicker v-model="date" :dark="theme === 'dark_mode'" @closed="dateUpdatedHandler()" @cleared="dateUpdatedHandler()" :enable-time-picker="false"></VueDatePicker>
                    </div>

                    <div v-if="hasSelectedDate" class="main-interface">

                        <div class="input-element">
                            <p>How many cigarets did you smoke on that day?</p>
                            <input type="number" class="input" v-model="cigaretCount">
                        </div>
                        
                        <div class="input-element">
                            <p>How many hours of sleep did you get approximately?</p>
                            <input type="number" class="input" v-model="sleepHours">
                        </div>
                        
                        <div class="input-element">
                            <p>That morning, I felt {{ rest >= 0 ? restLevels[ rest ] : '...' }}</p>
                            <stopSlider slider-id="rest" style="width: 50vw;" @slider-pos="( pos ) => setRest( pos )" ref="restSlider" @ready="setUpRestSlider()"></stopSlider>
                        </div>
                        
                        <div class="input-element">
                            <p>The lectures on this day were {{ difficulty >= 0 ? difficultyLevels[ difficulty ] : '...' }}</p>
                            <stopSlider slider-id="difficulty" style="width: 50vw;" @slider-pos="( pos ) => setDifficulty( pos )" ref="difficultySlider" @ready="setUpDifficultySlider()"></stopSlider>
                        </div>

                        <div class="input-element">
                            <p>That day, my stress level was {{ stress >= 0 ? stressLevels[ stress ] : '...' }}</p>
                            <stopSlider slider-id="stress" style="width: 50vw;" @slider-pos="( pos ) => setStress( pos )" ref="stressSlider" @ready="setUpStressSlider()"></stopSlider>
                        </div>

                        <div class="input-element">
                            <p>That day, I had {{ freeTime >= 0 ? freeTimeLevels[ freeTime ] : '...' }}</p>
                            <stopSlider slider-id="freeTime" style="width: 50vw;" @slider-pos="( pos ) => setFreeTime( pos )" ref="freeTimeSlider" @ready="setUpFreeTimeSlider()"></stopSlider>
                        </div>
                        <button @click="submitForm()" class="fancy-button" style="margin-top: 20px;">Submit</button>
                    </div>
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