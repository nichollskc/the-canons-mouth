import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner'

const LoadingSpinner = (props) => {
    return (
		<div>
		{
	      (props.promiseInProgress === true) ?
		    <div>
				<span>Searching in database...  </span>
				<Spinner animation="border" role="status">
				  <span className="sr-only">Loading...</span>
				</Spinner>
			</div>
		  :
			null
		}
	  </div>
    )
};

export default LoadingSpinner;
