import React, { useState, useEffect, useRef } from 'react';
import Checkbox from './Checkbox';
import SearchPage from './SearchPage.js';
import texts from './texts.js';

const defaultTexts = new Set();
const allTextsOff = new Set();
const allTextsOn = new Set();
texts.forEach(i => {
    if (i.startsChecked) {
        defaultTexts.add(i.name);
    }
    allTextsOn.add(i.name);
});

const CanonText = (props) => {
    const [checkedItems, setCheckedItems] = useState(defaultTexts);
    const [countsByText, setCountsByText] = useState(new Map());

    const handleCheckboxChange = (event) => {
        const item = event.target.name;
        const isChecked = event.target.checked;
        const updatedItems = new Set(checkedItems);
        if (isChecked) {
            updatedItems.add(item);
        } else {
            updatedItems.delete(item);
        }
        setCheckedItems(updatedItems);
    };

    const handleAllTextsOff = (event) => {
        setCheckedItems(allTextsOff);
    };

    const handleAllTextsOn = (event) => {
        setCheckedItems(allTextsOn);
    };

    const updateCountsByText = (newCounts) => {
        setCountsByText(newCounts);
    };

    useEffect(() => {
        console.log(countsByText);
        console.log(countsByText['aeneid']);
    }, [countsByText]);

    return(
        <React.Fragment>
               <div id='buttonsDiv'>
                   <div id="checkboxes">
                       <table>
                           {
                               texts.map(item => (
                                   <tr>
                                       <td>
                                           <label key={item.checkbox_key}>
                                               <Checkbox name={item.name} checked={checkedItems.has(item.name)} onChange={handleCheckboxChange} />
                                           </label>
                                       </td>
                                       <td>
                                           {item.full_name}
                                       </td>
                                       <td>
                                           ({countsByText[item.name]})
                                       </td>
                                   </tr>
                               ))
                           }
                       </table>
                   </div>
                   <div>
                       <button id='allOn' onClick={handleAllTextsOn}>Select all</button>
                       <button id='allOff' onClick={handleAllTextsOff}>Deselect all</button>
                   </div>
               </div>
               <SearchPage perPage={50} selected_texts={checkedItems} updateCountsByText={updateCountsByText}/>
        </React.Fragment>
    );
}

export default CanonText;

