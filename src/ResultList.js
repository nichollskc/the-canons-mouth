import React from 'react';

const ResultList = ({resultList=[]}) => {
      return (
              <React.Fragment>
                  { resultList.map((data,index) => {
                          if (data) {
                              return (
                                  <div key={data.name}>
                                      <h1>{data.name}</h1>
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
