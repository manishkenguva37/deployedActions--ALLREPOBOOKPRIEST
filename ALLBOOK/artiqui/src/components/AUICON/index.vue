<template>
    <div @click="handleIconClick"> 
       <component :is="icon" :alt="alt"></component>
    </div>
   
</template>

<script>
export default {
    name: 'AUIcon',
    props: {
        icon: {
            type: String,
            required: true,
        },
        alt: {
            type: String,
            required: true,
        },
    },
    methods: {
        handleIconClick() {
            this.$emit('click');
        },
    },

};
</script>