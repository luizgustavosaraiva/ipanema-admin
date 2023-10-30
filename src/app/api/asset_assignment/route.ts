import { asset_assignment, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { getListHandler } from "ra-data-simple-prisma";

import { db } from "@/db";

const handler = async (req: Request) => {
  const body = await req.json();
  console.log(body);
  const params = body.params;
  const take = Number(params.pagination.perPage || 10);
  const skip = Number(params.pagination.page || 0);

  switch (body.method) {
    case "getList":
      const result = await getListHandler<Prisma.asset_assignmentFindManyArgs>(
        body,
        {
          findMany: function () {
            return db.asset_assignment.findMany({
              orderBy: {
                asset_identifier: "asc",
                assignment_identifier: "asc",
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
                  id: `${asset_identifier}_${assignment_identifier}`,
                  asset_identifier,
                  assignment_identifier,
                };
              },
            );
          },
        },
      );
      return NextResponse.json(result);
      break;

    default:
      return NextResponse.json({});
      break;
  }
};

export { handler as GET, handler as POST };
