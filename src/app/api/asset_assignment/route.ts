import { asset_assignment, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import {
  getListHandler,
  GetListRequest,
  getOneHandler,
  GetOneRequest,
} from "ra-data-simple-prisma";

import { db } from "@/db";

const handler = async (req: Request) => {
  const body = await req.json();
  const params = body.params;
  const take = Number(params.pagination?.perPage ?? 10);
  const skip = Number(params.pagination?.page ?? 0);

  switch (body.method) {
    case "getList":
      const getListResult =
        await getListHandler<Prisma.asset_assignmentFindManyArgs>(
          body as GetListRequest,
          {
            findMany: function () {
              return db.asset_assignment.findMany({
                orderBy: {
                  asset_identifier: "asc",
                },
                take,
                skip,
              });
            },
            count: () => db.asset_assignment.count(),
          },
          {
            map: function (asset_assignments: asset_assignment[]) {
              return asset_assignments.map(
                ({ asset_identifier, assignment_identifier }) => {
                  return {
                    identifier: `${asset_identifier}_${assignment_identifier}`,
                    asset_identifier,
                    assignment_identifier,
                  };
                },
              );
            },
          },
        );
      return NextResponse.json(getListResult);
    case "getOne":
      const getOneResult =
        await getOneHandler<Prisma.asset_assignmentFindFirstArgs>(
          body as GetOneRequest,
          {
            findUnique: function () {
              const firstKey = (params.id as string)
                .split("_")[0]
                .replace(/[^\d.-]+/g, "");
              const secondKey = (params.id as string)
                .split("_")[1]
                .replace(/[^\d.-]+/g, "");

              return db.asset_assignment.findUnique({
                where: {
                  asset_identifier: Number(firstKey),
                  assignment_identifier: Number(secondKey),
                },
              });
            },
          },
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            transform: (row: any) => {
              const { asset_identifier, assignment_identifier } =
                row as asset_assignment;

              row[
                "identifier"
              ] = `${asset_identifier}_${assignment_identifier}`;
            },
          },
        );
      return NextResponse.json(getOneResult);

    default:
      return NextResponse.json({});
  }
};

export { handler as GET, handler as POST };
