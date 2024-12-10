import Link from "next/link";

const NotFound: React.FC = () => {
  return (
    <main className="flex items-center justify-center bg-background_light min-h-screen sm:py-32 lg:px-8">
      <section className="text-center">
        <p
          className="text-3xl font-semibold text-error"
          role="alert"
          aria-live="assertive"
        >
          404
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="rounded-md bg-secondary px-5 py-3 text-sm font-semibold text-background_light shadow-sm hover:bg-tertiary focus:ring-2 focus:ring-offset-2 focus:ring-tertiary"
            aria-label="Go back to the homepage"
          >
            Go back home
          </Link>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
