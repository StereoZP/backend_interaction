import React from 'react';

const UsersTable = (props) => {
    const {id, email, login, status} = props
    return (
        <div>
            <div>{id}</div>
            <div>{email}</div>
            <div>{login}</div>
            <div>{status}</div>
        </div>
    );
};

export default UsersTable;