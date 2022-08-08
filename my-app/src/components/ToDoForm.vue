<template>
    <form @submit.prevent="onSubmit">
        <label for="newtodoform">create a To DO item</label>
        <input type="text" id="newtodoform" v-model.lazy.trim="newtask"/>
         <button type="submit" class="btn btn__primary btn__lg">Add</button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            newtask: "",
        }
    },

    methods: {
        onSubmit () {
            if (this.newtask === "") {
                return;
            }
            this.$emit('task-added', this.newtask);
            this.newtask = "";
        }
    }
}
</script>
