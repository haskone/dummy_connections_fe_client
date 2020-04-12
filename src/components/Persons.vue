<template>
  <section>
    <b-field label="First Name">
      <b-input
        v-model="newPerson.first_name"
        maxlength="30"
      >
      </b-input>
    </b-field>

    <b-field label="Last Name">
      <b-input
        v-model="newPerson.last_name"
        maxlength="30"
      >
      </b-input>
    </b-field>

    <b-field label="Email">
      <b-input
        ref="emailInput"
        type="email"
        v-model="newPerson.email"
        maxlength="30"
      >
      </b-input>
    </b-field>

    <b-button
      class="space-around"
      type="is-primary"
      outlined
      @click="add"
    >
      Add
    </b-button>
    <b-button
      class="space-around"
      type="is-danger"
      outlined
      @click="reset"
    >
      Clear
    </b-button>

    <b-table
      v-if="persons.length > 0"
      :data="persons"
    >
      <template slot-scope="props">
        <b-table-column field="first_name" label="First Name">
          {{ props.row.first_name }}
        </b-table-column>
        <b-table-column field="last_name" label="Last Name">
          {{ props.row.last_name }}
        </b-table-column>
        <b-table-column field="email" label="Email">
          {{ props.row.email }}
        </b-table-column>
        <b-table-column field="updated_at" label="Updated At">
          {{ format(props.row.updated_at) }}
        </b-table-column>
        <b-table-column field="created_at" label="Created At">
          {{ format(props.row.created_at) }}
        </b-table-column>
      </template>
    </b-table>
    <b-message
      v-if="persons.length == 0"
      title="No data yet"
    >
      Add something to see a table
    </b-message>
  </section>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

import { formatDatetime } from '../utils'
import { INVALID_INPUT_MESSAGE, NON_UNIQUE_EMAIL_MESSAGE } from '../constants'

export default {
  data() {
    return {
      newPerson: {
        first_name: '',
        last_name: '',
        email: ''
      }
    };
  },
  computed: {
    ...mapState(['persons']),
    ...mapGetters(['personEmails'])
  },
  mounted() {
    this.$nextTick(() => {
      this.loadPersons()
    })
  },
  methods: {
    ...mapActions(['loadPersons', 'addPerson']),
    format(strDate) {
      return formatDatetime(strDate)
    },
    success() {
      this.$buefy.toast.open({
        message: 'Sucessfully added!',
        type: 'is-success'
      });
    },
    validationError(message) {
      this.$buefy.toast.open({
        duration: 3000,
        message: message,
        position: 'is-bottom',
        type: 'is-danger'
      });
    },
    isValid() {
      return (
        this.newPerson.first_name != '' &&
        this.newPerson.last_name != '' &&
        this.newPerson.email != '' &&
        this.$refs.emailInput.isValid
      )
    },
    isDuplicatedEmail() {
      return this.personEmails.includes(this.newPerson.email)
    },
    add() {
      if (!this.isValid()) {
        this.validationError(INVALID_INPUT_MESSAGE)
      } else if (this.isDuplicatedEmail()) {
        this.validationError(NON_UNIQUE_EMAIL_MESSAGE)
      } else {
        this.success()
        this.addPerson(this.newPerson)
      }
    },
    reset() {
      this.newPerson = {}
    }
  }
};
</script>

<style>
.space-around {
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 10px;
}
</style>
