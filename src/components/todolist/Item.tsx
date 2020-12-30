import React from 'react';

interface ItemProps {
    id: Number,
    name: String,
    checked: boolean,
    cbClick: (checked: boolean) => void;
}

export class Item extends React.Component<ItemProps> {
    render() {
        return (
            <div className="item">
                <input className="cb" type="checkbox" checked={this.props.checked} name={`done-item${this.props.id}`} id={`cb-item${this.props.id}`} onChange={e => {this.props.cbClick(e.target.checked)}}/>
                <label htmlFor={`cb-item${this.props.id}`}>{!this.props.checked ? this.props.name : <del>{this.props.name}</del>}</label>
            </div>
        );
    }
}