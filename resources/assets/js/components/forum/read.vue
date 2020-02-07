<template>
    <div v-if="question">
        <edit-question
            v-if="editing"
            :data = question
        ></edit-question>

        <show-question
            v-else
            :data = question
            :updateCount = updateNbReplies
        ></show-question>

        <v-container>
            <replies :question="question"></replies>

            <new-reply :questionSlug="question.slug"></new-reply>
        </v-container>
    </div>
</template>

<script>
    import showQuestion from "./showQuestion";
    import editQuestion from "./editQuestion";
    import replies from "../reply/replies";
    import newReply from "../reply/newReply";
    export default {
        name: "read",
        components: {showQuestion,editQuestion,replies,newReply},
        data(){
            return {
                question:null,
                editing:false,
                updateNbReplies: false
            }
        },
        created() {
            this.listen();
            this.getQuestion();
        },
        methods : {
            listen()
            {
                EventBus.$on('startEditing' , () =>{
                    this.editing = true
                });
                EventBus.$on('cancelEditing', function () {
                    this.editing = false;
                });
                EventBus.$on('updateNbReplies1',() =>{
                    this.updateNbReplies = true;
                })
            },

            getQuestion()
            {
                axios.get(`/api/question/${this.$route.params.slug}`)
                .then(res => this.question = res.data.data)
            }
        }
    }
</script>

<style scoped>

</style>
