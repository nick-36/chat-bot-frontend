import React, { useEffect, useState } from "react";
import { Avatar, useChatContext } from "stream-chat-react";
import "./UsersList.scss";

const UserItem = ({ user, setSelectedUsers }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = () => {
    if (isSelected) {
      setSelectedUsers((prevUsers) =>
        prevUsers.filter((prevUser) => prevUser !== user.id)
      );
    } else {
      setSelectedUsers((prevUsers) => [...prevUsers, user.id]);
    }

    setIsSelected((prevSelected) => !prevSelected);
  };

  return (
    <div className="user__list__item">
      <div className="user__info">
        <Avatar image={user.image} name={user.fullName || user.id} size={32} />
        <p>{user.first__name || user.id}</p>
      </div>
      <div className="user__select">
        <input type="checkbox" value={user.id} onChange={handleSelect} />
      </div>
    </div>
  );
};

const ListContainer = ({ children }) => {
  return (
    <div className="user__list__container">
      <div className="user__list__header">
        <h4>Users</h4>
        <h4>Invite</h4>
      </div>
      <div className="user__list__items">{children}</div>
    </div>
  );
};

const UsersList = ({ setSelectedUsers }) => {
  const [users, setUsers] = useState([]);
  const { client } = useChatContext();
  const [err, setErr] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await client.queryUsers({ id: { $ne: client.user.id } });
        if (res.users?.length) {
          setUsers(res.users);
        }
      } catch (err) {
        console.log(err);
        setErr(true);
      }
    };
    fetchUsers();
    //eslint-disable-next-line
  }, []);

  if (err) {
    return (
      <ListContainer>
        <h1>Error in Connection! please try again later..</h1>
      </ListContainer>
    );
  }

  if (!users) {
    return (
      <ListContainer>
        <h1>No User Found!</h1>
      </ListContainer>
    );
  }
  return (
    <ListContainer>
      {users.map((user, i) => {
        return (
          <UserItem
            user={user}
            key={user.id}
            index={i}
            setSelectedUsers={setSelectedUsers}
          />
        );
      })}
    </ListContainer>
  );
};

export default UsersList;
