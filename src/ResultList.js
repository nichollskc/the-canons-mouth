import React from 'react';


const ResultList = ({resultList=[]}) => {
    const text_names = new Map();

    text_names.set("./texts/tokenized/malory1.txt", "Malory Part 1");
    text_names.set("./texts/tokenized/malory2.txt", "Malory Part 2" );
    text_names.set("./texts/tokenized/shakespeare.txt", "Shakespeare full works");
    text_names.set("./texts/tokenized/idylls_king.txt", "Tennyson's Idyllys of the King");
    text_names.set("./texts/tokenized/faerie_queen.txt", "Spenser's Faerie Queen");
    text_names.set("./texts/tokenized/bible.txt", "King James Bible");
    text_names.set("./texts/tokenized/aeneid.txt", "Dryden's Aeneid");
    text_names.set("./texts/tokenized/iliad.txt", "Pope's Iliad");
    text_names.set("./texts/tokenized/odyssey.txt", "Pope's Odyssey");
    text_names.set("./texts/tokenized/paradise_lost.txt", "Milton's Paradise Lost");
    text_names.set("./texts/tokenized/paradise_regained.txt", "Milton's Paradise Regained");
    text_names.set("./texts/tokenized/mabinogion.txt", "Lady Charlotte Guest's Mabinogion");

    return (
        <React.Fragment>
        { resultList.map((data,index) => {
            if (data) {
                return (
                    <div key={data.key} class="canonText">
                    <pre>{data.before}<b>{data.matching}</b>{data.after}</pre>
                    <div class="resultLabel">
                        <p>{text_names.get(data.text)}{data.start_line}</p>
                        <p>Errors:{data.errors}</p>
                    </div>
                    </div>
                )
            }
            return null
        })
        }
        </React.Fragment>
    );
}

export default ResultList
