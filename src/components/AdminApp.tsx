"use client";
import { dataProvider } from "ra-data-simple-prisma";
import { Admin, EditGuesser, ListGuesser, Resource } from "react-admin";

export function AdminApp() {
  return (
    <Admin dataProvider={dataProvider("/api")}>
      <Resource
        name="administration"
        list={ListGuesser}
        edit={EditGuesser}
        recordRepresentation="name"
      />

      <Resource
        name="asset"
        list={ListGuesser}
        edit={EditGuesser}
        recordRepresentation="name"
      />

      <Resource
        name="asset_assignment"
        list={ListGuesser}
        edit={EditGuesser}
        recordRepresentation="name"
      />
      {/* <Resource name="comments" list={ListGuesser} edit={EditGuesser} /> */}
    </Admin>
  );
}
export default AdminApp;
