export async function getMyList(token: string, user_id: string) {
  try {
    const operationsDoc = `
    query getMyList($user_id: String!) {
      starts(where: {favourited: {_eq: 1}, user_id: {_eq: $user_id}}) {
        video_id
      }
    }`;

    const response = await queryHasuraGQL(
      operationsDoc,
      "getMyList",
      { user_id },
      token
    );
    return response.data?.starts;
  } catch (error) {
    console.log("Error to get my list", error);
  }
}

export async function watchItAgain(token: string, user_id: string) {
  try {
    const operationsDoc = `
    query watchItAgain ($user_id:String!){
      starts(where: {user_id: {_eq: $user_id}, watched: {_eq: true}}) {
        video_id
      }
    }
  `;

    const response = await queryHasuraGQL(
      operationsDoc,
      "watchItAgain",
      { user_id },
      token
    );
    return response?.data?.starts;
  } catch (error) {
    console.log("Error to get watch it again", error);
  }
}

export async function insertVideo(
  token: string,
  { video_id, user_id, favourited, watched = true }: any
) {
  try {
    const operationsDoc = `
    mutation insertVideo($favourited : Int!, $user_id : String!, $video_id : String!, $watched: Boolean!) {
      insert_starts(objects: {favourited: $favourited, user_id: $user_id, video_id: $video_id, watched: $watched}) {
        returning {
          favourited
          id
          user_id
          video_id
          watched
        }
      }
    }
  `;

    const response = await queryHasuraGQL(
      operationsDoc,
      "insertVideo",
      { video_id, user_id, favourited, watched },
      token
    );
    return response?.data?.insert_starts?.returning[0];
  } catch (error) {
    console.log("Error to insert video", error);
  }
}

export async function updateVideoByUserId(
  token: string,
  { video_id, user_id, favourited, watched }: any
) {
  try {
    const operationsDoc = `
    mutation updateVideo($favourited: Int!, $user_id: String!, $watched: Boolean!, $video_id: String!) {
      update_starts(
        _set: {watched: $watched, favourited: $favourited}, 
        where: {
          user_id: {_eq: $user_id}, 
          video_id: {_eq: $video_id}
        }) {
        returning {
          favourited,
          user_id,
          watched,
          video_id
        }
      }
    }
    `;

    const response = await queryHasuraGQL(
      operationsDoc,
      "updateVideo",
      { video_id, user_id, favourited, watched },
      token
    );

    return response?.data?.update_starts?.returning[0];
  } catch (error) {
    console.log("Error to update video", error);
  }
}

export async function getVideoByUserId(
  user_id: string,
  video_id: string,
  token: string
) {
  try {
    const operationsDoc = `
    query getVideoByUserId($video_id: String!,$user_id: String!) {
      starts(where: {video_id: {_eq: $video_id}, user_id: {_eq: $user_id}}) {
        favourited
        id
        user_id
        video_id
        watched
      }
    }
  `;

    const response = await queryHasuraGQL(
      operationsDoc,
      "getVideoByUserId",
      {
        video_id,
        user_id,
      },
      token
    );

    return response.data?.starts;
  } catch (error) {
    console.log("Error to get video by user id", error);
  }
}

export async function isNewUser(token: string, issuer: string) {
  try {
    const operationsDoc = `
    query isNewUser($issuer: String!) {
    users(where: {issuer: {_eq: $issuer}}) {
      email
      id
      issuer
      public_address
    }
  }
`;

    const response = await queryHasuraGQL(
      operationsDoc,
      "isNewUser",
      {
        issuer,
      },
      token
    );

    return response.data.users;
  } catch (error) {
    console.log("Error to get user", error);
  }
}

export async function insertUser(
  token: string,
  email: string,
  issuer: string,
  public_address: string
) {
  try {
    const operationsDoc = `
    mutation insertUser($email: String!, $issuer: String!, $public_address: String!) {
      insert_users(objects: {email: $email, issuer: $issuer, public_address: $public_address}) {
      returning {
        email
        id
        issuer
        public_address
    }
  }
}
`;
    const response = await queryHasuraGQL(
      operationsDoc,
      "insertUser",
      {
        email,
        issuer,
        public_address,
      },
      token
    );
    return response?.data?.insert_users?.returning[0];
  } catch (error) {
    console.log("Error to insert user", error);
  }
}

async function queryHasuraGQL(
  operationsDoc: string,
  operationName: any,
  variables: any,
  token: string
) {
  try {
    const result = await fetch(
      process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL as string,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: operationsDoc,
          variables: variables,
          operationName: operationName,
        }),
      }
    );

    return await result.json();
  } catch (error) {
    console.log("Error to query hasura", error);
  }
}
