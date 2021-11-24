export const login = async (user_email, user_password) => {
  try {
    const response = await fetch("http://localhost:5000/party/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user_email,
        password: user_password,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("ERR ", err);
    return "ERR " + err;
  }
};

export const register = async (
  user_email,
  user_f_name,
  user_l_name,
  user_password
) => {
  try {
    const response = await fetch("http://localhost:5000/party/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user_email,
        first_name: user_f_name,
        last_name: user_l_name,
        password: user_password,
      }),
    });

    const data = response.ok;
    return data;
  } catch (err) {
    console.log("ERR ", err);
    return "ERR " + err;
  }
};

export const home = async (user_email) => {
  try {
    const response = await fetch("http://localhost:5000/party/get-home", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user_email,
      }),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.log("ERR ", err);
    return "ERR " + err;
  }
};

export const add_friend = async (user_email, friend_email) => {
  try {
    const response = await fetch("http://localhost:5000/party/add-friend", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        my_id: user_email,
        id: friend_email,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("ERR ", err);
    return "ERR " + err;
  }
};

export const add_element = async (list_id, movie_id) => {
  try {
    const response = await fetch("http://localhost:5000/party/add-element", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        v_collection_id: list_id,
        v_movie_id: movie_id,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("ERR ", err);
    return "ERR " + err;
  }
};

export const del_friend = async (user_email, friend_email) => {
  try {
    const response = await fetch("http://localhost:5000/party/delete-friend", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        my_id: user_email,
        id: friend_email,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("ERR ", err);
    return "ERR " + err;
  }
};

export const add_collection = async (user_email, collection_name) => {
  try {
    const response = await fetch("http://localhost:5000/party/add-collection", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user_email,
        collection_name: collection_name,
      }),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.log("ERR ", err);
    return "ERR " + err;
  }
};

export const del_collection = async (collection_id) => {
  try {
    const response = await fetch(
      "http://localhost:5000/party/delete-collection",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collection_id: collection_id,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("ERR ", err);
    return "ERR " + err;
  }
};

export const view_collection = async (collection_id) => {
  try {
    const response = await fetch(
      "http://localhost:5000/party/view-collection",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collection_id: collection_id,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("ERR ", err);
    return "ERR " + err;
  }
};

export const movie_search = async (
  v_title,
  v_director,
  v_actor,
  v_genre,
  v_keyword,
  v_prod
) => {
  try {
    const response = await fetch("http://localhost:5000/party/search", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: v_title,
        director: v_director,
        actor: v_actor,
        genre: v_genre,
        keyword: v_keyword,
        prod_company: v_prod,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("ERR ", err);
    return "ERR " + err;
  }
};

export const del_element = async (c_id, m_id) => {
  try {
    const response = await fetch("http://localhost:5000/party/delete-element", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        collection_id: c_id,
        movie_id: m_id,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("ERR ", err);
    return "ERR " + err;
  }
};