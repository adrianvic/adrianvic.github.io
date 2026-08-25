import login from "../login.mjs";

export default (p) => {
    p.child("login", login);
}