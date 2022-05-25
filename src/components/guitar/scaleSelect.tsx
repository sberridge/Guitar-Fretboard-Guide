import React from "react";
import { ChangeEventHandler } from "react";

import notes from './../../lib/notes';
import scales from './../../lib/scales';

type scaleSelectProps = {
    onScaleChange: ChangeEventHandler<HTMLSelectElement>
    onRootChange: ChangeEventHandler<HTMLSelectElement>
}

const renderNoteOpts = ()=>{
    return notes.map(note=>{
        return <option key={note} value={note}>{note}</option>;
    });
};

const renderScaleOpts = ()=>{
    return Array.from(scales.entries()).map((scale,i)=>{
        return <option key={i} value={scale[1]}>{scale[0]}</option>;
    });
};

export default function ScaleSelect({onScaleChange,onRootChange}:scaleSelectProps) {
    return <div className="scale-control">
        <h3 className="has-text-light title is-6 mb-0">Scale</h3>
        <div className="scale-control__controls">
            <div className="scale-control__control">
                <div className="field">
                    <label className="label has-text-light" htmlFor="scale-root-select">Root</label>
                    <div className="control">
                        <select id="scale-root-select" className="select" onChange={onRootChange}>
                            <option></option>
                            {renderNoteOpts()}
                        </select>
                    </div>
                </div>
            </div>
            <div className="scale-control__control">
                <div className="field">
                    <label className="label has-text-light" htmlFor="scale-scale-select">Scale</label>
                    <div className="control">
                        <select id="scale-scale-select" className="select" onChange={onScaleChange}>
                            <option></option>
                            {renderScaleOpts()}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}