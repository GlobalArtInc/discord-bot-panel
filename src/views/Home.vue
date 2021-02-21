<template>
  <v-card>
    <v-card-title>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
        :headers="headers"
        :search="search"
        :items="guilds"
    >
      <template v-slot:item.action="{item}">
        <v-btn :to="'/server/' + item.id" fab small color="cyan">
          <v-icon dark>
            mdi-pencil
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
// @ is an alias to /src
import {mapGetters} from "vuex";

export default {
  name: 'Home',
  data() {
    return {
      search: "",
      headers: [
        {
          text: 'Server Name',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Action',
          align: 'start',
          value: 'action',
          sortable: false
        }
      ],
    }
  },
  computed: {
    ...mapGetters(['guilds'])
  },
}
</script>
