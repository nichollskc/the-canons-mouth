import React from 'react';
import CheckboxContainer from './CheckboxContainer.js';
import texts from './texts.js';

const defaultTexts = {};
const allTextsOff = {};
const allTextsOn = {};
texts.forEach(i => {
    defaultTexts[i.name] = i.startsChecked;
    allTextsOff[i.name] = false;
    allTextsOn[i.name] = true;
});

class CanonText extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checkedItems: {...defaultTexts},
        }
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleAllTextsOn = this.handleAllTextsOn.bind(this);
        this.handleAllTextsOff = this.handleAllTextsOff.bind(this);
    }

    handleCheckboxChange(e) {
        const item = e.target.name;
        const isChecked = e.target.checked;
        const updatedItems = {...this.state.checkedItems};
        updatedItems[item] = isChecked;
        this.setState({ checkedItems: updatedItems });
    }

    handleAllTextsOff(e) {
        this.setState({ checkedItems: {...allTextsOff} });
    }

    handleAllTextsOn(e) {
        this.setState({ checkedItems: {...allTextsOn} });
    }

    render() {
        return(
            <React.Fragment>
                   <button id='allOn' onClick={this.handleAllTextsOn}>Select all</button>
                   <button id='allOff' onClick={this.handleAllTextsOff}>Deselect all</button>
                   <CheckboxContainer checkedItems={this.state.checkedItems} handleCheckboxChange={this.handleCheckboxChange} checkboxes={texts}/>
                   {
                       texts.map(item => (
                           <React.Fragment>
                           {this.state.checkedItems[item.name] === true &&
                               <div class='canonText'>
                                   <h2>{item.full_name}</h2>
                                   <pre>{item.text}</pre>
                               </div>
                           }
                           </React.Fragment>
                       ))
                   }
            </React.Fragment>
        );
    }
}

export default CanonText;

