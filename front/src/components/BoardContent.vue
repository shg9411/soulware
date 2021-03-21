<template>
  <div>
    <v-container fluid> 
      <v-layout column> 
        <v-flex column>
          <v-row>
            <v-col cols="4" md="3"> <!-- 합이 12가 되면 전체 화면을 사용한다는 의미입니다. -->
              <v-text-field v-model="data.title" :counter="32" label="Title" required></v-text-field>
            </v-col>
            <v-col cols="4" md="3">
              <v-text-field v-model="data.body" :counter="64" label="Body" required></v-text-field>
            </v-col>
            <v-col cols="4" md="6">
              <v-text-field v-model="data.email" :counter="255" label="Email" required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" md="3">
              <v-text-field v-model="data.phone" :counter="64" label="Phone" required></v-text-field>
            </v-col>
           <v-col cols="6" md="3">
              <v-file-input v-model="data.files" label="Files"></v-file-input>
            </v-col>

          </v-row>
          <v-btn @click="sendForm" style="background: green">create</v-btn>
          <v-btn @click="clearForm" style="background: red">clear</v-btn>
        </v-flex>
        <v-flex class="boardList" column>
          <v-card max-width="600" tile>
            <v-list-item v-for="(data, index) in propsdata" v-bind:key="index">
              <v-list-item-content>
                <v-list-item-title>{{ data.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ data.body }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
let url = "http://localhost:8000/boards/board/"; 

export default {
  data: () => {
    return {
      data: {
        title : "",
        body : "",
        email : "",
        phone : "",
        files : null
      },
    };
  },
  props: ["propsdata"],
  methods: {
    sendForm: function() {
      const fd = new FormData();
      fd.append('title',this.data.title);
      fd.append('body',this.data.body);
      fd.append('email',this.data.email);
      fd.append('phone',this.data.phone);
      console.log(this.data.files);
      if(this.data.files!==null)
        fd.append('files',this.data.files);
      axios.post(url,fd,{
        headers:{
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          this.boardList = response.data;
        })
        .catch(error => {
          console.log("Failed to get boardList", error.response);
        });
    },
    clearForm: function() {
        this.data.title = "",
        this.data.body = "",
        this.data.email = "",
        this.data.phone = "",
        this.data.files = null
    }
  }
};
</script>

<style>
.boardList {
  margin: 30px 0px 30px 0px;
}
</style>