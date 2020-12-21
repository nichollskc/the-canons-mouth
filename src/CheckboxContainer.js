import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';

class CheckboxContainer extends React.Component {
    render() {
        return (
            <React.Fragment>
                {
                    this.props.checkboxes.map(item => (
                        <label key={item.checkbox_key}>
                            {item.full_name}
                            <Checkbox name={item.name} checked={this.props.checkedItems.get(item.name)} onChange={this.props.handleCheckboxChange} />
                        </label>
                    ))
                }
            </React.Fragment>
        );
    }
}

export default CheckboxContainer;

