<script setup lang="ts">
    import { ref, type Ref } from 'vue';
    import stopSlider from './stopSlider.vue';
    import VueDatePicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css';

    const date: Ref<Date | undefined> = ref();
    
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
                    `Look, we go back, we get the stones before Thanos gets them... Thanos doesn't have the stones. Problem solved. \n- Bingo\n- That's not how it works.\n- Well that's what I heard.\n- Wait, but who? Who told you that?\n- [...] Basically, any movie that deals with time travel. This is known.\n- I don't know why everyone believes that, but that isn't true. Think about it. If you travel to the past... that past becomes your future... and your former present becomes the past... which can't now be changed by your new future\n - Exactly\n- So Back to the Future is a bunch of bullshit?`, // Avengers: Endgame quote on Back to the future being BS
                    `Jennifer could conceivably encounter her future self! The consequences could be disastrous! \n- What do you mean?\n- I foresee two possibilities. One, seeing herself 30 years older would put her into shock, and she'd pass out... or two, the encounter could create a time paradox ...and cause a chain reaction that would unravel ...the space-time continuum and destroy the entire universe! Granted, that's a worst-case scenario. The destruction might be localized, limited to our own galaxy.`, // Back to the future quote on interacting with your future self
                    `Long ago, there was a vast multiversal war. Countless unique timelines battled each other for supremacy, nearly resulting in the total destruction of... well, everything. But then the all-knowing Time-Keepers emerged, bringing peace by reorganizing the multiverse into a single timeline, the Sacred Timeline. Now, the Time-Keepers protect and preserve the proper flow of time for everyone and everything. But sometimes, people like you veer off the path the Time-Keepers created. We call those Variants.`, // Loki Season 1 Episode 1 Ms. Minute quote from introduction at TVA
                    `Hey there! You're probably saying "This is a mistake. I shouldn't even be here." Welcome to the Time Variance Authority. I'm Miss Minutes, and it's my job to catch you up before you stand trial for your crimes.`,
                    `Time is relative, okay? It can stretch and it can squeeze, but... it can't run backwards. Just can't The only thing that can move across dimensions, like time, is gravity. \n Don't take that as your inspiration, as for that you'd need to fly close to the speed of light and the power required for that would exceed the amount of power humanity has created ever.`, // Some Interstellar quote on time
                    'You are under arrest for crimes against the Sacred Timeline',
                ]
                alert( errors[ Math.floor( Math.random() * 9 ) ] );
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
    
    defineProps( {
        'theme': {
            default: 'light_mode',
            required: true,
            type: String
        }
    } );

    fetchOldData();
</script>

<template>
    <div class="main-interface">
        <div class="input-element">
            <p>Date for which this form is filled out</p>
            <VueDatePicker v-model="date" :dark="$props.theme === 'dark_mode'" @closed="dateUpdatedHandler()" @cleared="dateUpdatedHandler()" :enable-time-picker="false"></VueDatePicker>
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
</template>