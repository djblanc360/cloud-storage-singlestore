import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";

export default async function Drive() {
  return (
    <>
      <h1 className="mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
        Cloud Drive
      </h1>
      <p className="mx-auto mb-10 max-w-md text-xl text-gray-300 md:text-2xl">
        Secure, fast, and easy file storage. A graveyard for past proects.
      </p>
      <form
          action={async () => {
            "use server";

            const session = await auth();

            if (!session.userId) {
              return redirect("/sign-in");
            }

            return redirect("/drive");
          }}
        >
          <Button
            size="lg"
            type="submit"
            className="rounded-lg bg-gray-800 px-8 py-3 text-lg font-medium text-gray-100 shadow-lg transition-all hover:bg-gray-700"
          >
            Get Started
          </Button>
      </form>
    </>
  );
}