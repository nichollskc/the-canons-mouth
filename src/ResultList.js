import React from 'react';

const ResultList = ({resultList=[]}) => {
      return (
              <React.Fragment>
                  { resultList.map((data,index) => {
                          if (data) {
                              return (
                                  <div key={data.id}>
                                      <h1>{data.match}</h1>
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
