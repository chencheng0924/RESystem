<script setup lang="ts">


</script>

<template>

    <Card v-bind="$props" v-on="$emit">
        <!-- @vue-skip -->
        <template v-for="(index, name) in $slots" v-slot:[name]>
            <slot :name="name" />
        </template>


    </Card>

</template>
