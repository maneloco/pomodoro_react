import React, {Component, useState} from 'react';
import './App.css';

class App extends Component {
    render(){
        return(
            <div className="container" id="container">
                <div className="circle" id="circle">
                    <InnerCircle />
                </div>
            </div>
        )
    }
}

class InnerCircle extends Component {
    constructor(props){
        super(props);
        this.state = {
            inp_focus: false,
            timeValue: "00:10"
        };
    }
    handleFocus = () => {
        this.setState({inp_focus: true});
    }
    handleBlur = () => {
        this.setState({inp_focus:false})
    }
    handleChange = (e) => {
        let { value } = e.target;

        // Eliminar cualquier carácter que no sea un número
        value = value.replace(/\D/g, '');

        // Limitar el valor de minutos y segundos a 59
        if (value.length >= 2) {
            const minutes = parseInt(value.slice(0, 2), 10);
            if (minutes > 59) {
                value = '59';
            }
        }

        if (value.length >= 4) {
            const seconds = parseInt(value.slice(2, 4), 10);
            if (seconds > 59) {
                value = value.slice(0, 2) + '59';
            }
        }

        // Formatear el valor correctamente (00:00)
        if (value.length > 2) {
            value = value.slice(0, 2) + ':' + value.slice(2);
        }
        this.setState({ timeValue: value });
        console.log({value})
        }

        isValidValue = (value) => {
            // Verificar si el valor es un formato de tiempo válido (mm:ss)
            const regex = /^(0[0-5]|[1-5][0-9]):([0-5][0-9])$/;
            return regex.test(value);
        }

    startTimer = () => {
        const {timeValue} = this.state;
        let stringValue = this.state.timeValue.toString();

        if(this.isValidValue(timeValue) && timeValue !== "") {
            var seconds = parseInt(stringValue.split(0,2)) * 60 + parseInt(stringValue.split(2,4));
            console.log("Timer started succesfully" + seconds + "seconds remaining")
        } else {
            alert("Introduce a valid time format mm:ss")
        }
    }
    render(){
        const {timeValue, inp_focus} = this.state;
        const inputClassName = inp_focus ? "input_focus" : "input_blur";

        return(
        <div className="innerCircle" id="inner">
            <div id="timer"><input type="text" className={inputClassName} onFocus={this.handleFocus} onBlur={this.handleBlur} value={timeValue} onChange={this.handleChange} maxLength={5}/></div>
            <button id="startButton" onClick={this.startTimer}>Start</button>      
        </div>
        )
    }
}

export default App;
