import React from 'react'
import { Platform } from 'react-native'

export default utils = {
  formatMoney: Platform.OS === 'ios' ? (value) => Number(value).toLocaleString('es-MX', {
    currency: 'MXN',
    minimumFractionDigits: 2,
  }) : (value) => {
    console.log("NUMBER", value)
    const numero = value.toFixed(2).split('.')
    numero[0] = `${numero[0].includes('-') ? numero[0].split(/(?=(?:....)*$)/).join(',') : numero[0].split(/(?=(?:...)*$)/).join(',')}`
    return numero.join('.')
  },
  formatCapitalize: (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(),
  DontRender: ({ condition, children }) => (condition ? <>{children()}</> : <></>),
  isEmpty: (obj) => {
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false
      }
    }
  },
  validationCPF: (cpf) => {
    let numbers; let digit; let soma; let i; let resultado; let
      equalDigit
    equalDigit = 1
    if (cpf.length < 11) return false
    for (i = 0; i < cpf.length - 1; i++) {
      if (cpf.charAt(i) != cpf.charAt(i + 1)) {
        equalDigit = 0
        break
      }
    }
    if (!equalDigit) {
      numbers = cpf.substring(0, 9)
      digit = cpf.substring(9)
      soma = 0
      for (i = 10; i > 1; i--) soma += numbers.charAt(10 - i) * i
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
      if (resultado != digit.charAt(0)) return false
      numbers = cpf.substring(0, 10)
      soma = 0
      for (i = 11; i > 1; i--) soma += numbers.charAt(11 - i) * i
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
      if (resultado != digit.charAt(1)) return false
      return true
    }
    return false
  },
}
