import React from 'react';
import PropTypes from 'prop-types';
import checkboxes from './checkboxes';
import Checkbox from './Checkbox';

class CheckboxContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checkedItems: new Map(),
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const item = e.target.name;
        const isChecked = e.target.checked;
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
        console.log(this.state.checkedItems);
    }

    render() {
        return (
            <React.Fragment>
                {
                    checkboxes.map(item => (
                        <label key={item.key}>
                            {item.name}
                            <Checkbox name={item.name} checked={this.state.checkedItems.get(item.name)} onChange={this.handleChange} />
                        </label>
                    ))
                }
                {
                    checkboxes.map(item => (
                        <p>{item.name} {this.state.checkedItems.get(item.name) === true && <b>Checked</b>}</p>
                    ))
                }
            </React.Fragment>
        );
    }
}

export default CheckboxContainer;

