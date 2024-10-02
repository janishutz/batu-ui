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
    const sliderOffset = -11;
    const sliderFillPosLeft = ref( sliderOffset ); // Offset from left edge
    const sliderFillPosRight = ref( maxWidth.value ); // Offset from right edge
    const sliderStops: Ref<SliderStop[]> = ref( [] );
    let intervalSize = 0;

    const setUp = ( stops: number ) => {
        maxWidth.value = document.getElementById( 'slider-' + props.id )!.clientWidth;
        sliderStops.value = [];
        intervalSize = maxWidth.value / ( stops - 1 );
        for ( let i = 0; i < stops; i ++ ) {
            sliderStops.value.push( {
                x: intervalSize * i - 10,
                index: i,
            } );
        }
    }

    const xOffset = ref( 0 );
    const isDragging = ref( false );
    const sliderKnobPos = ref( sliderOffset );
    let originalSliderPos = sliderOffset;

    const startDrag = ( x: number ) => {
        xOffset.value = x;
        isDragging.value = true;
        originalSliderPos = sliderKnobPos.value;
    }

    const handleDrag = ( x: number ) => {
        if ( isDragging.value ) {
            const newPos = originalSliderPos + ( x - xOffset.value );
            if ( newPos <= ( maxWidth.value + sliderOffset ) && newPos >= sliderOffset ) {
                sliderKnobPos.value = newPos;
            } else if ( newPos < sliderOffset ) {
                sliderKnobPos.value = sliderOffset;
            } else {
                sliderKnobPos.value = maxWidth.value + sliderOffset;
            }

            // Calculate progress of slider background / progress bar
            sliderFillPosRight.value = maxWidth.value - Math.round( sliderKnobPos.value / intervalSize ) * intervalSize + sliderOffset;
        }
    }

    const endDrag = () => {
        isDragging.value = false;

        // snapping
        sliderKnobPos.value = Math.round( sliderKnobPos.value / intervalSize ) * intervalSize + sliderOffset;
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
        <div :class="'slider-knob' + ( isDragging ? ' dragging' : '' )" :style="'left: ' + sliderKnobPos + 'px;'">
            <div :class="'slider-drag-support' + ( isDragging ? ' dragging' : '' )" @mousemove="( e ) => handleDrag( e.clientX )"
                @mouseup="() => endDrag()" @mousedown="( e ) => startDrag( e.clientX )"></div>
        </div>


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
        background-color: var( --hover-color );
        width: 25px;
        height: 25px;
        border-radius: 15px;
        position: absolute;
        z-index: 5;
        top: -7px;
        transition: left 0.5s;
    }

    .slider-knob.dragging {
        transition: none;
    }

    .slider-drag-support {
        width: 100%;
        height: 100%;
        border-radius: 50px;
        background: none;
        cursor: pointer;
    }


    .slider-drag-support.dragging {
        position: fixed;
        cursor: move;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
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
        height: 10px;
        position: absolute;
        background-color: var( --slider-color );
        transition: width 0.5s;
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