<template>
    <v-toolbar>
        <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
        <v-toolbar-title>Bitfumes</v-toolbar-title>
        <v-spacer></v-spacer>
        <app-notification v-if="isLoggedIn"></app-notification>
        <div class="hidden-sm-and-down">
            <router-link
                v-for="item in items"
                :key="item.title"
                :to="item.to"
                v-if="item.show">
                <v-btn text>{{item.title}}</v-btn>
            </router-link>
            <v-btn v-if="isLoggedIn" text @click="logout">Logout</v-btn>
        </div>
    </v-toolbar>
</template>

<script>
    import AppNotification from "./AppNotification";
    export default {
        name: "Toolbar",
        components: {AppNotification},
        data(){
            return {
                isLoggedIn : User.loggedIn(),
                items: [
                    {title : 'Forum', to:'/forum',show:true},
                    {title : 'Ask Question', to:'/ask',show:User.loggedIn()},
                    {title : 'Category', to:'/category',show:User.admin()},
                    {title : 'Login', to:'/login',show:!User.loggedIn()},
                ]
            }
        },
        methods : {
            logout(){
                User.loggedOut();
            }
        }
    }
</script>

<style scoped>

</style>
