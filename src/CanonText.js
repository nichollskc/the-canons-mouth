import React from 'react';
import CheckboxContainer from './CheckboxContainer.js';
import checkboxes from './checkboxes';

class CanonText extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checkedItems: new Map(),
        }
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    handleCheckboxChange(e) {
        const item = e.target.name;
        const isChecked = e.target.checked;
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
    }

    render() {
        return(
            <React.Fragment>
                   <CheckboxContainer checkedItems={this.state.checkedItems} handleCheckboxChange={this.handleCheckboxChange} checkboxes={checkboxes}/>
                   {
                       checkboxes.map(item => (
                           <p>{item.name} {this.state.checkedItems.get(item.name) === true && <b>Checked</b>}</p>
                       ))
                   }
                   {
                       checkboxes.map(item => (
                           <p>{item.name} {this.state.checkedItems.get(item.name) === true && <pre>{item.text}</pre>}</p>
                       ))
                   }
            </React.Fragment>
        );
    }
}

export default CanonText;

