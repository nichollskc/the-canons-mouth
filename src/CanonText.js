import React from 'react';
import CheckboxContainer from './CheckboxContainer.js';
import texts from './texts.js';

class CanonText extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checkedItems: new Map(texts.map(i => [i.name, i.startsChecked])),
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
                   <CheckboxContainer checkedItems={this.state.checkedItems} handleCheckboxChange={this.handleCheckboxChange} checkboxes={texts}/>
                   {
                       texts.map(item => (
                           <React.Fragment>
                           {this.state.checkedItems.get(item.name) === true &&
                               <div class='canonTextDiv'>
                                   <h2><a id={item.name}></a>{item.full_name}</h2>
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

