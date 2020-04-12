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

    <b-table
      v-if="persons.length > 0"
      :data="persons"
      :columns="columns"
    >
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
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      newPerson: {
        first_name: "",
        last_name: "",
        email: ""
      },
      columns: [
        {
          field: "first_name",
          label: "First Name"
        },
        {
          field: "last_name",
          label: "Last Name"
        },
        {
          field: "email",
          label: "Email"
        },
        {
          field: "created_at",
          label: "Created At"
        },
        {
          field: "updated_at",
          label: "Updated At"
        }
      ]
    };
  },
  computed: mapState({
    persons: "persons"
  }),
  mounted() {
    this.$nextTick(() => {
      this.loadPersons()
    })
  },
  methods: {
    ...mapActions(["loadPersons", "addPerson"]),
    // Yeah-yeah, DRY, right?
    success() {
      this.$buefy.toast.open({
        message: "Sucessfully added!",
        type: "is-success"
      });
    },
    validationError() {
      this.$buefy.toast.open({
        duration: 3000,
        message: `Please, make sure all fields are filled (correctly)`,
        position: "is-bottom",
        type: "is-danger"
      });
    },
    isValid() {
      // TODO: not really match BE rules
      return (
        this.newPerson.first_name != '' &&
        this.newPerson.last_name != '' &&
        this.newPerson.email != '' &&
        this.$refs.emailInput.isValid
      )
    },
    add() {
      if (this.isValid()) {
        this.success()
        this.addPerson(this.newPerson)
      } else {
        this.validationError()
      }
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
