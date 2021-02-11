import React from 'react';

import {Item} from './Item';

interface IItem {
    id: number,
    name: string,
    checked: boolean
}

interface State {
    items: IItem[],
    filteredItems: IItem[],
    inputVal: string,
    searchVal: string,
}

export class ToDoList extends React.Component<{}, State> {
    state = {
        items: [] as IItem[],
        filteredItems: [] as IItem[],
        inputVal: '',
        searchVal: '',
    };

    componentDidMount = () => {
        let meh = localStorage.getItem('items');
        let itemsFromStorage: IItem[] = meh ? JSON.parse(meh) : null;
        if(itemsFromStorage) {
            this.setState({items: itemsFromStorage}, this.listUpdated);
            this.setState({filteredItems: itemsFromStorage}, this.listUpdated);
        }
    }

    addItem = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(this.state.inputVal === '') return;
        let arr: IItem[] = this.state.items;
        arr.push({id: arr.length, name: this.state.inputVal, checked: false});
        this.setState({items: arr}, this.listUpdated);
        this.setInputVal('');
        this.updateFilteredItems();
    }

    updateCheckItem = (i: number, checked: boolean) => {
        let arr: IItem[]  = this.state.items;
        arr[i].checked = checked;
        this.setState({items: arr}, this.listUpdated);
        this.updateFilteredItems();
    }

    searchValUpdate = async (val: string) => {
        console.log('1Val: ', val)
        this.setState({searchVal: val});
        console.log('2Val: ', this.state.searchVal)
        this.updateFilteredItems();
    }

    setInputVal = (val: string) => {
        this.setState({inputVal: val});
    }

    updateFilteredItems = () => {
        const filtered: IItem[] = this.state.items.filter((item: IItem) => {
            return item.name.toLowerCase().includes(this.state.searchVal);
        });
        this.setState({filteredItems: filtered});
    }

    listUpdated = () => {
        let todo: IItem[]  = [];
        let done: IItem[]  = [];
        this.state.items.map((item: IItem) => {
            if(item.checked) done.push(item);
            else todo.push(item);
            return item;
        });
        todo.push(...done);
        //this.setState({items: todo});
        localStorage.setItem('items', JSON.stringify(this.state.items));
    }

    render() {
        return(
            <div className="todolist">
                <h2>ToDo List test</h2>
                <form>
                    <input className="ipt searchIpt" placeholder="Search item..." type="text" value={this.state.searchVal} onChange={async e =>this.searchValUpdate(e.target.value)}/>
                </form>
                <div className="todolist-list">
                    {this.state.filteredItems.map((item: any, idx: number) => {
                        return <Item key={item.id} id={item.id} name={item.name} checked={item.checked} cbClick={val => {this.updateCheckItem(item.id, val)}}/>;
                    })}
                </div>
                <form>
                    <input className="ipt textIpt" placeholder="New item..." type="text" value={this.state.inputVal} onChange={e =>this.setInputVal(e.target.value)}/>
                    <button className="btn" type="submit" onClick={this.addItem}>+</button>
                </form>
            </div>
        );
    }
}
