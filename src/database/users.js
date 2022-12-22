const fs = require("fs/promises");
const path = require("path");

const User = {
  async findAll() {
    try {
      const content = await fs.readFile(path.join(__dirname, "users.json"), {
        encoding: "utf-8",
      });
      const users = JSON.parse(content);

      return users;
    } catch (error) {
      throw error;
    }
  },
  async findOne(id) {
    try {
      const content = await fs.readFile(path.join(__dirname, "users.json"), {
        encoding: "utf-8",
      });
      const users = JSON.parse(content);

      return users.find((user) => user.id == id) ?? null;
    } catch (error) {
      throw error;
    }
  },
  async create(user) {
    try {
      const users = await this.findAll();

      const errors = {};

      if (!/^[a-z ,.'-]+$/i.test(user?.first_name)) {
        errors.first_name = [];
        errors.first_name.push("Expect a valid first name");
      }

      if (!/^[a-z ,.'-]+$/i.test(user?.last_name)) {
        errors.last_name = [];
        errors.last_name.push("Expect a valid last name");
      }

      if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(user?.email)) {
        errors.email = [];
        errors.email.push("Expect a email format data");
      }

      if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(user?.password)) {
        errors.password = [];
        errors.password.push(
          "Invalid password. Minimum eight characters, at least one letter and one number"
        );
      }

      if (
        !/((?:19|20)[0-9][0-9])\/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])/i.test(
          user?.birthday
        )
      ) {
        errors.birthday = [];
        errors.birthday.push("Invalid birthday. Expect value like yyyy/mm/dd");
      }

      if (users.some(({ email }) => email == user?.email)) {
        if (!errors.email) errors.email = [];
        errors.birthday.push("Email should be unique.");
      }

      if (Object.keys(errors).length) {
        const error = new Error();

        error.message = errors;

        throw error;
      }

      user.id = Date.now();

      users.push(user);

      await fs.writeFile(
        path.join(__dirname, "users.json"),
        JSON.stringify(users),
        {
          encoding: "utf-8",
        }
      );
    } catch (error) {
      throw error;
    }
  },
};

module.exports = User;
