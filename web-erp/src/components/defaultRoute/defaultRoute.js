// @flow
import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { AppContext } from 'config/AppContext';

export default function DefaultRoute(props) {
    const { component: Component, roles = [], needUserLogged, ...rest } = props;

    // const ctx = useContext(AppContext);
    // const { user, aplicationInit } = ctx;

    function canPermit() {
        if (!needUserLogged) {
            return true;
        }
        // if (needUserLogged && aplicationInit && user) {
        //     return true;
        // }
        // if (aplicationInit && roles.length > 0 && roles.includes(user?.permissao)) {
        //     return true;
        // }
        // if (!aplicationInit) {
        //     // como é redirecionamento espera aplicacao iniciar para ter certeza do valor em user
        //     return true;
        // }

        return false;
    }

    const permit = canPermit();

    return (
        <Route
            {...rest}
            render={(props, context) =>
                permit ? (
                    <Component {...props} {...context} {...rest} />
                ) : (
                        <Redirect to={needUserLogged ? '/login' : '/'} />
                    )
            }
        />
    );
}