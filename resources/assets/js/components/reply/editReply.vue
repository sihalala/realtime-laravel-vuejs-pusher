<template>
    <div>
        <vue-simplemde v-model="reply.reply"></vue-simplemde>
        <v-card-actions>
            <v-btn icon small @click="update">
                <v-icon color="green">save</v-icon>
            </v-btn>
            <v-btn icon small @click="cancel">
                <v-icon color="black">cancel</v-icon>
            </v-btn>
        </v-card-actions>
    </div>
</template>

<script>
    export default {
        name: "editReply",
        props : ['reply'],
        methods:{
            cancel(){
                EventBus.$emit('cancelEditing');
            },
            update(){
                axios.patch(`/api/question/${this.reply.question_slug}/reply/${this.reply.id}`,{body:this.reply.reply})
                    .then(res => this.cancel())            }
        }
    }
</script>

<style scoped>

</style>
