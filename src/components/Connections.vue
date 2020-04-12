<template>
  <section>
    <b-field label="From Person">
      <b-select
        placeholder="Select by name"
        v-model="connection.from_person_id"
      >
        <option
          v-for="person in persons"
          :value="person.id"
          :key="person.id"
        >{{ person.first_name }}</option>
      </b-select>
    </b-field>

    <b-field label="To Person">
      <b-select
        placeholder="Select by name"
        v-model="connection.to_person_id"
      >
        <option
          v-for="person in persons"
          :value="person.id"
          :key="person.id"
        >{{ person.first_name }}</option>
      </b-select>
    </b-field>

    <b-field label="Connection Type">
      <b-select
        placeholder="Select type"
        v-model="connection.connection_type"
      >
        <option
          v-for="connType in connectionTypes"
          :value="connType"
          :key="connType"
        >{{ connType }}</option>
      </b-select>
    </b-field>

    <b-button
      v-if="!isEditing"
      class="space-around"
      type="is-primary"
      outlined
      @click="add"
    >
      Add
    </b-button>
    <b-button
      v-if="isEditing"
      class="space-around"
      type="is-success"
      outlined
      @click="update"
    >
      Update connection type
    </b-button>
    <b-button
      v-if="isEditing"
      class="space-around"
      type="is-danger"
      outlined
      @click="reset"
    >
      Clear
    </b-button>

    <b-table
      v-if="connections.length > 0"
      :data="connections"
      :columns="columns"
      :selected.sync="selectedConnection"
    ></b-table>
    <b-message
      v-if="connections.length == 0"
      title="No data yet"
    >
      Add something to see a table
    </b-message>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import { CONNECTION_TYPES } from '../constants'

export default {
  data() {
    return {
      isEditing: false,
      connectionTypes: CONNECTION_TYPES,
      selectedConnection: null, 
      selectedConnectionId: -1,
      connection: {
        connection_type: null,
        from_person_id: null,
        to_person_id: null,
      },
      columns: [
        {
          field: "connection_type",
          label: "Connection Type"
        },
        {
          field: "from_person_id",
          label: "From"
        },
        {
          field: "to_person_id",
          label: "To"
        },
        {
          field: "email",
          label: "Email"
        },
        {
          field: "updated_at",
          label: "Updated At"
        },
        {
          field: "created_at",
          label: "Created At"
        }
      ]
    };
  },
  watch: {
    selectedConnection: function(val) {
      if (val != null) {
        this.isEditing = true
        this.connection = this.connections.find(i => i.id == val.id)
        this.selectedConnectionId = val.id
      }
    }
  },
  computed: mapState({
    persons: 'persons',
    connections: 'connections',
  }),
  mounted() {
    this.$nextTick(() => {
      this.loadConnections()
    });
  },
  methods: {
    ...mapActions([
      "loadConnections",
      "addConnection",
      "updateConnectionType",
    ]),
    // Yeah-yeah, DRY, right?
    // Let's assume in a general case
    // these guys should be different
    // (not just messages)
    success() {
      this.$buefy.toast.open({
        message: "Sucessfully sent!",
        type: "is-success"
      });
    },
    validationError() {
      this.$buefy.toast.open({
        duration: 3000,
        message: `Please, make sure you chose values for all fields`,
        position: "is-bottom",
        type: "is-danger"
      });
    },
    isValid() {
      console.log(this.connection)
      return (
        this.connection.connection_type &&
        this.connection.from_person_id &&
        this.connection.to_person_id
      )
    },
    add() {
      if (this.isValid()) {
        this.success()
        this.addConnection(this.connection)
      } else {
        this.validationError()
      }
    },
    update() {
      // So since it's selected,
      // all fields should be there
      if (this.isValid()) {
        this.success()
        this.updateConnectionType({
          id: this.selectedConnectionId,
          connectionType: this.connectionTypes
        })
      } else {
        this.validationError()
      }
    },
    reset() {
      this.selectedConnection = null
      this.selectedConnectionId = -1
      this.isEditing = false
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
