<template>
  <v-app id="inspire">
    <!-- navigation  -->
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item router-link to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item router-link to="/#">
          <v-list-item-action>
            <v-icon>mdi-file-multiple-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>기술문의</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
           <v-list-item router-link to="/#">
          <v-list-item-action>
            <v-icon>mdi-file-multiple-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>지식관리</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
           <v-list-item router-link to="/#">
          <v-list-item-action>
            <v-icon>mdi-file-multiple-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>지식자료실</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item router-link to="/#">
          <v-list-item-action>
            <v-icon>mdi-file-multiple-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>지식자산 통계</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item router-link to="/#">
          <v-list-item-action>
            <v-icon>mdi-file-multiple-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>공지사항</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
          <v-list-item router-link to="/#">
          <v-list-item-action>
            <v-icon>mdi-file-multiple-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>설정</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
          <v-list-item router-link to="/#">
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>프로필 관리</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Header -->
    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>솔루션지식자산화시스템</v-toolbar-title>
    </v-app-bar>

    <!-- Main -->
    <v-main>
      <router-view></router-view>
    </v-main>

  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  })
}
</script>
