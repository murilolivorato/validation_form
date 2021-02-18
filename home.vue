<template>
            <form method="POST"  @submit.prevent="storeForm">

            <div class="modal-body">
                                <!--OPTION_ITEMS_LIST-->
                                <div class="columns option_items_list" v-for="(item, index ) in form.get('option_items')">
                                    <div class="column">
                                        <label>Título</label>
                                        <input class="form-control border-input"  v-model="form.option_items[index]['title']"  placeholder="Título"  type="text"  >
                                        <p class="error-msg" v-if="errors.has('form.option_items.' + index + '.title')" v-text="errors.get('form.option_items.' + index +'.title')"></p>
                                    </div>

                                    <div class="column">
                                        <label>Ordem</label>
                                        <input class="form-control border-input"  v-model="form.option_items[index]['position_order']"  placeholder="opcional"  type="text"  >
                                        <p class="error-msg" v-if="errors.has('form.option_items.index_' + index + '.position_order')" v-text="errors.get('form.option_items.index_' + index +'.position_order')"></p>
                                    </div>

                                    <div class="remove_coll">
                                        <p class="remove_btn" v-if="index > 0"  @click.prevent="removeItem(item)" ><a href="#"><font-awesome-icon icon="trash-alt"  /></a></p>
                                    </div>
                                </div>
                                 <!-- END OPTION_ITEMS_LIST-->

                                <div class="columns phone_display_bottom" >
                                    <div class="column">
                                        <p class="add_btn" v-if="form.option_items.length < 10"  ><a href="#" @click.prevent="addOptionItem" ><font-awesome-icon icon="plus-circle"  /> Inserir Item</a></p>
                                    </div>
                                </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="lightOne"  @click="closeModal('optiomItem')" >Fechar</button>
                            <submit-btn :processloading="form.get('processingForm')"
                                        :stylebutton="'btn_cl_left is-link'"
                                        textbutton="Salvar" ></submit-btn>
                       </div>
            </form>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import Errors from 'src/core/Errors'
import ValidateForm from 'src/core/ValidateForm'

export default {
  name: 'Home',
  components: {
    Modal,
    SubmitBtn
  },
  data () {
    return {
      form: new FormDisplay({
        option_items: [{ id: '', position_order: '', title: '' }],
      }),
      errors: new Errors()
    }
  },

  methods: {
    storeForm () {
      // SETTING PROCESSING FALSE
      this.form.set('processingForm', true)

      // VERIFY ERRORS
      const errorString = new ValidateForm(this.form.data(), this.getValidateForm, 'form')
      // IF HAS ERROR
      if (errorString.hasError()) {
        // RECORD ERRORS
        this.errors.addManyRecord(errorString.getError())

        // PROCESSING FALSE
        this.form.set('processingForm', false)
        return
      }

      // STORE FORM
       .....
    },
    ...mapMutations('adminProductGlobalOptionSave', {
      closeModal: 'CLOSE_MODAL'
    })
  },
  computed: {
    getValidateForm () {
      const list = {}

      for (const field in this.form.option_items) {
        Object.assign(list, {
          ['option_items.' + field + '.title']: {
            type: 'not-null',
            field_name: 'Título'
          }
        })
      }

      return list
    }
  }
}
</script>
