<template>
    <li>{{quote}} by {{author}}</li>
</template>

<script>

export default {
    props: {
        quote : {
            type: String,
        },
        author: {
            type: String,
        }
    }
}
</script>

