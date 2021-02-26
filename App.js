/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';


import Button from './src/components/Button';
import Display from './src/components/Display';


const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0,0],
  current: 0
}


export default () => {
  const [displayValue, setDisplayValue] = useState('0')
  const [clearDisplay, setClearrDisplay] = useState(false)
  const [operation, setOperationState] = useState(0)
  const [values, setValues] = useState([0,0])
  const [current, setCurrent] = useState(0)
  
  addDigt = n => {
    const clearDisplayAux = displayValue === '0' || clearDisplay

    if(n === '.' && !clearDisplayAux && displayValue.includes('.')){
      return
    }

    const currentValue = clearDisplayAux ? '' : displayValue 
    const displayValueAux = currentValue + n
    setDisplayValue(displayValueAux)
    setClearrDisplay(false)

    if(n !== '.'){
      const newValue = parseFloat(displayValueAux)
      const valuesAux = [...values]
      valuesAux[current] = newValue
      setValues(valuesAux)
    }
  }
  
  clearMemory = () => {
    setDisplayValue(initialState.displayValue)
    setClearrDisplay(initialState.clearDisplay)
    setOperation(initialState.operation)
    setValues(initialState.values)
    setCurrent(initialState.current)
  }

  setOperation = newOperation => {
    if(current === 0) {
      setOperationState(newOperation)
      setCurrent(1)
      setClearrDisplay(true)
    }else{
      const equals = newOperation === '='
      const valuesAux = [...values]
      try {
        valuesAux[0] = eval(`${valuesAux[0]} ${operation} ${valuesAux[1]}`)
      } catch (e) {
        valuesAux[0] = values[0]
      }

      valuesAux[1] = 0
      setDisplayValue(`${valuesAux[0]}`)
      setOperationState(equals ? null : newOperation)
      setCurrent(equals ? 0 : 1)
      setClearrDisplay( !equals )
      setValues(valuesAux)
    }
  }


  return (
    <View style={styles.container}>
      <Display value={displayValue} />
      <View style={styles.buttons}>
        <Button label="AC" triple    onClick={ () => clearMemory() }/>
        <Button label="/"  operation onClick={ () => setOperation('/')}/>
        <Button label="7"            onClick={ () => addDigt('7')}/>
        <Button label="8"            onClick={ () => addDigt('8')}/>
        <Button label="9"            onClick={ () => addDigt('9')}/>
        <Button label="*"  operation onClick={ () => setOperation('*')}/>
        <Button label="4"            onClick={ () => addDigt('4')}/>
        <Button label="5"            onClick={ () => addDigt('5')}/>
        <Button label="6"            onClick={ () => addDigt('6')}/>
        <Button label="-"  operation onClick={ () => setOperation('-')}/>
        <Button label="1"            onClick={ () => addDigt('1')}/>
        <Button label="2"            onClick={ () => addDigt('2')}/>
        <Button label="3"            onClick={ () => addDigt('3')}/>
        <Button label="+"  operation onClick={ () => setOperation('+')}/>
        <Button label="0"  double    onClick={ () => addDigt('0')}/>
        <Button label="."            onClick={ () => addDigt('.')}/>
        <Button label="="  operation onClick={ () => setOperation('=')}/>
      </View>
    </View> 
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});


