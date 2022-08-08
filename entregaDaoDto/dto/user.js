class UserDTO {
  constructor(user) {
    this.id = user.id;
    this.email = user.email;
    this.datos=[
      {
        telefono:user.telefono,
        edad:user.edad
      }
    ]
  }
}

module.exports = UserDTO;
