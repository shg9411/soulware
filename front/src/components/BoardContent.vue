<template>
  <div>
    <v-container fluid>
      <v-layout column>
        <v-flex column>
          <v-row>
            <v-col cols="12" md="3">
              <v-form ref="form" calsss="mx-2" lazy-validation>
                <v-row>
                  <v-col cols="4">
                    <v-text-field
                      v-model="data.title"
                      :rules="[(v) => !!v || 'Title is required']"
                      label="Title"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="data.body"
                      :rules="[(v) => !!v || 'Body is required']"
                      label="Body"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="data.email"
                      :rules="[
                        (v) => !!v || 'E-mail is required',
                        (v) =>
                          /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                            v
                          ) || 'E-mail must be valid',
                      ]"
                      label="Email"
                      required
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="data.phone"
                      :rules="[
                        (v) => !!v || 'Phone Number is required',
                        (v) =>
                          /^\d{2,3}-\d{3,4}-\d{4}$/.test(v) ||
                          'Phone Number must be valid',
                      ]"
                      label="Phone"
                      required
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-file-input
                      v-model="data.files"
                      label="File"
                    ></v-file-input>
                  </v-col>
                </v-row>
                <v-btn @click="sendForm">작성</v-btn>
                <v-btn @click="clearForm">초기화</v-btn>
              </v-form>
            </v-col>
          </v-row>
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
        title: "",
        body: "",
        email: "",
        phone: "",
        files: null,
      },
    };
  },
  props: ["propsdata"],
  methods: {
    sendForm: function() {
      if (this.$refs.form.validate()) {
        const fd = new FormData();
        fd.append("title", this.data.title);
        fd.append("body", this.data.body);
        fd.append("email", this.data.email);
        fd.append("phone", this.data.phone.replace(/[^0-9]/g, ""));
        if (this.data.files !== null) fd.append("files", this.data.files);
        axios
          .post(url, fd, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log(response);
            this.$emit("saved");
            this.$refs.form.reset();
          })
          .catch((error) => {
            console.log("Failed to get boardList", error.response);
          });
      }
    },
    clearForm: function() {
      (this.data.title = ""),
        (this.data.body = ""),
        (this.data.email = ""),
        (this.data.phone = ""),
        (this.data.files = null);
    },
  },
};
</script>

<style>
.boardList {
  margin: 30px 0px 30px 0px;
}
</style>
