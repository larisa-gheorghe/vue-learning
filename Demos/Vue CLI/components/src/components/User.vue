<template>
    <button type="button" @click="onClickAge">Update age Event</button>
    <button type="button" @click="ageChangeFn(3)">Update age CB</button>
    <p>The user is {{ age }} years old</p>
    <p>{{ ageDoubled }}</p>
</template>

<script>
export default {
    name: "User",
    props: {
        age: {
            type: Number,
            //default: 20,
            validator(value) {
                return value < 130                
            }
        },
        ageChangeFn: Function
    },
    emits: ["age-change"],
    computed: {
        ageDoubled() {
            return this.age * 2
        }
    },
    methods: {
        onClickAge() {
            this.$emit("age-change", 10)
        }
    }
}
</script>