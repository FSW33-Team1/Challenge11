// reducers/counterReducer.js
const counterReducer = (state = 'NOTLOGGEDIN', action) => {
    switch (action.type) {
      case 'LOGGEDIN':
        return state = 'LOGGEDIN';
      case 'NOTLOGGEDIN':
        return state = 'NOTLOGGEDIN';
      default:
        return state;
    }
  };
  
export default counterReducer;
  