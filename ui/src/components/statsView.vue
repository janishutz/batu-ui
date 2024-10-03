<script setup lang="ts">
    import { ref, type Ref } from 'vue';

    const isShowingStatsView = ref( false );

    const openStats = () => {
        isShowingStatsView.value = true;
    }

    const closeStats = () => {
        isShowingStatsView.value = false;
    }

    defineExpose( {
        openStats,
        closeStats,
    } );
</script>

<template>
    <div :class="'stats-view' + ( isShowingStatsView ? ' stats-view-shown' : '' )">
        <span class="material-symbols-outlined close-stats" @click="closeStats()">close</span>
        <h1>Stats</h1>
        <p style="font-size: 1.5rem;">Coming soon<sup>TM</sup></p>
        <button class="fancy-button" @click="closeStats()">Close</button>
    </div>
</template>


<style scoped>
    .stats-view {
        position: fixed;
        top: 100vh;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var( --secondary-color );
        display: flex;
        align-items: center;
        /* TODO: Remove next line to have items top-aligned */
        justify-content: center; 
        flex-direction: column;
        transition: all 0.5s;
        z-index: 50;
    }

    .stats-view-shown {
        top: 0;
    }

    .close-stats {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 2.5rem;
        color: var( --primary-color );
        cursor: pointer;
        transition: all 0.5s ease-in-out;
    }

    .close-stats:hover {
        transform: scale( 1.25 );
    }
</style>