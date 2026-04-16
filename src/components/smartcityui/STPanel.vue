<script setup lang="ts">

</script>

<template>

    <Panel v-bind="$props">
        <!-- @vue-skip -->
        <template v-for="(index, name) in $slots" v-slot:[name]>
            <slot :name="name" />
        </template>


    </Panel>

</template>
