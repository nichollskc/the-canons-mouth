import React, { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
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
        <Container>
            <Row>
               <Col>
                   <div id="checkboxes">
                       <table>
                           {
                               texts.map(item => (
                                   <tr>
                                       <td>
                                           <label key={item.checkbox_key}>
                                               <Checkbox name={item.name} checked={checkedItems.has(item.name)} onChange={handleCheckboxChange} />
                                               <span><a href={"/texts/" + item.name + ".html"}>{item.full_name}</a></span>
                                           </label>
                                       </td>
                                       <td>
                                           <span class="countForText">({countsByText[item.name]})</span>
                                       </td>
                                   </tr>
                               ))
                           }
                       </table>
                   </div>
                   <div id="buttonsDiv">
                       <button id='allOn' onClick={handleAllTextsOn}>Select all</button>
                       <button id='allOff' onClick={handleAllTextsOff}>Deselect all</button>
                   </div>
               </Col>
               <Col xs={9}>
                   <SearchPage perPage={20} selected_texts={checkedItems} updateCountsByText={updateCountsByText}/>
               </Col>
           </Row>
        </Container>
    );
}

export default CanonText;

