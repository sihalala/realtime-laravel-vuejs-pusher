<template>
    <div class="text-xs-center">
        <v-menu offset-y>
            <template v-slot:activator="{ on }">
                <v-btn icon >
                    <v-icon  v-on="on" :color="color">add_alert</v-icon>{{unreadCount}}
                </v-btn>
            </template>
            <v-list>
                <v-list-item v-for="item in unread" :key="item.id">
                    <v-list-item-title>
                        <router-link :to="item.path">
                            <v-list-item-content @click="readIt(item)">{{item.question}}</v-list-item-content>
                        </router-link>
                    </v-list-item-title>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item v-for="item in read" :key="item.id">
                    <v-list-item-title>
                        <v-list-item-content>{{item.question}}</v-list-item-content>
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>

<script>
    export default {
        name: "AppNotification",
        data(){
            return {
                read : {},
                unread : {},
                unreadCount : 0
            }
        },
        created(){
            if(User.loggedIn()){
                this.getNotifications()
            }
            Echo.private('App.User.' + User.id())
                .notification((notification) => {
                    this.unread.unshift(notification)
                    this.unreadCount++
                });
        },
        methods: {
            getNotifications(){
                axios.post('/api/notifications')
                .then(res => {
                    this.read = res.data.read
                    this.unread = res.data.unRead
                    this.unreadCount = res.data.unRead.length
                })
            },
            readIt(notification){
                axios.post('/api/markAsRead',{id:notification.id})
                .then(res => {
                    this.unread.splice(notification,1)
                    this.read.push(notification)
                    this.unreadCount--
                })
            }
        },
        computed:{
            color(){
                return this.unreadCount > 0 ? 'red' : 'red lighten-4'
            }
        }
    }
</script>

<style scoped>

</style>
