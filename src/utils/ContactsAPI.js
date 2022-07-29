const api = "https://whispering-forest-83978.herokuapp.com";

let token = localStorage.token;

if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  Accept: "application/json",
  Authorization: token,
};

export const getAll = () =>
  fetch(`${api}/contacts`, { headers })
    .then((res) => res.json())
    .then((data) => data.contacts);

export const remove = (contact) =>
  fetch(`${api}/contacts/${contact.id}`, { method: "DELETE", headers })
    .then((res) => res.json())
    .then((data) => data.contact);

export const create = (body) =>
  fetch(`${api}/contacts`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
