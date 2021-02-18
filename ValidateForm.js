import ValidateField from './ValidateField'

class ValidateForm {
  constructor (form, validationFields, formName) {
    this.form = form
    this.validationFields = validationFields
    this.formName = formName
    this.errors_recorded = []

    this.makeValidation()
  }

  hasError () {
    if (this.errors_recorded.length > 0) {
      return true
    }

    return false
  }

  getError () {
    return this.errors_recorded
  }

  makeValidation () {
    // EMPTY EHE ERROR
    this.errors_recorded = []

    for (const field in this.validationFields) {
      const typeValidation = this.validationFields[field].type

      // IF IS MULTIPLE
      if (typeValidation.includes('|')) {
        const result = typeValidation.split('|')

        result.forEach((v, i) => {
          this.validate(field, v)
        })

        return
      }

      // IF IS SINGLE
      this.validate(field, typeValidation)
    }
  }

  // MAKE VALIDATION
  validate (fieldname, typeValidation) {
    const fieldNameTranslated = this.validationFields[fieldname].fieldname
    const filedValue = this.getFieldValue(fieldname)
    const errorText = {}.hasOwnProperty.call(this.validationFields[fieldname], ('errorText')) ? this.validationFields[fieldname].errorText : null

    const error = new ValidateField(this.getTypeValidation(typeValidation), fieldNameTranslated, filedValue)

    // HAS ERROR , RECORD IR
    if (error.getError()) {
      // HAS PERSONAL ERROR TEXT
      if (errorText) {
        this.errors_recorded.push({ fieldName: this.formName + '.' + fieldname, msg: [errorText] })
        return
      }

      this.errors_recorded.push({ fieldName: this.formName + '.' + fieldname, msg: [error.getError()] })
    }
  }

  // GET TYPE VALIDATION
  getTypeValidation (type) {
    // HAS EXTRA OPTION
    if (type.includes(':')) {
      const splitString = type.toString().split(':')
      return { type: splitString[0], extraValue: splitString[1].replace('@', ':') }
    }

    // DOES NOT HAS EXTRA OPTION VALIDATION
    return { type: type }
  }

  getFieldValue (fieldname) {
    // IT IS AN ARRAY FORM  -> FORM.IMAGE_GALLERY.IMAGES
    if (fieldname.includes('.')) {
      const splitString = fieldname.split('.')

      if (splitString.length === 2) {
        return this.form[splitString[0]][splitString[1]]
      }

      if (splitString.length === 3) {
        return this.form[splitString[0]][splitString[1]][splitString[2]]
      }
    }

    // ADD ERROR INSIDE ARRAY LIST -> FORM.TITLE
    return this.form[fieldname]
  }
}
export default ValidateForm
