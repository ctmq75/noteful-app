
import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import App from './App.js'


class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          hasError: false
        };
      }


    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    render() {
        if (this.state.hasError) {      
            return (
                <>
                <p className="err_msg">
                    <strong>Something went wrong!</strong>
                </p>
                <Route
                    path='/'
                    component={App}
                />
                
                </>
            );
          }
          return this.props.children;
    }
}

export default ErrorBoundary

ErrorBoundary.propTypes = {
    hasError: PropTypes.bool
};