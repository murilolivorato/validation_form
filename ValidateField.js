class ValidateField {
  constructor (typeValidation, fieldnametranslated, filevalue) {
    this.typeValidation = typeValidation.type
    this.extrafilterValue = {}.hasOwnProperty.call(typeValidation, 'extraValue') ? typeValidation.extraValue : ''
    this.field_name_translated = fieldnametranslated
    this.filed_value = filevalue
    this.errors_string = ''

    this.validate()
  }

  getError () {
    return this.errors_string
  }

  // START HERE
  validate () {
    switch (this.typeValidation) {
      // IF ERROR SELECTED IS NOT NULL
      case 'not-null':
        this.verifyIfIsNull()
        break

      case 'not-empty':
        this.verifyIfIsEmptyArray()
        break

      case 'must-contain':
        this.verifyMustContain()
        break

      case 'max':
        this.verifyIfIsMax()
        break

      case 'maxPrice':
        this.verifyIfIsMaxPrice()
        break

      case 'min':
        this.verifyIfIsMin()
        break

      case 'minPrice':
        this.verifyIfIsMinPrice()
        break

      case 'phone-number':
        this.verifyIfIsPhoneNumber()
        break

      case 'phone-number-no-ddd':
        this.verifyIfIsPhoneNumberNoDDDD()
        break

            /* // IF ERROR SELECTED IS  MIN VALUE

            // IF ERROR SELECTED IS  MIN VALUE
            case  "number-between":
                this.verifyIfNumberBetween(listName, fieldName, typeValidation.secondValue);
                break; */

            // IF THE ERRRO SELECTED IS NOT EMPTY ARRAY
    }
  }

  /* ------------------------------------------------------------------------------ TYPE OF ERRORS
  ---------------------------------------------------------------------------------------------- */
  // STRING VALIDATION
  verifyIfIsNull () {
    if (this.filed_value === '' || this.filed_value === 0 || this.filed_value === null) {
      this.errors_string = 'O campo ' + this.field_name_translated + ' não pode ser nulo'
    }
  }

  // ARRAY VALIDATION
  verifyIfIsEmptyArray () {
    if (this.filed_value.length === 0) {
      this.errors_string = 'O campo ' + this.field_name_translated + ' não pode ser nulo'
    }
  }

  // MUST CONTAIN
  verifyMustContain () {
    if (!this.filed_value.includes(this.extrafilterValue)) {
      this.errors_string = 'O campo ' + this.field_name_translated + ' deve conter ' + this.extrafilterValue
    }
  }

  // IF ERROR SELECTED IS  MAX  VALUE
  verifyIfIsMax () {
    this.getMaxValue(false)
  }

  verifyIfIsMaxPrice () {
    this.getMaxValue(true)
  }

  verifyIfIsMin () {
    this.getMinValue(false)
  }

  verifyIfIsMinPrice () {
    this.getMinValue(true)
  }

  getMaxValue (money) {
    const responseValue = money ? this.formatMoney(this.extrafilterValue) : this.extrafilterValue

    // IS ARRAY
    if (this.filed_value instanceof Array) {
      if (this.filed_value.length > this.extrafilterValue) {
        this.errors_string = 'Você deve Selecionar no Máximo  ' + responseValue + ' ' + this.field_name_translated
      }
      return
    }

    // IS STRING
    if (isNaN(this.filed_value)) {
      if (this.filed_value.length > this.extrafilterValue) {
        this.errors_string = 'O campo ' + this.field_name_translated + ' deve conter menos caracteres do que ' + responseValue
      }
    }

    // IS NUMBER
    if (this.filed_value > this.extrafilterValue) {
      this.errors_string = 'O campo ' + this.field_name_translated + ' deve ser menor que ' + responseValue
    }
  }

  getMinValue (money) {
    const responseValue = money ? this.formatMoney(this.extrafilterValue) : this.extrafilterValue

    // IS ARRAY
    if (this.filed_value instanceof Array) {
      if (this.filed_value.length < this.extrafilterValue) {
        this.errors_string = 'Você deve Selecionar no Mínimo  ' + responseValue + ' ' + this.field_name_translated
      }
      return
    }

    // IS STRING
    if (isNaN(this.filed_value)) {
      if (this.filed_value.length < this.extrafilterValue) {
        this.errors_string = 'O campo ' + this.field_name_translated + ' deve conter mais caracteres do que ' + responseValue
      }
    }

    // IS NUMBER
    if (this.filed_value < this.extrafilterValue) {
      this.errors_string = 'O campo ' + this.field_name_translated + ' deve ser Maior que ' + responseValue
    }
  }

  verifyIfIsPhoneNumber () {
    if (this.filed_value.length < 10) {
      this.errors_string = 'O campo ' + this.field_name_translated + ' deve conter um número de telefone válido'
    }
  }

  verifyIfIsPhoneNumberNoDDDD () {
    if (this.filed_value.length < 8) {
      this.errors_string = 'O campo ' + this.field_name_translated + ' deve conter um número de telefone válido'
    }
  }

  // FORMATA PREÇO
  formatMoney (price) {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    })

    return formatter.format(price) // "$1,000.00"
  }
}
export default ValidateField
