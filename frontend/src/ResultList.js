import React from 'react';


const ResultList = ({resultList=[]}) => {
    return (
        <div class="resultsList">
        { resultList.map((data,index) => {
            if (data) {
                return (
                    <div key={data.key} class={`canonText ${data.text_id}`}>
                        <a href={"/texts/" + data.text_id + ".html#line_" + data.start_line}>
                        <pre>{data.before}<b>{data.matching}</b>{data.after}</pre>
                        <div class="resultLabel">
                            <p>{data.text_fullname}: {data.chapter}</p>
                            <p>Errors:{data.errors}</p>
                        </div>
                        </a>
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
