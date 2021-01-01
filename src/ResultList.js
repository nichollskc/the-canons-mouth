import React from 'react';

const ResultList = ({resultList=[]}) => {
      return (
              <React.Fragment>
                  { resultList.map((data,index) => {
                          if (data) {
                              return (
                                  <div key={data.key} class="canonText">
                                      <pre>{data.before}<b>{data.matching}</b>{data.after}</pre>
                                      <p>{data.text}:{data.start_line} Errors:{data.errors}</p>
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
