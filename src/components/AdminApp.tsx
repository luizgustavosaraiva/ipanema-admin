"use client";

import { Admin, EditGuesser, ListGuesser, Resource } from "react-admin";

import { dataProvider } from "@/lib/utils/dataProviders";

export function AdminApp() {
  return (
    <Admin dataProvider={dataProvider("/api")}>
      <Resource
        name="assignor"
        list={ListGuesser}
        edit={EditGuesser}
        recordRepresentation="assignor"
      />
      <Resource
        name="administrator"
        list={ListGuesser}
        edit={EditGuesser}
        recordRepresentation="administrator"
      />
      <Resource
        name="administration"
        list={ListGuesser}
        edit={EditGuesser}
        recordRepresentation="administration"
      />

      <Resource
        name="asset"
        list={ListGuesser}
        edit={EditGuesser}
        recordRepresentation="asset"
      />

      <Resource
        name="assignment"
        list={ListGuesser}
        edit={EditGuesser}
        recordRepresentation="assignment"
      />

      <Resource
        name="asset_assignment"
        list={ListGuesser}
        edit={EditGuesser}
        recordRepresentation="asset_assignment"
      />
    </Admin>
  );
}
export default AdminApp;
