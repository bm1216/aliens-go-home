import React, {Component} from "react";
import PropTypes from 'prop-types'
import { render } from "react-dom";
import Canvas from './components/Canvas'

export default function App(props) {
  return (
    <Canvas/>
  )
}

App.propTypes = {
  message: PropTypes.string.isRequired
};


