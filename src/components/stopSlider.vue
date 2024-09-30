<!--
*				batu-ui - stopSlider.vue
*
*	Created by Janis Hutz 09/30/2024, Licensed under the GPL V3 License
*			https://janishutz.com, development@janishutz.com
*
*
-->


<script setup lang="ts">
    import { ref, type Ref } from 'vue';

    interface SliderStop {
        x: number;
        index: number;
    }

    const maxWidth = ref( window.innerWidth ); // TODO: Update to reflect slider width
    const sliderFillPosLeft = ref( -11 ); // Offset from left edge
    const sliderFillPosRight = ref( 0 ); // Offset from right edge
    const sliderStops: Ref<SliderStop[]> = ref( [] );

    const setUp = ( stops: number ) => {
        maxWidth.value = document.getElementById( 'slider-' + props.id )!.clientWidth;
        sliderStops.value = [];
        const intervalSize = maxWidth.value / ( stops - 1 );
        for ( let i = 0; i < stops; i ++ ) {
            sliderStops.value.push( {
                x: intervalSize * i - 10,
                index: i,
            } )
        }
    }

    const startDrag = ( x: number ) => {

    }

    const handleDrag = ( x: number ) => {

    }

    const endDrag = () => {

    }

    const props = defineProps( {
        'id': {
            default: '1',
            required: true,
            type: String
        }
    } );


    defineExpose( {
        setUp
    } );

    setTimeout( () => {
        setUp( 5 );
    }, 500 );
</script>


<template>
    <div class="slider-container">
        <div class="slider-knob" :style="'left: ' + sliderFillPosLeft + 'px;'"
            @mousedown="( e ) => startDrag( e.clientX )" @mousemove="( e ) => handleDrag( e.clientX )"
            @mouseup="( e ) => endDrag()"></div>

        <div class="slider-stop" v-for="stop in sliderStops" v-bind:key="stop.index" :style="'left: ' + stop.x + 'px;'"></div>
        <div class="slider" :id="'slider-' + $props.id">
            <div class="slider-fill" :style="'left: ' + sliderFillPosLeft + 'px; width: ' + ( maxWidth - sliderFillPosLeft - sliderFillPosRight ) + 'px'"></div>
            <div class="slider-stop-fill" v-for="stop in sliderStops" v-bind:key="stop.index" :style="'left: ' + stop.x + 'px;'"></div>
        </div>
    </div>
</template>


<style scoped>
    .slider-container {
        position: relative;
    }

    .slider-knob {
        background-color: var( --slider-color );
        width: 25px;
        height: 25px;
        border-radius: 15px;
        position: absolute;
        z-index: 5;
        top: -7px;
    }


    .slider {
        width: 100%;
        height: 10px;
        position: relative;
        border-radius: 15px;
        z-index: 2;
        border: 2px var( --gray-color ) solid;
        background-color: var( --background-color );
    }

    .slider-fill {
        height: 5px;
        position: absolute;
    }

    .slider-stop {
        border-radius: 10px;
        width: 20px;
        height: 20px;
        border: solid 2px var( --gray-color );
        position: absolute;
        top: -5px;
    }

    .slider-stop-fill {
        border-radius: 10px;
        width: 20px;
        height: 20px;
        border: none;
        position: absolute;
        top: -5px;
        background-color: var( --background-color );
    }
</style>