import React from 'react';

import {Item} from './Item';

interface IItem {
    name: string,
    checked: boolean
}

interface State {
    items: IItem[],
    checked: boolean
}

export class ToDoList extends React.Component {
    state = {
        items: [],
        inputVal: '',
    };

    constructor(props : any) {
        super(props);
        
        let meh = localStorage.getItem('items');
        let itemsFromStorage: IItem[] = meh ? JSON.parse(meh) : null;
        if(itemsFromStorage) {
            console.log(itemsFromStorage);
            this.setState({items: itemsFromStorage}, this.listUpdated);
        }
    }

    addItem = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(this.state.inputVal == '') return;
        let arr: IItem[] = this.state.items;
        arr.push({name: this.state.inputVal, checked: false});
        this.setState({items: arr}, this.listUpdated);
        this.setInputVal('');
    }

    updateCheckItem = (i: number, checked: boolean) => {
        let arr: IItem[]  = this.state.items;
        arr[i].checked = checked;
        this.setState({items: arr}, this.listUpdated);
    }

    setInputVal = (val: String) => {
        this.setState({inputVal: val});
    }

    listUpdated = () => {
        console.log("vasdfasdfas");
        let todo: IItem[]  = [];
        let done: IItem[]  = [];
        this.state.items.map((item: IItem) => {
            if(item.checked) done.push(item);
            else todo.push(item);
        });
        todo.push(...done);
        this.setState({items: todo});
        localStorage.setItem('items', JSON.stringify(this.state.items));
    }

    render() {
        return(
            <div className="todolist">
                <h2>ToDo List</h2>
                <div className="todolist-list">
                    {this.state.items.map((item: any, idx: number) =>
                        <Item id={idx+1} name={item.name} checked={item.checked} cbClick={val => {this.updateCheckItem(idx, val)}}/>
                    )}
                </div>
                <form>
                    <input className="textIpt" placeholder="New item..." type="text" value={this.state.inputVal} onChange={e =>this.setInputVal(e.target.value)}/>
                    <button className="btn" type="submit" onClick={this.addItem}>+</button>
                </form>
            </div>
        );
    }
}
