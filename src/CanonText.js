import React, {useState} from 'react';
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
    }

    const handleAllTextsOff = (event) => {
        setCheckedItems(allTextsOff);
    }

    const handleAllTextsOn = (event) => {
        setCheckedItems(allTextsOn);
    }

    return(
        <React.Fragment>
               <div id='buttonsDiv'>
                   <p class='smallFont'>Loading many texts at once can be slow...</p>
                   <button id='allOn' onClick={handleAllTextsOn}>Select all</button>
                   <button id='allOff' onClick={handleAllTextsOff}>Deselect all</button>
                   <React.Fragment>
                       {
                           texts.map(item => (
                               <label key={item.checkbox_key}>
                                   {item.full_name}
                                   <Checkbox name={item.name} checked={checkedItems.has(item.name)} onChange={handleCheckboxChange} />
                               </label>
                           ))
                       }
                   </React.Fragment>
               </div>
               <SearchPage perPage={50} selected_texts={checkedItems}/>
        </React.Fragment>
    );
}

export default CanonText;

