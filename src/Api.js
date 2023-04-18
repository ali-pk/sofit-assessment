export const getData = (setUsers) => {
  fetch(
    "https://randomuser.me/api/?results=10&inc=id,name,dob,phone,email,location,gender,picture",
    {
      method: "GET",
    }
  )
    .then(async (response) => {
      if (response.status !== 200) {
        throw new Error("Ops, please try again later !");
      } else {
        const users = await response.json();
        setUsers(users.results);
        console.log(users.results);
      }
    })
    .catch((err) => {
      alert(err);
    });
};
