import {Navigate} from  'react-router-dom'

const { Component } = require("react");
function Protected({isAuth,children}){
if(isAuth){
    return children;
}
else{
return <Navigate to={'/login'}/>
}
}
<Component>

</Component>
export default Protected
