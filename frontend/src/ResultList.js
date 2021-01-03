import React from 'react';


const ResultList = ({resultList=[]}) => {
    return (
        <div class="resultsList">
        { resultList.map((data,index) => {
            if (data) {
                return (
                    <div key={data.key} class={`canonText ${data.text_id}`}>
                        <pre>{data.before}<b>{data.matching}</b>{data.after}</pre>
                        <div class="resultLabel">
                            <p>{data.text_fullname}{data.start_line}</p>
                            <p>Errors:{data.errors}</p>
                        </div>
                    </div>
                )
            }
            return null
        })
        }
        </div>
    );
}

export default ResultList
