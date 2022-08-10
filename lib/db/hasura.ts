export async function queryHasuraGQL(
  operationsDoc: string,
  operationName: any,
  variables: any
) {
  const result = await fetch(
    process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL as string,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": process.env
          .NEXT_PUBLIC_HASURA_ADMIN_SECRET as string,
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
