<template>
    <div>
        <div class="slider-knob"></div>
        <div class="slider">
            <div class="slider-fill" :style="'right: ' + sliderFillPosLeft + 'px; width: ' + ( maxWidth - sliderFillPosLeft - sliderFillPosRight ) + 'px'"></div>
            <div class="slider-stop" v-for="stop in sliderStops" v-bind:key="stop.index" :style="'left: ' + stop.x + 'px;'"></div>
        </div>
    </div>
</template>


<script setup lang="ts">
    import { ref, type Ref } from 'vue';

    interface SliderStop {
        x: number;
        index: number;
    }

    const maxWidth = ref( window.innerWidth ); // TODO: Update to reflect slider width
    const sliderFillPosLeft = ref( 0 ); // Offset from left edge
    const sliderFillPosRight = ref( 0 ); // Offset from right edge
    const sliderStops: Ref<SliderStop[]> = ref( [] );
</script>