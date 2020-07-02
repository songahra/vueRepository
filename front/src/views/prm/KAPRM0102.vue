<template>
  <v-card class="d-inline-block mx-auto">
    <v-toolbar

      height="50"
      color="#FFFFF"
    >
      <v-tabs>
        <v-tab>프로필 관리</v-tab>
        <v-tab>지식 포인트</v-tab>
      </v-tabs>
      <v-btn><span>편집</span></v-btn>
    </v-toolbar>

    <v-container>
      <v-row justify="space-between">
        <v-col cols="auto">
          <v-img
            height="300"
            width="300"
            src="https://cdn.vuetifyjs.com/images/cards/store.jpg"
          />
        </v-col>

        <v-col
          cols="auto"
          class="text-center pl-0"
        >
          <v-row
            class="flex-column ma-0 fill-height"
            justify="center"
          >
            <v-col class="px-0">
              <v-card-text class="text--primary">
                <div>이름 {{ user_name }}</div>
              </v-card-text>
            </v-col>

            <v-col class="px-0">
              <v-card-text class="text--primary">
                <div>이메일 {{ user_id }}</div>
              </v-card-text>
            </v-col>

            <v-col class="px-0">
              <v-card-text class="text--primary">
                <div>소속회사 {{ company }}</div>
              </v-card-text>
            </v-col>

            <v-col class="px-0">
              <v-card-text class="text--primary">
                <div>담당 솔루션 {{ solution }}</div>
              </v-card-text>
            </v-col>

            <v-col class="px-0">
              <v-card-text class="text--primary">
                <div>권한 {{ usertype }}</div>
              </v-card-text>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-card-actions>
      <v-btn
        class="ma-2"
        tile
        color="indigo"
        dark
      >
        사진업로드
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {

}
</script>

<style>

</style>
