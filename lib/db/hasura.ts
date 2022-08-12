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
    console.log("isNewUser error", error);
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
    console.log("insertUser error", error);
  }
}

async function queryHasuraGQL(
  operationsDoc: string,
  operationName: any,
  variables: any,
  token: string
) {
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
}
