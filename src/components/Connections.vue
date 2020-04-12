<template>
  <section>
    <b-field label="From Person">
      <b-select
        :disabled="isEditing"
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
        :disabled="isEditing"
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
      :selected.sync="selectedConnection"
    >
      <template slot-scope="props">
        <b-table-column field="connection_type" label="Connection Type">
          {{ props.row.connection_type }}
        </b-table-column>
        <b-table-column field="from_person_id" label="From">
          {{ persons.find(p => p.id == props.row.from_person_id).first_name }}
        </b-table-column>
        <b-table-column field="to_person_id" label="To">
          {{ persons.find(p => p.id == props.row.to_person_id).first_name }}
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
      v-if="connections.length == 0"
      title="No data yet"
    >
      Add something to see a table
    </b-message>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import { formatDatetime } from '../utils'
import { CONNECTION_TYPES, INVALID_SELECTION_MESSAGE } from '../constants'

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
      }
    };
  },
  watch: {
    selectedConnection: function(val) {
      if (val != null) {
        this.isEditing = true
        this.connection = { ...this.connections.find(i => i.id == val.id) }
        this.selectedConnectionId = val.id
      }
    }
  },
  computed: {
    ...mapState({
      persons: 'persons',
      connections: 'connections',
    }),
  },
  mounted() {
    this.$nextTick(() => {
      this.loadConnections()
    });
  },
  methods: {
    ...mapActions([
      'loadConnections',
      'addConnection',
      'updateConnectionType',
    ]),
    format(strDate) {
      return formatDatetime(strDate)
    },
    // Yeah-yeah, DRY, right?
    // Let's assume in a general case
    // these guys should be different
    // (not just messages)
    success() {
      this.$buefy.toast.open({
        message: 'Sucessfully sent!',
        type: 'is-success'
      });
    },
    validationError() {
      this.$buefy.toast.open({
        duration: 3000,
        message: INVALID_SELECTION_MESSAGE,
        position: 'is-bottom',
        type: 'is-danger'
      });
    },
    isValid() {
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
          connectionType: this.connection.connection_type
        })
      } else {
        this.validationError()
      }
    },
    reset() {
      this.connection = {}
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
