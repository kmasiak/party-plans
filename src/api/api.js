export const login = async (user_email, user_password) => {
    try {
      const response = await fetch('http://localhost:5000/party/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: user_email,
          password: user_password
        })
      })
      const data = await response.json()
      return data
    } catch (err) {
      console.log("ERR ", err)
      return err
    }
  }

  export const register = async (user_email, user_f_name, user_l_name, user_password) => {
    try {
      const response = await fetch('http://localhost:5000/party/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: user_email,
          first_name: user_f_name,
          last_name: user_l_name,
          password: user_password
        })
      })

      const data = response.ok
      return data
    } catch (err) {
      console.log("ERR ", err)
      return err
    }
  }

  export const home = async (user_email) => {
    try {
      const response = await fetch('http://localhost:5000/party/get-home', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: user_email
        })
      })

      const data = await response.json()
      return data
    } catch (err) {
      console.log("ERR ", err)
      return err
    }
  }