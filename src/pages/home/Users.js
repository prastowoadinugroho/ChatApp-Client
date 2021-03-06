import React from 'react'
import { gql, useQuery} from '@apollo/client';
import { Col, Image } from 'react-bootstrap';
import { useMessageDispatch, useMessageState } from '../../context/message';
import classNames from 'classnames';

const GET_USERS = gql`
    query getUsers {
        getUsers {
        username email createdAt imageUrl
            latestMessage {
                uuid from to createdAt content
            }
        }
    }
`

export default function Users() {
    const dispatch = useMessageDispatch();
    const { users } = useMessageState();
    const selectedUser = users?.find((u) => u.selected === true)?.username

    const { loading } = useQuery(GET_USERS, {
        onCompleted: data => dispatch({
            type: 'SET_USERS', 
            payload: data.getUsers
        }),
        onError: err => console.log(err)
    })

    let usersMarkup
    if(!users || loading){
        usersMarkup = <p>Loading...</p>
    }else if(users.length === 0){
        usersMarkup = <p>No users have joined...</p>
    } else if(users.length > 0){
        usersMarkup = users.map((user) => {
            const selected = selectedUser === user.username
            return (
            <div
                role="button"
                className={classNames("user-div d-flex p-3", {'bg-white': selected})} 
                key={user.username} 
                onClick = {() => dispatch({ type: 'SET_SELECTED_USER', payload: user.username})} 
            >
                <Image src={user.imageUrl} roundedCircle className="mr-2"
                style= {{
                    width: 50,
                    height: 50,
                    objectFit: 'cover'
                }}/>
                <div>
                    <p className="text-success">{user.username}</p>
                    <p>
                        {user.latestMessage ? user.latestMessage.content : 'You are now connected'}
                    </p>
                </div>
            </div>
            )
        })
    }

    return (
        <Col xs={4} className="p-0 bg-secondary">
            {usersMarkup}
        </Col>
    )
}
