import { Redirect, Route } from "react-router";

export default function PrivateRoute({ component: AddProducto, ...rest }) {

    return (
        <>
        <Route {...rest}>
        {
            rest.auth?
           <AddProducto/>
           :
           <Redirect to="/" />
        }
        </Route>

        </>
    )
}
