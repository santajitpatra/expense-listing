import { createFileRoute } from "@tanstack/react-router";
import { userQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile,
});

function Profile() {
  const { isPending, error, data } = useQuery(userQueryOptions);
  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-2">
      <div className="flex items-center gap-2">
        <Avatar>
          {data.user.picture && (
            <AvatarImage src={data.user.picture} alt={data.user.given_name} />
          )}
          <AvatarFallback>{data.user.given_name}</AvatarFallback>
        </Avatar>
        <p>
          {data.user.given_name} {data.user.family_name}
        </p>
      </div>
      <Button asChild className="my-4">
        <a href="/api/logout">Logout!</a>
      </Button>
    </div>
  );
}
