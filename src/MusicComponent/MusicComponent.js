import React from "react";
import PianoComponent from "./InstrumentComponent/Piano/PianoComponent";
import {Piano, KeyboardShortcuts, MidiNumbers} from 'react-piano';
import DrumComponent from "./InstrumentComponent/drum/DrumComponent";

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';

const noteRange = {
    first: MidiNumbers.fromNote('c3'),
    last: MidiNumbers.fromNote('f4'),
};
const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: noteRange.first,
    lastNote: noteRange.last,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
});

const MusicComponent = ({socket}) => {

    return (
        <div className="musicComponent">
            <PianoComponent
                socket={socket}
                instrumentName="acoustic_grand_piano"
                audioContext={audioContext}
                hostname={soundfontHostname}
                render={({isLoading, playNote, stopNote}) => (
                    <Piano
                        noteRange={noteRange}
                        width={300}
                        playNote={playNote}
                        stopNote={stopNote}
                        disabled={isLoading}
                        keyboardShortcuts={keyboardShortcuts}
                    />
                )}/>

        <DrumComponent socket={socket}/>
        </div>
    )

}

export default MusicComponent;