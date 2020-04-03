import React, { Component } from 'react';
import "./drum.css"

const bankOne = [{
    keyCode: 81,
    key: "Q",
    name: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
}, {
    keyCode: 87,
    key: "W",
    name: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
}, {
    keyCode: 69,
    key: "E",
    name: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
}, {
    keyCode: 65,
    key: "A",
    name: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
}, {
    keyCode: 83,
    key: "S",
    name: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
}, {
    keyCode: 68,
    key: "D",
    name: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
}, {
    keyCode: 90,
    key: "Z",
    name: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
}, {
    keyCode: 88,
    key: "X",
    name: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
}, {
    keyCode: 67,
    key: "C",
    name: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
},
];


const volumeHandlerStyle = {
    "--min": 0,
    "--max": 100,
    "--val": 50,
    "--width": "100%",
    "--height": "1.5em",
    "--border-radius": "0.5em",
    "--track-height": "0.75em",
    "--track-border-width": "1px",
    "--track-border-color": "#000",
    "--track-border-style": "solid",
    "--track-color": "#202020",
    "--progress-height": "0.75em",
    "--progress-color": "#35cac5",
    "--thumb-width": "1.15em",
    "--thumb-height": "1.15em",
    "--thumb-border-radius": "40%",
    "--thumb-color": "#202020",
    "--thumb-border": "1px solid #000"
};

class DrumComponent extends Component {
    constructor(props) {
        super(props);

        this.volumeHandler = React.createRef();
        this.iconVolume = React.createRef();
        this.displayVolumeValue = React.createRef();

        this.state = {
            bankIndex: 0,
            volumeValue: 50
        }


        this.onMouseLeaveInput = this.onMouseLeaveInput.bind(this);

        this.volumeChange = this.volumeChange.bind(this);
    }

    volumeChange = (e) => {
        const volume = e.target.value/100;
        document.querySelectorAll('audio').forEach(el => el.volume = volume);
    }


    onMouseLeaveInput() {
        setTimeout(() => {
            this.displayVolumeValue.current.style.setProperty('opacity', 0);
        }, 1000);
    }

    componentDidMount() {
        this.props.socket.on('playDrum', (audioElm) => {
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
            audioElm.play();
        })
    }

    handleClick = (e) => {
        this.setState({
            soundName: e.target.id
        });
        const id = e.target.innerText.trim();
        const audio = this.refs[id];

        //this.props.socket.emit('sendDrum', audio);
        audio.play();
    }

    componentDidUpdate() {
        if (this.hideVolumeTimeout) {
            clearTimeout(this.hideVolumeTimeout);
            this.hideVolumeTimeout = null;
        }
        else {
            this.hideVolumeTimeout = setTimeout(() => {
                this.displayVolumeValue.current.style.setProperty('opacity', 0);
            }, 1000);
        }
    }

    render() {

        let drumPad = bankOne.map(item =>
            <div className="drum-pad" id={item.name} onClick={this.handleClick} >
                {item.key}
                <audio className="clip" ref={item.key} id={item.key} src={item.url}/>
            </div>);

        return (
            <div className="drum" id="drum-machine">
                <div className="drum-control">
                    <div className="drum-control-volumn">
                        <i className="fas fa-volume-down" ref={this.iconVolume}/>
                        <span> Volume</span>
                        <span className="drum-control-volumn-value" ref={this.displayVolumeValue}> {this.state.volumeValue}</span>
                        <input type="range" onChange={this.volumeChange} />
                    </div>
                </div>
                <div className="content">
                    {drumPad}
                </div>
            </div>
        )
    }
}

export default DrumComponent