import React from 'react';

const ResultList = ({resultList=[]}) => {
      return (
              <React.Fragment>
                  { resultList.map((data,index) => {
                          if (data) {
                              return (
                                  <div key={data.key}>
                                      <h1>{data.matching}</h1>
                                      <p>{data.length}</p>
                                      <p>{data.errors}</p>
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
